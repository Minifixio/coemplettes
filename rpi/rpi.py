from gpiozero import LED
from time import sleep
import requests

REQUEST_DELAY = 2 #Le délais entre deux request au serveur
rl = LED(4)

while(True):
    r = requests.get('http://137.194.211.70/lockers')
    lockersState = list(r.json())
    if int(lockersState[0]):
        rl.on()
    else:
        rl.off()
    sleep(REQUEST_DELAY)