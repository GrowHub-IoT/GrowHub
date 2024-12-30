#include <Wire.h>
#include <ArduinoJson.h>
#include <RTClib.h>
#include <DHT.h>

#define DHTPIN 4        // Pin donde está conectado el DHT22
#define DHTTYPE DHT22   // Modelo del sensor DHT

#define MQ_PIN 34       // Pin donde está conectado el sensor de calidad de aire MQ
#define SOIL_PIN 35     // Pin donde está conectado el sensor de humedad de suelo
#define HYDRO_PIN 32    // Pin donde está conectado el higrómetro
#define RELAY_PIN 27    // Pin donde está conectado el relé de estado sólido

RTC_DS3231 rtc;
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  
  // Inicializa el sensor DHT
  dht.begin();
  
  // Inicializa el módulo RTC
  if (!rtc.begin()) {
    Serial.println("No se encuentra el módulo RTC");
    while (1);
  }
  if (rtc.lostPower()) {
    // Establece la fecha y hora actual
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  // Inicializa el pin del relé
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Apaga el relé al inicio
}

void loop() {
  // Lee la temperatura y humedad
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  // Lee la calidad del aire
  int mqValue = analogRead(MQ_PIN);

  // Lee la humedad del suelo
  int soilMoistureValue = analogRead(SOIL_PIN);

  // Lee el valor del higrómetro
  int hydroValue = analogRead(HYDRO_PIN);

  // Verifica si las lecturas son válidas
  if (isnan(h) || isnan(t)) {
    Serial.println("Fallo en la lectura del sensor DHT");
    return;
  }

  // Obten la fecha y hora actuales
  DateTime now = rtc.now();

  // Crea un array JSON
  StaticJsonDocument<256> doc;
  doc["timestamp"] = now.unixtime();
  doc["temperature"] = t;
  doc["humidity"] = h;
  doc["air_quality"] = mqValue;
  doc["soil_moisture"] = soilMoistureValue;
  doc["hydrometer"] = hydroValue;

  // Serializa el array JSON y lo imprime
  char jsonBuffer[256];
  serializeJson(doc, jsonBuffer);
  Serial.println(jsonBuffer);

  // Controla el relé según la hora
  if (now.hour() >= 6 && now.hour() < 18) { // Fotoperiodo de 6:00 a 18:00
    digitalWrite(RELAY_PIN, HIGH); // Enciende la luz
  } else {
    digitalWrite(RELAY_PIN, LOW);  // Apaga la luz
  }

  delay(5000); // Espera 5 segundos antes de la próxima lectura
}