import { component$, useResource$, Resource } from '@builder.io/qwik';
import client from '~/graphql/client';
import { GET_PRODUCTS } from '~/graphql/queries';
import type { Product } from '~/types';
import { ProductCard } from '~/components/ProductCard';

export default component$(() => {
    const productsResource = useResource$<Product[]>(async () => {
        const data = await client.request<{ products: Product[] }>(GET_PRODUCTS);
        return data.products;
    });

    return (
        <div class="container mx-auto p-4">
            <h1 class="text-2xl font-bold mb-4">Product Listing</h1>
            <Resource
                value={productsResource}
                onPending={() => <div>Loading products...</div>}
                onRejected={(error) => <div>Error: {error.message}</div>}
                onResolved={(products) => (
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onWishlistToggle$={() =>
                                    console.log(`Wishlist toggled for ${product.id}`)
                                }
                                inWishlist={false}
                            />
                        ))}
                    </div>
                )}
            />
        </div>
    );
});
