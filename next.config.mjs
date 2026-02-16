/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*.googleusercontent.com', // El asterisco acepta lh3, lh4, etc.
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https', // También agregamos https por seguridad
        hostname: '*.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;