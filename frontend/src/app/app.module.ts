import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StarRatingComponent } from './components/partials/star-rating/star-rating.component';
import { SearchComponent } from './components/partials/search/search.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { ChangePasswordComponent } from './components/partials/change-password/change-password.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FoodsAdminPageComponent } from './components/pages/foods-admin-page/foods-admin-page.component';
import { FoodEditPageComponent } from './components/pages/food-edit-page/food-edit-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { UserEditPageComponent } from './components/pages/user-edit-page/user-edit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingComponent,
    SearchComponent,
    FoodPageComponent,
    TagsComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    ProfilePageComponent,
    ChangePasswordComponent,
    OrdersPageComponent,
    DashboardComponent,
    FoodsAdminPageComponent,
    FoodEditPageComponent,
    UsersPageComponent,
    UserEditPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
