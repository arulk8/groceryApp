import { CartItem } from './cart-item';
export class ShoppingCart {
    items: CartItem[];
    dateCreated: number;
    get allProductIds() { return Object.keys(this.items); }
    get cartItems() {
        const allItems: CartItem[] = [];
        for ( const productId of this.allProductIds) {
            allItems.push(this.items[productId]);
        }
        return allItems;
    }
    get sum() {
            let total = 0;
        for ( const productId of this.allProductIds) {
           total += this.items[productId].product.price * this.items[productId].quantity;
        }
        return total;
    }
    get count() {
        const productIds = this.allProductIds;
        let itemCount = 0;
        for ( const productId of productIds) {
            itemCount += this.items[productId].quantity;
        }
        return itemCount;
    }

    constructor(datacreated, items) {
        this.dateCreated = datacreated;
        this.items = items;
    }
}
