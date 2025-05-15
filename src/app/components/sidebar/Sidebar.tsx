'use client'
import React, { useState, useEffect } from 'react'
import styles from './Sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
    const [vehicleData, setVehicleData] = useState<
        { brand: string; models: { id: number; name: string; variants: { id: number; name: string }[] }[] }[] | null
    >(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVehicleData = async () => {
            try {
                const response = await fetch('https://apicars-ls8k.onrender.com/api/brands');
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicle data');
                }
                const data = await response.json();
                setVehicleData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            }
        };

        fetchVehicleData();
    }, []);

    const handleBrandClick = (brand: string) => {
        setSelectedBrand(brand === selectedBrand ? null : brand);
        setSelectedModel(null);
    }

    const handleModelClick = (model: string) => {
        setSelectedModel(model === selectedModel ? null : model);
    }

    if (error) {
        return <p className='text-red-500'>Error: {error}</p>
    }

    if (!vehicleData) {
        return <p className='text-gray-500'>Loading...</p>
    }

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebartitle}>Vehicle Brands</h2>
            <table className={styles.sidebartable}>
                <tbody>
                    {vehicleData.map((brandData, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <button
                                        className={styles.brandButton}
                                        onClick={() => handleBrandClick(brandData.brand)}
                                    >
                                        {brandData.brand.toUpperCase()}
                                    </button>
                                </td>
                            </tr>
                            {selectedBrand === brandData.brand && (
                                <tr>
                                    <td colSpan={2}>
                                        <ul className={styles.modelList}>
                                            {brandData.models.map((model) => (
                                                <li key={model.id}>
                                                    <button
                                                        className={styles.modelButton}
                                                        onClick={() => handleModelClick(model.name)}
                                                    >
                                                        {model.name.toUpperCase()}
                                                    </button>
                                                    {selectedModel === model.name && (
                                                        <ul className={styles.optionList}>
                                                            {model.variants.map((variant) => (
                                                                <li key={variant.id}>
                                                                    <Link
                                                                        href={`/models/${brandData.brand.toLowerCase().replace(/\s+/g, '-')}/${model.name.toLowerCase().replace(/\s+/g, '-')}/${variant.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    >
                                                                        <p>{variant.name.toUpperCase()}</p>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </aside>
    )
}

export default Sidebar