"use client"
import React, { useState } from 'react';
import { postLocal } from "../../../api/api";
import styles from '../../../styles/sass/components/AltaLocal.module.scss';
import { redirect } from 'next/navigation';

const AltaLocal = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("RESTAURANTE");
  const [priceRange, setPriceRange] = useState("ECONOMICO");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const [hours, setHours] = useState("");
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleAddPhoto = (e) => {
    e.preventDefault();
    setPhotos((prev) => [...prev, photo]);
    setPhoto("");
  }

  const handleClick = async (e) => {
    e.preventDefault();
    await postLocal(name, type, priceRange, city, zone, address, hours, photos);
    alert("Local creado con éxito");
    redirect("/pages/locales");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Suma tu <span>Joyita</span></h2>
        <p>Comparte ese lugar especial con la comunidad gourmet.</p>
      </div>

      <form className={styles.formCard}>
        <div className={styles.grid}>
          <div className={styles.fullWidth}>
            <div className={styles.field}>
              <label>Nombre del Local</label>
              <input name="name" type="text" onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className={styles.field}>
            <label>Ciudad</label>
            <input name="city" type="text" onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className={styles.field}>
            <label>Zona</label>
            <input name="zone" type="text" onChange={(e) => setZone(e.target.value)} />
          </div>


          <div className={styles.field}>
            <label className="block text-sm font-semibold">Dirección</label>
            <input
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2.5 block w-full rounded-lg border-0 px-3.5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 outline-none"
            />
          </div>

          <div className={styles.field}>
            <label className="block text-sm font-semibold">Horario</label>
            <input
              name="hours"
              onChange={(e) => setHours(e.target.value)}
              className="mt-2.5 block w-full rounded-lg border-0 px-3.5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 outline-none"
            />
          </div>

          <div className={styles.field}>
            <label className="block text-sm font-semibold">Rango de Precios</label>
            <select
              name="priceRange"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="mt-2.5 block w-full rounded-lg border-0 px-3.5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 outline-none bg-white"
            >
              <option value="ECONOMICO">Económico</option>
              <option value="MEDIO">Medio</option>
              <option value="ALTO">Alto</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className="block text-sm font-semibold">Tipo de Local</label>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mt-2.5 block w-full rounded-lg border-0 px-3.5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#ff6600] outline-none bg-white"
            >
              <option value="RESTAURANTE">Restaurante</option>
              <option value="CAFETERIA">Cafetería</option>
              <option value="BAR">Bar</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>

          <div className={`${styles.field} ${styles.fullWidth}`}>
            <label>URL de la Foto</label>
            <div className={styles.photoAction}>
              <input name="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
              <button onClick={handleAddPhoto} className={styles.btnAddPhoto}>+</button>
            </div>
            <div className={styles.badgeList}>
              {photos.map((ph, i) => (
                <span key={i} className={styles.badge}>Imagen {i + 1} ✓</span>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleClick} className={styles.submitBtn}>
          REGISTRAR LOCAL
        </button>
      </form>
    </div>
  );
};

export default AltaLocal;