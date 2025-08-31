# QuickPharma - Fast Medicine Delivery

A minimal Next.js + TypeScript + Tailwind CSS demo application for a pharmacy delivery service.

## Features

✅ **Authentication**

- Dummy sign-in/sign-out (no backend required)
- Just enter any email and password to authenticate

✅ **Product Catalog**

- 8 dummy pharmacy items with prices in USD
- Clean, responsive product grid layout

✅ **Shopping Cart**

- Add items to cart
- Update quantities
- Remove items
- Real-time cart counter in navigation

✅ **Checkout Process**

- Order summary
- Payment method selection (Credit Card / Cash on Delivery)
- One-click order placement

✅ **Order Management**

- Order confirmation with 30-minute delivery promise
- View all orders with status
- Cancel pending orders
- Order history tracking

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Navigation:** Next.js built-in routing

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Flow

1. **Sign In:** Click "Sign In" and enter any email/password
2. **Browse Products:** View available medicines on the home page
3. **Add to Cart:** Click "Add to Cart" on any product
4. **View Cart:** Click the cart icon in navigation
5. **Checkout:** Proceed to checkout and select payment method
6. **Place Order:** Submit order and see confirmation
7. **Track Orders:** View order status in the Orders section
8. **Cancel Order:** Cancel any pending order if needed

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── orders/            # Orders management page
│   ├── order-confirmation/ # Order success page
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Home page with products
├── components/            # Reusable components
│   └── Navbar.tsx         # Navigation component
├── contexts/              # React Context providers
│   └── AppContext.tsx     # Main app state management
└── data/                  # Static data
    └── products.ts        # Dummy product data
```

## Key Features for SDK Integration

This minimal codebase is designed to be easily extended with external SDKs:

- **Clean separation of concerns** with Context API for state management
- **TypeScript interfaces** for type safety
- **Minimal dependencies** for easy integration
- **Simple component structure** for straightforward modifications
- **Event-driven actions** (sign in, add to cart, place order) perfect for SDK hooks

## Notes

- No backend required - all data is managed in React state
- No real payment processing - just UI flow demonstration
- Responsive design works on mobile and desktop
- All order data resets on page refresh (no persistence)
- Ready for database integration and real API endpoints
