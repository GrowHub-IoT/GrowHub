# BSD 3-Clause License Software
# Creative Commons License Documentation
# Copyright (C) Rodrigo Mardones 2024

import json
import data
import time
import threading
from flask import jsonify, Flask, render_template, Response, request, redirect, url_for, session, flash
from flask import send_file
from flask_wtf import FlaskForm
from wtforms import SelectField, SubmitField
from wtforms.validators import DataRequired
import paho.mqtt.client as mqtt
import plotly
import plotly.graph_objs as go
from collections import deque
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
from bson import ObjectId
from flask_sqlalchemy import SQLAlchemy
import sqlite3
import subprocess
from datetime import datetime, timedelta



# Cargar variables de entorno
load_dotenv()

# Configuración de credenciales
cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__, static_folder='static', static_url_path='/static')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


class ReportForm(FlaskForm):
    time_range = SelectField('Rango temporal', choices=[
        ('24h', 'Últimas 24 horas'),
        ('7d', 'Últimos 7 días'),
        ('3w', 'Últimas 3 semanas'),
        ('6w', 'Últimas 6 semanas')
    ], validators=[DataRequired()])
    format = SelectField('Formato de descarga', choices=[
        ('json', 'JSON'),
        ('csv', 'CSV'),
        ('xls', 'XLS'),
        ('dataframe', 'DATAFRAME')
    ], validators=[DataRequired()])
    submit = SubmitField('Crear reporte')

# Ruta base de datos SQLite
db_path = "users.db"

# Función para verificar usuarios
def verify_user(username, password):
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    connection.close()
    return user

# Función para limpiar sesiones
def clear_sessions():
    with app.app_context():
        session.clear()
        print("Todas las sesiones han sido limpiadas.")


datos_sensores = {
    'temperatura': [],
    'ph': [],
    'tds': [],
    'ec': []
}


plant_parameters = { "Lollo Bionda": 
                    { "temperature": {"min": 18, "max": 22}, 
                      "pH": {"min": 5.5, "max": 6.0}, 
                      "TDS": {"min": 700, "max": 850}, 
                      "EC": {"min": 1.2, "max": 1.6} }, 
                    "Lechuga Española": 
                    { "temperature": {"min": 16, "max": 20}, 
                      "pH": {"min": 5.8, "max": 6.2}, 
                      "TDS": {"min": 560, "max": 840}, 
                      "EC": {"min": 0.8, "max": 1.2} }, 
                    "Tomate Cherry": 
                    { "temperature": {"min": 18, "max": 24},
                      "pH": {"min": 5.5, "max": 6.5}, 
                      "TDS": {"min": 1400, "max": 3500}, 
                      "EC": {"min": 2.0, "max": 5.0} }, 
                    "Pepino": 
                    { "temperature": {"min": 22, "max": 26},
                      "pH": {"min": 5.5, "max": 6.0}, 
                      "TDS": {"min": 1190, "max": 1750}, 
                      "EC": {"min": 1.7, "max": 2.5} }, 
                    "Albahaca": 
                    { "temperature": {"min": 18, "max": 24}, 
                      "pH": {"min": 5.5, "max": 6.5}, 
                      "TDS": {"min": 700, "max": 1120}, 
                      "EC": {"min": 1.0, "max": 1.6} }, 
                    "Fresa": 
                    { "temperature": {"min": 18, "max": 24}, 
                      "pH": {"min": 5.5, "max": 6.5}, 
                      "TDS": {"min": 1050, "max": 1260}, 
                      "EC": {"min": 1.4, "max": 1.8} } }


# Número máximo de datos a almacenar
MAX_DATA_POINTS = 40

update_event = threading.Event()

def on_message(client, userdata, msg):
    global datos_sensores
    try:
        new_data = json.loads(msg.payload)
        print("MQTT JSON:", new_data)

        # Insertar datos
        data.insert_sensor_data(new_data)

        # Convertir ObjectId a string
        converted = {k: str(v) if isinstance(v, ObjectId) else v for k, v in new_data.items()}

        # Sincronizar Datos
        db.collection('hydroponics').add(converted)
        print("Sincronizando disponibilidad proveedores cloud (GCP/AWS)", converted)

        for key in datos_sensores:
            datos_sensores[key].append(new_data[key])
            if len(datos_sensores[key]) > MAX_DATA_POINTS:
                datos_sensores[key].pop(0)
        update_event.set()
    except json.JSONDecodeError:
        print("Error al decodificar JSON")

client = mqtt.Client()
client.on_message = on_message
client.username_pw_set("admin", "admin1234")
client.connect("192.168.50.2", 1883)
client.subscribe("hydroponic/monitor/data")
client.loop_start()

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = verify_user(username, password)
        if user:
            session['user_id'] = user[0]
            flash('Login successful!', 'success')
            return redirect(url_for('index'))
        else:
            flash('Login failed. Check your username and/or password.', 'danger')
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        connection = sqlite3.connect(db_path)
        cursor = connection.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", (username, password))
        connection.commit()
        connection.close()
        flash('Registration successful! You can now log in.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/generate_report', methods=['GET', 'POST'])
def generate_report():
    form = ReportForm()
    if form.validate_on_submit():
        time_range = form.time_range.data
        format = form.format.data

        end_date = datetime.now()
        if time_range == '24h':
            start_date = end_date - timedelta(hours=24)
        elif time_range == '7d':
            start_date = end_date - timedelta(days=7)
        elif time_range == '3w':
            start_date = end_date - timedelta(weeks=3)
        elif time_range == '6w':
            start_date = end_date - timedelta(weeks=6)
        else:
            start_date = end_date

        sensor_data = data.get_sensor_data_by_range(start_date, end_date)
        report_path = data.generate_report(sensor_data, format)

        return send_file(report_path, as_attachment=True)

    return render_template('generate_report.html', form=form)

@app.route('/plant_parameters')
def get_plant_parameters():
    return jsonify(plant_parameters)

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('login'))

@app.route('/parameters') 
def parameters():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('parameters.html')

@app.route('/lab_info') 
def lab_info(): 
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('lab_info.html')

@app.route('/')
def index():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('index.html')

@app.route('/chart_data')
def chart_data():
    latest_data = data.get_latest_sensor_data()
    return jsonify(datos_sensores)

@app.route('/stream')
def stream():
    def event_stream():
        while True:
            update_event.wait()
            update_event.clear()
            yield f"data: {json.dumps(datos_sensores)}\n\n"
    return Response(event_stream(), mimetype="text/event-stream")

@app.route('/sensor_data') 
def sensor_data():
    return jsonify(datos_sensores)

if __name__ == '__main__':
    # Ejecutar init_db.py para inicializar la base de datos
    subprocess.run(["python", "init_db.py"])
    
    # Limpiar todas las sesiones al iniciar el servidor
    clear_sessions()
    
    app.run(debug=True, host='0.0.0.0')