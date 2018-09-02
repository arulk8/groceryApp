import { CartItem } from './cart-item';
import { CustomCartItem } from './custom-cart-item';
export class ShoppingCart {
    items: CartItem[];
    dateCreated: number;
    get allProductIds() {
        if (this.items) {
        return Object.keys(this.items);
        }
        return [];
    }
    get cartItems() {
        const allItems: CustomCartItem[] = [];
        for ( const productId of this.allProductIds) {
            allItems.push(
                {
                key: productId,
                value: this.items[productId]
                }
            );
        }
        return allItems;
    }
    get sum() { // to get quantity* price of particular product
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
    getQuantity(prodid) {
        if (this.items) {
            const q = this.items[prodid];
            return q ? q.quantity : 0;
        }
        return 0;
    }
    constructor(datacreated, items) {
        this.dateCreated = datacreated;
        this.items = items;
    }
}
