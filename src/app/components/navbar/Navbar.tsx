import React from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarlogo}><Link href="/">MyApp</Link></div>
      <ul className={styles.navbarlinks}>
        <Link href='/pages/about'>about</Link>
        <Link href="/pages/contact">contact</Link>
      </ul>
    </nav>
  )
}

export default Navbar