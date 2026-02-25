"use client";

import { useEffect, useState } from "react";
import { getLocals } from "../api/api";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faMapPin,
  faTag,
  faUtensils,
  faCoffee,
  faWineGlassAlt,
  faTruck,
  faStore,
  faSearch,
  faLocationDot,
  faCity,
  faMoneyBillWave,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [user, setUser] = useState({});
  const [locals, setLocals] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  useEffect(() => {
    const fetchLocals = async () => {
      const data = await getLocals(query, type, priceRange, rating, city, zone);
      console.log(data);
      setLocals(data.items);
    }

    fetchLocals();
  }, [query, type, priceRange, rating, city, zone]);

  // Función para obtener el icono según el tipo de local
  const getTypeIcon = (type) => {
    switch (type) {
      case 'CAFETERIA':
        return faCoffee;
      case 'RESTAURANTE':
        return faUtensils;
      case 'BAR':
        return faWineGlassAlt;
      case 'FOOD_TRUCK':
        return faTruck;
      default:
        return faStore;
    }
  };

  // Función para obtener el color según el rango de precio
  const getPriceColor = (price) => {
    switch (price) {
      case 'ECONOMICO':
        return 'text-green-600';
      case 'MEDIO':
        return 'text-yellow-600';
      case 'ALTO':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  // Función para formatear el tipo
  const formatType = (type) => {
    return type ? type.charAt(0) + type.slice(1).toLowerCase().replace('_', ' ') : 'No especificado';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Descubre los mejores lugares
          </h1>
          <p className="text-lg text-gray-600">
            Encuentra restaurantes, cafeterías y bares cerca de ti
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faSearch} className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros de búsqueda</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Query */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faTag} className="mr-2 text-indigo-500" />
                Buscar
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nombre del local..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* City */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faCity} className="mr-2 text-indigo-500" />
                Ciudad
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej: Madrid"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Zone */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-indigo-500" />
                Zona
              </label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder="Ej: Centro"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Rating */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500" />
                Rating mínimo
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="Ej: 4"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* Price Range */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2 text-green-500" />
                Rango de precio
              </label>
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all"
                >
                  <option value="">Todos los precios</option>
                  <option value="ECONOMICO">Económico</option>
                  <option value="MEDIO">Medio</option>
                  <option value="ALTO">Alto</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            {/* Type */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FontAwesomeIcon icon={getTypeIcon(type)} className="mr-2 text-indigo-500" />
                Tipo
              </label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all"
                >
                  <option value="">Todos los tipos</option>
                  <option value="CAFETERIA">Cafetería</option>
                  <option value="RESTAURANTE">Restaurante</option>
                  <option value="BAR">Bar</option>
                  <option value="FOOD_TRUCK">Food Truck</option>
                  <option value="OTROS">Otros</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm mr-2">
              {locals.length}
            </span>
            Locales encontrados
          </h2>
        </div>

        {/* Grid de tarjetas mejoradas */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {locals.map((local) => (
            <Link
              href={`/DetalleLocal?id=${local.id}`}
              key={local.id}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Imagen con overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={local.photos?.[0] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&auto=format&fit=crop"}
                    alt={local.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badge de tipo */}
                  <div className="p-[1%] absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                    <FontAwesomeIcon icon={getTypeIcon(local.type)} className="mr-1 text-indigo-600" />
                    {formatType(local.type)}
                  </div>

                  {/* Badge de precio */}
                  {local.priceRange && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      <span className={getPriceColor(local.priceRange)}>
                        {local.priceRange}
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                    {local.name}
                  </h3>

                  <div className="space-y-2">
                    {/* Ubicación */}
                    <div className="flex items-center text-sm text-gray-600">
                      <FontAwesomeIcon icon={faMapPin} className="mr-2 text-indigo-500 w-4" />
                      <span className="line-clamp-1">
                        {local.city}{local.zone ? `, ${local.zone}` : ''}
                      </span>
                    </div>

                    {/* Rating (si existe) */}
                    {local.rating && (
                      <div className="flex items-center text-sm">
                        <FontAwesomeIcon icon={faStar} className="mr-2 text-yellow-500 w-4" />
                        <span className="font-semibold text-gray-900">{local.rating}</span>
                        <span className="text-gray-500 ml-1">/5</span>
                      </div>
                    )}

                    {/* Descripción corta si existe */}
                    {local.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mt-2">
                        {local.description}
                      </p>
                    )}
                  </div>

                  {/* Botón ver más */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-indigo-600 text-sm font-semibold group-hover:text-indigo-800 transition-colors flex items-center">
                      Ver detalles
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

        {/* Mensaje si no hay resultados */}
        {locals.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <FontAwesomeIcon icon={faStore} className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron locales
              </h3>
              <p className="text-gray-500">
                Prueba con otros filtros de búsqueda
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}