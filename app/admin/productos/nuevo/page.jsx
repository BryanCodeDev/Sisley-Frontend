'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { getCategories } from '@/app/services/categories';
import { createProduct } from '@/app/services/products';
import { useAuth } from '@/app/contexts/AuthContext';

export default function NuevoProducto() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    badge: '',
    description: '',
    ingredients: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { hasPermission } = useAuth();

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories({ status: 'active', limit: '100' });
        setCategories(data.data || []);
      } catch (err) {
        console.error('Failed to load categories:', err.message);
      }
    }
    loadCategories();
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: formData.name,
        categoryId: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        badge: formData.badge || null,
        description: formData.description,
        ingredients: formData.ingredients ? formData.ingredients.split(',').map((s) => s.trim()).filter(Boolean) : [],
        status: 'active',
      };

      const result = await createProduct(payload);
      router.push('/admin/productos');
    } catch (err) {
      setError(err.message || 'Error al crear producto');
    } finally {
      setLoading(false);
    }
  }

  if (!hasPermission('products.create')) {
    return (
      <div className="p-6 md:p-8">
        <p className="text-sm text-red-600">No tienes permisos para crear productos</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-light text-sisley-black">Nuevo producto</h1>
        <p className="text-sm text-sisley-gray-500 mt-1">Completa la información del producto</p>
      </div>

      <form className="space-y-6 max-w-3xl" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Nombre del producto"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-sisley-gray-600 mb-2">
              Categoría
            </label>
            <select
              value={formData.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-gray-300 focus:outline-none focus:border-sisley-black transition-colors"
              required
            >
              <option value="">Seleccionar</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Input
              label="Precio"
              type="number"
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              label="Precio original (opcional)"
              type="number"
              value={formData.originalPrice}
              onChange={(e) => updateField('originalPrice', e.target.value)}
            />
          </div>
          <div>
            <Input
              label="Badge"
              placeholder="Ej: Nuevo, Bestseller"
              value={formData.badge}
              onChange={(e) => updateField('badge', e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-sisley-gray-600 mb-2">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-gray-300 focus:outline-none focus:border-sisley-black transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-sisley-gray-600 mb-2">
            Ingredientes (separados por coma)
          </label>
          <input
            type="text"
            value={formData.ingredients}
            onChange={(e) => updateField('ingredients', e.target.value)}
            placeholder="Ácido hialurónico, Vitamina C, ..."
            className="w-full px-4 py-3 text-sm bg-sisley-white border border-sisley-gray-300 focus:outline-none focus:border-sisley-black transition-colors"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creando...' : 'Crear producto'}
          </Button>
          <a href="/admin/productos">
            <Button variant="secondary" type="button">Cancelar</Button>
          </a>
        </div>
      </form>
    </div>
  );
}
