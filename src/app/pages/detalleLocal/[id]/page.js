"use client"
import { useEffect, useState } from 'react'
import { getLocal } from '../../../../api/api';
import { useParams } from 'next/navigation';
import styles from '../../../../styles/sass/components/DetalleLoca.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMapMarkerAlt,
  faCity,
  faAddressCard,
  faUser,
  faClock,
  faUtensils,
  faTag,
  faCamera,
  faComment,
  faCalendarAlt,
  faStore,
  faWallet,
} from '@fortawesome/free-solid-svg-icons'
import RatingLocal from '@/components/RatingLocal';

const DetalleLocal = () => {
  const params = useParams();
  const [local, setLocal] = useState({});
  const [activeTab, setActiveTab] = useState('info');
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    const fetchLocal = async () => {
      const data = await getLocal(params.id)
      setLocal(data.item)
    }
    fetchLocal()
  }, []);

  const getTypeColor = (type) => {
    const colors = {
      'RESTAURANTE': 'from-red-500 to-orange-500',
      'BAR': 'from-purple-500 to-pink-500',
      'CAFE': 'from-brown-500 to-amber-500',
      'FASTFOOD': 'from-yellow-500 to-orange-500'
    };
    return colors[type] || 'from-indigo-500 to-purple-500';
  };
  const getPriceColor = (price) => {
    const colors = {
      'BAJO': 'text-green-600 bg-green-100',
      'MEDIO': 'text-yellow-600 bg-yellow-100',
      'ALTO': 'text-red-600 bg-red-100'
    };
    return colors[price] || 'text-gray-600 bg-gray-100';
  };
  const features = [
    {
      name: 'Ciudad',
      description: local.city || 'No especificada',
      icon: faCity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Zona',
      description: local.zone || 'No especificada',
      icon: faMapMarkerAlt,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Dirección',
      description: local.address || 'No especificada',
      icon: faAddressCard,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Horario',
      description: local.hours || 'No especificado',
      icon: faClock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 ${styles.detalleLocal}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-1 h-8 bg-gradient-to-b ${getTypeColor(local.type)} rounded-full`}></div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {local.name || 'Nombre no disponible'}
              </h1>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faStore} className="w-4 h-4" />
                {local.type || 'Tipo no especificado'}
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriceColor(local.priceRange)}`}>
                <FontAwesomeIcon icon={faWallet} className="w-3 h-3 mr-1" />
                {local.priceRange || 'Precio no especificado'}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white  shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="px-6 sm:px-10 lg:px-12 py-10 lg:py-16 order-2 lg:order-1 flex flex-col justify-evenly">
              <div className={`flex gap-4 border-b border-gray-200 mb-8 ${styles.tabs}`}>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`pb-3 px-1 font-medium text-sm transition-all relative ${activeTab === 'info'
                    ? 'font-weight: 700 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Información
                </button>
                <button
                  onClick={() => setActiveTab('dishes')}
                  className={`pb-3 px-1 font-medium text-sm transition-all relative ${activeTab === 'dishes'
                    ? 'font-weight: 700 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Platos ({local.dishes?.length || 0})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-3 px-1 font-medium text-sm transition-all relative ${activeTab === 'reviews'
                    ? 'font-weight: 700 border-b-2 border-orange-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Reseñas ({local.reviews?.length || 0})
                </button>
              </div>
              {activeTab === 'info' && (
                <>
                  {local.description && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                      <p className="text-gray-600 leading-relaxed bg-gray-50 p-4">
                        {local.description}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {features.map((feature) => (
                      <div
                        key={feature.name}
                        className={`${styles.feature} `}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <FontAwesomeIcon icon={feature.icon} className={`w-5 h-5 ${feature.color}`} />
                          <span className="text-sm font-medium text-gray-500">{feature.name}</span>
                        </div>
                        <p className="text-gray-900 font-medium pl-8">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className={`bg-gray-50  p-6 mb-6 ${styles.infoAdditional}`}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Información adicional
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Creado el {new Date(local.createdAt).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      {local.dishes && (
                        <div className="flex items-center gap-3 text-sm">
                          <FontAwesomeIcon icon={faUtensils} className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{local.dishes.length} platos disponibles</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {local.creator?.name && (
                    <div
                      className={`"block bg-gradient-to-r from-indigo-50 to-purple-50 p-4 group ${styles.creator}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md">
                          <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm text-gray-500 block">Creado por</span>
                          <span className="text-lg font-semibold text-gray-900 transition-colors">
                            {local.creator.name}
                          </span>
                          <span className="text-sm text-gray-500 block">@{local.creator.username}</span>

                        </div>

                      </div>

                    </div>
                  )}
                </>
              )}
              {activeTab === 'dishes' && (
                <div className="space-y-4">
                  {local.dishes?.length > 0 ? (
                    local.dishes.map((dish) => (
                      <div key={dish.id} className="bg-white border border-gray-200 p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{dish.name}</h4>
                            <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                              {dish.category}
                            </span>
                          </div>
                          {dish.price && (
                            <span className="text-xl font-bold text-green-600">${dish.price}</span>
                          )}
                        </div>
                        {dish.description && (
                          <p className="text-gray-600 text-sm mt-2">{dish.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faCity} className="w-3 h-3" />
                            {dish.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
                            {dish.zone}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FontAwesomeIcon icon={faUtensils} className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500">No hay platos disponibles</p>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {local.reviews?.length > 0 ? (
                    local.reviews.map((review) => (
                      <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white">
                              {review.user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.user?.name}</h4>
                              <span className="text-xs text-gray-400">@{review.user?.username}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <FontAwesomeIcon icon={faCalendarAlt} className="w-3 h-3" />
                          {new Date(review.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <FontAwesomeIcon icon={faComment} className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500">No hay reseñas disponibles</p>
                    </div>
                  )}
                  <RatingLocal local={local} setIsPosted={setIsPosted} />
                </div>
              )}
            </div>
            <div className="relative h-96 lg:h-auto order-1 lg:order-2 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
              <img
                alt={`Imagen de ${local.name || 'local'}`}
                src={local.photos?.[0] || "https://lh3.googleusercontent.com/pw/AP1GczNjo5WEDjQvtpDJ86Dx2c_iJxbZKkK9u15TNov3Vs-LxNta9C1Uj_o8Mp9GynnoKrBiEL-VHjzh12aw1PZnapGdo3rdzXmAf6PD7hCebk99yOrA3h8JpEMO8OlA_AwGrZHJAImYWhQD53nNdKWzZZMIRw=w1264-h842-s-no-gm?authuser=1"}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                onError={(e) =>
                  (e.target.src = "https://lh3.googleusercontent.com/pw/AP1GczNjo5WEDjQvtpDJ86Dx2c_iJxbZKkK9u15TNov3Vs-LxNta9C1Uj_o8Mp9GynnoKrBiEL-VHjzh12aw1PZnapGdo3rdzXmAf6PD7hCebk99yOrA3h8JpEMO8OlA_AwGrZHJAImYWhQD53nNdKWzZZMIRw=w1264-h842-s-no-gm?authuser=1")
                }
              />
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-4 py-2 bg-gradient-to-r ${getTypeColor(local.type)} text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-2`}>
                  <FontAwesomeIcon icon={faTag} className="w-4 h-4" />
                  {local.type || 'Local'}
                </span>
              </div>
              {local.photos?.length > 1 && (
                <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <FontAwesomeIcon icon={faCamera} className="w-4 h-4" />
                  {local.photos.length} fotos
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalleLocal