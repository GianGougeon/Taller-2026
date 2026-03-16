"use client"
import React, { useState, useEffect } from "react"
import { Register } from "../../../api/api"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "../../../components/context/AuthContext"
import styles from "./../../../styles/sass/components/Auth.module.scss"

const Page = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const { token, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push("/")
    }
  }, [token, router])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Register(username, name, password);
      if (response && response.token) {
        login(response.token);
      } else {
        const savedToken = localStorage.getItem('token');
        if (savedToken) login(savedToken);
      }
      router.push("/")
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  }

  return (
    <div className={`flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 items-center ${styles.register}`}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="Tu Empresa"
          src="https://lh3.googleusercontent.com/pw/AP1GczMN5-dgUL0928zkdhbhflVY2apzskc879Vf_tBK5wO_zAR6sJMmGG4quhCkVSlCHzFoJyzw-a7-x0uITHV1_U_d3ZgpORWeLflWSHy0eW3QNYKMpXAX3JDIMTIVIRIEs9EpB8GucoZyLVjBGjX5K5-Cng=w1367-h911-s-no-gm?authuser=1"
          width={500}
          height={500}
          className="mx-auto w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Crear cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Nombre de Usuario
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Nombre completo
            </label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/pages/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Page