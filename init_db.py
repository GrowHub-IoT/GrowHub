import sqlite3

# Ruta de la base de datos
db_path = "users.db"

try:
    # Crear la base de datos y la tabla de usuarios
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    print("Conexión a la base de datos establecida.")

    # Crear la tabla de usuarios si no existe
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    );
    ''')
    print("Tabla 'users' verificada o creada.")

    # Verificar si hay usuarios en la base de datos
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    print(f"Usuarios encontrados: {users}")

    # Insertar usuarios de prueba si la tabla está vacía
    if not users:
        cursor.execute("INSERT INTO users (username, password) VALUES ('admin', 'admin1234')")
        cursor.execute("INSERT INTO users (username, password) VALUES ('user', 'user1234')")
        print("Usuarios de prueba insertados.")

    # Guardar y cerrar la conexión
    connection.commit()
    print("Cambios guardados en la base de datos.")
finally:
    connection.close()
    print("Conexión a la base de datos cerrada.")

print(f"Base de datos inicializada en {db_path}")