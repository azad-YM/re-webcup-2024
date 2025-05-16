import { usePage } from '@inertiajs/react';
import ProductReviews from '@/components/product-reviews';
import RootLayout from '@/layouts/app/app';
import { products } from '@/lib/data';
import ProductDetailSection from '@/sections/product-detail/product-detail.section';
import { type SharedData } from '@/types';
import RelatedProductsSection from '@/sections/related-products/related-products.section';

export default function Show({productId}: {productId: number}) {
  const { auth } = usePage<SharedData>().props;
  const product = products.find((p) => p.id === productId.toString())

  if (!product) {
    return <div>
      Not found
    </div>
  }

  return (
    <RootLayout>
      <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-16">
        <div className="container mx-auto px-4">
          <ProductDetailSection product={product} />
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
              <span className="relative">
                Objets similaires
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-400 rounded-full"></span>
              </span>
            </h2>
            <RelatedProductsSection productId={product.id} />
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-bold text-purple-900 mb-6 flex items-center">
              <span className="relative">
                Avis des clients
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-400 rounded-full"></span>
              </span>
            </h2>
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </main>
    </RootLayout>
  )
}
