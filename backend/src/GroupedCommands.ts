import { DB } from './DBManager'
import { Cart } from './tables/Cart'
import { Shipper } from './tables/Shipper'
import { DeliveryProposal } from './tables/DeliveryProposal'

// On crée une interface pour l'objet en quesiton
// Il faudra retransformer cet objet en DeliveryProposal ensuite
// L'ID sera calculé par la BDD
// On utilise un référence (ref) pour l'instant pour identifier les DP
interface DeliveryProposalPartial {
    shipper_id: number,
    deadline: Date,
    creation_date: Date,
    status: number,
    current_price: number
    size: number
    carts: Cart[]
}
export class GroupedCommands {
    static async cron() {
        // Cette méthode réalise les regroupements de commandes
        await DB.initialize(process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306)
        GroupedCommands.createGroupedCommands()
    }

    static checkTimeSlotsCoherency(timeSlot: string) { // decayed
        let date = new Date(timeSlot.substring(0, 15))
        // Si erreur, on renvoie false
        if (date.toString() === 'Invalid Date') {
            return false
        }
        // On vérifie que la date est bien dans le futur
        return (date.getTime() > Date.now())
    }

    static calculDistanceJourCourant(cart: Cart) {
        // On récupère la date du jour
        let ajd = new Date()
        // On récupère la date de la commande
        console.log(cart.deadline, Math.round(((new Date(cart.deadline)).getTime() - ajd.getTime())/86400000)) 
        cart.distanceJourCourant = Math.round(((new Date(cart.deadline)).getTime() - ajd.getTime())/86400000)
        if (cart.distanceJourCourant == 0) {
            cart.distanceJourCourant = 7    // dans le cas où on passe la commande pour J+7
        }
        // On renvoie la distance
        return cart.distanceJourCourant
    }

    static sortUnattributedCarts(unattributedCarts: Cart[]) {
        for (let cart of unattributedCarts) {
            GroupedCommands.calculDistanceJourCourant(cart)
        }

        // On trie les commandes par distance au jour courant (plus proche en premier)
        unattributedCarts.sort((a, b) => {
            if (a.distanceJourCourant == b.distanceJourCourant){
                return b.average_price - a.average_price
            } else {
                return a.distanceJourCourant - b.distanceJourCourant
            }
        })
        // // Ensuite, parmi les commandes ayant la même distance au jour courant, on trie par prix moyen (plus grand en premier)
        // for (let i = 2; i < 8; i++) {
        //     /* on parcourt les 7 jours de la semaine qui vient, en considérant que la première 
        //     commande possible est à J+2, et que la dernière est à J+7 */
        //     let j = i
        //     while (unattributedCarts[j].distanceJourCourant == unattributedCarts[i].distanceJourCourant) {
        //         j++
        //     }
        //     unattributedCarts.slice(i, j).sort((a, b) => {
        //         return b.average_price - a.average_price
        //     })
        //     i = j
        // }
    }

    static orderShipperDisponibilities(shipper: Shipper) {
        /* On récupère les disponibilités du livreur qui sont une string au format '0010011' 
        (7 caractères pour les 7 jours de la semaine) avec 0=indisponible et 1=disponible
        On réordonne la string pour que le caractère correspondant au jour actuel soit en première position*/
        let disponibilities = shipper.disponibilities
        let ajd = new Date().getDay()
        let newDisponibilities = disponibilities.substring(ajd, disponibilities.length) + disponibilities.substring(0, ajd)
        shipper.disponibilities = newDisponibilities
    }

