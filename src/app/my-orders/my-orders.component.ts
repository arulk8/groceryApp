import { UserOrder } from './../models/user-order';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  loginUser: string;
  userSub: Subscription;
  product: any[] = [];
  constructor(private order: OrderService, private auth: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.auth.user$.pipe(
      switchMap( res => {
        this.loginUser = res.uid;
        return this.order.getOrdersByUser(this.loginUser) as Observable<UserOrder[]>;
      })).subscribe( res => {
        console.log(res);
       this.product = res.map( i => {
         return {
          datePlaced: new Date(i.datePlaced).toLocaleDateString(),
          items: i.items,
          shippingAddress: i.shippingAddress,
          userId: i.userId
        };
       }
      );
    });

  }
  ngOnDestroy() {
   this.userSub.unsubscribe();
  }
}
