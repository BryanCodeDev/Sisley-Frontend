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
        title="TechStore - Tecnología Premium"
        description="Productos tecnológicos seleccionados para quienes buscan calidad, rendimiento y estilo."
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