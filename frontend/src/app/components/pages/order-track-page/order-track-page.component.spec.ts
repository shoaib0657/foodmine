import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackPageComponent } from './order-track-page.component';

describe('OrderTrackPageComponent', () => {
  let component: OrderTrackPageComponent;
  let fixture: ComponentFixture<OrderTrackPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTrackPageComponent]
    });
    fixture = TestBed.createComponent(OrderTrackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
