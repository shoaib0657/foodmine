import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FoodsAdminPageComponent } from './components/pages/foods-admin-page/foods-admin-page.component';
import { adminGuard } from './auth/guards/admin.guard';
import { FoodEditPageComponent } from './components/pages/food-edit-page/food-edit-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { UserEditPageComponent } from './components/pages/user-edit-page/user-edit-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentPageComponent, canActivate: [authGuard] },
  { path: 'track/:orderId', component: OrderTrackPageComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [authGuard] },
  // { path: 'orders', redirectTo: 'orders/' },
  { path: 'orders', component: OrdersPageComponent, canActivate: [authGuard] },
  { path: 'orders/:filter', component: OrdersPageComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin/foods', component: FoodsAdminPageComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/foods/:searchTerm', component: FoodsAdminPageComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/addFood', component: FoodEditPageComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/editFood/:id', component: FoodEditPageComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/users', component: UsersPageComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/users/:searchTerm', component: UsersPageComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/editUser/:userId', component: UserEditPageComponent, canActivate: [authGuard, adminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
