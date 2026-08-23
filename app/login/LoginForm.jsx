'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useAuth } from '@/app/contexts/AuthContext';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminLogin = useAuth().login;
  const customerLogin = useCustomerAuth().login;
  const router = useRouter();

  function toggleMode() {
    // Limpiamos el error al cambiar de modo: un mensaje de "credenciales
    // inválidas" del login de cliente no debe quedar visible al pasar a admin.
    setError(null);
    setIsAdmin((prev) => !prev);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = isAdmin
        ? await adminLogin(email, password)
        : await customerLogin(email, password);

      if (result.success) {
        router.push(isAdmin ? '/admin' : '/');
      } else {
        setError(result.message || 'No pudimos iniciar sesión. Verifica tus datos.');
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-2">
          Iniciar sesión
        </h1>
        <p className="text-sm text-sisley-muted">
          {isAdmin ? 'Acceso administrativo' : 'Accede a tu cuenta de Sisley'}
        </p>
        <button
          type="button"
          onClick={toggleMode}
          className="text-xs text-sisley-text underline underline-offset-4 mt-2 hover:opacity-70"
        >
          {isAdmin ? '¿Eres cliente? Inicia sesión aquí' : '¿Eres administrador? Acceder aquí'}
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-sisley-black" />
            <span className="text-xs text-sisley-text-secondary">Recordarme</span>
          </label>
          <Link href="/" className="text-xs text-sisley-muted hover:text-sisley-black transition-colors">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {error && (
          <p role="alert" aria-live="polite" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <Button size="lg" className="w-full" type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </Button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-sm text-sisley-text-secondary">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-sisley-text underline underline-offset-4 hover:opacity-70 transition-opacity">
            Regístrate
          </Link>
        </p>
      </div>
    </>
  );
}