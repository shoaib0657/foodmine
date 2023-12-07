import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPageComponent } from './food-page.component';

describe('FoodPageComponent', () => {
  let component: FoodPageComponent;
  let fixture: ComponentFixture<FoodPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodPageComponent]
    });
    fixture = TestBed.createComponent(FoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
