import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import { CartItem } from '../shared/models/CartItem';

// The `Injectable` decorator marks this class as injectable at the root level,
// meaning it can be provided as a singleton service throughout the entire application.
@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Initialize the cart with data from local storage
  private cart: Cart = this.getCartFromLocalStorage();

  // Create a BehaviorSubject to emit cart changes to subscribers
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  // Add a food item to the cart
  addToCart(food: Food): void {
    // Checks if the food item already exists in the cart
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    if(cartItem)
    {
      return; // If the item is already in the cart, do nothing
    }

    // Otherwise, add a new cart item with the specified food and update local storage
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
  }

  // Removes a food item from the cart (by its ID)
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);  
    this.setCartToLocalStorage();  
  }

  // Change the quantity of a food item in the cart
  changeQuantity(foodId: string, quantity: number) {
    // Find the cart item with the specified food ID
    let cartItem = this.cart.items.find(item => item.food.id === foodId);

    // If the item exists, update its quantity and price
    if(cartItem)
    {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
    }

    // Update the cart in local storage and notify subscribers
    this.setCartToLocalStorage();
  }

  // Clear all items from the cart
  clearCart() {
    // Create a new empty cart and update local storage
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  // Get an observable to subscribe to cart changes
  getCartObservable(): Observable<Cart> {
    // Return the cart subject as an observable
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  // Update local storage and notify subscribers with the latest cart data
  private setCartToLocalStorage(): void {
    // Update total price and total count based on the items in the cart
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    // Convert the cart object to JSON and store it in local storage
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    // Notify subscribers with the updated cart data
    this.cartSubject.next(this.cart);
  }

  // Retrieves the cart from local storage if it exists, otherwise returns a new empty cart
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
