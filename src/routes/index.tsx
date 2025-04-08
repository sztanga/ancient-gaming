import {
    component$,
    useSignal,
    useResource$,
    useVisibleTask$,
    useContextProvider,
    $,
    Resource,
} from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import client from '~/graphql/client';
import { GET_PRODUCTS } from '~/graphql/queries';
import type { Product } from '~/types';
import { ProductCard } from '~/components/ProductCard';
import { WishlistContext } from '~/contexts/wishlist-context';
import { toggleWishlistItem } from '~/stores/wishlist';

export default component$(() => {
    const wishlist = useSignal<string[]>([]);
    useContextProvider(WishlistContext, wishlist);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            wishlist.value = JSON.parse(storedWishlist);
        }
    });

    const wrappedToggleWishlistItem = $((id: string): void => {
        toggleWishlistItem(wishlist, id);
    });

    const productsResource = useResource$<Product[]>(async (): Promise<Product[]> => {
        const data = await client.request<{ products: Product[] }>(GET_PRODUCTS);
        return data.products;
    });

    return (
        <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-2xl font-bold">Product Listing</h1>
                <div class="relative">
                    <Link href="/wishlist" class="inline-block bg-red-500 text-white rounded-full px-3 py-1 text-sm">
                        Wishlist: {wishlist.value.length}
                    </Link>
                </div>
            </div>

            <Resource
                value={productsResource}
                onPending={() => <div>Loading products...</div>}
                onRejected={(error: Error) => <div>Error: {error.message}</div>}
                onResolved={(products: Product[]) => (
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product: Product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onWishlistToggle$={() => wrappedToggleWishlistItem(product.id)}
                                inWishlist={wishlist.value.includes(product.id)}
                            />
                        ))}
                    </div>
                )}
            />
        </div>
    );
});
