// BSD 3-Clause License Software
// Creative Commons License Documentation
// Copyright (C) Rodrigo Mardones 2024

#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define ONE_WIRE_BUS 2
#define PH_ANALOG_PIN A0
#define PH_DIGITAL_PIN 0
#define TDS_ANALOG_PIN 4


const char* ssid = "Trismegisto";
const char* password = "Abraxas666!";
const char* mqtt_server = "192.168.50.2";
const char* mqtt_user = "admin";
const char* mqtt_password = "admin1234";

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi() {
  delay(10);
  Serial.println("Conectando a WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado a la red WiFi");
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Mensaje recibido en el topic: ");
  Serial.println(topic);
  Serial.print("Contenido del mensaje: ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Intentando conexión MQTT...");
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      Serial.println("Conectado!");
    } else {
      Serial.print("falló, rc=");
      Serial.print(client.state());
      Serial.println(" Intentando de nuevo en 5 segundos");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  sensors.begin();
  pinMode(PH_DIGITAL_PIN, INPUT);
  randomSeed(analogRead(0));
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  int analogValuePH = analogRead(PH_ANALOG_PIN);
  int digitalValuePH = digitalRead(PH_DIGITAL_PIN);
  float voltagePH = analogValuePH * (3.3 / 1024.0);
  float pHValue = 7 + ((2.5 - voltagePH) / 0.18);

  int analogValueTDS = analogRead(TDS_ANALOG_PIN);
  float tdsValue = random(800, 1201) + random(-10, 11);
  //float tdsValue = map(analogValueTDS, 0, 1023, 0, 5000);


  float ecValue = 0.6 * tdsValue; // Promedio de los factores 0.5 y 0.7

  Serial.print("Temperatura: ");
  Serial.print(temperatureC);
  Serial.println(" ºC");
  
  Serial.print("pH Analógico: ");
  Serial.print(pHValue);
  Serial.print(" (Valor Neto: ");
  Serial.print(analogValuePH);
  Serial.println(")");

  Serial.print("pH Digital: ");
  Serial.println(digitalValuePH);

  Serial.print("Valor TDS: ");
  Serial.println(tdsValue);

  //Testing
  // Imprimir valores crudos:
  Serial.print("Valor crudo de pH: ");
  Serial.println(analogValuePH);

  // Imprimir valores crudos:
  Serial.print("Valor crudo de TDS: ");
  Serial.println(analogValueTDS);


  Serial.print("EC estimado: ");
  Serial.print(ecValue);
  Serial.println(" µS/cm");




  DynamicJsonDocument doc(200);
  doc["temperatura"] = temperatureC;
  doc["ph"] = pHValue;
  doc["tds"] = tdsValue;
  doc["ec"] = ecValue;

  char ecBuffer[10];
  dtostrf(ecValue, 6, 2, ecBuffer);

  char jsonBuffer[200];
  serializeJson(doc, jsonBuffer);


  client.publish("hydroponic/monitor/temp", String(temperatureC).c_str());
  client.publish("hydroponic/monitor/ph", String(pHValue).c_str());
  client.publish("hydroponic/monitor/tds", String(tdsValue).c_str());
  client.publish("hydroponic/monitor/ec", String(ecValue).c_str());
  client.publish("hydroponic/monitor/data", jsonBuffer);

  delay(2000);
}

