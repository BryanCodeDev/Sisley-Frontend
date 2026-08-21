'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';

export default function Registro() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { register } = useCustomerAuth();
  const router = useRouter();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      setLoading(false);
      return;
    }

    try {
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(true);
        router.push('/');
      } else {
        setError(result.message || 'Error al crear la cuenta');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sisley-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)]">
          <div className="hidden lg:flex items-center justify-center bg-sisley-bg p-12">
            <div className="max-w-md">
              <p className="text-[11px] uppercase tracking-widest text-sisley-muted mb-4">Únete</p>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-sisley-text tracking-tight leading-tight mb-6">
                Crea tu cuenta
              </h2>
              <p className="text-sm text-sisley-text-secondary leading-relaxed">
                Forma parte de Sisley Colombia y disfruta de una experiencia de compra exclusiva.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center py-12 px-6">
            <div className="w-full max-w-md">
              <div className="mb-10">
                <h1 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-2">Crear cuenta</h1>
                <p className="text-sm text-sisley-muted">Únete a Sisley Colombia</p>
              </div>

              {error && (
                <div className="mb-6">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6">
                  <p className="text-sm text-green-600">Cuenta creada exitosamente. Redirigiendo...</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Nombre" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} required />
                  <Input label="Apellido" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} required />
                </div>
                <Input label="Correo electrónico" type="email" placeholder="tu@email.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} required />
                <Input label="Teléfono" type="tel" placeholder="+57 300 000 0000" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
                <Input label="Contraseña" type="password" placeholder="Mínimo 8 caracteres" value={formData.password} onChange={(e) => updateField('password', e.target.value)} required />
                <Input label="Confirmar contraseña" type="password" value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="accent-sisley-black mt-1" required />
                  <span className="text-xs text-sisley-text-secondary leading-relaxed">
                    Acepto los términos y condiciones y la política de privacidad de Sisley Colombia.
                  </span>
                </label>
                <Button size="lg" className="w-full" type="submit" disabled={loading || success}>
                  {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </Button>
              </form>

              <div className="mt-10 text-center">
                <p className="text-sm text-sisley-text-secondary">
                  ¿Ya tienes cuenta?{' '}
                  <a href="/login" className="text-sisley-text underline underline-offset-4 hover:opacity-70 transition-opacity">
                    Inicia sesión
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
