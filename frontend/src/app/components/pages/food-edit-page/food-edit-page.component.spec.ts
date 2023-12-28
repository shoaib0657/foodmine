import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEditPageComponent } from './food-edit-page.component';

describe('FoodEditPageComponent', () => {
  let component: FoodEditPageComponent;
  let fixture: ComponentFixture<FoodEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
