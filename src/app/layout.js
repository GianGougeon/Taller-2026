import "./../styles/css/style.css";
import "./globals.css"
import Header from "../components/Header";
import { AuthProvider } from "../components/context/AuthContext";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata = {
  title: "Rutas del Sabor",
  description: "En Rutas del Sabor, te ofrecemos una experiencia culinaria única. Descubre los mejores locales gastronómicos de tu ciudad, desde acogedores cafés hasta restaurantes de alta cocina. Nuestra plataforma te permite explorar una amplia variedad de opciones, leer reseñas auténticas y encontrar el lugar perfecto para satisfacer tus antojos. ¡Únete a nuestra comunidad de amantes de la comida y comienza tu aventura gastronómica hoy mismo!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AuthProvider>
          <Header />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}