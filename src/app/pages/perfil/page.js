import { Button } from '@headlessui/react'
import Link from 'next/link'
import Login from '../../../components/Login.js'
import React from 'react'

const page = () => {
  return (
    <>
      {/* <Login /> */}
      <li><Link href="./login">Iniciar Sesion</Link></li>
      <li><Link href="./register">Registrarse</Link></li>
    </>
  )
}

export default page