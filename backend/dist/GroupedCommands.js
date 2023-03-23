"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupedCommands = void 0;
const DBManager_1 = require("./DBManager");
const DeliveryProposal_1 = require("./tables/DeliveryProposal");
class GroupedCommands {
    static cron() {
        return __awaiter(this, void 0, void 0, function* () {
            // Cette méthode réalise les regroupements de commandes
            yield DBManager_1.DB.initialize(process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306);
            GroupedCommands.createGroupedCommands();
        });
    }
    static checkTimeSlotsCoherency(timeSlot) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date(timeSlot.substring(0, 15));
            // Si erreur, on renvoie false
            if (date.toString() === 'Invalid Date') {
                return false;
            }
            // On vérifie que la date est bien dans le futur
            return (date.getTime() > Date.now());
        });
    }
    static calculDistanceJourCourant(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            // On récupère la date du jour
            let ajd = new Date().getDay();
            // On récupère la date de la commande
            cart.distanceJourCourant = ((new Date(cart.deadline).getDay() - ajd) % 7);
            if (cart.distanceJourCourant == 0) {
                cart.distanceJourCourant = 7; // dans le cas où on passe la commande pour J+7
            }
            // On renvoie la distance
            return cart.distanceJourCourant;
        });
    }
    static sortedUnattributedCarts(unattributedCarts) {
        return __awaiter(this, void 0, void 0, function* () {
            // On trie les commandes par distance au jour courant (plus proche en premier)
            unattributedCarts.sort((a, b) => {
                return a.distanceJourCourant - b.distanceJourCourant;
            });
            // Ensuite, parmi les commandes ayant la même distance au jour courant, on trie par prix moyen (plus grand en premier)
            for (let i = 2; i < 8; i++) {
                /* on parcourt les 7 jours de la semaine qui vient, en considérant que la première
                commande possible est à J+2, et que la dernière est à J+7 */
                let j = i;
                while (unattributedCarts[j].distanceJourCourant == unattributedCarts[i].distanceJourCourant) {
                    j++;
                }
                unattributedCarts.slice(i, j).sort((a, b) => {
                    return b.average_price - a.average_price;
                });
                i = j;
            }
        });
    }
    static orderShipperDisponibilities(shipper) {
        /* On récupère les disponibilités du livreur qui sont une string au format '0010011'
        (7 caractères pour les 7 jours de la semaine) avec 0=indisponible et 1=disponible
        On réordonne la string pour que le caractère correspondant au jour actuel soit en première position*/
        let disponibilities = shipper.disponibilities;
        let ajd = new Date().getDay();
        let newDisponibilities = disponibilities.substring(ajd, disponibilities.length) + disponibilities.substring(0, ajd);
    }
    static createUpdatedGroupedCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            // Regroupement de commandes
            // On récupère les commandes non attribuées
            let unattributedCarts = yield DBManager_1.DB.getUnattributedCarts();
            // On trie les commandes par distance au jour courant (plus proche en premier)
            yield GroupedCommands.sortedUnattributedCarts(unattributedCarts);
            // On récupère les disponibilités des shipper disponibles à J+2, J+3, J+4, J+5, J+6 et J+7
            let shippers = yield DBManager_1.DB.getShippers();
            for (const shipper of shippers) {
                GroupedCommands.orderShipperDisponibilities(shipper);
            }
            for (let i = 2; i < 8; i++) {
                let shippersDispoJour = [];
                for (const shipper of shippers) {
                    if (shipper.disponibilities[i] === '1') {
                        shippersDispoJour.push(shipper);
                    }
                }
                // Parmi les shippers disponibles à J+2, on les trie par price_max décroissant
                shippersDispoJour.sort((shipper1, shipper2) => {
                    return shipper2.price_max - shipper1.price_max;
                });
            }
        });
    }
    static createGroupedCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            let unattributedCarts = yield DBManager_1.DB.getUnattributedCarts();
            yield GroupedCommands.sortedUnattributedCarts(unattributedCarts);
            const timeSlots = yield DBManager_1.DB.getTimeSlots();
            // on a une liste de Shippers avec une valeur disponibilities : string au format 'YYYY-MM-DD HHMM-HHMM,...,YYYY-MM-DD HHMM-HHMM'
            // On réalise un dictionnaire de créneaux horaires : { 'YYYY-MM-DD HHMM-HHMM': [Shippers] }
            let timeSlotsDict = {};
            for (const timeSlot of timeSlots) {
                // On sépare les disponibilités par virgule
                let dispo = timeSlot.disponibilities.split(',');
                // Dans le cas où le créneau horaire n'existe pas dans le dictionnaire, on le crée
                for (const d of dispo) {
                    // On vérifie que le créneau horaire est cohérent
                    if (!GroupedCommands.checkTimeSlotsCoherency(d)) {
                        continue;
                    }
                    if (!timeSlotsDict[d]) {
                        timeSlotsDict[d] = [{ id: timeSlot.id, price_max: timeSlot.price_max }];
                    }
                    else {
                        timeSlotsDict[d].push({ id: timeSlot.id, price_max: timeSlot.price_max });
                    }
                }
            }
            // On trie les créneaux horaires par ordre croissant
            let timeSlotsSorted = Object.keys(timeSlotsDict).sort();
            // Pour chaque créneau horaire, on essaie de regrouper les commandes
            for (const timeSlot of timeSlotsSorted) {
                /* let timeSlotBegin = new Date(timeSlot.substring(0, 15))
                let timeSlotEnd = new Date(timeSlot.substring(0, 11) + timeSlot.substring(16, 20)) */
                for (const shipper of timeSlotsDict[timeSlot]) {
                    let commandsOfTimeSlot = [];
                    let commandsPrice = 0;
                    // On case les utilisateurs dans le créneau horaire
                    for (const cart of unattributedCarts) {
                        // Si le créneau horaire est dans la plage de livraison, on le case et si le prix max n'est pas dépassé
                        if (new Date(cart.deadline) >= new Date(timeSlot) && commandsPrice + cart.average_price < shipper.price_max) {
                            commandsOfTimeSlot.push(cart.id);
                            commandsPrice += cart.average_price;
                            // On supprime le panier de la liste des paniers non attribués
                            unattributedCarts.splice(unattributedCarts.indexOf(cart), 1);
                        }
                    }
                    // On a notre condition d'arrêt : On a atteint 90% du prix max
                    if (commandsPrice > shipper.price_max * 0.9) {
                        break;
                    }
                    /* On enregistre le regroupement de commandes :
                    Cart attribué : changer le status à 1 (en attente de validation par le shipper)
                    créer une DeliveryProposal pour le shipper
                    supprimer le créneau horaire de la liste des créneaux horaires disponibles du shipper
                    */
                    if (commandsOfTimeSlot.length > 0) {
                        for (const command of commandsOfTimeSlot) {
                            yield DBManager_1.DB.updateCartStatus(command, 1);
                        }
                        const deliveryProposal = new DeliveryProposal_1.DeliveryProposal();
                        deliveryProposal.shipper_id = shipper.id;
                        //deliveryProposal.timeSlot = timeSlot
                        deliveryProposal.status = 0; // 0 = en attente, 1 = acceptée, 2 = refusée
                        // deliveryProposal.carts = commandsOfTimeSlot
                        yield DBManager_1.DB.addDeliveryProposal(deliveryProposal);
                        // await DB.updateTimeSlots(shipper.id, timeSlot)
                    }
                }
            }
        });
    }
}
exports.GroupedCommands = GroupedCommands;
