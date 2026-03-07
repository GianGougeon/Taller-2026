"use client"
import React, { useState, useEffect } from 'react';
import { postPlato, getLocals } from "../../../api/api";
import styles from '../../../styles/sass/components/AltaLocal.module.scss';
import { Loader } from '@/components/Loader';

const AltaPlato = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [localId, setLocalId] = useState("");
    const [city, setCity] = useState(" ");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [locales, setLocales] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchDatos = async () => {
            setLoader(true);
            try {
                const data = await getLocals();
                if (data) {
                    setLocales(data.items);
                }
            } catch (error) {
                console.error("Error al traer locales:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchDatos();
    }, []);

    const handleLocalSelection = (e) => {
        const id = e.target.value;
        setLocalId(id);

        const localEncontrado = locales.find(l => l.id === id);
        if (localEncontrado) {
            setCity(localEncontrado.city);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!localId || !name || !price) {
            alert("Por favor rellena los campos obligatorios");
            return;
        }
        try {
            await postPlato(name, category, localId, city, price, description);
            alert("Plato registrado correctamente");
        } catch (error) {
            console.error(error);
            alert("Error al registrar el plato");
        }
    };

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2>Añadir nuevo <span>Plato</span></h2>
                        <p>Vincula un plato a uno de tus locales registrados.</p>
                    </div>

                    <form className={styles.formCard} onSubmit={handleSubmit}>
                        <div className={styles.grid}>

                            <div className={styles.fullWidth}>
                                <div className={styles.field}>
                                    <label>Nombre del Plato</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Bife de Chorizo"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.field}>
                                <label>Seleccionar Local</label>
                                <select
                                    className="mt-2.5 block w-full rounded-lg border-0 px-3.5 py-2 ring-1 ring-inset ring-gray-300 bg-white"
                                    onChange={handleLocalSelection}
                                    value={localId}
                                    required
                                >
                                    <option value="">Seleccione un local...</option>
                                    {locales.length > 0 ? (
                                        locales.map((local) => (
                                            <option key={local.id} value={local.id}>
                                                {local.name}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>No se encontraron locales</option>
                                    )}
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label>Ciudad</label>
                                <input
                                    type="text"
                                    value={city}
                                    placeholder="Ciudad del local"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Precio ($)</label>
                                <input
                                    type="number"
                                    placeholder="890"
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Categoría</label>
                                <select onChange={(e) => setCategory(e.target.value)} required>
                                    <option value="">Elegir...</option>
                                    <option value="principal">Plato Principal</option>
                                    <option value="entrada">Entrada</option>
                                    <option value="postre">Postre</option>
                                    <option value="bebida">Bebida</option>
                                </select>
                            </div>

                            <div className={`${styles.field} ${styles.fullWidth}`}>
                                <label>Descripción</label>
                                <textarea
                                    placeholder="Detalla los ingredientes o el punto de cocción..."
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            GUARDAR PLATO
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AltaPlato;