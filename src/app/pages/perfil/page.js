"use client"
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
const page = () => {
  const { token, logout } = useAuth();

  return (
    <>
      {/* <Login /> */}
      {token ? (
        <>
          <p>Bienvenido, estás autenticado.</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <>
          <p>No estás autenticado.</p>
          <li><Link href="./login">Iniciar Sesion</Link></li>
          <li><Link href="./register">Registrarse</Link></li>
        </>
      )}
    </>
  )
}

export default page