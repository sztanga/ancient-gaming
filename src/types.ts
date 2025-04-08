export interface Category {
    name: string;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    category: Category;
    images: string[];
}