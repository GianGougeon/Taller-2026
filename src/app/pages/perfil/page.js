"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../../components/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/Loader'
import styles from "./../../../styles/sass/components/Perfil.module.scss"
import Image from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas, faUserTag, faStore, faUtensils, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Perfil = () => {
  const { token, isLoading, logout } = useAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!token) {
      router.push('/pages/login');
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token, isLoading, router]);

  if (isLoading || (!token && !user)) {
    return <Loader />;
  }

  const CerrarSesion = () => {
    logout();
    router.push('/');
  }

  return (
    <div className={`font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover min-h-screen ${styles.perfil}`}>
      <div className="max-w-4xl flex flex-wrap mx-auto py-32 lg:py-0">

        <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
          <div className="p-4 md:p-12 text-center lg:text-left">
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user?.name || 'Usuario'}</h1>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <FontAwesomeIcon icon={faUserTag} className="h-4 pr-4 text-orange-500" />
              @{user?.username}
            </p>

            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <FontAwesomeIcon icon={faGlobeAmericas} className="h-4 text-orange-500 pr-4" />
              Miembro de Rutas del Sabor
            </p>

            <p className="pt-8 text-sm">
              Bienvenido a tu perfil personal. Aquí podrás gestionar tus reseñas y subir tu propio menú/local.
            </p>

            <div className={`}grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 pb-8 ${styles.buttons}`}>
              <div>
                <Link href="/pages/altalocal"><button className={`flex items-center justify-center py-3 px-6 border rounded-full transition duration-300 ${styles.button}`}>
                  <FontAwesomeIcon icon={faStore} className="mr-2" />
                  Nuevo Local
                </button>
                </Link>

                <Link href="/pages/altaplato"><button className={`flex items-center justify-center py-3 px-6 border rounded-full transition duration-300 ${styles.button}`}>
                  <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                  Nuevo Plato
                </button>
                </Link>
              </div>



              <button onClick={CerrarSesion} className={`flex items-center justify-center py-3 px-6 border rounded-full transition duration-300 ${styles.button2}`}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Cerrar Sesion
              </button>

            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <Image src="https://lh3.googleusercontent.com/pw/AP1GczMN5-dgUL0928zkdhbhflVY2apzskc879Vf_tBK5wO_zAR6sJMmGG4quhCkVSlCHzFoJyzw-a7-x0uITHV1_U_d3ZgpORWeLflWSHy0eW3QNYKMpXAX3JDIMTIVIRIEs9EpB8GucoZyLVjBGjX5K5-Cng=w1367-h911-s-no-gm?authuser=1_" width={1367} height={911} loading="eager" alt="Mapa Gourmet" />
        </div>

      </div>
    </div>
  )
}

export default Perfil