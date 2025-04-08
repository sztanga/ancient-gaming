import { useResource$ } from '@builder.io/qwik';
import client from '~/graphql/client';
import { GET_PRODUCTS } from '~/graphql/queries';
import type { Product } from '~/types';

export function useProductsResource() {
    return useResource$<Product[]>(async () => {
        const data = await client.request<{ products: Product[] }>(GET_PRODUCTS);
        return data.products;
    });
}
