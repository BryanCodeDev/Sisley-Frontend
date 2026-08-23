import AuthLayout from '@/app/components/AuthLayout';
import RegistroForm from './RegistroForm';

export const metadata = {
  title: 'Crear cuenta | Sisley Colombia',
  description: 'Crea tu cuenta en Sisley Colombia y disfruta de una experiencia de compra exclusiva, con seguimiento de pedidos y acceso anticipado a novedades.',
  robots: { index: false, follow: false },
};

export default function RegistroPage() {
  return (
    <AuthLayout
      eyebrow="Únete"
      title="Crea tu cuenta"
      description="Forma parte de Sisley Colombia y disfruta de una experiencia de compra exclusiva."
    >
      <RegistroForm />
    </AuthLayout>
  );
}