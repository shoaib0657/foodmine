import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {

  order: Order = new Order();

  constructor(orderSerice: OrderService, router: Router) { 
    orderSerice.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (err) => {
        console.log(err);
        router.navigateByUrl('/checkout');
      }
    })
  }

}
