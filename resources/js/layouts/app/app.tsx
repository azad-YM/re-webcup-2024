import type React from "react"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import CartProvider from "@/components/cart-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Objets Enchantés - Boutique d'objets magiques d'occasion",
//   description:
//     "Découvrez notre collection d'objets magiques d'occasion, soigneusement sélectionnés pour leur authenticité et leur pouvoir.",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body >
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}