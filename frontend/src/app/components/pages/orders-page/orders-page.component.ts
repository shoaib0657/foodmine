import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent {

  orders!: Order[];
  allStatus?: string[];
  filter?: string;

  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {

    let ordersObservable: Observable<Order[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.filter) {
        this.filter = params.filter;
        ordersObservable = orderService.getAll(params.filter);
      }
      else {
        this.filter = '';
        ordersObservable = orderService.getAll('');
      }

      ordersObservable.subscribe((serverOrders) => {
        this.orders = serverOrders;
      })

    })

    orderService.getAllStatus().subscribe((serverStatus) => {
      this.allStatus = serverStatus;
    })
  }

}
