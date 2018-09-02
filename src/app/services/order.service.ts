import { CartService } from './cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private db: AngularFireDatabase, private shoppingcart: CartService) { }

  storeOrder( order) {
    const order$ = this.db.list('/orders').push(order);
    order$.then(res => {
      if (res.key) {
        this.shoppingcart.clearCart();
      }
     });
    return order$;
  }
  getOrders() {
    return this.db.object('/orders').valueChanges();
  }
  getOrder(id) {
    return this.db.object('/orders/' + id).valueChanges();
  }
  getOrdersByUser(userid) {
    console.log(userid);
   return this.db.list('/orders/', ref => ref.orderByChild('userId').equalTo(userid) ).valueChanges();
   // return this.db.list('/orders' ).valueChanges();
  }
}
