import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { UploadService } from 'src/app/services/upload.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-food-edit-page',
  templateUrl: './food-edit-page.component.html',
  styleUrl: './food-edit-page.component.css'
})
export class FoodEditPageComponent {

  isEditMode: boolean = true;
  imageUrl!: string | null;
  foodId!: string;

  foodForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl('', [Validators.required]),
    tags: new FormControl(''),
    origins: new FormControl('', [Validators.required]),
    cookTime: new FormControl('', [Validators.required])
  });

  isSubmitted: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService, private uploadService: UploadService, private toastrService: ToastrService, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {

        this.foodId = params.id;
        this.isEditMode = true;

        this.foodService.getFoodById(params.id).subscribe(food => {
          if (!food) return;
          this.imageUrl = food.imageUrl;

          // Convert the array to a comma-separated string
          const tagsString = food.tags ? food.tags.join(',') : '';
          const originsString = food.origins ? food.origins.join(',') : '';

          const foodData = {
            name: food.name,
            price: food.price.toString(), // Convert number to string
            tags: tagsString,
            origins: originsString,
            cookTime: food.cookTime,
          };

          this.foodForm.patchValue(foodData);
        })

      }
      else {
        this.isEditMode = false;
      }
    })
  }

  upload(event: any) {
    this.uploadService.uploadImage(event).subscribe((data: any) => {
      this.imageUrl = data.imageUrl;
    })
  }

  submit(foodData: any) {

    this.isSubmitted = true;

    if (this.foodForm.invalid) {
      this.toastrService.error('Please fill in all required fields!');
      return;
    }

    if (!this.imageUrl) {
      this.toastrService.error('Please select an image!');
      return;
    }

    const food = { ...foodData, imageUrl: this.imageUrl, id: this.foodId }

    if (this.isEditMode) {
      this.foodService.update(food).subscribe(() => {
        this.toastrService.success(`Food "${food.name}" updated successfully!`);
      })
    }
    else {
      this.foodService.add(food).subscribe((food) => {
        this.toastrService.success(`Food "${food.name}" added successfully!`);
        this.router.navigateByUrl('/admin/editFood/' + food.id, { replaceUrl: true })
      })
    }
  }

}
