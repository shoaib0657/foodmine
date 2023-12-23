import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-foods-admin-page',
  templateUrl: './foods-admin-page.component.html',
  styleUrl: './foods-admin-page.component.css'
})
export class FoodsAdminPageComponent {


  foods: Food[] = [];

  searchTerm = '';

  constructor(activatedRoute: ActivatedRoute, private foodService: FoodService, private toastrService: ToastrService) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
        this.foodService.getAllFoodsBySearchTerm(params.searchTerm).subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
      } else {
        this.foodService.getAll().subscribe((serverFoods) => {
          this.foods = serverFoods;
        })
      }
    })
  }


  deleteFood(food: Food) {
    const confirmed = window.confirm(`Delete Food ${food.name}?`);
    if (!confirmed) return;

    this.foodService.deleteById(food.id).subscribe({
      next: () => {
        this.toastrService.success(`${food.name} Has Been Deleted!`);
        this.foods = this.foods.filter(f => f.id !== food.id);
      },
      error: (err) => {
        console.error('Error deleting food:', err);
      }
    });
  }

}
