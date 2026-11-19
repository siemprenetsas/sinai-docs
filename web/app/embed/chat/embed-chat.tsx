'use client';

import { useEffect, useState } from 'react';
import { AISearchEmbedPanel } from '@/components/ai/search';
import { ChatLinkTargetContext } from '@/components/markdown';

export function EmbedChat({ role }: { role?: 'administrativo' | 'docente' | 'estudiante' }) {
  const [parentLocation, setParentLocation] = useState<string>();

  useEffect(() => {
    if (!document.referrer) return;

    try {
      // Comparte solo la ruta de la página anfitriona, sin query ni fragmentos.
      const parentUrl = new URL(document.referrer);
      setParentLocation(`${parentUrl.origin}${parentUrl.pathname}`);
    } catch {
      // Si el navegador no expone un referrer válido, se conserva el contexto por rol.
    }
  }, []);

  // La ruta del padre permite al asistente inferir la pantalla/módulo de SINAI.
  // El rol explícito sigue siendo el fallback para embeds fuera de la plataforma.
  const contextLocation = parentLocation ?? (role ? `/docs/${role}/` : undefined);

  return (
    <ChatLinkTargetContext value="_blank">
      <AISearchEmbedPanel contextLocation={contextLocation} />
    </ChatLinkTargetContext>
  );
}
