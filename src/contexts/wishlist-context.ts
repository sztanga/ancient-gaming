/**
 * wishlist-context.ts
 * Creates a Qwik context for a global wishlist signal (array of product IDs).
 */

import type { Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

// We'll store the array of product IDs in a single shared signal
export const WishlistContext = createContextId<Signal<string[]>>('wishlist-context');
