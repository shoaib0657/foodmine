import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {

  food!: Food;

  constructor(activatedRoute: ActivatedRoute, foodService: FoodService, private cartService: CartService, private router: Router) {
    let foodsObservable: Observable<Food>;
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      {
        foodsObservable = foodService.getFoodById(params.id);
      }

      foodsObservable.subscribe((serverFood) => {
        this.food = serverFood;
      })

    })
  }

  addToCart() {
    this.cartService.addToCart(this.food); 
    this.router.navigateByUrl('/cart-page');   
  }
}
