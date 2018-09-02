import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { OrderService } from './../services/order.service';
import { map } from 'rxjs/operators';
import { ShoppingCart } from './../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart$: Observable<ShoppingCart>;
  sub: Subscription;
  cart: ShoppingCart;

  constructor(
    private shoppingCart: CartService) { }


  async ngOnInit() {
    this.cart$ = await this.shoppingCart.getCartProducts();
    this.sub = this.cart$.subscribe(res => {
      this.cart = res;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
}
}
