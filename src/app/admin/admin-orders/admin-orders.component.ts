import { OrderService } from './../../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { UserOrder } from '../../models/user-order';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  product: any[] = [];
  userSub: Subscription;
  constructor( private orderservice: OrderService) { }

  ngOnInit() {
    this.userSub = this.orderservice.getOrders().pipe(
      map(res => {
        console.log(res);
        return res as UserOrder[];
      })
    ).subscribe( res => {
      this.product = Object.keys(res).map( i => {
        return new UserOrder(new Date(res[i].datePlaced).toLocaleDateString(), res[i].items, res[i].shippingAddress, res[i].userId, i);
      });
      console.log(this.product);
    });
  }
 ngOnDestroy() {
   this.userSub.unsubscribe();
 }
}

