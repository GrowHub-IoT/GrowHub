#!/bin/bash

# Definir colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Función para mostrar el menú de control
function show_menu() {
    echo "                                                                                              "
    echo "                                                                                              "
    echo "       _____                   _    _       _               ____________________________      "
    echo "      / ____|                 | |  | |     | |             /      ____    ______       /\     "
    echo "     | |  __ _ __ _____      _| |__| |_   _| |__          /      /  _/___/_  __/     _/ /     "
    echo "     | | |_ | '__/ _ \ \ /\ / /  __  | | | | '_ \        /       / // __ \/ /       / \/      "
    echo "     | |__| | | | (_) \ V  V /| |  | | |_| | |_) |      /      _/ // /_/ / /       /          "
    echo "      \_____|_|  \___/ \_/\_/ |_|  |_|\__,_|_.__/      /      /___/\____/_/       /\          "
    echo "                                                      /__________________________/ /          "
    echo -e "           ${GREEN}Developed By Rodrigo Mardones${NC}              \__________________________\/           "
    echo -e "                 ${CYAN}(Github @rmardonesa)${NC}                   \ \ \ \ \ \ \ \ \ \ \ \ \             "
    echo -e"   ${RED}Copyright © BSD-3 License${NC}  ${YELLOW}GrowHub IoT Systems${NC}                                            "
    echo "                                                                                              "
    echo "====================="
    echo "Panel de Control MQTT"
    echo "====================="
    echo "1. Iniciar servicio Mosquitto           5. Cambiar configuración de Mosquitto       "
    echo "2. Detener servicio Mosquitto           6. Añadir usuario MQTT (para autenticación) "          
    echo "3. Ver estado de Mosquitto              7. Eliminar usuario MQTT (desvincular ESP)  "
    echo "4. Ver logs de Mosquitto                8. Suscribirse a un topic MQTT              "
    echo "                                        9. Salir                                    "
    echo "====================="
    echo "Elige una opción:"
}

# Función para manejar la señal de interrupción (Ctrl + C)
function handle_interrupt() {
    echo -e "\nInterrupción detectada. Mostrando menú de control..."
    show_menu
}

# Capturar la señal de interrupción (Ctrl + C)
trap handle_interrupt SIGINT

# Capturar el símbolo * del teclado numérico
while true; do
    read -n 1 -s key
    if [[ $key == "*" ]]; then
        handle_interrupt
    elif [[ $key == "+" ]]; then
        show_system_info
    fi
done &

# Función para mostrar información del sistema
function show_system_info() {
    echo "Información del sistema:"
    echo "Uso de CPU:"
    top -bn1 | grep "Cpu(s)"
    echo "Uso de memoria:"
    free -h
}

# Función para configurar Mosquitto
function configure_mosquitto() {
    echo "Bienvenido al script de configuración de Mosquitto"
    echo "La dirección IP de tu Raspberry Pi es:"
    hostname -I
    echo "Introduce la dirección IP de tu Raspberry Pi:"
    read ip

    if [ -z "$ip" ]; then
        ip=$(hostname -I | awk '{print $1}')
        echo "Usando la dirección IP por defecto: $ip"
    fi

    echo "Introduce el puerto que deseas utilizar para MQTT (por defecto es 1883):"
    read port

    if [ -z "$port" ]; then
        port=1883
        echo "Usando el puerto por defecto: $port"
    fi

    echo "Introduce el nombre de usuario para MQTT:"
    read user

    while [ -z "$user" ]; do
        echo "El nombre de usuario no puede estar vacío. Por favor, introduce un nombre de usuario:"
        read user
    done

    echo "Introduce la contraseña para MQTT:"
    read password

    while [ -z "$password" ]; do
        echo "La contraseña no puede estar vacía. Por favor, introduce una contraseña:"
        read password
    done

    mosquitto_conf="/etc/mosquitto/mosquitto.conf"

    echo "listener $port $ip" > $mosquitto_conf
    echo "allow_anonymous false" >> $mosquitto_conf
    echo "password_file /etc/mosquitto/passwd" >> $mosquitto_conf

    mosquitto_passwd -b -c /etc/mosquitto/passwd $user $password

    echo "Configuración completada. Reiniciando Mosquitto..."

    sudo systemctl restart mosquitto
}

# Función para iniciar Mosquitto
function start_mosquitto() {
    sudo systemctl start mosquitto
    echo "Mosquitto iniciado."
}

# Función para detener Mosquitto
function stop_mosquitto() {
    sudo systemctl stop mosquitto
    echo "Mosquitto detenido."
}

# Función para ver el estado de Mosquitto
function status_mosquitto() {
    sudo systemctl status mosquitto
}

# Función para ver los logs de Mosquitto
function logs_mosquitto() {
    sudo journalctl -u mosquitto -f
}

# Función para añadir un usuario MQTT
function add_user() {
    echo "Introduce el nombre de usuario para MQTT:"
    read user

    while [ -z "$user" ]; do
        echo "El nombre de usuario no puede estar vacío. Por favor, introduce un nombre de usuario:"
        read user
    done

    echo "Introduce la contraseña para MQTT:"
    read password

    while [ -z "$password" ]; do
        echo "La contraseña no puede estar vacía. Por favor, introduce una contraseña:"
        read password
    done

    mosquitto_passwd -b /etc/mosquitto/passwd $user $password
    echo "Usuario añadido."
}

# Función para eliminar un usuario MQTT
function delete_user() {
    echo "Introduce el nombre de usuario para eliminar de MQTT:"
    read user

    while [ -z "$user" ]; do
        echo "El nombre de usuario no puede estar vacío. Por favor, introduce un nombre de usuario:"
        read user
    done

    mosquitto_passwd -D /etc/mosquitto/passwd $user
    echo "Usuario eliminado."
}

# Función para suscribirse a un topic MQTT
function subscribe_topic() {
    echo "Introduce la dirección IP del broker MQTT (por defecto es 192.168.50.2):"
    read ip

    if [ -z "$ip" ]; then
        ip="192.168.50.2"
        echo "Usando la dirección IP por defecto: $ip"
    fi

    echo "Introduce el puerto del broker MQTT (por defecto es 1883):"
    read port

    if [ -z "$port" ]; then
        port=1883
        echo "Usando el puerto por defecto: $port"
    fi

    echo "Introduce el nombre de usuario para MQTT:"
    read user

    while [ -z "$user" ]; do
        echo "El nombre de usuario no puede estar vacío. Por favor, introduce un nombre de usuario:"
        read user
    done

    echo "Introduce la contraseña para MQTT:"
    read password

    while [ -z "$password" ]; do
        echo "La contraseña no puede estar vacía. Por favor, introduce una contraseña:"
        read password
    done

    echo "Introduce el topic al que deseas suscribirte (por defecto es 'hydroponic/monitor/#'):"
    read topic

    if [ -z "$topic" ]; then
        topic="hydroponic/monitor/#"
        echo "Usando el topic por defecto: $topic"
    fi

    echo "Suscribiéndose al topic $topic..."
    sudo mosquitto_sub -h $ip -u $user -P $password -p $port -t "$topic"
}

# Mostrar el menú de control al inicio
show_menu

# Leer la opción del usuario
while true; do
    read option
    case $option in
        1) start_mosquitto ;;
        2) stop_mosquitto ;;
        3) status_mosquitto ;;
        4) logs_mosquitto ;;
        5) configure_mosquitto ;;
        6) add_user ;;
        7) delete_user ;;
        8) subscribe_topic ;;
        9) exit 0 ;;
        *) echo "Opción no válida. Por favor, elige una opción del 1 al 9." ;;
    esac
    show_menu
done