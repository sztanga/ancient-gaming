import {
    component$,
    useSignal,
    $,
    useContext,
    Resource,
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { Product } from '~/types';
import { ProductCard } from '~/components/ProductCard';
import { toggleWishlistItem } from '~/stores/wishlist';
import { Filters, FilterState } from '~/components/Filters';
import { WishlistContext } from '~/contexts/wishlist-context';
import { useProductsResource } from '~/hooks/useProductsResource';

export default component$(() => {
    const wishlist = useContext(WishlistContext);
    const filterState = useSignal<FilterState>({
        category: '',
        priceMin: '',
        priceMax: '',
        sortBy: '',
    });

    const wrappedToggleWishlistItem = $((id: string) => {
        toggleWishlistItem(wishlist, id);
    });

    const productsResource = useProductsResource();

    return (
        <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-bold">Product Listing</h1>
                <Link
                    href="/wishlist"
                    class="inline-block bg-red-500 text-white rounded-full px-3 py-1 text-sm"
                >
                    Wishlist: {wishlist.value.length}
                </Link>
            </div>

            <Filters
                filterState={filterState.value}
                onChange$={(newFilter: FilterState) => {
                    filterState.value = newFilter;
                }}
            />

            <Resource
                value={productsResource}
                onPending={() => <div>Loading products...</div>}
                onRejected={(error: Error) => (
                    <div class="text-red-500">Error: {error.message}</div>
                )}
                onResolved={(products: Product[]) => {
                    let filteredProducts = products.filter((product: Product) => {
                        if (
                            filterState.value.category &&
                            product.category.name.toLowerCase() !== filterState.value.category.toLowerCase()
                        ) {
                            return false;
                        }
                        if (
                            filterState.value.priceMin !== '' &&
                            product.price < Number(filterState.value.priceMin)
                        ) {
                            return false;
                        }
                        if (
                            filterState.value.priceMax !== '' &&
                            product.price > Number(filterState.value.priceMax)
                        ) {
                            return false;
                        }
                        return true;
                    });

                    if (filterState.value.sortBy === 'price') {
                        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
                    } else if (filterState.value.sortBy === 'name') {
                        filteredProducts = filteredProducts.sort((a, b) =>
                            a.title.localeCompare(b.title)
                        );
                    }

                    return (
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
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
