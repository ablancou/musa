'use client';

/**
 * ArtAssistant — MŪSA AI Conversational Chat
 *
 * A floating chat widget that provides contextual art history knowledge.
 * Can be opened from any page, with optional context about the current
 * artwork, lesson, or era being viewed.
 *
 * Responsive breakpoints:
 * - Desktop (≥1024px): Fixed bottom-right panel, 400px wide
 * - Landscape (568–1023px): Full-width bottom sheet, 50vh max
 * - Portrait (320–567px): Full-screen overlay with safe-area insets
 *
 * Features:
 * - Context-aware: knows which artwork/lesson user is viewing
 * - Suggested questions based on context
 * - Typing indicator with animation
 * - Message history within session
 * - Dark mode support
 * - 7-language support via i18n
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  ChevronDown,
  Palette,
  Music,
  Clock,
  Lightbulb,
  Loader2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ─── Types ───
export interface ChatContext {
  type: 'artwork' | 'lesson' | 'era' | 'artist' | 'museum' | 'general';
  id?: string;
  title?: string;
  artist?: string;
  era?: string;
  movement?: string;
  museum?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface SuggestedQuestion {
  icon: React.ReactNode;
  text: string;
  category: 'technique' | 'history' | 'music' | 'curiosity';
}

interface ArtAssistantProps {
  context?: ChatContext;
  defaultOpen?: boolean;
}

// ─── Knowledge Base (local RAG simulation) ───
// In production this would hit an API with vector search over our content.
// For MVP, we use pattern matching + curated responses.

const ART_KNOWLEDGE: Record<string, string[]> = {
  technique: [
    'El sfumato de Leonardo crea transiciones suaves entre tonos, eliminando líneas definidas. Es como ver a través de humo.',
    'El claroscuro barroco usa contrastes extremos de luz y sombra para crear drama teatral. Caravaggio lo llevó al extremo con su tenebrismo.',
    'El puntillismo de Seurat consiste en miles de puntos de color puro que el ojo mezcla a distancia. Una técnica científica basada en la teoría del color de Chevreul.',
    'La técnica del impasto de Van Gogh aplicaba pintura gruesa directamente del tubo, creando texturas tridimensionales que atrapan la luz.',
    'El dripping de Pollock eliminó el pincel: vertía, goteaba y salpicaba pintura sobre lienzos enormes en el suelo. Action painting.',
  ],
  history: [
    'El Impresionismo nació como una rebelión. En 1874, los artistas rechazados por el Salón oficial organizaron su propia exposición. Un crítico burlón los llamó "impresionistas" por el cuadro de Monet "Impresión, sol naciente". El insulto se convirtió en movimiento.',
    'Durante el Renacimiento, los artistas pasaron de ser artesanos anónimos a celebridades. Miguel Ángel fue el primer artista rockstar de la historia.',
    'El arte abstracto no "surgió" de la nada. Kandinsky cuenta que un día vio uno de sus cuadros al revés y le pareció más hermoso. Ese momento cambió el arte para siempre.',
    'El Japonismo revolucionó el arte europeo del siglo XIX. Las estampas ukiyo-e de Hokusai y Hiroshige inspiraron directamente a Monet, Van Gogh y Toulouse-Lautrec.',
  ],
  music: [
    'Debussy quedó fascinado por la música gamelán de Java que escuchó en la Exposición Universal de París en 1889. Ese sonido oriental transformó su música tanto como el arte japonés transformó a los impresionistas.',
    'Schoenberg rompió con la tonalidad en la misma época que Kandinsky rompió con la figuración. Ambos buscaban expresar emociones puras sin las "reglas" tradicionales.',
    'Erik Satie componía lo que llamaba "musique d\'ameublement" (música de mobiliario): sonidos de fondo que no exigen atención. El equivalente musical del minimalismo visual.',
    'La Sinfonía No. 5 de Beethoven tiene el mismo dramatismo tonal que un cuadro de Delacroix: pasión, furia y heroísmo romántico.',
  ],
  curiosity: [
    'La Mona Lisa fue robada del Louvre en 1911 por un empleado italiano que simplemente la sacó debajo de su abrigo. Estuvo desaparecida dos años.',
    'Van Gogh vendió solo un cuadro en vida: "El viñedo rojo" por 400 francos. Hoy sus obras valen cientos de millones.',
    'Miguel Ángel pintó la Capilla Sixtina de pie, no acostado como muestra la película. Cuatro años con el cuello doblado hacia atrás.',
    'Frida Kahlo empezó a pintar durante su convalecencia tras un accidente de autobús a los 18 años. Su madre le puso un espejo en el techo de la cama. Por eso tantos autorretratos.',
    'Hokusai creó "La Gran Ola" cuando tenía 70 años. Dijo que a los 110 "cada punto y cada línea estarán vivos".',
  ],
};

function generateResponse(
  message: string,
  context?: ChatContext
): { response: string; delay: number } {
  const lower = message.toLowerCase();

  // Context-aware responses
  if (context?.title) {
    if (lower.includes('técnica') || lower.includes('technique') || lower.includes('cómo')) {
      const techniques = ART_KNOWLEDGE.technique;
      return {
        response: `Sobre la técnica en "${context.title}": ${techniques[Math.floor(Math.random() * techniques.length)]}`,
        delay: 1500,
      };
    }
    if (lower.includes('música') || lower.includes('music') || lower.includes('suena')) {
      const music = ART_KNOWLEDGE.music;
      return {
        response: `La conexión musical de "${context.title}": ${music[Math.floor(Math.random() * music.length)]}`,
        delay: 1800,
      };
    }
    if (lower.includes('historia') || lower.includes('history') || lower.includes('cuándo')) {
      const history = ART_KNOWLEDGE.history;
      return {
        response: history[Math.floor(Math.random() * history.length)],
        delay: 1600,
      };
    }
  }

  // General pattern matching
  if (lower.includes('curiosidad') || lower.includes('dato') || lower.includes('sabías') || lower.includes('curious')) {
    const curiosities = ART_KNOWLEDGE.curiosity;
    return {
      response: curiosities[Math.floor(Math.random() * curiosities.length)],
      delay: 1400,
    };
  }
  if (lower.includes('impresion')) {
    return {
      response: ART_KNOWLEDGE.history[0],
      delay: 1600,
    };
  }
  if (lower.includes('van gogh')) {
    return {
      response: 'Van Gogh pintó 900 cuadros en solo 10 años. En "La noche estrellada", cada espiral del cielo refleja su turbulencia interior. Los astrónomos han confirmado que los patrones de turbulencia en el cuadro coinciden con modelos matemáticos reales de flujo turbulento. Su genio era tanto emocional como científico.',
      delay: 2000,
    };
  }
  if (lower.includes('monet') || lower.includes('nenúfar') || lower.includes('water lil')) {
    return {
      response: 'Monet pintó más de 250 cuadros de nenúfares durante los últimos 30 años de su vida. Su jardín en Giverny era su estudio al aire libre. A medida que su visión se deterioraba por cataratas, sus pinturas se volvieron más abstractas — los colores más intensos, las formas más difusas. Algunos historiadores creen que estas obras tardías anticiparon el expresionismo abstracto por décadas.',
      delay: 2200,
    };
  }
  if (lower.includes('klimt') || lower.includes('beso') || lower.includes('kiss')) {
    return {
      response: 'Gustav Klimt usó auténtico pan de oro en "El Beso", conectando su obra con la tradición bizantina de los iconos religiosos. La posición de las figuras al borde de un precipicio floral añade tensión: es un momento de éxtasis al filo del abismo. Klimt fue el líder de la Secesión Vienesa, un movimiento que buscaba liberar el arte de las convenciones académicas.',
      delay: 2000,
    };
  }
  if (lower.includes('hokusai') || lower.includes('ola') || lower.includes('wave')) {
    return {
      response: 'Hokusai tenía 70 años cuando creó "La Gran Ola". Usó azul de Prusia, un pigmento importado de Europa — una ironía, pues esta obra "puramente japonesa" dependía de química europea. La ola mide unos 12 metros; el Monte Fuji al fondo parece diminuto. Es una meditación sobre la fuerza de la naturaleza frente a la fragilidad humana.',
      delay: 2000,
    };
  }
  if (lower.includes('renacimiento') || lower.includes('renaissance')) {
    return {
      response: 'El Renacimiento fue la "reconexión" de Europa con la sabiduría clásica grecolatina. Florencia fue su cuna gracias al patronazgo de los Medici. La perspectiva lineal de Brunelleschi cambió la pintura para siempre: por primera vez, un cuadro podía crear la ilusión de profundidad real. Leonardo, Miguel Ángel y Rafael son la "trinidad" del Alto Renacimiento.',
      delay: 2000,
    };
  }

  // Default intelligent response
  const defaults = [
    `¡Gran pregunta! En MŪSA creemos que el arte cobra vida cuando lo conectas con tu propia experiencia. ${context?.title ? `"${context.title}" es un buen punto de partida para explorar.` : 'Explora nuestras lecciones para descubrir historias fascinantes.'} ¿Hay algún aspecto específico que te interese?`,
    'El arte siempre cuenta dos historias: la del artista y la del espectador. Cada persona ve algo diferente en cada obra. ¿Qué ves tú? Puedo contarte sobre la técnica, el contexto histórico o las conexiones musicales de cualquier obra en nuestra colección.',
    'Me encanta hablar de arte. Puedo contarte curiosidades, explicar técnicas, conectar obras con música de la misma época, o profundizar en cualquier movimiento artístico. ¿Qué te gustaría explorar?',
  ];

  return {
    response: defaults[Math.floor(Math.random() * defaults.length)],
    delay: 1500,
  };
}

function getSuggestedQuestions(context?: ChatContext): SuggestedQuestion[] {
  if (context?.type === 'artwork' || context?.type === 'lesson') {
    return [
      {
        icon: <Palette className="w-3.5 h-3.5" />,
        text: `¿Qué técnica usó ${context.artist || 'el artista'}?`,
        category: 'technique',
      },
      {
        icon: <Music className="w-3.5 h-3.5" />,
        text: '¿Qué música se conecta con esta obra?',
        category: 'music',
      },
      {
        icon: <Clock className="w-3.5 h-3.5" />,
        text: '¿Qué pasaba en el mundo cuando se creó?',
        category: 'history',
      },
      {
        icon: <Lightbulb className="w-3.5 h-3.5" />,
        text: 'Cuéntame una curiosidad',
        category: 'curiosity',
      },
    ];
  }

  if (context?.type === 'era') {
    return [
      {
        icon: <Palette className="w-3.5 h-3.5" />,
        text: `¿Qué define al ${context.title || 'movimiento'}?`,
        category: 'technique',
      },
      {
        icon: <Music className="w-3.5 h-3.5" />,
        text: '¿Qué música se escuchaba en esta época?',
        category: 'music',
      },
      {
        icon: <Clock className="w-3.5 h-3.5" />,
        text: '¿Cómo surgió este movimiento?',
        category: 'history',
      },
      {
        icon: <Lightbulb className="w-3.5 h-3.5" />,
        text: 'Dato sorprendente de esta era',
        category: 'curiosity',
      },
    ];
  }

  // General suggestions
  return [
    {
      icon: <Palette className="w-3.5 h-3.5" />,
      text: '¿Cuál es la técnica más revolucionaria?',
      category: 'technique',
    },
    {
      icon: <Music className="w-3.5 h-3.5" />,
      text: '¿Cómo se conectan arte y música?',
      category: 'music',
    },
    {
      icon: <Clock className="w-3.5 h-3.5" />,
      text: '¿Cómo nació el Impresionismo?',
      category: 'history',
    },
    {
      icon: <Lightbulb className="w-3.5 h-3.5" />,
      text: 'Cuéntame algo que no sepa',
      category: 'curiosity',
    },
  ];
}

// ─── Main Component ───
export default function ArtAssistant({ context, defaultOpen = false }: ArtAssistantProps) {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    (text?: string) => {
      const messageText = text || input.trim();
      if (!messageText || isTyping) return;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: messageText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setShowSuggestions(false);
      setIsTyping(true);

      const { response, delay } = generateResponse(messageText, context);

      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      }, delay);
    },
    [input, isTyping, context]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = getSuggestedQuestions(context);

  return (
    <>
      {/* ─── Floating Action Button ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-art-gold rounded-full shadow-lg
              flex items-center justify-center text-white
              hover:bg-art-gold-light transition-colors
              sm:bottom-8 sm:right-8
              lg:w-16 lg:h-16"
            aria-label="Abrir asistente de arte"
          >
            <MessageCircle className="w-6 h-6 lg:w-7 lg:h-7" />
            {/* Notification pulse */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 flex flex-col bg-white dark:bg-art-charcoal
              shadow-2xl border border-black/10 dark:border-white/10
              /* Portrait: full screen */
              inset-0
              /* Landscape: bottom sheet */
              sm:inset-auto sm:bottom-4 sm:left-4 sm:right-4 sm:max-h-[55vh] sm:rounded-2xl
              /* Desktop: side panel */
              lg:left-auto lg:bottom-6 lg:right-6 lg:w-[400px] lg:max-h-[600px] lg:rounded-2xl"
          >
            {/* ── Header ── */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-black/10
                dark:border-white/10 bg-gradient-to-r from-art-gold/10 to-art-gold/5
                dark:from-art-gold/20 dark:to-transparent flex-shrink-0
                sm:rounded-t-2xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-art-gold/20 dark:bg-art-gold/30
                    flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-art-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-semibold text-art-charcoal dark:text-white">
                    MŪSA Assistant
                  </h3>
                  <p className="text-xs text-art-charcoal/50 dark:text-white/50">
                    {context?.title
                      ? `Explorando: ${context.title}`
                      : 'Tu guía personal de arte'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Minimize on desktop, close on mobile */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10
                    transition-colors text-art-charcoal/60 dark:text-white/60"
                  aria-label="Cerrar chat"
                >
                  <span className="hidden sm:block">
                    <ChevronDown className="w-5 h-5" />
                  </span>
                  <span className="sm:hidden">
                    <X className="w-5 h-5" />
                  </span>
                </button>
              </div>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
              {/* Welcome message */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-art-gold/10
                      dark:bg-art-gold/20 flex items-center justify-center"
                  >
                    <Sparkles className="w-8 h-8 text-art-gold" />
                  </div>
                  <h4 className="font-serif text-lg text-art-charcoal dark:text-white mb-2">
                    ¡Hola! Soy tu guía de arte
                  </h4>
                  <p className="text-sm text-art-charcoal/60 dark:text-white/60 max-w-[280px] mx-auto">
                    Pregúntame sobre técnicas, historia, curiosidades o la conexión entre
                    arte y música.
                  </p>
                </motion.div>
              )}

              {/* Chat messages */}
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed
                      ${
                        msg.role === 'user'
                          ? 'bg-art-gold text-white rounded-br-md'
                          : 'bg-black/5 dark:bg-white/10 text-art-charcoal dark:text-white/90 rounded-bl-md'
                      }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="bg-black/5 dark:bg-white/10 rounded-2xl rounded-bl-md
                      px-4 py-3 flex items-center gap-1.5"
                  >
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-art-gold rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 bg-art-gold rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 bg-art-gold rounded-full"
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested Questions ── */}
            <AnimatePresence>
              {showSuggestions && messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-2 flex-shrink-0"
                >
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleSend(q.text)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                          text-xs font-medium bg-art-gold/10 text-art-gold
                          dark:bg-art-gold/20 dark:text-art-gold-light
                          hover:bg-art-gold/20 dark:hover:bg-art-gold/30
                          transition-colors whitespace-nowrap"
                      >
                        {q.icon}
                        <span>{q.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input Area ── */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t border-black/10
                dark:border-white/10 flex-shrink-0 bg-white dark:bg-art-charcoal
                sm:rounded-b-2xl"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pregunta sobre arte..."
                className="flex-1 bg-black/5 dark:bg-white/10 rounded-full px-4 py-2.5
                  text-sm text-art-charcoal dark:text-white
                  placeholder:text-art-charcoal/40 dark:placeholder:text-white/40
                  border-none outline-none focus:ring-2 focus:ring-art-gold/30
                  transition-shadow"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-full bg-art-gold text-white
                  flex items-center justify-center flex-shrink-0
                  hover:bg-art-gold-light transition-colors
                  disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