    static async createGroupedCommands() {
        // Regroupement de commandes
        // On récupère les commandes non attribuées
        let unattributedCarts: Cart[] = await DB.getUnattributedCarts()
        console.log("unattributedCarts", unattributedCarts);
        // On trie les commandes par distance au jour courant (plus proche en premier) et par prix
        GroupedCommands.sortUnattributedCarts(unattributedCarts)
        console.log("sorted unattributedCarts", unattributedCarts);

        // On récupère les disponibilités des shipper disponibles à J+2, J+3, J+4, J+5, J+6 et J+7
        let shippers: Shipper[] = await DB.getShippers()
        console.log("shippers", shippers);

        for (const shipper of shippers) {
            GroupedCommands.orderShipperDisponibilities(shipper)
        }
        console.log("sorted shippers", shippers);

        let deliveryProposals = []

        for (let i = 0; i < 7; i++) {
            let shippersDispoJour = []
            for (const shipper of shippers) {
                if (shipper.disponibilities[i] === '1') {
                    shippersDispoJour.push(shipper)
                }
            }
            // Parmi les shippers disponibles à J+i, on les trie par price_max décroissant
            shippersDispoJour.sort((shipper1: Shipper, shipper2: Shipper) => {
                return shipper2.price_max - shipper1.price_max
            })

            console.log("sorted shippersDispoJour " + i, shippersDispoJour)


            for (const shipper of shippersDispoJour) {
                let deliveryProposal: DeliveryProposalPartial = { // CREATION DE LA DP A CORRIGER
                    shipper_id: shipper.id,
                    // on fixe la deadline à aujourd'hui + 2 jours : à voir comment on veut stocker la date
                    deadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
                    creation_date: new Date(),
                    status: 0,
                    current_price: 0,
                    size: 0,
                    carts: []
                }

                let j = 0;
                // WARNING ! En l'état, les commandes à J+i sont prioritaires sur les suivantes
                while (unattributedCarts[j].distanceJourCourant == i) {
                    if (unattributedCarts[j].status == 0 && deliveryProposal.current_price + unattributedCarts[j].average_price <= shipper.price_max) {
                        console.log("la cart d'id " + unattributedCarts[j].id + " a été attribuée à la delivery proposal " + deliveryProposal)

                        // On attribue la commande au livreur
                        deliveryProposal.carts.push(unattributedCarts[j])
                        deliveryProposal.current_price += unattributedCarts[j].average_price
                        unattributedCarts[j].status = 1
                        // on supprime la commande de la liste des commandes non attribuées
                    }
                    j++
                }
                // On essaie de combler les trous avec les commandes pour les jours suivants
                for (const cart of unattributedCarts) {
                    if (cart.status == 0 && cart.distanceJourCourant > i) {
                        if (deliveryProposal.current_price + cart.average_price <= shipper.price_max) {
                            console.log("la cart d'id " + cart.id + " a été attribuée à la delivery proposal " + deliveryProposal)
                            
                            deliveryProposal.carts.push(cart)
                            deliveryProposal.current_price += cart.average_price
                            cart.status = 1
                        }
                    }
                }
                /* On supprime le livreur de la liste des livreurs disponibles 
                WARNING : actuellement la suppression est fait dans tous les cas, donc même si le shipper n'a pas reçu de commande
                On pourrait mettre un if deliveryProposal.curent_price > 1 pour checker, mais le shipper resterait toujours dispo */
                //shippersDispoJour.splice(shippersDispoJour.indexOf(shipper), 1)

                console.log("deliveryProposal", deliveryProposal)
                if (deliveryProposal.carts.length > 0) {
                    deliveryProposals.push(deliveryProposal);
                }
            }
        }
        console.log("deliveryProposals", deliveryProposals)
    }

    static async chooseSupermarket(deliveryProposal : DeliveryProposal) { // A CORRIGER// A REMPLACER PAR LEUR ID
        /* Choix du supermarché : Cora Massy ou Auchan Villebon : uniquement voiture
        Leclerc Massy ou Intermarché Moulon : aussi vélo 
        Leclerc : uniquement drive
        */
        let possibleSupermarkets = []
        if (!deliveryProposal.shipper.has_car) {
            if (!deliveryProposal.shipper.drive) {
                possibleSupermarkets = ['Intermarché Moulon'] 
            }
            else {
                possibleSupermarkets = ['Leclerc Massy', 'Intermarché Moulon']
            }
        }
        else {
            if (!deliveryProposal.shipper.drive) {
                possibleSupermarkets = ['Cora Massy', 'Auchan Villebon', 'Intermarché Moulon']
            }
            else {
                possibleSupermarkets = ['Cora Massy', 'Auchan Villebon', 'Leclerc Massy', 'Intermarché Moulon']
            }
        }

    }

    static async createOldGroupedCommands() {   // decayed
        let unattributedCarts: Cart[] = await DB.getUnattributedCarts()
        await GroupedCommands.sortUnattributedCarts(unattributedCarts)
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
            /* let timeSlotBegin = new Date(timeSlot.substring(0, 15))
            let timeSlotEnd = new Date(timeSlot.substring(0, 11) + timeSlot.substring(16, 20)) */
            for (const shipper of timeSlotsDict[timeSlot]) {
                let commandsOfTimeSlot = []
                let commandsPrice = 0
                // On case les utilisateurs dans le créneau horaire
                for (const cart of unattributedCarts) {
                    // Si le créneau horaire est dans la plage de livraison, on le case et si le prix max n'est pas dépassé
                    if (new Date(cart.deadline) >= new Date(timeSlot) && commandsPrice + cart.average_price < shipper.price_max) {
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
                    //deliveryProposal.timeSlot = timeSlot
                    deliveryProposal.status = 0 // 0 = en attente, 1 = acceptée, 2 = refusée
                    // deliveryProposal.carts = commandsOfTimeSlot
                    await DB.addDeliveryProposal(deliveryProposal)
                    // await DB.updateTimeSlots(shipper.id, timeSlot)
                }
            }

        }

    } 
}
