import "./../styles/css/style.css";
import "./globals.css"
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Rutas del Sabor",
  description: "Explora las mejores rutas gastronómicas...",
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