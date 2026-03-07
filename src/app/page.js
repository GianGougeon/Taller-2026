import React from 'react'
import styles from '../styles/sass/components/Portada.module.scss';
import Link from 'next/link';
import Image from 'next/image';
const page = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Descubre el mapa del <span>buen comer</span></h1>
        <p>Encuentra las joyas gastronómicas escondidas y crea tu propia ruta de sabores inolvidables.</p>
        <Link href="/pages/locales" className={styles.btnCta}>Empezar mi Ruta</Link>
      </div>
      <div className={styles.heroImage}>
        <Image src="https://lh3.googleusercontent.com/pw/AP1GczMN5-dgUL0928zkdhbhflVY2apzskc879Vf_tBK5wO_zAR6sJMmGG4quhCkVSlCHzFoJyzw-a7-x0uITHV1_U_d3ZgpORWeLflWSHy0eW3QNYKMpXAX3JDIMTIVIRIEs9EpB8GucoZyLVjBGjX5K5-Cng=w1367-h911-s-no-gm?authuser=1_" width={1367} height={911} loading="eager" alt="Mapa Gourmet" />
      </div>
    </div>
  )
}

export default page