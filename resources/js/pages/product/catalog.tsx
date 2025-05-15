import CatalogLayout from '@/components/catalog/catalog-layout';
import MagicBackground from '@/components/magic-background';
import ProductDetail from '@/components/product-detail';
import ProductReviews from '@/components/product-reviews';
import RelatedProducts from '@/components/related-products';
import RootLayout from '@/layouts/app/app';
import { products } from '@/lib/data';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';

export default function Catalog() {
  const { auth } = usePage<SharedData>().props;

  return (
    <RootLayout>
      <main className="min-h-screen relative overflow-hidden pb-16">
        {/* Fond magique animé */}
        <MagicBackground />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="mb-8">
            <div className="inline-block relative">
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-3 relative z-10">
                <span className="relative">
                  Catalogue Magique
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-400 rounded-full"></span>
                </span>
              </h1>
              <Sparkles className="absolute -top-4 -right-8 h-6 w-6 text-amber-500 animate-pulse" />
            </div>
            <p className="text-lg text-purple-700 max-w-3xl mt-2">
              Explorez notre collection complète d'objets magiques et filtrez selon vos préférences
            </p>
          </header>

          <CatalogLayout />
        </div>
      </main>
    </RootLayout>
  )
}
