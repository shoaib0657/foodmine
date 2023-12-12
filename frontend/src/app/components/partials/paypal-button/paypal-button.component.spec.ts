import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaypalButtonComponent } from './paypal-button.component';

describe('PaypalButtonComponent', () => {
  let component: PaypalButtonComponent;
  let fixture: ComponentFixture<PaypalButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaypalButtonComponent]
    });
    fixture = TestBed.createComponent(PaypalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
