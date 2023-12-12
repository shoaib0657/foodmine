import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPageComponent } from './payment-page.component';

describe('PaymentPageComponent', () => {
  let component: PaymentPageComponent;
  let fixture: ComponentFixture<PaymentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPageComponent]
    });
    fixture = TestBed.createComponent(PaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
