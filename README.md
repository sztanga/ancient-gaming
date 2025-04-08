# AncientStore  App

Hey there! Welcome to the **AncientStore** project, built with **Qwik** and **Qwik City**. This app displays a list of products (fetched via GraphQL) and lets users add or remove items from their wishlist. The wishlist is stored in localStorage, so it stays persistent between page reloads.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Core Features](#core-features)
- [How to Run](#how-to-run)

---

## Tech Stack
- **Qwik + Qwik City**
- **Tailwind CSS**
- **TypeScript**
- **graphql-request**
- **localStorage**

---

## Core Features

1. **Product Listing**
    - Fetches products from `https://api.escuelajs.co/graphql`.
    - Displays product details in a responsive grid.

2. **Wishlist**
    - Click "Add to Wishlist" to store an item in localStorage.
    - Click "Remove from Wishlist" to remove it.
    - The header shows how many items are in the wishlist.

3. **Filtering & Sorting**
    - Users can filter by category, min/max price, or sort by price or name.

4. **Global Layout**
    - A custom logo and navigation at the top, a footer at the bottom.

5. **Global Wishlist State**
    - Maintained in Qwik’s context at the global layout level.

---

## How to Run

1. **Install Dependencies**
    ```bash
    npm install
    ```
2. **Development Mode**
    ```bash
   npm start
    ```
   
3. **Preview Production Build**
    ```bash
   npm run preview
    ```

4. **Build for Production**
    ```bash
   npm run build
    ```

