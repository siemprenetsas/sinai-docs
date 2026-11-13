import type { Metadata } from 'next';
import { EmbedChat } from './embed-chat';

export const metadata: Metadata = {
  title: 'Asistente SINAI',
  robots: { index: false, follow: false },
};

const roles = ['administrativo', 'docente', 'estudiante'] as const;
type Role = (typeof roles)[number];

/**
 * Chat del asistente a pantalla completa para incrustar en un iframe
 * (por ejemplo desde WEBSINAI). Parámetro opcional: ?rol=administrativo|docente|estudiante
 * para que el asistente responda con las guías de ese perfil sin preguntar el rol.
 */
export default async function EmbedChatPage({
  searchParams,
}: {
  searchParams: Promise<{ rol?: string | string[] }>;
}) {
  const { rol } = await searchParams;
  const role = roles.find((r) => r === rol) as Role | undefined;

  return <EmbedChat role={role} />;
}
