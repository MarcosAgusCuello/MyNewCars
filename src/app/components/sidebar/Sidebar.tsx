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
    const [closingBrand, setClosingBrand] = useState<string | null>(null);
    const [closingModel, setClosingModel] = useState<string | null>(null);
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
        if (selectedBrand === brand) {
            // Close animation
            setClosingBrand(brand);
            setTimeout(() => {
                setSelectedBrand(null);
                setClosingBrand(null);
                setSelectedModel(null);
            }, 280); // Slightly less than animation duration to prevent flicker
        } else {
            setSelectedBrand(brand);
            setSelectedModel(null);
        }
    }

    const handleModelClick = (model: string) => {
        if (selectedModel === model) {
            // Close animation
            setClosingModel(model);
            setTimeout(() => {
                setSelectedModel(null);
                setClosingModel(null);
            }, 280); // Slightly less than animation duration to prevent flicker
        } else {
            setSelectedModel(model);
        }
    }

    if (error) {
        return (
            <div className='p-4 bg-red-100 text-red-700 rounded-lg'>
                <h1 className='text-xl font-bold mb-2'>Error</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (!vehicleData) {
        return (
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Skeleton loader for sidebar */}
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-6"></div>

                {/* Brand items skeleton */}
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center py-3 border-b border-gray-100">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse mr-3"></div>
                        <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebartitle}>Vehicle Brands</h2>
            <table className={styles.sidebartable}>
                <tbody>
                    {vehicleData.map((brandData, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td style={{ width: '30px' }}>{index + 1}</td>
                                <td>
                                    <button
                                        className={styles.brandButton}
                                        onClick={() => handleBrandClick(brandData.brand)}
                                    >
                                        {brandData.brand.toUpperCase()}
                                    </button>
                                </td>
                            </tr>
                            {(selectedBrand === brandData.brand || closingBrand === brandData.brand) && (
                                <tr>
                                    <td colSpan={2}>
                                        <ul className={closingBrand === brandData.brand ? styles.modelListClosing : styles.modelList} key={brandData.brand}>
                                            {brandData.models.map((model) => (
                                                <li key={model.id}>
                                                    <button
                                                        className={styles.modelButton}
                                                        onClick={() => handleModelClick(model.name)}
                                                    >
                                                        {model.name.toUpperCase()}
                                                    </button>
                                                    {(selectedModel === model.name || closingModel === model.name) && (
                                                        <ul className={closingModel === model.name ? styles.optionListClosing : styles.optionList} key={model.name}>
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