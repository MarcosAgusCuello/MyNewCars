import React from 'react';
import Image from 'next/image';
import styles from './AnimatedCar.module.css';

const AnimatedCar = () => {
  return (
    <div className="relative w-full h-24 overflow-hidden">
      <div className={`absolute bottom-0 ${styles.car}`}>
        <Image
          src="/car.png"
          alt="Auto"
          width={120}
          height={60}
          className="drop-shadow-xl"
        />
      </div>
    </div>
  )
}

export default AnimatedCar