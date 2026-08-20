'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function Login() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
          <div className="hidden lg:flex items-center justify-center bg-sisley-bg p-12">
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Bienvenido</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight leading-tight mb-6">
                La nueva temporada te espera
              </h2>
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Accede a tu cuenta para disfrutar de una experiencia de compra personalizada.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center py-12 px-6">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <h1 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-2">Iniciar sesión</h1>
                <p className="text-sm text-sisley-muted">Accede a tu cuenta de Sisley</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <Input
                  label="Correo electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-sisley-black" />
                    <span className="text-xs text-sisley-text-secondary">Recordarme</span>
                  </label>
                  <a href="/" className="text-xs text-sisley-muted hover:text-sisley-black transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button size="lg" className="w-full">Iniciar sesión</Button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-sm text-sisley-text-secondary">
                  ¿No tienes cuenta?{' '}
                  <a href="/registro" className="text-sisley-text underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Regístrate
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}