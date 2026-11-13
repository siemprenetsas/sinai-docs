import path from 'node:path';
import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import docenteRedirects from './lib/docente-redirects.json';
import administrativoRedirects from './lib/administrativo-redirects.json';
import estudianteRedirects from './lib/estudiante-redirects.json';

const nextConfig: NextConfig = {
  experimental: {
    // Next 16.2 usa procesos de Node separados para cada evaluación de
    // PostCSS. En este proyecto pueden acumularse cientos de procesos y
    // agotar la memoria del equipo. Los worker threads comparten el proceso
    // de Next y evitan esa multiplicación en desarrollo.
    // En next build los worker threads cruzan transformaciones entre
    // archivos (PostCSS recibe meta.json), por eso solo aplica en desarrollo.
    ...(process.env.NODE_ENV !== 'production' && {
      turbopackPluginRuntimeStrategy: 'workerThreads' as const,
    }),
  },
  // La carpeta padre también tiene un lockfile. Sin esta raíz, Turbopack
  // toma sinai-docs/ en lugar de esta aplicación.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'thumbnails.odycdn.com' },
    ],
  },
  async headers() {
    // Solo estos orígenes pueden incrustar el chat (/embed/*) en un iframe.
    // Se puede sobrescribir con EMBED_FRAME_ANCESTORS (lista separada por espacios).
    const frameAncestors =
      process.env.EMBED_FRAME_ANCESTORS
      ?? "'self' https://sinai.net.co https://*.sinai.net.co https://*.siempre.net.co";

    return [
      {
        source: '/embed/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: `frame-ancestors ${frameAncestors}` },
        ],
      },
    ];
  },
  async redirects() {
    return [...administrativoRedirects, ...docenteRedirects, ...estudianteRedirects];
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/llms.mdx/docs/:path*',
      },
    ];
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
