import CartContent from '@/components/cart/cart-content';
import MagicBackground from '@/components/magic-background';
import RootLayout from '@/layouts/app/app';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';

export default function Order() {
  const { auth } = usePage<SharedData>().props;

  return (
    <RootLayout>
      <main className="min-h-screen relative overflow-hidden pb-16">
        {/* Fond magique animé */}
        <MagicBackground />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="mb-8 text-center">
            <div className="inline-block relative">
              <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-3 relative z-10">
                <span className="relative">
                  Votre Panier Magique
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-400 rounded-full"></span>
                </span>
              </h1>
              <Sparkles className="absolute -top-4 -right-8 h-6 w-6 text-amber-500 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-8 h-5 w-5 text-purple-500 animate-pulse" />
            </div>
            <p className="text-lg text-purple-700 max-w-2xl mx-auto mt-6">
              Découvrez les trésors enchantés que vous avez sélectionnés
            </p>
          </header>

          <CartContent />
        </div>
      </main>
    </RootLayout>
  )
}
