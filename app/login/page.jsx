'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function Login() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-light text-sisley-black mb-2">Iniciar sesión</h1>
            <p className="text-sm text-sisley-gray-500">Accede a tu cuenta de Sisley</p>
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
                <span className="text-xs text-sisley-gray-600">Recordarme</span>
              </label>
              <a href="/" className="text-xs text-sisley-gray-500 hover:text-sisley-black transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <Button size="lg" className="w-full">Iniciar sesión</Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-sisley-gray-500">
              ¿No tienes cuenta?{' '}
              <a href="/registro" className="text-sisley-black underline underline-offset-4 hover:opacity-70 transition-opacity">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
