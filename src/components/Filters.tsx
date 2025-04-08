/**
 * Filters.tsx
 * Renders the UI for filtering and sorting products.
 * The parent provides QRL handlers for each filter event,
 * and I attach them to <select> or <input> elements here.
 */

import { component$, type QRL } from '@builder.io/qwik';

export interface FilterState {
    category: string;
    priceMin: number | '';
    priceMax: number | '';
    sortBy: 'price' | 'name' | '';
}

export interface FiltersProps {
    // Current filter values
    filterState: FilterState;
    // Each event is a separate QRL from the parent
    onCategoryChange$: QRL<(event: Event) => void>;
    onPriceMinChange$: QRL<(event: Event) => void>;
    onPriceMaxChange$: QRL<(event: Event) => void>;
    onSortByChange$: QRL<(event: Event) => void>;
}

export default component$((props: FiltersProps) => {
    // Destructure the filter state
    const { filterState } = props;

    return (
        <div class="mb-8 p-6 bg-gradient-to-r from-indigo-200 to-purple-200 border border-indigo-300 rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Filters & Sorting</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                    <label class="block mb-1 text-gray-700">Category</label>
                    <select
                        class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={filterState.category}
                        onChange$={props.onCategoryChange$}
                    >
                        <option value="">All</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothes">Clothes</option>
                        <option value="shoes">Shoes</option>
                        <option value="furniture">Furniture</option>
                        <option value="miscellaneous">Miscellaneous</option>
                    </select>
                </div>

                {/* Min Price */}
                <div>
                    <label class="block mb-1 text-gray-700">Min Price</label>
                    <input
                        type="number"
                        class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={filterState.priceMin}
                        onChange$={props.onPriceMinChange$}
                        placeholder="0"
                    />
                </div>

                {/* Max Price */}
                <div>
                    <label class="block mb-1 text-gray-700">Max Price</label>
                    <input
                        type="number"
                        class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={filterState.priceMax}
                        onChange$={props.onPriceMaxChange$}
                        placeholder="1000"
                    />
                </div>

                {/* Sort By */}
                <div>
                    <label class="block mb-1 text-gray-700">Sort By</label>
                    <select
                        class="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        value={filterState.sortBy}
                        onChange$={props.onSortByChange$}
                    >
                        <option value="">Default</option>
                        <option value="price">Price (Low to High)</option>
                        <option value="name">Name (A to Z)</option>
                    </select>
                </div>
            </div>
        </div>
    );
});
