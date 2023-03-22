from gpiozero import LED
from time import sleep
import requests

REQUEST_DELAY = 2 #Le délais entre deux request au serveur
OPEN_TIME = 10
LOCKERS_URL = 'http://137.194.211.70/lockers'
rl = LED(4)

while(True):
    r = requests.get(LOCKERS_URL)
    lockersState = list(r.json())
    if lockersState[0]:
        rl.on()
        sleep(OPEN_TIME)
        rl.off()
    sleep(REQUEST_DELAY)