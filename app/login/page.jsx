'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useAuth } from '@/app/contexts/AuthContext';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminLogin = useAuth().login;
  const customerLogin = useCustomerAuth().login;
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let result;
    if (isAdmin) {
      result = await adminLogin(email, password);
    } else {
      result = await customerLogin(email, password);
    }

    if (result.success) {
      router.push(isAdmin ? '/admin' : '/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  }

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
                <p className="text-sm text-sisley-muted">
                  {isAdmin ? 'Acceso administrativo' : 'Accede a tu cuenta de Sisley'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="text-xs text-sisley-text underline underline-offset-4 mt-2 hover:opacity-70"
                >
                  {isAdmin ? '¿Eres cliente? Inicia sesión aquí' : '¿Eres administrador? Acceder aquí'}
                </button>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <Input
                  label="Correo electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <Button size="lg" className="w-full" type="submit" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Iniciar sesión'}
                </Button>
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
