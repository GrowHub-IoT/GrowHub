import os
import json
import pandas as pd
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from datetime import datetime, timedelta


load_dotenv()

MONGODB_URI =  os.getenv("MONGODB_URI")
DATABASE_NAME = "hydroponics"
COLLECTION_NAME = "microservice"
REPORTS_PATH = "reports"

if not os.path.exists(REPORTS_PATH):
    os.makedirs(REPORTS_PATH)


def connect_to_mongodb():
    client = MongoClient(MONGODB_URI, server_api=ServerApi('1'))
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    return collection

def insert_sensor_data(data):
    print("Datos a insertar:", data) 
    collection = connect_to_mongodb()
    result = collection.insert_one(data)
    print("Datos ingresados a MongoDB Cloud. ID:", result.inserted_id)

def get_latest_sensor_data(limit=40):
    collection = connect_to_mongodb()
    cursor = collection.find().sort("_id", -1).limit(limit)
    data = list(cursor)
    return data

def get_sensor_data_by_range(start_date, end_date):
    collection = connect_to_mongodb()
    cursor = collection.find({"timestamp": {"$gte": start_date, "$lte": end_date}})
    data = list(cursor)
    return data

def generate_report(data, format):
    df = pd.DataFrame(data)
    if format == 'json':
        json_report = df.to_json(orient='records')
        report_path = os.path.join(REPORTS_PATH, 'report.json')
        with open(report_path, 'w') as file:
            file.write(json_report)
        return report_path
    elif format == 'csv':
        csv_report = df.to_csv(index=False)
        report_path = os.path.join(REPORTS_PATH, 'report.csv')
        with open(report_path, 'w') as file:
            file.write(csv_report)
        return report_path
    elif format == 'xls':
        report_path = os.path.join(REPORTS_PATH, 'report.xlsx')
        with pd.ExcelWriter(report_path, engine='openpyxl') as writer:
            df.to_excel(writer, index=False)
        return report_path
    elif format == 'dataframe':
        # Guardar el DataFrame en un archivo CSV
        csv_path = os.path.join(REPORTS_PATH, 'data.csv')
        df.to_csv(csv_path, index=False)
        
        # Crear el archivo dataframe.R con la plantilla predefinida
        r_script = """
        library(readr)

        # Cargar los datos desde un archivo CSV
        data <- read_csv('data.csv')

        # Mostrar los primeros registros del dataframe
        print(head(data))

        # Aquí puedes añadir más lógica para manipular y analizar los datos
        """
        
        report_path = os.path.join(REPORTS_PATH, 'dataframe.R')
        with open(report_path, 'w') as file:
            file.write(r_script)
        
        return report_path
    else:
        raise ValueError("Formato no soportado")