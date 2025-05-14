import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footercontent}>
                <p>&copy; {new Date().getFullYear()} MyApp. all rights reserved#</p>
                <ul className={styles.footerlinks}>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Terms of Service</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer