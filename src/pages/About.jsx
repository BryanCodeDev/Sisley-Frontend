import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, Shield, RotateCcw, Headphones, Award, Sparkles, Store, Building2, MapPin } from 'lucide-react'
import SEO from '../components/seo/SEO'

const features = [
  { icon: Sparkles, title: 'Moda Colombiana', desc: 'Diseño 100% local con estándares internacionales de calidad' },
  { icon: Shield, title: 'Garantía Real', desc: 'Todas nuestras prendas cuentan con garantía de calidad' },
  { icon: Headphones, title: 'Asesoramiento de Estilo', desc: 'Nuestro equipo te ayuda a encontrar tu look perfecto' },
  { icon: Truck, title: 'Envío a Todo Colombia', desc: 'Llegamos a cada rincón del país con embalaje premium y seguimiento' },
  { icon: RotateCcw, title: 'Cambios Sin Complicaciones', desc: '30 días para cambios o devoluciones, sin preguntas' },
  { icon: Award, title: 'Precios Justos', desc: 'Moda contemporánea accesible sin comprometer la calidad' },
]

const stores = [
  { city: 'Bogotá', desc: 'Local principal y oficinas corporativas' },
  { city: 'Ipiales', desc: 'Presencia en el sur del país' },
  { city: 'Pasto', desc: 'Tienda en la capital nariñense' },
  { city: 'Tunja', desc: 'Local en el corazón boyacense' },
]

export default function About() {
  return (
    <>
      <SEO
        title="Nosotros | Sisley Colombia - Moda Contemporánea"
        description="Conoce Sisley Colombia: Marca colombiana de moda contemporánea. Colecciones Lifestyle para Hombre y Mujer. Trend Fashion Group. Tiendas en Bogotá, Ipiales, Pasto, Tunja."
      />

      <div className="min-h-screen bg-white pt-20">
        <section className="py-20 lg:py-28" aria-labelledby="about-hero">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 id="about-hero" className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-900 mb-6">
                MÁS QUE UNA MARCA,<br />
                <span className="bg-gradient-to-r from-charcoal-500 via-charcoal-600 to-charcoal-700 bg-clip-text text-transparent">
                  TU ESTILO DE VIDA
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-primary-900 leading-relaxed">
                Sisley Colombia nace de la pasión por la moda y el compromiso de ofrecer prendas que acompañen tu estilo de vida.
                No somos solo una tienda de ropa: somos creadores de experiencias de moda contemporánea.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-primary-50/50" aria-labelledby="values-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 id="values-title" className="section-title mx-auto mb-4">NUESTROS VALORES</h2>
              <p className="text-primary-900 max-w-2xl mx-auto">Lo que nos diferencia y nos impulsa cada día</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group p-6 lg:p-8 bg-white border border-dark-border rounded-2xl hover:border-charcoal-300 hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-xl bg-charcoal-600/10 border border-charcoal-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-charcoal-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-primary-900 mb-3">{feature.title}</h3>
                  <p className="text-primary-900 leading-relaxed">{feature.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" aria-labelledby="story-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 id="story-title" className="section-title mb-8 text-center">NUESTRA HISTORIA</h2>
              <div className="prose prose max-w-none text-primary-900 space-y-6">
                <p>
                  Sisley Colombia es una marca colombiana de ropa y moda contemporánea, gestionada por la empresa Trend Fashion Group.
                  Nos encontramos en un proceso de reinvención constante para traer las nuevas tendencias al mercado de la moda en Colombia.
                </p>
                <p>
                  Nuestra línea de productos ofrece colecciones bajo el concepto de <strong>Lifestyle (estilo de vida)</strong>, 
                  divididas en secciones para <strong>Hombres y Mujeres</strong>, diseñadas para adaptarse a diferentes tipos de 
                  ocasiones y tendencias actuales. Cada prenda está pensada para ser versátil, duradera y reflejar la personalidad 
                  de quien la lleva.
                </p>
                <p>
                  Nuestro compromiso va más allá de la venta. Ofrecemos asesoramiento de estilo real, gestión de cambios y 
                  devoluciones sin complicaciones, y una experiencia de compra que respeta tu tiempo y tu estilo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-28 bg-primary-50/50" aria-labelledby="stores-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 id="stores-title" className="section-title mx-auto mb-4">NUESTRAS TIENDAS</h2>
              <p className="text-primary-900 max-w-2xl mx-auto">Encuéntranos en 4 ciudades de Colombia</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stores.map((store, index) => (
                <motion.article
                  key={store.city}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white border border-dark-border rounded-2xl text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-charcoal-600/10 border border-charcoal-600/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-charcoal-600" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-primary-900">{store.city}</h3>
                  <p className="text-charcoal-600 text-sm mt-2">{store.desc}</p>
                </motion.article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-primary-900 mb-4">
                <strong>Oficinas principales:</strong> Calle 129 A # 54 - 75, Bogotá<br />
                <strong>Teléfono:</strong> +57 (1) 613 1808
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" aria-labelledby="cta-title">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center p-8 lg:p-12 bg-primary-50 backdrop-blur-sm border border-dark-border rounded-3xl"
            >
              <h2 id="cta-title" className="font-display font-bold text-3xl sm:text-4xl text-primary-900 mb-4">
                Descubre tu estilo con Sisley
              </h2>
              <p className="text-primary-900 mb-8">
                Explora nuestras colecciones Lifestyle y descubre por qué miles de colombianos confían en nosotros.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/tienda" className="btn-primary px-8 py-4 text-lg">
                  Ver colecciones
                </Link>
                <Link to="/contacto" className="btn-outline px-8 py-4 text-lg">
                  Encuentra tu tienda
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}