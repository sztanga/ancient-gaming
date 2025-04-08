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
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .card:hover {
      transform: scale(1.03);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  `);

    return (
        <div class="card bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg shadow-xl p-6 flex flex-col">
            <img
                src={props.product.images[0]}
                alt={props.product.title}
                class="h-48 w-full object-cover rounded-md mb-4"
            />
            <h2 class="font-extrabold text-xl text-gray-800 mb-2">{props.product.title}</h2>
            <p class="text-indigo-600 font-semibold mb-4">${props.product.price.toFixed(2)}</p>
            <button
                class="mt-auto px-6 py-2 bg-indigo-600 text-white rounded-full transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick$={props.onWishlistToggle$}
            >
                {props.inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
    );
});
