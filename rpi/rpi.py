from gpiozero import LED
from time import sleep
import requests
import threading

REQUEST_DELAY = 2  # Le délai (secondes) entre deux request au serveur
OPEN_TIME = 10  # Le temps (secondes) que un locker reste ouvert
LOCKERS_URL = 'http://137.194.211.70/lockers'  # L'URL du serveur
LOCKERS_LIST = [LED(4), LED(5)]  # PIN 7, # PIN 29


def openLocker(lockerID):
    LOCKERS_LIST[lockerID].on()  # On ouvre le locker
    sleep(OPEN_TIME)  # On attend OPEN_TIME secondes
    LOCKERS_LIST[lockerID].off()  # On ferme le locker


while True:
    r = requests.get(LOCKERS_URL)  # On récupère l'état des lockers
    lockersState = list(r.json())  # On convertit le json en liste
    for numLocker in range(len(lockersState)):  # On parcourt la liste
        if lockersState[numLocker]:  # Si l'état est vrai
            # On lance un thread pour l'ouvrir pendant OPEN_TIME secondes
            threading.Thread(target=openLocker, args=numLocker).start()
    sleep(REQUEST_DELAY)  # On attend REQUEST_DELAY secondes avant de refaire une requête
