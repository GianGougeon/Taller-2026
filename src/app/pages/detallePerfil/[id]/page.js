"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getUser } from "../../../../api/api";
import { Loader } from "@/components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faCalendarAlt,
    faStore,
    faUtensils,
    faMapMarkerAlt,
    faCity,
    faWallet,
    faStar,
    faClock,
    faLeaf,
    faCoffee,
    faTag,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../styles/sass/components/UsuariosPerfil.module.scss";

const getCategoryIcon = (cat) => ({
    PRINCIPAL: faUtensils,
    ENTRADA: faLeaf,
    POSTRE: faStar,
    BEBIDA: faCoffee,
}[cat] || faTag);

const getCategoryColors = (cat) => ({
    PRINCIPAL: "bg-red-100 text-red-700",
    ENTRADA: "bg-emerald-100 text-emerald-700",
    POSTRE: "bg-pink-100 text-pink-700",
    BEBIDA: "bg-sky-100 text-sky-700",
}[cat] || "bg-gray-100 text-gray-600");

const getPriceColors = (range) => ({
    ECONOMICO: "bg-green-100 text-green-700",
    MEDIO: "bg-yellow-100 text-yellow-700",
    ALTO: "bg-red-100 text-red-700",
}[range] || "bg-gray-100 text-gray-600");

export default function DetallePerfil() {
    const params = useParams();
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("locales");

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                setLoading(true);
                const data = await getUser(params.id);
                setPerfil(data.item);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPerfil();
    }, [params.id]);

    if (loading) return <Loader />;

    if (!perfil) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">No se encontró el perfil.</p>
            </div>
        );
    }

    const initials = perfil.name
        ? perfil.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
        : "?";

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 ${styles.perfilUsuario}`}>
            <div className="mx-auto  px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <Link
                    href="/pages/locales"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-8"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-3 h-3" />
                    Volver
                </Link>
                <div className="bg-white shadow-2xl border border-gray-100 overflow-hidden mb-8">
                    <div
                        className="h-32 sm:h-40"
                        style={{ background: "linear-gradient(135deg, #1d3547 0%, #ff5e00 100%)" }}
                    />
                    <div className={`px-6 sm:px-10 pb-8 ${styles.perfilAvatar}`}>
                        <div className="flex items-end justify-between -mt-12 mb-4">
                            <div
                                className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg border-4 border-white"
                                style={{ background: "#ff5e00" }}
                            >
                                {initials}
                            </div>
                            <div className="flex gap-3 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium">
                                    <FontAwesomeIcon icon={faStore} className="w-3.5 h-3.5" />
                                    {perfil.locals?.length || 0} locales
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                                    <FontAwesomeIcon icon={faUtensils} className="w-3.5 h-3.5" />
                                    {perfil.dishes?.length || 0} platos
                                </span>
                            </div>
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{perfil.name}</h1>
                        <p className="text-gray-400 text-sm mt-1">@{perfil.username}</p>

                        {perfil.createdAt && (
                            <p className="flex items-center gap-2 text-xs text-gray-400 mt-3">
                                <FontAwesomeIcon icon={faCalendarAlt} className="w-3.5 h-3.5" />
                                Miembro desde{" "}
                                {new Date(perfil.createdAt).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                })}
                            </p>
                        )}
                    </div>
                </div>
                <div className={`flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 w-fit ${styles.perfilTabs}`}>
                    <button
                        onClick={() => setTab("locales")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === "locales"
                            ? styles.tabActiva
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <FontAwesomeIcon icon={faStore} className="w-4 h-4" />
                        Locales ({perfil.locals?.length || 0})
                    </button>
                    <button
                        onClick={() => setTab("platos")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === "platos"
                            ? styles.tabActiva
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <FontAwesomeIcon icon={faUtensils} className="w-4 h-4" />
                        Platos ({perfil.dishes?.length || 0})
                    </button>
                </div>
                {tab === "locales" && (
                    <>
                        {perfil.locals?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {perfil.locals.map((local) => (
                                    <Link
                                        key={local.id}
                                        href={`/pages/detalleLocal/${local.id}`}
                                        className="group block"
                                    >
                                        <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                                            <div className={`relative h-44 overflow-hidden bg-gradient-to-br from-orange-50 to-amber-100 ${styles.perfilLocal}`}>
                                                <img
                                                    src={local.photos}
                                                    alt={local.name || "Imagen del local"}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.currentTarget.onerror = null;
                                                        e.currentTarget.src = "https://lh3.googleusercontent.com/pw/AP1GczNF38GOEZ4AuXRJudCBSa8hqgf_cIjQXuzaQR3W5abjTGZz4ZHCpayG4SfdfcfXAYLwyRjcwjwIV3xm6nR7hUvPJngWki8Cgl8Q5H1FrmxyeqCzzuYt5TIiJK2VgFEcro8zR4bPzhQOA2MnAweHMpyrfQ=w729-h305-s-no-gm?authuser=1";
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                                <span
                                                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${getPriceColors(local.priceRange)}`}
                                                >
                                                    <FontAwesomeIcon icon={faWallet} className="w-3 h-3 mr-1" />
                                                    {local.priceRange}
                                                </span>
                                                {local.ratingAverage > 0 && (
                                                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow">
                                                        <FontAwesomeIcon icon={faStar} className="w-3 h-3 text-yellow-400" />
                                                        {Number(local.ratingAverage).toFixed(1)}
                                                        <span className="text-gray-400">({local.ratingCount})</span>
                                                    </span>
                                                )}
                                            </div>


                                            <div className="p-5">
                                                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors">
                                                    {local.name}
                                                </h3>
                                                {local.description && (
                                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{local.description}</p>
                                                )}
                                                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faCity} className="w-3 h-3" />
                                                        {local.city}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
                                                        {local.zone}
                                                    </span>
                                                    {local.hours && (
                                                        <span className="flex items-center gap-1">
                                                            <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                                                            {local.hours}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-100 shadow-sm text-center py-16 px-8">
                                <FontAwesomeIcon icon={faStore} className="w-12 h-12 text-gray-200 mb-4" />
                                <h3 className="font-semibold text-gray-600 mb-1">Sin locales publicados</h3>
                                <p className="text-sm text-gray-400">Este usuario aún no publicó ningún local.</p>
                            </div>
                        )}
                    </>
                )}


                {tab === "platos" && (
                    <>
                        {perfil.dishes?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {perfil.dishes.map((dish) => (
                                    <Link
                                        key={dish.id}
                                        href={`/pages/detallePlato/${dish.id}`}
                                        className="group block"
                                    >
                                        <div className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                                            <div
                                                className={`h-20 flex items-center justify-center ${dish.category === "PRINCIPAL" ? "bg-gradient-to-br from-red-100 to-orange-100" :
                                                    dish.category === "ENTRADA" ? "bg-gradient-to-br from-emerald-100 to-teal-100" :
                                                        dish.category === "POSTRE" ? "bg-gradient-to-br from-pink-100 to-fuchsia-100" :
                                                            dish.category === "BEBIDA" ? "bg-gradient-to-br from-sky-100 to-cyan-100" :
                                                                "bg-gradient-to-br from-gray-100 to-gray-200"
                                                    }`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={getCategoryIcon(dish.category)}
                                                    className="w-8 h-8 opacity-30"
                                                />
                                            </div>

                                            <div className="p-5">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">
                                                        {dish.name}
                                                    </h3>
                                                    {dish.price && (
                                                        <span className="text-sm font-bold text-green-600 whitespace-nowrap">
                                                            ${dish.price}
                                                        </span>
                                                    )}
                                                </div>

                                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${getCategoryColors(dish.category)}`}>
                                                    <FontAwesomeIcon icon={getCategoryIcon(dish.category)} className="w-3 h-3" />
                                                    {dish.category}
                                                </span>

                                                {dish.description && (
                                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{dish.description}</p>
                                                )}

                                                <div className="flex gap-3 text-xs text-gray-400">
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
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border border-gray-100 shadow-sm text-center py-16 px-8">
                                <FontAwesomeIcon icon={faUtensils} className="w-12 h-12 text-gray-200 mb-4" />
                                <h3 className="font-semibold text-gray-600 mb-1">Sin platos publicados</h3>
                                <p className="text-sm text-gray-400">Este usuario aún no publicó ningún plato.</p>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    );
}