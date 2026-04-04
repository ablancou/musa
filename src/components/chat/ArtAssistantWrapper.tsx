'use client';

/**
 * ArtAssistantWrapper — Dynamic import wrapper for the AI Chat
 * Loaded client-side only, avoids SSR issues with framer-motion + zustand
 */

import dynamic from 'next/dynamic';
import type { ChatContext } from './ArtAssistant';

const ArtAssistant = dynamic(() => import('./ArtAssistant'), {
  ssr: false,
});

interface Props {
  context?: ChatContext;
}

export default function ArtAssistantWrapper({ context }: Props) {
  return <ArtAssistant context={context} />;
}
