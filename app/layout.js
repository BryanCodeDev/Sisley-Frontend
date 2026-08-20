import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'Sisley Colombia',
  description: 'Plataforma tecnológica para modernizar la operación comercial y digital de Sisley Colombia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
