/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from 'react'
import { getLocal } from '../../../../api/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../../styles/sass/components/Detalle.module.scss';
import { postReview } from '../../../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faCity,
  faAddressCard,
  faClock,
  faUtensils,
  faTag,
  faCamera,
  faComment,
  faCalendarAlt,
  faStore,
  faWallet,
  faStar,
  faLeaf,
  faCoffee,
  faArrowLeft,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import RatingModal from '@/components/RatingModal';
import { Loader } from '@/components/Loader';
import { useAuth } from './../../../../components/context/AuthContext';

const DetalleLocal = () => {
  const params = useParams();
  const [local, setLocal] = useState(null);
  const [isPosted, setIsPosted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        setLoading(true);
        const data = await getLocal(params.id);
        setLocal(data.item);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocal();
  }, [isPosted, params.id]);

  const averageRating = local?.reviews?.length > 0
    ? (local.reviews.reduce((a, r) => a + r.rating, 0) / local.reviews.length).toFixed(1)
    : null;

  const features = [
    { name: 'Ciudad', description: local?.city || 'No especificada', icon: faCity, color: 'text-blue-500' },
    { name: 'Zona', description: local?.zone || 'No especificada', icon: faMapMarkerAlt, color: 'text-emerald-500' },
    { name: 'Dirección', description: local?.address || 'No especificada', icon: faAddressCard, color: 'text-purple-500' },
    { name: 'Horario', description: local?.hours || 'No especificado', icon: faClock, color: 'text-orange-500' },
  ];

  if (loading) return <Loader />;

  if (!local) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No se encontró el local.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 ${styles.detalle}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <Link
              href="/pages/locales"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-3"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
              Volver a locales
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {local.name || 'Nombre no disponible'}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon
                  icon={
                    local.type === 'RESTAURANTE' ? faUtensils :
                      local.type === 'CAFETERIA' ? faCoffee :
                        local.type === 'BAR' ? faTag :
                          local.type === 'FOOD_TRUCK' ? faStore : faStore
                  }
                  className="w-4 h-4"
                />
                {local.type || 'Tipo no especificado'}
              </span>
              {local.priceRange && (
                <>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles.priceRange} ${local.priceRange === 'ECONOMICO' ? 'text-green-700 bg-green-100' :
                    local.priceRange === 'MEDIO' ? 'text-yellow-700 bg-yellow-100' :
                      local.priceRange === 'ALTO' ? 'text-red-700 bg-red-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                    <FontAwesomeIcon icon={faWallet} className="w-3 h-3 mr-1" />
                    {local.priceRange}
                  </span>
                </>
              )}
              {averageRating && (
                <>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{averageRating}</span>
                    <span className="text-gray-400 text-sm">({local.reviews.length})</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-2xl overflow-hidden border border-gray-100 mb-10">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className={`px-6 sm:px-10 lg:px-12 py-10 lg:py-16 order-2 lg:order-1 flex flex-col justify-evenly ${styles.info}`}>
              {local.description && (
                <div className="mb-8">
                  <h3 className="text-lg tracking-wider mb-3">Descripción</h3>
                  <p className={`text-gray-600 leading-relaxed bg-gray-50 p-4 ${styles.description}`}>{local.description}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {features.map((f) => (
                  <div key={f.name} className={styles.feature}>
                    <div className="flex items-center gap-3 mb-2">
                      <FontAwesomeIcon icon={f.icon} className={`w-5 h-5 ${f.color}`} />
                      <span className="text-sm font-medium text-gray-500">{f.name}</span>
                    </div>
                    <p className="text-gray-900 font-medium pl-8">{f.description}</p>
                  </div>
                ))}
              </div>

              <div className={`bg-gray-50 p-6 mb-6 ${styles.infoAdditional}`}>
                <h3 className="tracking-wider mb-4">
                  Información adicional
                </h3>
                <div className="space-y-3">
                  {local.createdAt && (
                    <div className="flex items-center gap-3 text-sm">
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">
                        Creado el{' '}
                        {new Date(local.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric', month: 'long', day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-sm">
                    <FontAwesomeIcon icon={faUtensils} className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{local.dishes?.length || 0} platos disponibles</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FontAwesomeIcon icon={faComment} className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{local.reviews?.length || 0} reseñas</span>
                  </div>
                </div>
              </div>

              {local.creator?.name && (
                <div className={`bg-gradient-to-r from-orange-50 to-amber-50 p-4 ${styles.creator}`}>
                  <Link href={`/pages/detallePerfil/${local.creator.id}`} className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md font-bold text-lg"
                        style={{ background: '#ff5e00' }}
                      >
                        {local.creator.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Creado por</span>
                        <span className="text-lg font-semibold text-gray-900">{local.creator.name}</span>
                        <span className="text-sm text-gray-500 block">@{local.creator.username}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="relative h-96 lg:h-auto order-1 lg:order-2 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
              <img
                alt={`Imagen de ${local.name || 'local'}`}
                src={local.photos?.[0] || "https://lh3.googleusercontent.com/pw/AP1GczNjo5WEDjQvtpDJ86Dx2c_iJxbZKkK9u15TNov3Vs-LxNta9C1Uj_o8Mp9GynnoKrBiEL-VHjzh12aw1PZnapGdo3rdzXmAf6PD7hCebk99yOrA3h8JpEMO8OlA_AwGrZHJAImYWhQD53nNdKWzZZMIRw=w1264-h842-s-no-gm?authuser=1"}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                onError={(e) => (e.target.src = "https://lh3.googleusercontent.com/pw/AP1GczNjo5WEDjQvtpDJ86Dx2c_iJxbZKkK9u15TNov3Vs-LxNta9C1Uj_o8Mp9GynnoKrBiEL-VHjzh12aw1PZnapGdo3rdzXmAf6PD7hCebk99yOrA3h8JpEMO8OlA_AwGrZHJAImYWhQD53nNdKWzZZMIRw=w1264-h842-s-no-gm?authuser=1")}
              />
            </div>
          </div>
        </div>

        <div className={`bg-white shadow-2xl overflow-hidden border border-gray-100 mb-10 ${styles.platos}`}>
          <div className="px-6 sm:px-10 lg:px-12 py-8 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-35 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Platos</h2>
                <p className="text-sm text-gray-500">
                  {local.dishes?.length || 0} platos en este local
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 lg:px-12 py-8">
            {local.dishes?.length > 0 ? (
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${styles.gridPlatos}`}>
                {local.dishes.map((dish) => (
                  <Link
                    key={dish.id}
                    href={`/pages/detallePlato/${dish.id}`}
                    className="group block"
                  >
                    <div className="bg-white border-gray-100 p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-3">
                          <h4 className="text-base font-semibold text-gray-900 transition-colors line-clamp-1">
                            {dish.name}
                          </h4>
                          <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${dish.category === 'PRINCIPAL' ? 'bg-red-100 text-red-700' :
                            dish.category === 'ENTRADA' ? 'bg-emerald-100 text-emerald-700' :
                              dish.category === 'POSTRE' ? 'bg-pink-100 text-pink-700' :
                                dish.category === 'BEBIDA' ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                            <FontAwesomeIcon
                              icon={
                                dish.category === 'PRINCIPAL' ? faUtensils :
                                  dish.category === 'ENTRADA' ? faLeaf :
                                    dish.category === 'POSTRE' ? faStar :
                                      dish.category === 'BEBIDA' ? faCoffee : faTag
                              }
                              className="w-3 h-3 mr-1"
                            />
                            {dish.category}
                          </span>
                        </div>
                        {dish.price ? (
                          <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                            ${dish.price}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 italic whitespace-nowrap">Sin precio</span>
                        )}
                      </div>

                      {dish.description && (
                        <p className="text-sm line-clamp-2 mb-3">{dish.description}</p>
                      )}

                      <div className="flex items-center gap-3 text-xs text-gray-400 pt-3 border-t border-gray-50">
                        {dish.city && (
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCity} className="w-3 h-3" />
                            {dish.city}
                          </span>
                        )}
                        {dish.zone && (
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
                            {dish.zone}
                          </span>
                        )}
                        <span className="ml-auto font-medium text-orange-500 group-hover:underline">
                          Ver detalle →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={`text-center py-16 ${styles.sinPlatos}`}>
                <h3 className="font-semibold text-gray-700 mb-1">Sin platos todavía</h3>
                <p className="text-sm text-gray-400">Este local aún no tiene platos publicados.</p>
              </div>
            )}
          </div>
        </div>
        <div className={`bg-white shadow-2xl overflow-hidden border border-gray-100 ${styles.opinion}`}>

          <div className="px-6 sm:px-10 lg:px-12 py-8 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-35 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Reseñas</h2>
                <p className="text-sm text-gray-500">Opiniones de la comunidad</p>
              </div>
            </div>
            {token && (
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
              >
                <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                Puntuar
              </button>
            )}

          </div>

          <div className={`${styles.gridReviews}`}>
            <div className="px-6 sm:px-10 lg:px-12 py-10">
              {local.reviews?.length > 0 ? (
                <div className={`space-y-5 ${styles.reviews}`}>
                  {local.reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className={index !== local.reviews.length - 1 ? 'pb-5 border-b border-gray-100' : ''}
                    >
                      <div className={`flex items-start gap-4 ${styles.reviewProfile}`}>
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm"
                          style={{ background: '#1d3547' }}
                        >
                          {review.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div>
                              <span className="font-semibold text-gray-900">{review.user?.name}</span>
                              <span className="text-xs text-gray-400 ml-2">@{review.user?.username}</span>
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 px-4 py-3">
                              {review.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-16 ${styles.sinReviews}`}>
                  <h3 className="font-semibold text-gray-700 mb-1">Sin reseñas todavía</h3>
                  <p className="text-sm text-gray-400">¡Sé el primero en opinar!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${styles.modal}`}
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-white  shadow-2xl w-full max-w-md relative duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5 cursor-pointer" />
            </button>

            <div className="p-6">
              <RatingModal
                name={local.name}
                subtitle="¿Cómo fue tu experiencia?"
                onSubmit={(rating, comment) => postReview(local.id, rating, comment)}
                setIsPosted={(val) => {
                  setIsPosted(val);
                  setModalOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleLocal;