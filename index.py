import requests
import random
import time

for i in range(10):
	value = random.randint(0, 100)
	r = requests.get("https://api.thingspeak.com/update?api_key=16ST74ZEEJ16PW1I&field1=" + str(value))
	time.sleep(30)