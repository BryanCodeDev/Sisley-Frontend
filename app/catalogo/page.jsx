import { Suspense } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CatalogoContent from './CatalogoContent';

export default function Catalogo({ searchParams }) {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen bg-sisley-white flex items-center justify-center"><p className="text-sm text-sisley-gray-500">Cargando catálogo...</p></div>}>
        <CatalogoContent searchParams={searchParams} />
      </Suspense>
      <Footer />
    </>
  );
}
