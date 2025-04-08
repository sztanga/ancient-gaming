import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { Product } from '~/types';

export interface ProductCardProps {
    product: Product;
    onWishlistToggle$: () => void;
    inWishlist: boolean;
}

export const ProductCard = component$((props: ProductCardProps) => {
    useStylesScoped$(`
    .card {
      transition: transform 0.2s ease-in-out;
    }
    .card:hover {
      transform: scale(1.02);
    }
  `);

    return (
        <div class="card border rounded shadow p-4">
            <img
                src={props.product.images[0]}
                alt={props.product.title}
                class="h-40 w-full object-contain mb-2"
            />
            <h2 class="font-bold text-lg my-2">{props.product.title}</h2>
            <p class="text-green-600 font-semibold">${props.product.price}</p>
            <button
                class="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick$={props.onWishlistToggle$}
            >
                {props.inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
    );
});
