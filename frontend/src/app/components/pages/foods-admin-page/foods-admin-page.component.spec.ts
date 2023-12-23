import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodsAdminPageComponent } from './foods-admin-page.component';

describe('FoodsAdminPageComponent', () => {
  let component: FoodsAdminPageComponent;
  let fixture: ComponentFixture<FoodsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodsAdminPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoodsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
