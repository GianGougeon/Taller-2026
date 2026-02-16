// components/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/sass/base/Header.module.scss';

export default function Header() {
    return (
        <>
            <nav className={styles.nav}>
                <Link href="/" className={styles.logoContainer}>
                    <Image
                        src="https://lh3.googleusercontent.com/pw/AP1GczOpaZ2tE0tizQJhHHLmH0gGFSWR6qBBPd48rzxnrLuHVpfaTisHQeeadlPBGIgPBv2klJvPHE7qqxd4IkgLDCJhWZscrSWEOx8mq_oAMrF5cENaAZID9U0ngtgvbOrx-suz5rWSkM1xXd_qDrLwAF9whA=w1138-h1139-s-no-gm?authuser=1"
                        alt="Logo"
                        width={45}
                        height={45}
                    />
                    <span className={styles.logoTexto}>RUTAS DEL SABOR</span>
                </Link>
                <ul>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/perfil" className={styles.btnCtaC}>Perfil</Link></li>
                </ul>
            </nav>
        </>
    );
}