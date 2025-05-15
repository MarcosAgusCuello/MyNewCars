'use client'
<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useState, useEffect } from 'react'
>>>>>>> b5bd92d (big updates)
import styles from './Sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
<<<<<<< HEAD
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    const vehicleData: Record<string, { name: string; options: string[] }[]> = {
        Toyota: [
            { name: 'Corolla', options: ['2.0 XLI CVT', '2.0 XEI CVT', '2.0 SEG CVT', 'HEV 1.8 XEI eCVT', 'HEV 1.8 SEG eCVT'] },
            { name: 'Camry', options: ['2.5 LE', '2.5 SE', '2.5 XLE'] },
            { name: 'RAV4', options: ['LE', 'XLE', 'Limited'] },
            { name: 'Hilux', options: ['SR 2.4', 'SRX 2.8', 'GR 2.8']},
            { name: 'SW4', options: ['SR 2.4', 'SRX 2.8', 'GR']}
        ],
        Ford: [
            { name: 'F-150', options: ['XL', 'XLT', 'Lariat'] },
            { name: 'Mustang', options: ['EcoBoost', 'GT', 'Mach 1'] },
        ],
        Chevrolet: [
            { name: 'Silverado', options: ['WT', 'LT', 'High Country'] },
            { name: 'Malibu', options: ['LS', 'RS', 'Premier'] },
        ],
        Honda: [
            { name: 'Civic', options: ['LX', 'EX', 'Touring'] },
            { name: 'Accord', options: ['Sport', 'EX-L', 'Touring'] },
            { name: 'CR-V', options: ['LX', 'EX', 'Touring'] }
        ],
        Nissan: [
            { name: 'Altima', options: ['S', 'SV', 'SL'] },
            { name: 'Rogue', options: ['S', 'SV', 'Platinum'] },
            { name: 'Sentra', options: ['S', 'SV', 'SR'] }
        ],
        BMW: [
            { name: 'X5', options: ['xDrive40i', 'xDrive50e', 'M60i'] },
            { name: '3 Series', options: ['330i', '330e', 'M340i'] },
            { name: '5 Series', options: ['530i', '540i', 'M550i'] }
        ],
        Mercedes_Benz: [
            { name: 'C-Class', options: ['C300', 'C300 4MATIC', 'AMG C43'] },
            { name: 'E-Class', options: ['E350', 'E450', 'AMG E53'] },
            { name: 'GLA', options: ['GLA 250', 'GLA 250 4MATIC', 'AMG GLA 35'] }
        ],
        Volkswagen: [
            { name: 'Golf', options: ['TSI', 'GTI', 'R'] },
            { name: 'Passat', options: ['S', 'SE', 'SEL'] },
            { name: 'Tiguan', options: ['S', 'SE', 'SEL R-Line'] }
        ],
        Hyundai: [
            { name: 'Elantra', options: ['SE', 'SEL', 'Limited'] },
            { name: 'Santa Fe', options: ['SE', 'SEL', 'Calligraphy'] },
            { name: 'Tucson', options: ['SE', 'SEL', 'Limited'] }
        ],
        Kia: [
            { name: 'Soul', options: ['LX', 'S', 'EX'] },
            { name: 'Sportage', options: ['LX', 'EX', 'SX-Prestige'] },
            { name: 'Sorento', options: ['LX', 'EX', 'SX'] }
        ]
    }

    const handleBrandClick = (brand: string) => {
        setSelectedBrand(brand === selectedBrand ? null : brand);
=======
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
>>>>>>> b5bd92d (big updates)
    }

    const handleModelClick = (model: string) => {
        setSelectedModel(model === selectedModel ? null : model);
    }

<<<<<<< HEAD
=======
    if (error) {
        return <p className='text-red-500'>Error: {error}</p>
    }

    if (!vehicleData) {
        return <p className='text-gray-500'>Loading...</p>
    }

>>>>>>> b5bd92d (big updates)
    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebartitle}>Vehicle Brands</h2>
            <table className={styles.sidebartable}>
<<<<<<< HEAD
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(vehicleData).map((brand, index) => (
=======
                <tbody>
                    {vehicleData.map((brandData, index) => (
>>>>>>> b5bd92d (big updates)
                        <React.Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <button
                                        className={styles.brandButton}
<<<<<<< HEAD
                                        onClick={() => handleBrandClick(brand)}
                                    >
                                        {brand}
                                    </button>
                                </td>
                            </tr>
                            {selectedBrand === brand && (
                                <tr>
                                    <td colSpan={2}>
                                        <ul className={styles.modelList}>
                                            {vehicleData[brand].map((model, modelIndex) => (
                                                <li key={modelIndex}>
=======
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
>>>>>>> b5bd92d (big updates)
                                                    <button
                                                        className={styles.modelButton}
                                                        onClick={() => handleModelClick(model.name)}
                                                    >
<<<<<<< HEAD
                                                        {model.name}
                                                    </button>
                                                    {selectedModel === model.name && (
                                                        <ul className={styles.optionList}>
                                                            {model.options.map((option, optionIndex) => (
                                                                <li key={optionIndex}>
                                                                    <Link
                                                                        href={`/models/${brand.toLowerCase().replace(/\s+/g, '-')}/${model.name.toLowerCase().replace(/\s+/g, '-')}/${option.toLowerCase().replace(/\s+/g, '-')}`}
                                                                    >
                                                                        <p>{option}</p>
                                                                    </Link>
                                                                </li>
                                                            ))}

=======
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
>>>>>>> b5bd92d (big updates)
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