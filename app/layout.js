import { Inter } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import Providers from './providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-geist-serif',
  display: 'swap',
})

export const metadata = {
  title: 'Sisley Colombia — Moda Premium',
  description: 'Descubre la nueva colección de Sisley Colombia. Moda premium, elegancia contemporánea y estilo atemporal.',
  keywords: ['Sisley', 'Colombia', 'moda', 'premium', 'elegancia', 'colección'],
  icons: {
    icon: '/assets/logo.webp',
  },
  openGraph: {
    title: 'Sisley Colombia — Moda Premium',
    description: 'Descubre la nueva colección de Sisley Colombia. Moda premium, elegancia contemporánea y estilo atemporal.',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className={`${inter.variable} font-sans antialiased text-sisley-text bg-sisley-white pt-20 lg:pt-24`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
