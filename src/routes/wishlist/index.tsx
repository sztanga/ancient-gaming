import {
    component$,
    useSignal,
    useResource$,
    useVisibleTask$,
    $,
    Resource,
} from '@builder.io/qwik';
import client from '~/graphql/client';
import { GET_PRODUCTS } from '~/graphql/queries';
import type { Product } from '~/types';
import { ProductCard } from '~/components/ProductCard';
import { toggleWishlistItem } from '~/stores/wishlist';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
    const wishlist = useSignal<string[]>([]);

    // Load persisted wishlist from localStorage when the component becomes visible.
    useVisibleTask$(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            wishlist.value = JSON.parse(storedWishlist);
        }
    });

    // Fetch products via graphql-request.
    const productsResource = useResource$<Product[]>(async (): Promise<Product[]> => {
        const data = await client.request<{ products: Product[] }>(GET_PRODUCTS);
        return data.products;
    });

    // Wrap the toggle function to make it serializable.
    const wrappedToggleWishlistItem = $((id: string): void => {
        toggleWishlistItem(wishlist, id);
    });

    return (
        <div class="container mx-auto p-6">
            {/* Page Heading */}
            <h1 class="text-3xl font-extrabold text-center text-gray-800 mb-6">
                Your Wishlist
            </h1>
            <p class="text-center text-lg text-indigo-600 mb-8">
                Items in Wishlist: {wishlist.value.length}
            </p>

            {/* Resource Handling */}
            <Resource
                value={productsResource}
                onPending={() => (
                    <div class="text-center text-gray-600">Loading products...</div>
                )}
                onRejected={(error: Error) => (
                    <div class="text-center text-red-500">Error: {error.message}</div>
                )}
                onResolved={(products: Product[]) => {
                    // Filter products that are in the wishlist.
                    const wishlistedProducts = products.filter((product: Product) =>
                        wishlist.value.includes(product.id)
                    );

                    // When no items are present, display a friendly empty state.
                    if (wishlistedProducts.length === 0) {
                        return (
                            <div class="flex items-center justify-center h-64">
                                <div class="p-8 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
                                    <h2 class="text-2xl font-bold mb-4 text-gray-700">
                                        No Wishlist Items
                                    </h2>
                                    <p class="text-gray-600">
                                        Your wishlist is currently empty.
                                        Explore our <Link href="/" class="text-indigo-600">products</Link> and
                                        add your favorites!
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    // If items are in the wishlist, render them in a responsive grid.
                    return (
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
