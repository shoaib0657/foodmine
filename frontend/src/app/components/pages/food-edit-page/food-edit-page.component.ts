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

  isEditMode: boolean = true; // Whether the page is in edit mode or not
  imageUrl!: string | null; // Url of the image of the food item
  foodId!: string; // Unique id of the food item

  // Reactive form for handling the input fields of the food item
  foodForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl('', [Validators.required]),
    tags: new FormControl(''),
    origins: new FormControl('', [Validators.required]),
    cookTime: new FormControl('', [Validators.required])
  });

  // Indicates whether the form has been submitted or not
  isSubmitted: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private uploadService: UploadService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    // Subscribe to route parameters to determine if the component is in edit mode
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

          // Populate the form with fetched food data
          this.foodForm.patchValue(foodData);
        })

      }
      else {
        // If no ID is present, set the component to add mode
        this.isEditMode = false;
      }
    })
  }

  upload(event: any) {
    this.uploadService.uploadImage(event).subscribe((data: any) => {
      this.imageUrl = data.imageUrl;
    })
  }

  // Method to handle form submission
  submit(foodData: any) {
    this.isSubmitted = true;

    // Check if the form is invalid
    if (this.foodForm.invalid) {
      this.toastrService.error('Please fill in all required fields!');
      return;
    }

    // Check if the image url is present
    if (!this.imageUrl) {
      this.toastrService.error('Please select an image!');
      return;
    }

    // Prepare the food object with image URL and ID
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
        /*{ replaceUrl: true } is an option in Angular's router navigation that, 
          when set to true, replaces the current URL in the browser's history with the new URL. 
          This can be useful when you want to navigate to a new page without leaving a history entry 
          for the previous page, making the browser's "back" button skip the intermediate state.
        */
      })
    }
  }

}
