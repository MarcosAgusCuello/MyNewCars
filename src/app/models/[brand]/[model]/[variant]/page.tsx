'use client'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const ModelPage = () => {
  const { brand, model, variant }: { brand: string; model: string; variant: string } = useParams();

  const [variantData, setVariantData] = useState<{
    type: string,
    sheet: string,
    name: string
    id: number,
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariantData = async () => {
      try {
        // Cargar el archivo cars.json desde la carpeta public
        const response = await fetch('/cars.json');
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
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!variantData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{brand.toUpperCase()} - {model.toUpperCase()}</h1>
      <p>ID: {variantData.id}</p>
      <p>NAME: {variantData.name}</p>
      <p>TYPE: {variantData.type}</p>
      <p>SHEET: {variantData.sheet}</p>
    </div>
  );
};

export default ModelPage;