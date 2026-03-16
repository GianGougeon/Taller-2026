"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getPlato } from "../../../../api/api";
import RatingModal from "./../../../../components/RatingModal";
import { postReviewPlato } from '../../../../api/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faCity,
  faUtensils,
  faTag,
  faComment,
  faCalendarAlt,
  faStore,
  faWallet,
  faStar,
  faStarHalfAlt,
  faLeaf,
  faCoffee,
  faArrowLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../styles/sass/components/Detalle.module.scss";
import { useAuth } from './../../../../components/context/AuthContext';


const DetallePlato = () => {
  const params = useParams();
  const [plato, setPlato] = useState(null);
  const [isPosted, setIsPosted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPlato = async () => {
      try {
        setLoading(true);
        const data = await getPlato(params.id);
        setPlato(data.item);
      } catch (error) {
        console.error("Error al cargar el plato:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlato();
  }, [isPosted, params.id]);

  const averageRating =
    plato?.reviews?.length > 0
      ? (
        plato.reviews.reduce((acc, r) => acc + r.rating, 0) /
        plato.reviews.length
      ).toFixed(1)
      : null;


  const renderStars = (rating, size = "w-4 h-4") => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return [1, 2, 3, 4, 5].map((i) => {
      if (i <= full)
        return <FontAwesomeIcon key={i} icon={faStar} className={`text-yellow-400 ${size}`} />;
      if (i === full + 1 && half)
        return <FontAwesomeIcon key={i} icon={faStarHalfAlt} className={`text-yellow-400 ${size}`} />;
      return <FontAwesomeIcon key={i} icon={faStar} className={`text-gray-200 ${size}`} />;
    });
  };

  const getCategoryGradient = (cat) =>
  ({
    PRINCIPAL: "from-orange-500 to-red-500",
    ENTRADA: "from-emerald-500 to-teal-500",
    POSTRE: "from-fuchsia-500 to-pink-500",
    BEBIDA: "from-sky-500 to-cyan-500",
    OTROS: "from-slate-500 to-gray-500",
  }[cat] || "from-orange-500 to-amber-500");

  const getCategoryIcon = (cat) =>
  ({
    PRINCIPAL: faUtensils,
    ENTRADA: faLeaf,
    POSTRE: faStar,
    BEBIDA: faCoffee,
  }[cat] || faTag);

  const features = [
    { name: "Ciudad", description: plato?.city || "No especificada", icon: faCity, color: "text-blue-500" },
    { name: "Zona", description: plato?.zone || "No especificada", icon: faMapMarkerAlt, color: "text-emerald-500" },
    { name: "Local", description: plato?.local?.name || "No especificado", icon: faStore, color: "text-orange-500" },
    { name: "Precio", description: plato?.price ? `$${plato.price}` : "No especificado", icon: faWallet, color: "text-purple-500" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
        <div className="animate-pulse space-y-6 w-full max-w-7xl px-4">
          <div className="h-10 bg-gray-200 rounded-lg w-1/3" />
          <div className="bg-white shadow-2xl h-[520px]" />
          <div className="bg-white shadow-xl h-64 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!plato) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No se encontró el plato.</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 ${styles.detalle}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <Link
              href="/pages/platos"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-3"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
              Volver a platos
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-1 h-8 bg-gradient-to-b ${getCategoryGradient(plato.category)} rounded-full`} />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">{plato.name}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={getCategoryIcon(plato.category)} className="w-4 h-4" />
                {plato.category}
              </span>
              {plato.price && (
                <>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="px-3 py-1 rounded-full text-sm font-medium text-green-700 bg-green-100">
                    <FontAwesomeIcon icon={faWallet} className="w-3 h-3 mr-1" />
                    ${plato.price}
                  </span>
                </>
              )}
              {averageRating && (
                <>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{averageRating}</span>
                    <span className="text-gray-400 text-sm">({plato.reviews.length})</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {plato.local?.id && (
            <Link
              href={`/pages/detalleLocal/${plato.local.id}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md hover:opacity-85 transition-opacity self-start ${styles.icon}`}
              style={{ background: "#ff5e00" }}
            >
              <FontAwesomeIcon icon={faStore} className={`w-4 h-4 "`} />
              Ver local: {plato.local.name}
            </Link>
          )}
        </div>
        <div className="bg-white shadow-2xl overflow-hidden border border-gray-100 mb-10">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="px-6 sm:px-10 lg:px-12 py-10 lg:py-16 order-2 lg:order-1 flex flex-col justify-evenly">
              {plato.description && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4">
                    {plato.description}
                  </p>
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
                <h3 className="tracking-wider mb-4">Información adicional</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Publicado el{" "}
                      {new Date(plato.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric", month: "long", day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <FontAwesomeIcon icon={faComment} className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{plato.reviews?.length || 0} reseñas</span>
                  </div>
                </div>
              </div>

              {plato.creator?.name && (
                <div className={`bg-gradient-to-r from-orange-50 to-amber-50 p-4 ${styles.creator}`}>
                  <Link href={`/pages/detallePerfil/${plato.creator.id}`} className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md font-bold text-lg"
                        style={{ background: "#ff5e00" }}
                      >
                        {plato.creator.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Publicado por</span>
                        <span className="text-lg font-semibold text-gray-900">{plato.creator.name}</span>
                        <span className="text-sm text-gray-500 block">@{plato.creator.username}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className={`relative h-96 lg:h-auto order-1 lg:order-2 overflow-hidden bg-gradient-to-br ${getCategoryGradient(plato.category)}`}>
              <div className="absolute inset-0 bg-black/20 z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <FontAwesomeIcon
                  icon={getCategoryIcon(plato.category)}
                  className="text-white/10"
                  style={{ fontSize: "18rem" }}
                />
              </div>

              <div className="absolute top-4 left-4 z-20">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                  <FontAwesomeIcon icon={getCategoryIcon(plato.category)} className="w-4 h-4" />
                  {plato.category}
                </span>
              </div>

              {plato.price && (
                <div className="absolute top-4 right-4 z-20 bg-white text-green-700 font-bold px-4 py-2 rounded-xl text-xl shadow-xl">
                  ${plato.price}
                </div>
              )}

              {plato.local?.name && (
                <div className={`absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/60 to-transparent p-6 pt-12 ${styles.Desc}`}>
                  <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Local</p>
                  <p className="text-white font-semibold text-lg">{plato.local.name}</p>
                  {plato.local.city && <p className="text-white/70 text-sm">{plato.local.city}</p>}
                </div>
              )}
            </div>
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
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
                >
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                  Puntuar
                </button>
              </div>
            )}

          </div>
          <div className={`${styles.gridReviews}`}>
            <div className="px-6 sm:px-10 lg:px-12 py-10">
              {plato.reviews?.length > 0 ? (
                <div className={`space-y-5 ${styles.reviews}`}>
                  {plato.reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className={index !== plato.reviews.length - 1 ? "pb-5 border-b border-gray-100" : ""}
                    >
                      <div className={`flex items-start gap-4 ${styles.reviewProfile}`}>
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-sm"
                          style={{ background: "#1d3547" }}
                        >
                          {review.user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div>
                              <span className="font-semibold text-gray-900">{review.user?.name}</span>
                              <span className="text-xs text-gray-400 ml-2">@{review.user?.username}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex gap-0.5">{renderStars(review.rating)}</div>
                              <span className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString("es-ES", {
                                  year: "numeric", month: "short", day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 px-4 py-3 rounded-xl">
                              {review.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-16 ${styles.sinPlatos}`}>

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5 cursor-pointer" />
            </button>
            <div className="p-6">
              <RatingModal
                name={plato.name}
                subtitle="¿Cómo estuvo el plato?"
                onSubmit={(rating, comment) => postReviewPlato(plato.id, rating, comment)}
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

export default DetallePlato;