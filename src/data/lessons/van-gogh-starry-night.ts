/**
 * MŪSA Lesson: Van Gogh's "La Noche Estrellada" (The Starry Night)
 *
 * A cinematic journey through Van Gogh's most iconic masterpiece.
 * Post-Impressionist era, 1889. Where emotion becomes color, and the night sky becomes a symphony.
 */

export interface NarrativeBlock {
  type: 'intro' | 'story' | 'technique' | 'music' | 'context' | 'reflection' | 'quiz';
  title?: string;
  content?: string;
  imageUrl?: string;
  questions?: QuizQuestion[];
  notes?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  slug: string;
  titleEs: string;
  titleEn: string;
  artistEs: string;
  artistEn: string;
  eraEs: string;
  eraEn: string;
  era: 'renaissance' | 'baroque' | 'impressionism' | 'post-impressionism' | 'expressionism' | 'modernism';
  difficulty: 'starter' | 'explorer' | 'enthusiast' | 'connoisseur';
  durationMinutes: number;
  imageUrl: string;
  yearCreated: number;
  narrativeBlocks: NarrativeBlock[];
  relatedArtworks: RelatedArtwork[];
  musicConnections: MusicConnection[];
}

export interface RelatedArtwork {
  titleEs: string;
  titleEn: string;
  year: number;
  imageUrl: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface MusicConnection {
  composer: string;
  piece: string;
  era: string;
  spotifyId?: string;
  youtubeId?: string;
  explanationEs: string;
  explanationEn: string;
}

export const VAN_GOGH_STARRY_NIGHT: Lesson = {
  slug: 'van-gogh-starry-night',
  titleEs: 'La Noche Estrellada',
  titleEn: 'The Starry Night',
  artistEs: 'Vincent van Gogh',
  artistEn: 'Vincent van Gogh',
  eraEs: 'Post-Impresionismo',
  eraEn: 'Post-Impressionism',
  era: 'post-impressionism',
  difficulty: 'starter',
  durationMinutes: 15,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  yearCreated: 1889,

  narrativeBlocks: [
    {
      type: 'intro',
      title: 'Junio de 1889',
      content: `Saint-Rémy-de-Provence. Un hombre delgado, de barba roja y ojos que arden con una intensidad casi insoportable, se asoma por la ventana de su habitación en el asilo. Su nombre es Vincent van Gogh. Hace tres meses que llegó a este lugar, pero para él, cada noche es una batalla.

La noche lo hipnotiza. No es la oscuridad lo que busca, sino todo lo que la noche contiene: misterio, soledad, belleza infinita. Mientras otros duermen, Vincent se queda mirando el cielo. Y esa noche de junio, cuando la luna llena brilla sobre las colinas de Provenza, algo extraordinario ocurre en su mente.

Su pincel tiembla. Toma un lienzo. Y comienza a pintar.`,
    },
    {
      type: 'story',
      title: 'La Llamada de la Noche',
      content: `Durante años, Vincent van Gogh fue un hombre destruido. Fracaso tras fracaso: como misionero, como artista, como amigo. Su relación con su hermano Theo era su única ancla en la realidad. Pero en 1888 llegó a Arles, en el sur de Francia, y algo cambió. El color brillante del Mediterráneo lo despertó.

Aquí, bajo el sol implacable de Provenza, Vincent descubrió que podía pintar. Que podía expresar lo que nadie más podía ver: el corazón latiendo dentro de cada árbol, cada casa, cada rayo de luz.

Pero la paz nunca llegó. El incidente con Gauguin, su cortada de oreja, el hospital... En mayo de 1889, ingresa voluntariamente al asilo de Saint-Paul-de-Mausole. Es un hombre que intenta salvarse a sí mismo.

Una noche, cuando el insomnio lo tortura, Vincent observa desde su ventana. El pueblo está dormido. Las estrellas brillan con una intensidad que solo él puede sentir. Esa noche, pinta su primer "Noche Estrellada" — una versión de lo que ve, pero transformada por su mente ardiente. Después pinta otra. Y otra más.

La tercera, la que el mundo conocerá, es la más poderosa. No es una simple representación de la noche. Es una sinfonía visual. Es el grito silencioso de un hombre que lucha contra sus demonios. Es su alma pintada en azul, oro y blanco.`,
    },
    {
      type: 'technique',
      title: 'El Movimiento en el Silencio',
      content: `Cuando observas "La Noche Estrellada" por primera vez, lo primero que sientes es el movimiento. El cielo no está quieto — está vivo, está respirando. ¿Cómo lo logró Vincent?

**El Pincel como Instrumento Musical:**
Mira los trazos. Son cortos, deliberados, apasionados. No son los trazos suaves y sutiles de los Impresionistas. Vincent utiliza el pincel como si fuera un instrumento musical, cada trazo es una nota. Los trazos circulares alrededor de las estrellas y la luna crean una sensación de vibración, de energía radiante.

**El Color Revolucionario:**
El cielo no es azul. Bueno, sí es azul, pero es un azul que no existe en la naturaleza. Es azul ultramarino profundo, azul cobalto, todo mezclado con notas de púrpura. Y esas estrellas no son amarillas — son un amarillo cadmio brillante que casi quema cuando las miras. Las estrellas no brillan en el cielo nocturno real así, pero ¿acaso importa? Vincent no pinta lo que ve. Pinta lo que *siente*.

**La Composición Diagonal:**
El pueblo — ese pequeño pueblo dormido — está en la parte inferior. La iglesia se eleva como un símbolo de esperanza, pero se retuerce, se estira hacia el cielo. El cielo ocupa casi toda la pintura. No hay equilibrio aquí. Hay tensión. Hay un hombre mirando hacia arriba, deseando algo más grande que él.

**Los Colores Complementarios:**
Este es el verdadero secreto. Los azules están junto a los naranjas, los amarillos contra los púrpuras. Estos colores "pelean" entre sí, crean una vibración óptica que te mantiene mirando. No puedes dejar de mirar. Es como si la pintura misma estuviera brillando.

La técnica de Vincent es Post-Impresionista. Los Impresionistas buscaban capturar un momento, la luz jugando en una superficie. Vincent va más allá. Usa el color y la forma para expresar una emoción profunda, universal. Es el puente entre el Impresionismo y el Expresionismo moderno.`,
    },
    {
      type: 'context',
      title: 'El Viaje hasta la Noche Estrellada',
      content: `**1853:** Nace Vincent Willem van Gogh en Groot-Zundert, un pequeño pueblo en Brabante, Holanda.

**1869-1876:** Vincent intenta varias profesiones — trabajador de tienda, maestro, predicador. Fracasa en todas ellas. Pero en cada fracaso, encuentra un poco más de él mismo.

**1880:** A los 27 años, decide convertirse en artista. Su familia lo considera loco. Pero su hermano Theo, que trabaja en la galería Goupil, lo apoya. Sin Theo, Vincent nunca habría sobrevivido.

**1886:** Se muda a París. Aquí descubre a los Impresionistas — Monet, Cézanne, Seurat. Su técnica cambia dramáticamente. Los colores se vuelven más brillantes, más apasionados.

**1888:** Viaja al sur. "Querría pintarme a mí mismo aquí," escribe en una carta. Produce más de 300 obras en Arles. Es su período más fértil, más feliz. Pero la soledad lo persigue.

**Diciembre 1888:** El incidente con Gauguin. Cortarse la oreja no fue un acto de locura, sino de desesperación. Un grito silencioso.

**1889:** Ingresa al asilo de Saint-Paul-de-Mausole. En este lugar donde la sociedad lo ha enterrado vivo, produce algunas de sus obras maestras. La Noche Estrellada es una de ellas.

**Junio 1889:** Pinta la versión definitiva, el cuadro que el mundo recordará para siempre.

**1890:** Muere a los 37 años, nunca sabiendo que su arte cambiaría la historia. Solo Theo creyó en él hasta el final.`,
    },
    {
      type: 'music',
      title: 'La Sinfonía de las Estrellas',
      content: `Si pudieras escuchar "La Noche Estrellada", ¿qué música sonaría?

Muchos piensan en música clásica turbulenta, desgarrada. Pero la verdad es más sutil, más profunda.

**Debussy — Clair de Lune (Luz de Luna):**
Cuando escuchas esta pieza, entiendes a Vincent. Debussy (1862-1918) era contemporáneo de Van Gogh, vivía en París mientras Vincent luchaba en el sur. Ambos buscaban lo mismo: transformar la realidad en emoción pura.

Clair de Lune comienza suave, casi imperceptible. Luego, como las estrellas en el cuadro de Vincent, comienza a brillar. No es una descripción literal de la luna. Es la *sensación* de la luna, el misterio, la melancolía, la esperanza. Los acordes de Debussy son vagos, borrosos, como si alguien estuviera pintándolos en el aire.

"La música es una nebulosa," dijo Debussy. Y eso es exactamente lo que Vincent vio en el cielo esa noche.

**Erik Satie — Gymnopédies:**
Las Gymnopédies de Satie (1845-1925) son estrañamente tranquilas, desoladas, solitarias. Escuchalas en la oscuridad y entenderás la soledad de Vincent en el asilo. No hay drama, no hay explosión. Solo una tristeza tan profunda que se convierte en belleza.

**La Conexión Profunda:**
Tanto Debussy como Satie, como Van Gogh, fueron revolucionarios. No querían copiar la naturaleza. Querían expresar lo que se encontraba *dentro* — las emociones, los sueños, el subconsciente.

Cuando mires la Noche Estrellada, imagina a Debussy tocando Clair de Lune. Imagina la luna flotante, las estrellas brillando como las notas de la música, el pequeño pueblo dormido, el hombre en la ventana — todos conectados por un hilo de belleza desesperada y maravillosa.

La pintura y la música nacen de la misma fuente: el corazón humano gritando hacia el infinito.`,
    },
    {
      type: 'reflection',
      title: 'Lo que La Noche Estrellada nos Dice',
      content: `Cuando Vincent van Gogh pintaba en su habitación del asilo, no sabía que pintaba el futuro del arte. No sabía que transformaría la pintura para siempre.

La Noche Estrellada nos dice algo profundo: que la belleza puede nacer del sufrimiento. Que un hombre roto, rechazado por la sociedad, despreciado incluso por la mayoría de sus amigos, puede crear algo que tocará el corazón de millones.

Nos dice que no necesitamos pintar lo que vemos. Necesitamos pintar lo que *sentimos*. Los Impresionistas capturaban un momento. Vincent captura una emoción eterna.

Nos dice que el color tiene poder. Que el azul y el amarillo pueden hacer que llores. Que el movimiento puede existir en el silencio de la noche.

Nos dice que incluso en el asilo, incluso en la soledad más profunda, la creatividad puede florecer. La mente de Vincent era un asilo, sí, pero también era un universo.

Cuando mires esta pintura, no pienses en un cuadro colgado en una pared. Piensa en una carta de amor de un hombre a la vida, incluso cuando la vida lo rechazaba. Piensa en la prueba de que el arte puede salvarnos.`,
    },
    {
      type: 'quiz',
      title: 'Prueba tu Conocimiento',
      content: 'Responde las siguientes preguntas sobre "La Noche Estrellada" y lo que hemos aprendido.',
      questions: [
        {
          id: 'q1',
          question: '¿En qué año pintó Van Gogh "La Noche Estrellada"?',
          options: ['1887', '1888', '1889', '1890'],
          correctAnswer: 2,
          explanation: 'Van Gogh pintó "La Noche Estrellada" en junio de 1889 mientras estaba en el asilo de Saint-Paul-de-Mausole en Saint-Rémy-de-Provence.',
        },
        {
          id: 'q2',
          question: '¿Cuál de estos NO es un elemento visual clave en "La Noche Estrellada"?',
          options: ['Las estrellas brillantes en espiral', 'Una iglesia retorcida', 'Montañas verdes', 'Un río plateado'],
          correctAnswer: 3,
          explanation: 'No hay un río plateado prominente en "La Noche Estrellada". Los elementos clave son las estrellas en espiral, la luna brillante, la iglesia retorcida, el ciprés oscuro y el pueblo dormido.',
        },
        {
          id: 'q3',
          question: '¿Qué movimiento artístico precede al Post-Impresionismo que influenció a Van Gogh?',
          options: ['Barroco', 'Rococó', 'Impresionismo', 'Modernismo'],
          correctAnswer: 2,
          explanation: 'El Impresionismo precedió al Post-Impresionismo. Van Gogh fue influenciado por los Impresionistas como Monet y luego desarrolló su propio estilo más expresivo.',
        },
        {
          id: 'q4',
          question: '¿Cuál de estos compositores fue contemporáneo de Van Gogh y compartió una filosofía artística similar?',
          options: ['Wolfgang Amadeus Mozart', 'Claude Debussy', 'Ludwig van Beethoven', 'Franz Schubert'],
          correctAnswer: 1,
          explanation: 'Claude Debussy (1862-1918) fue contemporáneo de Van Gogh y ambos buscaban transformar la realidad en emoción pura a través de sus respectivos medios artísticos.',
        },
        {
          id: 'q5',
          question: '¿Qué técnica especial usó Van Gogh en "La Noche Estrellada" para crear movimiento?',
          options: [
            'Perspectiva líneal fija',
            'Trazos cortos y deliberados en forma circular y diagonal',
            'Colores pastel suaves',
            'Simetría perfecta',
          ],
          correctAnswer: 1,
          explanation: 'Van Gogh utilizó trazos cortos, deliberados e intensos, muchos de ellos en formaciones circulares alrededor de las estrellas y la luna, creando una sensación de vibración y movimiento dinámico.',
        },
      ],
    },
  ],

  relatedArtworks: [
    {
      titleEs: 'La Noche Estrellada sobre el Ródano',
      titleEn: 'The Starry Night Over the Rhone',
      year: 1888,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/1888_-_Starry_Night_Over_the_Rhone.jpg',
      descriptionEs: 'Pintada en Arles, esta versión muestra las luces del gas reflejándose en el agua del Ródano. El estilo es similar pero menos turbulento que su hermana más famosa.',
      descriptionEn: 'Painted in Arles, this version shows gas lights reflecting in the waters of the Rhone. The style is similar but less turbulent than its more famous counterpart.',
    },
    {
      titleEs: 'El Café de Noche',
      titleEn: 'The Night Café',
      year: 1888,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1888_-_The_Night_Caf%C3%A9.jpg',
      descriptionEs: 'Otra exploración de Vincent sobre la noche, esta vez en un café de Arles. Los colores vibrantes y la perspectiva distorsionada comunican la ansiedad y la soledad.',
      descriptionEn: 'Another exploration of Vincent about the night, this time in a café in Arles. The vibrant colors and distorted perspective communicate anxiety and loneliness.',
    },
    {
      titleEs: 'Autorretrato con Oreja Vendada',
      titleEn: 'Self-Portrait with Bandaged Ear',
      year: 1889,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/63/SelfPortrait1889_VanGogh.jpg',
      descriptionEs: 'Pintado poco después del incidente de diciembre de 1888, este autorretrato muestra a Vincent enfrentando su dolor con dignidad y compasión hacia sí mismo.',
      descriptionEn: 'Painted shortly after the December 1888 incident, this self-portrait shows Vincent facing his pain with dignity and compassion toward himself.',
    },
  ],

  musicConnections: [
    {
      composer: 'Claude Debussy',
      piece: 'Clair de Lune (Moonlight)',
      era: 'Impresionismo Musical',
      youtubeId: 'CvFH_6DNRCY',
      explanationEs: 'Esta pieza captura la misma esencia que "La Noche Estrellada": transformar la observación visual en una experiencia emocional pura. Debussy crea una "nebulosa" de sonido, así como Vincent crea una nebulosa de color. Ambos no describen la luna o la noche, sino la *sensación* de contemplarlas.',
      explanationEn: 'This piece captures the same essence as "The Starry Night": transforming visual observation into a pure emotional experience. Debussy creates a "nebula" of sound, just as Vincent creates a nebula of color. Both do not describe the moon or night, but the *feeling* of contemplating them.',
    },
    {
      composer: 'Erik Satie',
      piece: 'Gymnopédie No. 1',
      era: 'Impresionismo Musical',
      youtubeId: 'S-Xm7s9eGxU',
      explanationEs: 'Las Gymnopédies de Satie son extraordinariamente solitarias y melancólicas, perfectamente alineadas con la soledad de Vincent en el asilo. Sin drama ni explosión, solo una tristeza profunda que se convierte en una terrible belleza. Escúchala imagining a Vincent en su ventana.',
      explanationEn: 'Satie\'s Gymnopédies are extraordinarily lonely and melancholic, perfectly aligned with Vincent\'s loneliness in the asylum. Without drama or explosion, just a deep sadness that becomes a terrible beauty. Listen to it while imagining Vincent at his window.',
    },
  ],
};
