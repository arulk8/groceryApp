import { ShoppingCart } from './../models/shopping-cart';
import { CartItem } from './../models/cart-item';
import { Product } from './../models/product';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) { }
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime(),
    });
  }

  public async getCartProducts() { // : Promise<Observable<ShoppingCart>>
    const cartId = await this.createOreditId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(
      map( res => {
        let cart: any;
        cart = res;
        // console.log(cart.dateCreated, cart.items);
        return new ShoppingCart(cart.dateCreated, cart.items);
      })
    );
  }

  private async createOreditId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
      const res = await this.create();
      localStorage.setItem('cartId', res.key); // when this called i create a cartid
      return res.key;                         // and get product from database
  }

  public async addToCart(product: Product) {
    const cartId = await this.createOreditId();
    const items$: AngularFireObject<CartItem> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    items$.valueChanges().pipe(take(1)).subscribe(item => {
      if (item) {
          items$.update({
            quantity: item.quantity + 1,
          });
      } else {
        items$.set({
          product: product.value,
          quantity: 1
        });
      }
    });
  }

  public async removeFromCart(product: Product) {
    const cartId = await this.createOreditId();
    const items$: AngularFireObject<CartItem> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    items$.valueChanges().pipe(take(1)).subscribe(item => {
      if (item) {
          items$.update({
            quantity: item.quantity - 1,
          });
      } else {
        items$.set({
          product: product.value,
          quantity: 1
        });
      }
    });
  }
}
