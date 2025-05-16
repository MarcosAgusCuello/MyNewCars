import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footercontent}>
                <p>&copy; {new Date().getFullYear()} MyApp. all rights reserved#</p>
                <ul className={styles.footerlinks}>
                    <li><a>Privacy Policy</a></li>
                    <li><a>Terms of Service</a></li>
                    <li><Link href='/pages/contact'>contact</Link></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer