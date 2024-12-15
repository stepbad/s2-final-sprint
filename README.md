# Step-by-Step Guide to Running the App

# 1. Open the FitFab Repository

Open the FitFab repository in your preferred code editor (e.g., Visual Studio Code).

Ensure the repository contains all the necessary files, including React components, styles, and server configurations.

# 2. Navigate to the Project Directory

In the integrated terminal or command prompt, navigate to the FitFab directory:

cd FitFab

# 3. Install Dependencies

Install all required npm packages listed in the package.json file:

npm install

# 4. Start the JSON Server

Since the program uses a db.json file for simulating a backend:

npx json-server --watch db.json --port 5001

Ensure the server is running on http://localhost:5001.

# 5. Start the Development Server

Launch the React development server:

npm run dev

Open your browser and go to the URL displayed in the terminal (e.g., http://localhost:5173).

# Navigating the App

# Home Page

What you see: Categories (Menswear, Womenswear, Kidswear) displayed as images with titles.

# How to navigate:

Click on a category image or title to navigate to the corresponding product listing page.

Product Listing Pages (Menswear, Womenswear, Kidswear)

What you see: A grid of products with images, names, and prices.

# Actions:

Use the filter dropdown to refine results by subcategory (e.g., Tops, Pants, Accessories).

Click View Details on a product to see its detailed description.

# Product Details Page

What you see: A detailed view of the product with an image, description, price, and available stock.

# Actions:

Add the product to your cart using the Add to Cart button.

# Shopping Cart Page

What you see: A list of all items added to the cart, showing their details (size, color, quantity).

# Actions:

Update item size, color, and quantity.

Remove items from the cart using the Remove button.

View a summary with subtotal, tax (15% HST), and total.

Click Proceed to Checkout to navigate to the checkout page.

# Checkout Page

What you see: A summary of all cart items with subtotal, tax, and total.

# Actions:

If logged in, click Submit Order to complete the purchase.

The cart is emptied after submitting an order.

# Login Page

What you see: A toggle between Login and Sign Up forms.

# Actions:

For Login: Enter your email and password to log in.

For Sign Up: Provide first name, last name, email, password, credit card details, and address with validation.

Important Features

# Login and Signup

Users must sign up with valid credentials (email, password, and address) and log in to access checkout functionality.

Cart and Checkout Integration

The cart dynamically updates with size, color, and quantity changes.

The checkout page validates if the user is logged in and empties the cart after order submission.

Validation

Signup form validates all inputs (e.g., credit card number, CVV, email format).

Quantity in the cart cannot be reduced below 1.

# CSS and Animations

Stylish and responsive layout using CSS for headers, footers, product grids, and buttons.
Animations on hover (e.g., scaling product cards).
