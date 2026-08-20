'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function Registro() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-light text-sisley-black mb-2">Crear cuenta</h1>
            <p className="text-sm text-sisley-gray-500">Únete a Sisley Colombia</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nombre" required />
              <Input label="Apellido" required />
            </div>
            <Input label="Correo electrónico" type="email" placeholder="tu@email.com" required />
            <Input label="Teléfono" type="tel" placeholder="+57 300 000 0000" />
            <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" required />
            <Input label="Confirmar contraseña" type="password" required />
            <label className="flex items-start gap-2">
              <input type="checkbox" className="accent-sisley-black mt-1" required />
              <span className="text-xs text-sisley-gray-600 leading-relaxed">
                Acepto los términos y condiciones y la política de privacidad de Sisley Colombia.
              </span>
            </label>
            <Button size="lg" className="w-full">Crear cuenta</Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-sisley-gray-500">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-sisley-black underline underline-offset-4 hover:opacity-70 transition-opacity">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
