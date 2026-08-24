import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import Providers from './providers'
import './globals.css'
import QuickViewModalRenderer from './components/QuickViewModalRenderer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

export const metadata = {
  title: 'Sisley Colombia — Moda Premium',
  description: 'Descubre la nueva colección de Sisley Colombia. Moda premium, elegancia contemporánea y estilo atemporal.',
  keywords: ['Sisley', 'Colombia', 'moda', 'premium', 'elegancia', 'colección'],
  icons: {
    icon: '/assets/logo.webp',
  },
  openGraph: {
    title: 'Sisley Colombia',
    description: 'Moda premium con identidad. Envío a todo Colombia.',
    type: 'website',
    locale: 'es_CO',
    images: ['/assets/logo.webp'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className={`${inter.variable} font-sans antialiased text-sisley-text bg-sisley-white`}>
        <Providers>
          {children}
          <QuickViewModalRenderer />
        </Providers>
      </body>
    </html>
  )
}
