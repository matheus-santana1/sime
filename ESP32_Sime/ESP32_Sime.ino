#include <WiFi.h>
#include <ESPmDNS.h>
#include <DNSServer.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include <FastLED.h>
#include <vector>


//---Configuraçoẽs---
#define NUM_LEDS 16
#define HIGH_LED 14
#define MIDDLE_LED 10
#define MIN_DISTANCE 2 //em cm
#define MAX_DISTANCE 10 ///em cm
#define UPDATE_THRESHOLD 1 //em cm
#define SSID "SIME"
#define PASSWORD "testpassword"
constexpr unsigned long PERIOD_NIV = 1000; // minutos * segundos * milisegundos
constexpr unsigned long PERIOD_PREV = 10 * 60 * 1000; // minutos * segundos * milisegundos
constexpr unsigned long PERIOD_VARIACAO = 10 * 1000; // segundos * milisegundos

//---Cores---
#define BRIGHTNESS 255
constexpr uint32_t DISABLE = 0x000000;
constexpr uint32_t LED_COLORS[] = {
    0x2FFF00, 0x4CFF00, 0x69FF00, 0x86FF00,
    0xA4FF00, 0xC1FF00, 0xDEFF00, 0xFBFF00,
    0xFCDF00, 0xFCBF00, 0xFD9F00, 0xFD8000,
    0xFE6000, 0xFE4000, 0xFF2000, 0xFF0000
};

//---Pinos---
#define LED_ESP 2
#define LED_PIN 5
#define TRIG_PIN 16
#define ECHO_PIN 15
#define BUZZER_PIN 17

//---Tasks---
TaskHandle_t ControleTask;
TaskHandle_t WiFiTask;
TaskHandle_t BuzzerTaskHandle;
TaskHandle_t PrevNiveisTaskHandle;
TaskHandle_t SendNivelTaskHandle;
TaskHandle_t VariacaoTaskHandle;

//---Variáveis Globais---
CRGB led[NUM_LEDS];
DNSServer dnsServer;
WebSocketsServer webSocket = WebSocketsServer(8080);
std::vector<int> ids;
std::vector<float> prevNiveis(7, 0.0f);
const byte DNS_PORT = 53;
float distancia = MAX_DISTANCE;
float lastDistance = 0;

ArduinoJson::JsonDocument doc;
String json;
void buildJson()
{
  json = "";
  serializeJson(doc, json);
}


//--Funções Auxiliares
void eraseNum(int num){
  auto it = std::find(ids.begin(), ids.end(), num);
  if (it != ids.end()) {
    ids.erase(it);
  }
}

void setBarLed(int num){
  for(int i=0; i<NUM_LEDS; i++){
    if(i<num){
      led[i] = LED_COLORS[i];
    }
    else{
      led[i] = DISABLE;
    }
    FastLED.show();
  }
}

void disableBarLed(){
  for(int i=0; i<NUM_LEDS; i++){
    led[i] = DISABLE;
    FastLED.show();
  }
}

void setBuzzerInterrupted(){
  digitalWrite(BUZZER_PIN, LOW);
}

void setBuzzerIntermittent(void *pvParameters){
  bool buzzerState = HIGH;
  while (true) {
    buzzerState = !buzzerState;
    digitalWrite(BUZZER_PIN, buzzerState);
    vTaskDelay(pdMS_TO_TICKS(100));
  }
}

void sendVariacao(void *pvParameters){
  while (true){
    doc.clear();
    float variacao = (MAX_DISTANCE - distancia) - lastDistance;
    doc["variacao"] = variacao;
    buildJson();
    Serial.printf("Variação: %f\n", variacao);
    for (int id : ids) {
      webSocket.sendTXT(id, json);
    }
    lastDistance = MAX_DISTANCE - distancia;
    vTaskDelay(pdMS_TO_TICKS(PERIOD_VARIACAO));
  }
}

void disableBuzzer(){
  digitalWrite(BUZZER_PIN, HIGH);
}

static portMUX_TYPE spinlock = portMUX_INITIALIZER_UNLOCKED;
float getDistancia(){
  taskENTER_CRITICAL(&spinlock);
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  unsigned long duracao = pulseIn(ECHO_PIN, HIGH, 30000);
  taskEXIT_CRITICAL(&spinlock);
  float distancia = (duracao * 0.0343) / 2;
  return (distancia <= MAX_DISTANCE) ? distancia : MAX_DISTANCE; 
}

void updatePrevNiveis(void *pvParameters){
  while (true){
    prevNiveis.push_back(MAX_DISTANCE - distancia);
    if (prevNiveis.size() > 7) {
      prevNiveis.erase(prevNiveis.begin());
    }
    Serial.print("prevNiveis: [");
    for (size_t i = 0; i < prevNiveis.size(); i++) {
      Serial.print(prevNiveis[i]);
      if (i != prevNiveis.size() - 1) {
        Serial.print(", ");
      }
    }
    Serial.println("]");
    vTaskDelay(pdMS_TO_TICKS(PERIOD_PREV));
  }
}

