import type { Signal } from '@builder.io/qwik';
import { createContextId } from '@builder.io/qwik';

export const WishlistContext = createContextId<Signal<string[]>>('wishlist-context');
