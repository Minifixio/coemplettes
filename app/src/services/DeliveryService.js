import {APIService} from './APIService';
import {AuthService} from './AuthService';

export class DeliveryService {
  static async getDeliveries() {
    return new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.getUserId();
        console.log(
          "[DeliveryService] Récupération des deliveries de l'utilisateur",
        );
        const res = await APIService.get('deliveries', userId);
        const content = await res.text();

        let deliveries;
        if (content !== '') {
          deliveries = JSON.parse(content);
        } else {
          deliveries = [];
        }

        resolve(deliveries);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async getCurrentDelivery() {
    return new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.getUserId();
        console.log(
          "[DeliveryService] Récupération de la delivery en cours de l'utilisateur",
        );
        const res = await APIService.get('delivery_summary', userId);
        const content = await res.text();

        let currentDelivery;
        if (content !== '') {
          currentDelivery = JSON.parse(content);
        } else {
          currentDelivery = {};
        }

        resolve(currentDelivery);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async getDeliverySummary(deliveryId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `[CartService] Récupération des détails de la delivery n°${deliveryId} de l'utilisateur`,
        );
        const res = await APIService.get('delivery_summary', deliveryId);
        const deliverySummary = await res.json();
        resolve(deliverySummary);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async getDeliveryProposals() {
    return new Promise(async (resolve, reject) => {
      try {
        const userId = await AuthService.getUserId();
        console.log(
          "[DeliveryService] Récupération des delivery proposals de l'utilisateur",
        );
        const res = await APIService.get('delivery_proposals', userId);
        const content = await res.text();

        let deliveryProposals;
        if (content !== '') {
          deliveryProposals = JSON.parse(content);
        } else {
          deliveryProposals = [];
        }

        resolve(deliveryProposals);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async getDeliveryProposalsSummary(deliveryProposalId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `[DeliveryService] Récupération des détails de la delivery proposal n°${deliveryProposalId} de l'utilisateur`,
        );
        const res = await APIService.get(
          'delivery_proposal_summary',
          deliveryProposalId,
        );
        const deliveryProposalSummary = await res.json();
        resolve(deliveryProposalSummary);
      } catch (e) {
        reject(e);
      }
    });
  }

  static async acceptDeliveryProposal(deliveryProposalId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `[DeliveryService] Acceptation de la delivery proposal n°${deliveryProposalId} de l'utilisateur`,
        );
        await APIService.post('delivery_proposal_accept', {
          delivery_proposal_id: deliveryProposalId,
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  static async deliveryStartShopping(deliveryId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `[DeliveryService] Début de l'acaht de la delivery n°${deliveryId} de l'utilisateur`,
        );
        await APIService.post('delivery_start_shopping', {
          delivery_id: deliveryId,
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  static async deliveryEndShopping(deliveryId, carts) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `[DeliveryService] Fin de l'achat de la delivery n°${deliveryId} de l'utilisateur. Voici les carts :`,
          carts,
        );
        await APIService.post('delivery_end_shopping', {
          delivery_id: deliveryId,
          carts,
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  static async depositDelivery(deliveryId) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `[DeliveryService] Dépôt de la delivery n°${deliveryId} de l'utilisateur.`,
        );
        await APIService.post('delivery_deposit', {
          delivery_id: deliveryId,
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }
}
