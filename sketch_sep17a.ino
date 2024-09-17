#include <dht.h>
dht DHT;
#define DHT11_PIN 8

void setup() {
  
  Serial.begin(9600); // Permite ver desde el monitor serial
}

void loop() {
  DHT.read11(DHT11_PIN);
  String divisor = "|";

  Serial.print(DHT.temperature + divisor + DHT.humidity);

  delay(30000);
}