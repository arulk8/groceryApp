import { ShoppingCart } from './shopping-cart';

export class Order {
    datePlaced: number;
    items: any[];
    shippingAddress = {
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: ''
      };

    constructor(public userId: string, shipping: any, shoppingcart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        this.shippingAddress = shipping;
        this.items = shoppingcart.cartItems.map( i => {
            return {
              product: {
               title: i.value.product.title,
               imageUrl: i.value.product.imageUrl,
               price: i.value.product.price
              },
              quantity: i.value.quantity,
              totalPrice: i.value.quantity * i.value.product.price
            };
         } );
}
}
