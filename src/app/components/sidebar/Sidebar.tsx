'use client'
import React, { useState } from 'react'
import styles from './Sidebar.module.css';
import Link from 'next/link';

const Sidebar = () => {
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
    }

    const handleModelClick = (model: string) => {
        setSelectedModel(model === selectedModel ? null : model);
    }

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.sidebartitle}>Vehicle Brands</h2>
            <table className={styles.sidebartable}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(vehicleData).map((brand, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>
                                    <button
                                        className={styles.brandButton}
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
                                                    <button
                                                        className={styles.modelButton}
                                                        onClick={() => handleModelClick(model.name)}
                                                    >
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