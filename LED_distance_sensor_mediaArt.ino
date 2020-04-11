int trig=14;
int echo=12;
int led[3]={15, 4, 17};
int gnd[3]={2, 16, 5};
long duration, cm, inches;

void setup() {
  // put your setup code here, to run once:
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  for(int i=0;i<3;i++){
    pinMode(led[i], OUTPUT);
    digitalWrite(led[i], 1);

    pinMode(gnd[i], OUTPUT);
    digitalWrite(gnd[i], 0);
  }
  Serial.begin(115200);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(trig, LOW);
  delayMicroseconds(5);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);

  pinMode(echo, INPUT);
  duration=pulseIn(echo, HIGH);

  cm=(duration/2)/29.1;

  Serial.print(cm);
  Serial.print("cm");
  Serial.println();

  int delayValue=50;
  if(cm<10)
    delayValue=150;
    for(int k=0;k<3;k++){
      digitalWrite(led[k], 1);
      delay(delayValue);
      digitalWrite(led[k], 0);
  }
  delay(delayValue);
}
