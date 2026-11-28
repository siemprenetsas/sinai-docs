'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentProps } from 'react';

type NoPrefetchLinkProps = ComponentProps<typeof NextLink>;

/**
 * Enlace interno que nunca precarga la página de destino: ni al estar visible
 * ni al pasar el cursor. La página se pide solo cuando la persona hace clic.
 *
 * Por defecto, next/link precarga cada enlace visible en pantalla. Con el menú
 * lateral y los hubs de secciones eso generaba unas 33 peticiones de prefetch
 * por visita, alrededor del 64 % de las CDN Requests de Vercel. La propiedad
 * `prefetch` recibida se ignora a propósito para que ningún enlace la active.
 */
export const NoPrefetchLink = forwardRef<HTMLAnchorElement, NoPrefetchLinkProps>(
  function NoPrefetchLink({ prefetch: _prefetch, ...props }, ref) {
    return <NextLink {...props} ref={ref} prefetch={false} />;
  },
);

type FrameworkLinkProps = ComponentProps<'a'> & { prefetch?: boolean };

/**
 * Adaptador para `RootProvider components={{ Link }}` de Fumadocs, cuyo
 * contrato admite `href` opcional (next/link lo exige).
 */
export const FumadocsNoPrefetchLink = forwardRef<HTMLAnchorElement, FrameworkLinkProps>(
  function FumadocsNoPrefetchLink({ href = '#', ...props }, ref) {
    return <NoPrefetchLink {...props} ref={ref} href={href} />;
  },
);

export default NoPrefetchLink;
