'use client'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ModelPage = () => {
  const { brand, model, variant }: { brand: string; model: string; variant: string } = useParams();

  const [error, setError] = useState<string | null>(null);

  const [variantData, setVariantData] = useState<Record<string, string | number> | null>(null);

  useEffect(() => {
    const fetchVariantData = async () => {
      try {
        const response = await fetch('https://apicars-ls8k.onrender.com/api/brands');
        if (!response.ok) {
          throw new Error('Failed to load cars.json');
        }
        const cars = await response.json();

        // Buscar la marca
        const brandData = cars.find(
          (car: { brand: string }) => car.brand.toLowerCase() === brand.toLowerCase()
        );

        if (!brandData) {
          throw new Error('Brand not found');
        }

        // Buscar el modelo dentro de la marca
        const modelData = brandData.models.find(
          (car: { name: string }) => car.name.toLowerCase() === model.toLowerCase()
        );

        if (!modelData) {
          throw new Error('Model not found');
        }

        // Decodificar y normalizar el valor de `variant` desde la URL
        const normalizedVariant = decodeURIComponent(variant).replace(/-/g, ' ').toLowerCase();

        //Buscar la variante
        const variantData = modelData.variants.find(
          (v: { name: string }) => v.name.toLowerCase() === normalizedVariant
        );

        if (!variantData) {
          throw new Error('Variant not found')
        }

        setVariantData(variantData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (brand && model && variant) {
      fetchVariantData();
    }
  }, [brand, model, variant]);

  if (error) {
    return (
      <div className='p-4 bg-red-100 text-red-700 rounded'>
        <h1 className='text-xl font-bold'>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!variantData) {
    return (
      <div className="bg-[#f5f5f5] min-h-screen py-8">
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
          {/* Header skeleton */}
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>

          {/* Table skeleton */}
          <div className="overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200">
              {/* Table header skeleton */}
              <div className="bg-gray-50 px-6 py-3 flex">
                <div className="w-1/3 h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-2/3 h-5 bg-gray-200 rounded animate-pulse ml-6"></div>
              </div>

              {/* Table rows skeleton */}
              {[...Array(6)].map((_, index) => (
                <div key={index} className={`flex px-6 py-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="w-1/3 h-5 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-2/3 h-5 bg-gray-200 rounded animate-pulse ml-6"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          {brand.toUpperCase()} - {model.toUpperCase()}
          <span className="ml-2 text-lg text-gray-500">{variant.replace(/-/g, ' ').toUpperCase()}</span>
        </h1>

        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">
                  Specification
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/5">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(variantData).filter(([key]) => key !== 'id' && key !== 'name').map(([key, value], index) => (
                <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim().toUpperCase()}
                  </td>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                    {typeof value === 'string' || typeof value === 'number'
                      ? String(value)
                      : JSON.stringify(value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;