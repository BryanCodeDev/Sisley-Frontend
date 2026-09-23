import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/seo/SEO'
import Hero from '../components/home/Hero'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustSection from '../components/home/TrustSection'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
  return (
    <>
      <SEO
        title="Sisley - Moda Premium"
        description="Moda y accesorios seleccionados para quienes buscan calidad, estilo y elegancia."
        type="website"
      />
      <div className="min-h-screen">
        <Hero />
        <FeaturedProducts />
        <TrustSection />
        <Newsletter />
      </div>
    </>
  )
}