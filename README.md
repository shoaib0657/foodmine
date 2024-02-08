# Food Ordering Website using Angular

## Overview

This project is a full-stack web application that allows users to order food online from a variety of cuisines and restaurants. The application is built using Angular for the frontend and Node.js for the backend, and uses MongoDB as the database. The application also integrates with PayPal for payment processing.

## Features

### 1. User Authentication and Registration

Users can create an account and log in securely using their email and password. The application uses JSON Web Tokens (JWT) for authentication and bcrypt for password hashing.

### 2. Food Exploration

- **List Foods:** Users can browse through a list of foods, view details, and add items to their cart.
- **Search Functionality:** The application provides a robust search feature, allowing users to find specific foods quickly.
- **Tags Bar:** Users can explore foods based on tags, enhancing the browsing experience.

### 3. Cart Management

- **Cart Page:** Users can review and manage items in their cart before proceeding to checkout.
- **Add to Cart Button:** Each food item has an "Add to Cart" button for easy inclusion in the user's shopping cart.

### 4. Checkout Process

- **Checkout Page:** Users can finalize their order, provide delivery details, and choose a payment method.
- **Map Integration:** The checkout page features an interactive map to input delivery locations accurately.

### 5. Payment Integration

Users can pay for their order using PayPal, which is integrated with the application using the PayPal SDK. Users can also choose to save their payment information for future orders, or use a different card or account.

### 6. Responsive Design

- The application is designed to be responsive, ensuring a seamless experience across various devices.

## _New Features_
### 7. Profile Page

- **Profile Customization:** Users can now personalize their profile by changing their name and address. Additionally, password update feature has been implemented for enhanced security and user control.

### 8. Dashboard
- **Order History:** Users can track and review details of their past orders, including order status, items purchased, and total cost. This feature enhances user engagement by offering a convenient way to keep track of their food orders over time.

### 9. Add/Edit/Delete Food features for Admin
- **Food Management** Admins can add new food items, edit existing details, and remove items as needed. This ensures an up-to-date and curated food selection, allowing administrators to maintain a dynamic and appealing menu for users.

### 10. Manage Users for Admin

- **User Management:** Admins now have the ability to manage users. This includes viewing a list of users, editing user details, and blocking/unblocking user accounts. This feature ensures administrators have the necessary tools to maintain an organized user base and handle user-related tasks efficiently.

### 11. Email Receipt After Payment

## Installation

To run the application locally, follow these steps:

1. **Clone the Repository:**
   ```
   git clone [repository-url]
   ```

2. **Frontend Setup:**
   - Navigate to the `frontend` folder.
   - Install dependencies: `npm install`
   - Run the application: `npm start`

3. **Backend Setup:**
   - Navigate to the `backend` folder.
   - Install dependencies: `npm install`
   - Start the server: `npm start`

4. **Connect to MongoDB:**
   - Create a MongoDB Atlas account and update the connection details in the `.env` file.

<details>
<summary><strong>Things To Learn</strong></summary>

- **Observables and RxJS:**
   - Use of Observables and the RxJS library for handling asynchronous operations and events.

- **BehaviorSubject:**
   - Use BehaviorSubject to create observable data streams that retain the latest value.

- **Interceptors:**
   - HTTP interceptors to intercept and modify HTTP requests and responses globally.

- **JWT (JSON Web Tokens):**
   - Understand the concept of JWT and how it is used for secure user authentication in web applications.

- **AuthGuard:**
   - Implement an Angular route guard to control access to certain routes based on user authentication status.

</details>
