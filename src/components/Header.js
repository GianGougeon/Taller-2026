"use client"
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/sass/base/header/Header.module.scss';
import { useAuth } from './context/AuthContext.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



const Header = () => {
    const { token } = useAuth();
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
                    <li><Link href="/pages/locales">Locales</Link></li>
                    {token ?
                        <Link className={styles.avatar} href="/pages/perfil">
                            <div className="h-12 w-12">
                                <FontAwesomeIcon icon={faUser} width={45} height={45} />
                            </div>
                        </Link>

                        :
                        <li>
                            <Link href="/pages/login" className={styles.btnCtaC}>Iniciar Sesion</Link>
                        </li>
                    }
                </ul>
            </nav>
        </>
    );
}
export default Header;