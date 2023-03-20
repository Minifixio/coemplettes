import { DB } from './DBManager'
import { Cart } from './tables/Cart'
import { DeliveryProposal } from './tables/DeliveryProposal'

export class GroupedCommands {
    static async cron() {
        // Cette méthode réalise les regroupements de commandes
        await DB.initialize(process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306)
        GroupedCommands.createGroupedCommands()
    }

    static async checkTimeSlotsCoherency(timeSlot: string) {
        // Cette méthode vérifie la cohérence du créneau horaire passé en paramètre
        // Avec une regex, on vérifie que le format est bien 'YYYY-MM-DD HHMM-HHMM'
        if (!timeSlot.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{4}-[0-9]{4}$/)) {
            return false
        }
        // On le transforme en date
        let date = new Date(timeSlot.substring(0, 15))
        // Si erreur, on renvoie false
        if (date.toString() === 'Invalid Date') {
            return false
        }
        // On vérifie que la date est bien dans le futur
        return (date.getTime() > Date.now())
    }


    static async createGroupedCommands() {
        const unattributedCarts = await DB.getUnattributedCarts()
        const timeSlots = await DB.getTimeSlots()
        // on a une liste de Shippers avec une valeur disponibilities : string au format 'YYYY-MM-DD HHMM-HHMM,...,YYYY-MM-DD HHMM-HHMM'
        // On réalise un dictionnaire de créneaux horaires : { 'YYYY-MM-DD HHMM-HHMM': [Shippers] }
        let timeSlotsDict: any = {};
        for (const timeSlot of timeSlots) {
            // On sépare les disponibilités par virgule
            let dispo = timeSlot.disponibilities.split(',')
            // Dans le cas où le créneau horaire n'existe pas dans le dictionnaire, on le crée
            for (const d of dispo) {
                // On vérifie que le créneau horaire est cohérent
                if (!GroupedCommands.checkTimeSlotsCoherency(d)) {
                    continue
                }
                if (!timeSlotsDict[d]) {
                    timeSlotsDict[d] = [{ id: timeSlot.id, price_max: timeSlot.price_max }]
                } else {
                    timeSlotsDict[d].push({ id: timeSlot.id, price_max: timeSlot.price_max })
                }
            }
        }
        // On trie les créneaux horaires par ordre croissant
        let timeSlotsSorted = Object.keys(timeSlotsDict).sort()

        // Pour chaque créneau horaire, on essaie de regrouper les commandes
        for (const timeSlot of timeSlotsSorted) {
            let timeSlotBegin = new Date(timeSlot.substring(0, 15))
            let timeSlotEnd = new Date(timeSlot.substring(0, 11) + timeSlot.substring(16, 20))
            for (const shipper of timeSlotsDict[timeSlot]) {
                let commandsOfTimeSlot = []
                let commandsPrice = 0
                // On case les utilisateurs dans le créneau horaire
                for (const cart of unattributedCarts) {
                    // Si le créneau horaire est dans la plage de livraison, on le case et si le prix max n'est pas dépassé
                    if (new Date(cart.deadline) >= timeSlotEnd && commandsPrice + cart.average_price < shipper.price_max) {
                        commandsOfTimeSlot.push(cart.id)
                        commandsPrice += cart.average_price
                        // On supprime le panier de la liste des paniers non attribués
                        unattributedCarts.splice(unattributedCarts.indexOf(cart), 1)
                    }
                }
                // On a notre condition d'arrêt : On a atteint 90% du prix max
                if (commandsPrice > shipper.price_max * 0.9) {
                    break
                }
                /* On enregistre le regroupement de commandes : 
                Cart attribué : changer le status à 1 (en attente de validation par le shipper) 
                créer une DeliveryProposal pour le shipper
                supprimer le créneau horaire de la liste des créneaux horaires disponibles du shipper
                */
                if (commandsOfTimeSlot.length > 0) {
                    for (const command of commandsOfTimeSlot) {
                        await DB.updateCartStatus(command, 1)
                    }
                    const deliveryProposal = new DeliveryProposal();
                    deliveryProposal.shipper_id = shipper.id
                    deliveryProposal.timeSlot = timeSlot
                    deliveryProposal.status = 0 // 0 = en attente, 1 = acceptée, 2 = refusée
                    deliveryProposal.carts = commandsOfTimeSlot
                    await DB.addDeliveryProposal(deliveryProposal)
                    await DB.updateTimeSlots(shipper.id, timeSlot)
                }
            }
            
        }

    }
}
