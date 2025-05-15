import EnchantedCatalog from '@/components/enchanted-catalog';
import MagicBackground from '@/components/magic-background';
import MagicBookIntro from '@/components/magic-book-intro';
import PromotionBanner from '@/components/promotion-banner';
import RootLayout from '@/layouts/app/app';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;
  return <RootLayout>
    <main className="min-h-screen relative overflow-hidden">
      {/* Introduction avec le livre magique animé */}
      {/* <MagicBookIntro /> */}

      {/* Section du catalogue */}
      <div id="catalog-section" className="relative">
        {/* Fond magique animé */}
        <MagicBackground />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="mb-8 text-center">
            <div className="inline-block relative">
              <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-3 relative z-10">
                <span className="relative">
                  Objets Enchantés
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-400 rounded-full"></span>
                </span>
              </h1>
              <Sparkles className="absolute -top-4 -right-8 h-8 w-8 text-amber-500 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-8 h-6 w-6 text-purple-500 animate-pulse" />
            </div>
            <p className="text-lg text-purple-700 max-w-2xl mx-auto mt-6">
              Découvrez notre collection d'objets magiques d'occasion, soigneusement sélectionnés pour leur authenticité
              et leur pouvoir.
            </p>
          </header>

          {/* Bannière promotionnelle principale */}
          <PromotionBanner
            title="Offre Spéciale Weekend!"
            description="30% de réduction sur tous les objets magiques"
            endDate="2025-05-17"
          />

          <EnchantedCatalog />
        </div>
      </div>
    </main>
  </RootLayout>;
}