void sendNivel(void *pvParameters){
  while (true){
    doc.clear();
    doc["nivel"] = MAX_DISTANCE - distancia;
    buildJson();
    Serial.printf("%f\n", MAX_DISTANCE - distancia);
    for (int id : ids) {
      webSocket.sendTXT(id, json);
    }
    if(ids.empty()) {
      digitalWrite(LED_ESP, LOW);
    }
    else {
      digitalWrite(LED_ESP, HIGH);
    }
    vTaskDelay(pdMS_TO_TICKS(PERIOD_NIV));
  }
}
//---


void setup() {
  Serial.begin(115200);
  pinMode(LED_ESP, OUTPUT);
  digitalWrite(LED_ESP, HIGH);
  pinMode(ECHO_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  disableBuzzer();
  FastLED.addLeds<NEOPIXEL, LED_PIN>(led, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
  disableBarLed();
  xTaskCreatePinnedToCore(WiFiTaskFunction, "WiFi", 10000, NULL, 2, &WiFiTask, 0);
  xTaskCreatePinnedToCore(updatePrevNiveis, "PrevNiveis", 10000, NULL, 1, &PrevNiveisTaskHandle, 0);
  xTaskCreatePinnedToCore(sendNivel, "Nivel", 10000, NULL, 1, &SendNivelTaskHandle, 0);
  xTaskCreatePinnedToCore(ControleTaskFunction, "Controle", 10000, NULL, 2, &ControleTask, 1);
  xTaskCreatePinnedToCore(setBuzzerIntermittent, "Buzzer", 10000, NULL, 1, &BuzzerTaskHandle, 1);
  xTaskCreatePinnedToCore(sendVariacao, "Variacao", 10000, NULL, 2, &VariacaoTaskHandle, 1);
  WiFi.softAP(SSID, PASSWORD);
  if (!MDNS.begin("sime"))
  {
      Serial.println("Falha ao inicializar o MDNS.");
      return;
  }
  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
  Serial.printf("Servidor WebSocket iniciado!\nIP do AP: %s\n", WiFi.softAPIP().toString());
}

void ControleTaskFunction(void *pvParameters)
{
  while (true) {
    distancia = getDistancia();
    static float lastDistance = -1;
    if (abs(distancia - lastDistance) > UPDATE_THRESHOLD) {
      lastDistance = distancia;
      int ledsToLight = NUM_LEDS - map(distancia, MIN_DISTANCE, MAX_DISTANCE, 0, NUM_LEDS);
      setBarLed(ledsToLight);
      if(ledsToLight >= MIDDLE_LED && ledsToLight <= HIGH_LED){
        vTaskResume(BuzzerTaskHandle);
      }
      else if(ledsToLight > HIGH_LED){
        vTaskSuspend(BuzzerTaskHandle);
        setBuzzerInterrupted();
      }
      else {
        vTaskSuspend(BuzzerTaskHandle);
        disableBuzzer();
      }
    }
    vTaskDelay(pdMS_TO_TICKS(50));
  }
}

void WiFiTaskFunction(void *pvParameters)
{
    while (true)
    {
        webSocket.loop();
        vTaskDelay(pdMS_TO_TICKS(100));
    }
}

void webSocketMessage(uint8_t num, uint8_t *payload){
  ArduinoJson::JsonDocument response;
  String message = String((char *)payload);
  DeserializationError error = deserializeJson(response, message.c_str());
  if (error) {
    Serial.print("Falha na deserialização: ");
    Serial.println(error.f_str());
    return;
  }
  const char* acao = response["acao"];
  if (acao != nullptr) {
    if (strcmp(acao, "play") == 0){
      ids.push_back(num);
    }
    else if (strcmp(acao, "pause") == 0){
      eraseNum(num);
    }
  } else {
    Serial.printf("Chave ação não encontrada.\n");
  }
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
    switch (type)
    {
      case WStype_DISCONNECTED:
        eraseNum(num);
        break;
      case WStype_CONNECTED:
      {
        IPAddress ip = webSocket.remoteIP(num);
        Serial.printf("\n[%u] Conectado %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
        doc.clear();
        doc["conectado"] = true;
        JsonArray array = doc.createNestedArray("prevNiveis");
        for(int i=0; i<7; i++){
          array.add(prevNiveis[i]);
        }
        buildJson();
        webSocket.sendTXT(num, json);
      }
        break;
      case WStype_TEXT:
        webSocketMessage(num, payload);
        break;
    }
}

void loop() {
  //Vazio
}