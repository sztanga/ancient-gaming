import {
    component$,
    useSignal,
    useResource$,
    useVisibleTask$,
    $, Resource,
} from '@builder.io/qwik';
import client from '~/graphql/client';
import { GET_PRODUCTS } from '~/graphql/queries';
import type { Product } from '~/types';
import { ProductCard } from '~/components/ProductCard';
import { toggleWishlistItem } from '~/stores/wishlist';

export default component$(() => {
    const wishlist = useSignal<string[]>([]);

    useVisibleTask$(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            wishlist.value = JSON.parse(storedWishlist);
        }
    });

    const productsResource = useResource$<Product[]>(async (): Promise<Product[]> => {
        const data = await client.request<{ products: Product[] }>(GET_PRODUCTS);
        return data.products;
    });

    const wrappedToggleWishlistItem = $((id: string): void => {
        toggleWishlistItem(wishlist, id);
    });

    return (
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-4">Your Wishlist</h1>
            <p class="mb-4">Items in wishlist: {wishlist.value.length}</p>
            <Resource
                value={productsResource}
                onPending={() => <div>Loading products...</div>}
                onRejected={(error: Error) => <div>Error: {error.message}</div>}
                onResolved={(products: Product[]) => {
                    const wishlistedProducts = products.filter((product: Product) =>
                        wishlist.value.includes(product.id)
                    );

                    if (wishlistedProducts.length === 0) {
                        return <div>No products in your wishlist yet.</div>;
                    }

                    return (
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {wishlistedProducts.map((product: Product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onWishlistToggle$={() => wrappedToggleWishlistItem(product.id)}
                                    inWishlist={wishlist.value.includes(product.id)}
                                />
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
});
