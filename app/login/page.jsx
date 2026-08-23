import AuthLayout from '@/app/components/AuthLayout';
import LoginForm from './LoginForm';

// Al mover la lógica interactiva a LoginForm (client component), esta página
// vuelve a ser un Server Component y puede exportar metadata para SEO —
// algo que no es posible cuando todo el archivo lleva 'use client'.
export const metadata = {
  title: 'Iniciar sesión | Sisley Colombia',
  description: 'Accede a tu cuenta de Sisley Colombia para ver tus pedidos, favoritos y disfrutar de una experiencia de compra personalizada.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthLayout
      eyebrow="Bienvenido"
      title="La nueva temporada te espera"
      description="Accede a tu cuenta para disfrutar de una experiencia de compra personalizada."
    >
      <LoginForm />
    </AuthLayout>
  );
}