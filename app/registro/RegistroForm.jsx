'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { useCustomerAuth } from '@/app/contexts/CustomerAuthContext';

const MIN_PASSWORD_LENGTH = 8;
// Pequeña pausa antes de redirigir para que el mensaje de éxito
// alcance a leerse en vez de desaparecer instantáneamente.
const REDIRECT_DELAY_MS = 1200;

export default function RegistroForm() {
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
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
      return;
    }

    setLoading(true);
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
        setTimeout(() => router.push('/'), REDIRECT_DELAY_MS);
      } else {
        setError(result.message || 'Error al crear la cuenta');
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error inesperado. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-10">
        <h1 className="font-serif text-2xl md:text-3xl font-light text-sisley-text tracking-tight mb-2">
          Crear cuenta
        </h1>
        <p className="text-sm text-sisley-muted">Únete a Sisley Colombia</p>
      </div>

      {error && (
        <div className="mb-6">
          <p role="alert" aria-live="polite" className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="mb-6">
          <p role="status" aria-live="polite" className="text-sm text-green-600">
            Cuenta creada exitosamente. Redirigiendo...
          </p>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            autoComplete="given-name"
            required
          />
          <Input
            label="Apellido"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            autoComplete="family-name"
            required
          />
        </div>
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          autoComplete="email"
          required
        />
        <Input
          label="Teléfono"
          type="tel"
          placeholder="+57 300 000 0000"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          autoComplete="tel"
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
          required
        />
        <Input
          label="Confirmar contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          autoComplete="new-password"
          required
        />
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
          <Link href="/login" className="text-sisley-text underline underline-offset-4 hover:opacity-70 transition-opacity">
            Inicia sesión
          </Link>
        </p>
      </div>
    </>
  );
}