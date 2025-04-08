/**
 * wishlist.ts
 * A small utility function to add/remove a product ID in the global wishlist signal.
 */

import type { Signal } from '@builder.io/qwik';

export const toggleWishlistItem = (wishlist: Signal<string[]>, id: string): void => {
    // Check if the product already exists in the array
    if (wishlist.value.includes(id)) {
        // Remove it
        wishlist.value = wishlist.value.filter((item) => item !== id);
    } else {
        // Add it
        wishlist.value = [...wishlist.value, id];
    }

    // Persist changes to localStorage
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
    } catch (error) {
        console.error('Error writing wishlist to localStorage:', error);
    }
};
