import "./../styles/css/style.css";
import "./globals.css"
import Header from "../components/Header";

export const metadata = {
  title: "Rutas del Sabor",
  description: "Explora las mejores rutas gastronómicas con Rutas del Sabor. Descubre sabores auténticos, restaurantes recomendados y experiencias culinarias únicas en tu ciudad. ¡Sigue nuestras rutas y disfruta de la gastronomía local como nunca antes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
