#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
#include <DHT.h>

#define DHTPIN 2     // Pin donde está conectado el sensor DHT22
#define DHTTYPE DHT22   // Tipo de sensor DHT (DHT22 en este caso)

DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x3F,16,2);  // Dirección I2C de la pantalla (ajusta si es necesario)

void setup() {
  Serial.begin(9600);
  dht.begin();
  lcd.init();                    
  lcd.backlight();

  Serial.println("Iniciando..."); // Mensaje de inicio en el monitor serial
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Error al leer el sensor DHT!"); // Mensaje de error en el monitor serial
    return;
  }

  // Mostrar valores en el monitor serial:
  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.println(" C");

  // Mostrar valores en la pantalla LCD (si funciona):
  lcd.setCursor(0,0);
  lcd.print("Temp: ");
  lcd.print(t);
  lcd.print(" C");
  
  lcd.setCursor(0,1);
  lcd.print("Hum: ");
  lcd.print(h);
  lcd.print(" %");

  delay(2000); 
}

