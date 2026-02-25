"use client"
import React, { useState } from 'react'
import { Login } from '../../../api/api' // Asegúrate de tener esta función en tu API
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../context/AuthContext'

const Page = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Login(username, password)
      console.log("Login exitoso:", response)
      login(response.token)

      router.push('/')

    } catch (err) {
      console.error("Error al iniciar sesión:", err)
      setError('Credenciales incorrectas. Inténtalo de nuevo.')
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Tu Empresa"
          src="https://lh3.googleusercontent.com/pw/AP1GczMN5-dgUL0928zkdhbhflVY2apzskc879Vf_tBK5wO_zAR6sJMmGG4quhCkVSlCHzFoJyzw-a7-x0uITHV1_U_d3ZgpORWeLflWSHy0eW3QNYKMpXAX3JDIMTIVIRIEs9EpB8GucoZyLVjBGjX5K5-Cng=w1367-h911-s-no-gm?authuser=1"
          width={500}
          height={500}
          className="mx-auto w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Inicia sesión
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
          )}

          <div>
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
              Nombre de Usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Contraseña
              </label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesión
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          ¿No tienes una cuenta?{' '}
          <Link href="/pages/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Regístrate ahora
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page