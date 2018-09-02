import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  shipping = {};
  auth: Subscription;
  userId: string;
  @Input('cart') cart: ShoppingCart;
  constructor(
    private orderservice: OrderService,
    private authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth = this.authservice.user$.subscribe( res => {
      this.userId = res.uid;
    });
  }

  async placeOrder() {

    const order = new Order(this.userId, this.shipping, this.cart);
    const res = await  this.orderservice.storeOrder(order);
    this.router.navigate(['/order-success', res.key]);

  }
  ngOnDestroy() {
    this.auth.unsubscribe();
  }
}
