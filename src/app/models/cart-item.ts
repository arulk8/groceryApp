import { Product } from './product';
export class CartItem {
    product: {
        title: string;
        price: number;
        category: string;
        imageUrl: string;
    };
    quantity: number;
}
