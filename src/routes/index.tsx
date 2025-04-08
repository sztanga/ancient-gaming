/**
 * index.tsx
 * Main product listing page with a link to the wishlist.
 * Also shows the total number of wishlisted items in the corner.
 */

import {
    component$,
    useSignal,
    $,
    Resource,
    useContext
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { useProductsResource } from '~/hooks/useProductsResource';
import { ProductCard } from '~/components/ProductCard';
import { WishlistContext } from '~/contexts/wishlist-context';
import { toggleWishlistItem } from '~/stores/wishlist';
import type { Product } from '~/types';
import type { FilterState } from '~/components/Filters';

export default component$(() => {
    // Global wishlist signal
    const wishlist = useContext(WishlistContext);

    // Local filter state
    const filterState = useSignal<FilterState>({
        category: '',
        priceMin: '',
        priceMax: '',
        sortBy: '',
    });

    // QRL to toggle items in wishlist
    const onToggleWishlist$ = $((productId: string) => {
        toggleWishlistItem(wishlist, productId);
    });

    // Resource that fetches all products from the API
    const productsResource = useProductsResource();

    return (
        <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-bold">Product Listing</h1>
                <Link
                    href="/wishlist"
                    class="inline-block bg-red-500 text-white rounded-full px-3 py-1 text-sm"
                >
                    {/* Show how many items are in the wishlist */}
                    Wishlist: {wishlist.value.length}
                </Link>
            </div>

            <Resource
                value={productsResource}
                onPending={() => <div>Loading products...</div>}
                onRejected={(error: Error) => (
                    <div class="text-red-500">Error: {error.message}</div>
                )}
                onResolved={(products: Product[]) => {
                    // Filter logic
                    let filtered = products.filter((p) => {
                        // Category
                        if (
                            filterState.value.category &&
                            p.category.name.toLowerCase() !== filterState.value.category.toLowerCase()
                        ) {
                            return false;
                        }
                        // Min price
                        if (
                            filterState.value.priceMin !== '' &&
                            p.price < Number(filterState.value.priceMin)
                        ) {
                            return false;
                        }
                        // Max price
                        if (
                            filterState.value.priceMax !== '' &&
                            p.price > Number(filterState.value.priceMax)
                        ) {
                            return false;
                        }
                        return true;
                    });

                    // Sorting
                    if (filterState.value.sortBy === 'price') {
                        filtered = filtered.sort((a, b) => a.price - b.price);
                    } else if (filterState.value.sortBy === 'name') {
                        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
                    }

                    // Show the final list of products
                    return (
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filtered.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    inWishlist={wishlist.value.includes(product.id)}
                                    onWishlistToggle$={() => onToggleWishlist$(product.id)}
                                />
                            ))}
                        </div>
                    );
                }}
            />
        </div>
    );
});