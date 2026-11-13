'use client';

import { AISearchEmbedPanel } from '@/components/ai/search';
import { ChatLinkTargetContext } from '@/components/markdown';

export function EmbedChat({ role }: { role?: 'administrativo' | 'docente' | 'estudiante' }) {
  // /api/chat deduce el rol de la ruta que llega como contexto (/docs/<rol>/...).
  const contextLocation = role ? `/docs/${role}/` : undefined;

  return (
    <ChatLinkTargetContext value="_blank">
      <AISearchEmbedPanel contextLocation={contextLocation} />
    </ChatLinkTargetContext>
  );
}
