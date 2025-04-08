import {
    component$,
    $,
    useContext,
    Resource,
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { useProductsResource } from '~/hooks/useProductsResource';
import type { Product } from '~/types';
import { ProductCard } from '~/components/ProductCard';
import { toggleWishlistItem } from '~/stores/wishlist';
import { WishlistContext } from '~/contexts/wishlist-context';

export default component$(() => {
    const wishlist = useContext(WishlistContext);

    const wrappedToggleWishlistItem = $((id: string) => {
        toggleWishlistItem(wishlist, id);
    });

    const productsResource = useProductsResource();

    return (
        <div class="container mx-auto p-6">
            <h1 class="text-3xl font-extrabold text-center text-gray-800 mb-6">
                Your Wishlist
            </h1>
            <p class="text-center text-lg text-indigo-600 mb-8">
                Items in Wishlist: {wishlist.value.length}
            </p>

            <Resource
                value={productsResource}
                onPending={() => <div class="text-center text-gray-600">Loading products...</div>}
                onRejected={(error: Error) => (
                    <div class="text-center text-red-500">Error: {error.message}</div>
                )}
                onResolved={(products: Product[]) => {
                    const wishlistedProducts = products.filter((product) =>
                        wishlist.value.includes(product.id)
                    );

                    if (wishlistedProducts.length === 0) {
                        return (
                            <div class="flex items-center justify-center h-64">
                                <div class="p-8 bg-white rounded-lg shadow-lg border border-gray-200 text-center">
                                    <h2 class="text-2xl font-bold mb-4 text-gray-700">
                                        No Wishlist Items
                                    </h2>
                                    <p class="text-gray-600">
                                        Your wishlist is currently empty.
                                        Explore our{' '}
                                        <Link href="/" class="text-indigo-600">
                                            products
                                        </Link>{' '}
                                        and add your favorites!
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {wishlistedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    inWishlist={wishlist.value.includes(product.id)}
                                    onWishlistToggle$={() => wrappedToggleWishlistItem(product.id)}
                                />
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
});
