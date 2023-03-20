"use strict";
class RPIManager {
    static changeState(lockerID, state) {
        console.log(`[RPIManager] Changement d'état du locker n°${lockerID} à ${state}`);
        this.lockerStates[lockerID] = state;
    }
    /**
     * On laisse un temps de 10 sec durant lequel l'état du locker est à true, puis on repasse à false
     * @param lockerID
     */
    static openLocker(lockerID) {
        console.log(`[RPIManager] Début d'ouverture du locker n°${lockerID}`);
        this.changeState(lockerID, true);
        setTimeout(() => {
            console.log(`[RPIManager] Fin d'ouverture du locker n°${lockerID}`);
            this.changeState(lockerID, false);
        }, 10000);
    }
    static getLockersStates() {
        return this.lockerStates;
    }
}
RPIManager.lockerStates = [false, false, false];
