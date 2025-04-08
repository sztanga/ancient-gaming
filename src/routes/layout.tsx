import { component$, useSignal, useContextProvider, useVisibleTask$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import ImgLogo from '~/media/logo.webp?jsx';
import { WishlistContext } from '~/contexts/wishlist-context';

export default component$(() => {
    const wishlist = useSignal<string[]>([]);

    useVisibleTask$(() => {
        try {
            const stored = localStorage.getItem('wishlist');
            if (stored) {
                wishlist.value = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error reading wishlist from localStorage:', error);
            wishlist.value = [];
        }
    });

    useContextProvider(WishlistContext, wishlist);

    return (
        <div class="flex flex-col min-h-screen">
            <header class="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 shadow-lg">
                <div class="container mx-auto flex justify-between items-center">
                    <Link href="/" class="flex items-center space-x-3">
                        <ImgLogo alt="AncientStore" class="h-20 w-auto" />
                    </Link>
                    <nav class="space-x-6 text-md">
                        <Link href="/" class="hover:text-pink-400">Products</Link>
                        <Link href="/wishlist" class="hover:text-pink-400">Wishlist</Link>
                    </nav>
                </div>
            </header>

            <main class="flex-grow container mx-auto p-4">
                <Slot />
            </main>

            <footer class="bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-4 mt-8">
                <div class="container mx-auto text-center">
                    &copy; {new Date().getFullYear()} AncientStore. All rights reserved.
                </div>
            </footer>
        </div>
    );
});
