import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
      <>
        <header class="bg-gray-800 text-white p-4">
          <div class="container mx-auto flex justify-between items-center">
            {/* Logo – replace with an image if desired */}
            <div class="text-2xl font-bold">
              <Link href="/">AncientStore</Link>
            </div>
            <nav class="space-x-4">
              <Link href="/" class="hover:underline">
                Products
              </Link>
              <Link href="/wishlist" class="hover:underline">
                Wishlist
              </Link>
            </nav>
          </div>
        </header>

        <main class="container mx-auto p-4">
          {/* Routed page content will render here */}
          <Slot />
        </main>

        <footer class="bg-gray-800 text-white p-4 mt-8">
          <div class="container mx-auto text-center">
            &copy; {new Date().getFullYear()} AncientStore. All rights reserved.
          </div>
        </footer>
      </>
  );
});
