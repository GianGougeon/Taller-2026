"use client";

import { useEffect, useState } from "react";
import { getPlatos } from "../../../api/api";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUtensils,
    faMapPin,
    faStore,
    faSearch,
    faCity,
    faChevronDown,
    faStar,
    faLocationDot,
    faCalendarAlt,
    faCoffee,
    faLeaf,
    faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Loader } from "@/components/Loader";
import styles from "../../../styles/sass/components/LocalesYplatos.module.scss";

export default function Platos() {
    const [platos, setPlatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [city, setCity] = useState("");
    const [zone, setZone] = useState("");
    const [localId, setLocalId] = useState("");

    useEffect(() => {
        const fetchPlatos = async () => {
            setIsUpdating(true);
            const data = await getPlatos(query, category, dateFrom, dateTo, city, zone, localId);
            setPlatos(data.items);
            setLoading(false);
            setIsUpdating(false);
        };
        fetchPlatos();
    }, [query, category, dateFrom, dateTo, city, zone, localId]);

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case "PRINCIPAL": return faUtensils;
            case "ENTRADA": return faLeaf;
            case "POSTRE": return faStar;
            case "BEBIDA": return faCoffee;
            default: return faTag;
        }
    };

    if (loading) return <Loader />;

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 ${styles.local}`}>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className={`text-center mb-12 ${styles.header}`}>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Descubrí los <span>mejores</span> platos
                    </h1>
                    <p className="text-lg text-gray-600">
                        Encontrá platos de restaurantes, bares y cafeterías cerca tuyo
                    </p>
                </div>

                <div className={`bg-white rounded-2xl shadow-lg p-6 mb-12 ${styles.filter}`}>
                    <div className="flex items-center gap-2 mb-4">
                        <FontAwesomeIcon icon={faSearch} className="text-indigo-600" />
                        <h2 className="text-lg font-semibold text-gray-900">
                            Filtros de búsqueda {isUpdating && <span className="text-xs text-gray-400 ml-2 animate-pulse">Buscando...</span>}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faTag} className="mr-2" />
                                Buscar
                            </label>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Nombre del plato..."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl transition-all focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                                Categoría
                            </label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl appearance-none transition-all"
                                >
                                    <option value="">Todas las categorías</option>
                                    <option value="ENTRADA">Entrada</option>
                                    <option value="PRINCIPAL">Principal</option>
                                    <option value="POSTRE">Postre</option>
                                    <option value="BEBIDA">Bebida</option>
                                    <option value="OTROS">Otros</option>
                                </select>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faCity} className="mr-2" />
                                Ciudad
                            </label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Ej: Montevideo"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                                Zona
                            </label>
                            <input
                                type="text"
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                placeholder="Ej: Centro"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                Publicado desde
                            </label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                                Publicado hasta
                            </label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl transition-all"
                            />
                        </div>

                    </div>
                </div>

                <div className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${styles.grilla} ${isUpdating ? 'opacity-50' : 'opacity-100'} transition-opacity`}>
                    {platos.map((plato) => (
                        <Link
                            href={`/pages/detallePlato/${plato.id}`}
                            key={plato.id}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">

                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={getCategoryIcon(plato.category)}
                                        className="text-7xl text-orange-200 group-hover:scale-110 transition-transform duration-500"
                                    />

                                    <div className={`absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-lg ${styles.tag}`}>
                                        <FontAwesomeIcon icon={getCategoryIcon(plato.category)} className="mr-1" />
                                        {plato.category}
                                    </div>

                                    <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg ${styles.tag} ${plato.price ? "text-green-600" : "text-gray-400"}`}>
                                        {plato.price ? `$${plato.price}` : "Sin precio"}
                                    </div>
                                </div>

                                <div className={`p-5 ${styles.info}`}>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                        {plato.name}
                                    </h3>

                                    <div className="space-y-2">
                                        {plato.local?.name && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FontAwesomeIcon icon={faStore} className="mr-2 w-4" />
                                                <span className="line-clamp-1">{plato.local.name}</span>
                                            </div>
                                        )}
                                        {plato.city && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <FontAwesomeIcon icon={faMapPin} className="mr-2 w-4" />
                                                <span className="line-clamp-1">
                                                    {plato.city}{plato.zone ? `, ${plato.zone}` : ""}
                                                </span>
                                            </div>
                                        )}
                                        {plato.description && (
                                            <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                                                {plato.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <span
                                            className="text-sm font-semibold flex items-center group-hover:opacity-80 transition-opacity"
                                            style={{ color: "#ff5e00" }}
                                        >
                                            Ver detalle
                                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {!isUpdating && platos.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                            <FontAwesomeIcon icon={faUtensils} className="text-6xl text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No se encontraron platos
                            </h3>
                            <p className="text-gray-500">
                                Probá con otros filtros de búsqueda
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}