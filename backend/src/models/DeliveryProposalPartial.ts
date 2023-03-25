import { Cart } from "../tables/Cart"

export interface DeliveryProposalPartial {
    shipper_id: number,
    deadline: Date,
    creation_date: Date,
    status: number,
    current_price: number
    size: number
    carts: Cart[]
}