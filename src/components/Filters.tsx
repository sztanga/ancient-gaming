import { component$, type QRL } from '@builder.io/qwik';

export interface FilterState {
    category: string;
    priceMin: number | '';
    priceMax: number | '';
    sortBy: 'price' | 'name' | '';
}

export interface FiltersProps {
    filterState: FilterState;
    onCategoryChange$: QRL<(event: Event) => void>;
    onPriceMinChange$: QRL<(event: Event) => void>;
    onPriceMaxChange$: QRL<(event: Event) => void>;
    onSortByChange$: QRL<(event: Event) => void>;
}
component$((props: FiltersProps) => {
    const { filterState } = props;

    return (
        <div class="mb-8 p-6 bg-gradient-to-r from-indigo-200 to-purple-200 border border-indigo-300 rounded-xl shadow-lg">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Filters & Sorting</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
