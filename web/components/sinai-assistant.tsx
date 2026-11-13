'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircleIcon } from 'lucide-react';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export function SinaiAssistant({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  // El chat embebido (/embed/chat) dibuja su propio panel a pantalla completa.
  const isEmbed = pathname.startsWith('/embed');

  return (
    <AISearch>
      {children}
      {!isHome && !isEmbed && (
        <>
          <AISearchPanel />
          <AISearchTrigger
            position="float"
            className={cn(buttonVariants({
              variant: 'secondary',
              className: 'sinai-ai-ripple w-auto min-w-40 rounded-2xl text-fd-muted-foreground',
            }))}
          >
            <MessageCircleIcon className="sinai-ai-trigger-icon size-4.5" />
            <span className="sinai-ai-trigger-label">Preguntar a SINAI</span>
          </AISearchTrigger>
        </>
      )}
    </AISearch>
  );
}
