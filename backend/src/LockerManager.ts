
import { DB } from './DBManager'

// Le temps (en sec) durant lequel le locker reste dans l'état "true" suite à une ouverture
const OPEN_TIME = 10;

export class Locker {

    // Deux lockers pour l'instant
    static lockerStates = [false, false]

    private static changeState(lockerID: number, state: boolean) {
        console.log(`[RPIManager] Changement d'état du locker n°${lockerID} à ${state}`);
        this.lockerStates[lockerID] = state;
    }

    /**
     * On laisse un temps de OPEN_TIME sec durant lequel l'état du locker est à true, puis on repasse à false
     * @param lockerID 
     */
    static openLocker(lockerID: number) {
        if (lockerID > this.lockerStates.length) {
            return null
        }
        console.log(`[RPIManager] Début d'ouverture du locker n°${lockerID}`)
        this.changeState(lockerID, true)
        setTimeout(() => {
            console.log(`[RPIManager] Fin d'ouverture du locker n°${lockerID}`)
            this.changeState(lockerID, false)
        }, OPEN_TIME * 1000);
    }

    static getLockersStates() {
        return this.lockerStates
    }

    // Donne le numéro d'un locker disponible
    static async getAvailableLocker() {

        let i = 0;
        while (i < this.lockerStates.length) {
            const numberOfCartsInLocker = await DB.getAmountOfCartsInLocker(i)
            if (numberOfCartsInLocker > 3) {
                i++;
            } else {
                return i;
            }
        }
        return this.lockerStates.length - 1;
    }
}