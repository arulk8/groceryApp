import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
 orderId: string;
 order: any;
  constructor(private route: ActivatedRoute, private orderservice: OrderService) {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.orderservice.getOrder(this.orderId).subscribe( res => {
      this.order = res;
      console.log(this.order);
    });
   }

  ngOnInit() {
  }

}
