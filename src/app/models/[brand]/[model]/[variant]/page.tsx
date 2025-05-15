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
        <h1 className='text-x1 font-bold'>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!variantData) {
    return <p className='text-center text-gray-500'>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{brand.toUpperCase()} - {model.toUpperCase()}</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Field</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(variantData).map(([key, value]) => (
            <tr key={key}>
              <td className="border border-gray-300 px-4 py-2">{key.toUpperCase()}</td>
              <td className="border border-gray-300 px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelPage;