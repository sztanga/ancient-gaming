import type { Signal } from '@builder.io/qwik';

export const toggleWishlistItem = (
    wishlist: Signal<string[]>,
    id: string
): void => {
    if (wishlist.value.includes(id)) {
        wishlist.value = wishlist.value.filter((item: string) => item !== id);
    } else {
        wishlist.value = [...wishlist.value, id];
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist.value));
};
