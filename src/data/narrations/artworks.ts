/**
 * MŪSA Cinematic Narrations — Artwork Voice Scripts
 *
 * Each narration is designed to be read aloud by a sophisticated female voice
 * in a documentary style—intimate, warm, deeply knowledgeable, never academic.
 *
 * The segments guide pacing and emotion:
 * - Segment 1 (dramatic): Hook the listener with atmosphere
 * - Segment 2-3 (normal): Story, context, artist's state of mind
 * - Segment 4 (normal): Technique and innovation
 * - Segment 5 (soft): Emotional resonance and lasting impact
 *
 * Total duration: 30-60 seconds when read aloud at natural pace.
 */

export interface NarrationSegment {
  text: string;
  pause?: number; // milliseconds to pause after this segment
  emphasis?: 'soft' | 'normal' | 'dramatic';
}

export interface ArtworkNarration {
  titleKey: string;
  segments: NarrationSegment[];
  musicConnection: string;
  musicSuggestion: string; // YouTube search query
}

export const ARTWORK_NARRATIONS: Record<string, ArtworkNarration> = {
  // ────────────────── RENAISSANCE ──────────────────

  /**
   * Mona Lisa - Leonardo da Vinci (1503)
   * The gateway artwork: mysterious, timeless, intimate
   */
  monaLisa: {
    titleKey: 'timeline.artworks.monaLisa',
    segments: [
      {
        text: 'Florencia, mil quinientos tres. Leonardo da Vinci trabaja en un lienzo pequeño, apenas setenta y siete centímetros. Está pintando a Lisa Gherardini, pero no está pintando su rostro. Está pintando un misterio.',
        emphasis: 'dramatic',
        pause: 1200,
      },
      {
        text: 'Mira esa sonrisa. No es alegría. No es tristeza. Es algo que vive entre los dos, que cambia cada vez que la miras desde un ángulo diferente. Leonardo lleva años perfeccionando esta técnica que llama sfumato—desvanecimiento. Suavidad. Misterio.',
        emphasis: 'normal',
        pause: 1500,
      },
      {
        text: 'La pintura viaja por Europa durante siglos, casi desapercibida. Pero en mil ochocientos sesenta, algo cambió. Un robo en el Louvre la convierte en legendaria. De repente, todos quieren ver la pintura que nadie podía ignorar.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'La sfumato de Leonardo no tiene líneas duras. Los contornos se desvanecen en la atmósfera misma. Esta fue la revolución: la luz y la sombra hablando en susurros, no en gritos.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'Miramos esa sonrisa hoy, quinientos años después, y seguimos preguntándonos: ¿quién es realmente? Y quizás esa es la belleza. Una obra maestra no es lo que cuenta. Es lo que calla.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'El enigma delicado de la música de Debussy, donde la armonía flota sin ancla definitiva',
    musicSuggestion: 'Debussy Clair de lune piano classical',
  },

  /**
   * The Birth of Venus - Sandro Botticelli (1485)
   * Rebirth of beauty, neoplatonic ideal, the Medici dream
   */
  birthOfVenus: {
    titleKey: 'timeline.artworks.birthOfVenus',
    segments: [
      {
        text: 'Un lienzo inmenso, casi dos metros y medio de ancho. La diosa del amor surge del mar, no como un cuerpo, sino como una promesa. Botticelli la pinta en mil cuatrocientos ochenta y cinco, cuando Florencia es el corazón palpitante del renacimiento.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Los mecenas Medici comisionaron esta obra, pero no como simple decoración. Es un manifiesto. Buscan revivir la antigüedad clásica, esa luz que brilló en Grecia hace dos mil años. Venus representa la belleza perfecta, el conocimiento puro, la humanidad redimida.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'Mira el cabello rubio de Venus: no es oro, es luz pura fluyendo como agua. Sus ojos no miran nada específico. Miran adentro, hacia la eternidad. El viento mismo sopla flores alrededor de ella en un danza eterna.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Botticelli no usa perspectiva lineal como otros artistas. El espacio flota, grácil, onírico. Las líneas son delgadas, casi tímidas. La sombra es mínima. Es como si el pintor estuviera dibujando lo que sueña, no lo que ve.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Quinientos años después, esta Venus sigue siendo la más hermosa jamás pintada. No por su anatomía, sino porque Botticelli entendió algo profundo: la belleza verdadera no tiene peso. Flota. Respira. Existe en el aire entre el pasado y el futuro.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Las suites instrumentales renacentistas de Monteverdi, puro deleite suspendido en el aire',
    musicSuggestion: 'Monteverdi Renaissance instrumental chamber music',
  },

  /**
   * The Creation of Adam - Michelangelo (1512)
   * The Sistine Chapel secret, the moment of spark, divine touch
   */
  creationOfAdam: {
    titleKey: 'timeline.artworks.creationOfAdam',
    segments: [
      {
        text: 'Cuatro años. Michelangelo está tumbado boca arriba en un andamio en la Capilla Sixtina, pincel en mano, brazo levantado hacia un techo que no puede ver bien. Su cuerpo grita, pero sus ojos ven a Dios tomando forma en la eternidad.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Es el momento del comienzo. Dios, envuelto en un torbellino de poder, se acerca a Adán—desnudo, suave, casi dormido en la tierra. Dos dedos nunca se han tocado en el arte occidental. Son solo milímetros, pero universos de separación.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'Michelangelo entiende el drama humano como pocos. Ha diseccionado cadáveres para entender la anatomía perfecta. Ve en Adán no solo a un hombre, sino a la humanidad entera—vulnerable, buscando, a punto de despertar.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'La técnica del fresco exige perfección absoluta. El pigmento debe aplicarse sobre el yeso fresco. No hay segundas oportunidades. Una línea equivocada permanece para siempre. Michelangelo pinta como si estuviera en conversación directa con lo divino.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'En esa brecha minúscula entre dos dedos, está todo. El misterio de la creación. El salto entre materia y espíritu. Y todos nos vemos reflejados en Adán—dormidos, esperando el toque que nos haga reales.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La Novena Sinfonía de Beethoven con su "Oda a la Alegría", apoteosis del espíritu humano',
    musicSuggestion: 'Beethoven Ninth Symphony Ode to Joy',
  },

  // ────────────────── BAROQUE ──────────────────

  /**
   * Girl with a Pearl Earring - Johannes Vermeer (1665)
   * Light mastery, the unknown muse, timeless youth
   */
  girlPearlEarring: {
    titleKey: 'timeline.artworks.girlPearlEarring',
    segments: [
      {
        text: 'No sabemos quién es. Es un misterio envuelto en luz dorada. Una muchacha gira sobre su hombro, mira directamente a los ojos del pintor—y por extensión, a ti. Su pendiente brilla como una luna capturada en plata.',
        emphasis: 'dramatic',
        pause: 1200,
      },
      {
        text: 'Vermeer trabaja en Ámsterdam a mediados del diecisiete, pero sabemos poco de él. Tímido, probablemente. Trabajando en la luz que entra por sus ventanas, hora tras hora, perfeccionando cada detalle de las sombras.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'El pintor viste a la muchacha con un turbante exótico de añil y mostaza, colores que sugieren aventura, comercio lejano. Pero no es vanidad. Es juego. Es sueño. El fondo es completamente oscuro—ella flota en una negrura abisal.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Vermeer domina la luz como nadie en su época. Ve cómo toca el lóbulo de la oreja, cómo se refleja en la perla, cómo crea una suavidad imposible en la piel. Utiliza una técnica llamada "punto" — pequeños toques de pintura pura que el ojo mezcla a distancia.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Miramos este rostro y vemos humanidad en su forma más pura. Curiosidad. Presencia. La perla no es joyería. Es la luz del alma capturada en una gota. Es el momento en que alguien se da cuenta de que está siendo visto.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Las sonatas para violín de Bach, donde la luz toca cada nota con precisión amorosa',
    musicSuggestion: 'Bach Violin Sonatas baroque classical',
  },

  // ────────────────── JAPONÉS UKIYO-E ──────────────────

  /**
   * The Great Wave off Kanagawa - Katsushika Hokusai (1831)
   * Mount Fuji's patience, the fishermen's courage, Western transformation
   */
  greatWave: {
    titleKey: 'timeline.artworks.greatWave',
    segments: [
      {
        text: 'Una ola colosal se levanta sobre el océano, sus garras blancas clawing al cielo, amenazando a tres barcas de pescadores diminutos. Atrás, diminuta, nevado, perfectamente triangular: el Monte Fuji. Hokusai tiene setenta años cuando crea esto en mil ochocientos treinta y uno.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Hokusai es un grabador xilográfico. No pinta directamente. Esculpe su imagen en bloques de madera separados—uno para cada color. El control requiere precisión obsesiva. Pero la espontaneidad sigue viva. El movimiento es feroz, casi salvaje.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Dice que su maestro tarda treinta años en aprender el arte del dibujo, pero nunca lo logra completamente. Hokusai declara que solo a los ochenta años empieza a comprender la verdadera naturaleza de todas las cosas. Esta ola es su sabiduría hecha visión.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'El azul de Prusia. Ese es el secreto revolucionario. Nuevo pigmento de Occidente llega a Japón, y Hokusai lo adora. Lo usa de forma atrevida. El azul oscuro del cielo contrasta con las crestas blancas puras. El grabado es simple, pero profundamente sofisticado.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Cuando esta imagen llegó a Europa, cambió todo. Monet, Van Gogh, los Impresionistas quedaron obsesionados. No sabían que estaban viendo el futuro del arte occidental. Hokusai, un maestro japonés anciano, ya había visto todo. Y pintó el momento antes del fin, cuando la naturaleza toma los oídos.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La música koto tradicional japonesa con sus tonos suspendidos y fluidos como agua',
    musicSuggestion: 'Japanese koto classical music ocean waves',
  },

  // ────────────────── POST-IMPRESSIONISM ──────────────────

  /**
   * The Starry Night - Vincent van Gogh (1889)
   * The asylum, the emotional sky, swirling turbulence
   */
  starryNight: {
    titleKey: 'timeline.artworks.starryNight',
    segments: [
      {
        text: 'Van Gogh está solo en un asilo en Saint-Rémy en junio de mil ochocientos ochenta y nueve. Su oreja está vendada. Su mente hierve. Pinta de memoria, de noche, una vista desde su ventana mientras duerme el mundo. El cielo no es azul. Es un torbellino de oro y ultramarino.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Las once estrellas no están colocadas donde están en el cielo real. Van Gogh las pinta donde necesita que estén emocionalmente. Quiere que girar alrededor de la luna en espirales de fuego. Quiere que el cosmos baile. Está retratando su turbulencia interior en cosmología.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'El pueblo abajo está tranquilo, dormido. Hay una iglesia con un campanario que sube como una vela hacia ese cielo tormentoso. Van Gogh, protestante en crisis espiritual, pinta la fe como un anhelo físico hacia lo desconocido.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Sus pinceladas son gruesas, casi violentas. Usa técnica llamada impasto—pigmento tan denso que proyecta sombra. El cielo no es una vista. Es una superficie táctil, casi esculpida. Los colores chocan sin mezcla: amarillo y azul vibran juntos en una tensión eterna.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Es la pintura más triste y hermosa jamás creada. Porque Van Gogh no pinta lo que ve. Pinta lo que siente. Y miramos su dolor, su soledad en esa habitación de asilo, y reconocemos nuestro propio cielo nocturno. Todos vivimos bajo ese torbellino de estrellas.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La Claro de Luna de Debussy, donde la melancolía y la belleza son sinónimos',
    musicSuggestion: 'Debussy Clair de lune starry night classical piano',
  },

  /**
   * The Kiss - Gustav Klimt (1908)
   * Vienna at the edge, gold leaf as revolution, love as refuge
   */
  theKiss: {
    titleKey: 'timeline.artworks.theKiss',
    segments: [
      {
        text: 'Viena, mil novecientos ocho. Klimt pinta a una pareja en el acto de besarse en un fondo plateado que flota en la nada. Pero este no es un beso romántico simple. Es encaje. Es decoración. Es obsesión. Cada centímetro es oro, es patrón, es inclinación del artista hacia lo sublime.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Klimt es el presidente de la Secesión Viena, movimiento artístico radical que rechaza la tradición académica. En ese momento, Europa está al borde del abismo. Pero Klimt pinta más flores, más oro, más belleza. Es un acto de defensa mediante la estética.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'La pareja no tiene rostro claramente definido. Sus cuerpos desaparecen en patrones geométricos. Rectángulos dorados rodean al hombre. Flores circulares rodean a la mujer. Casi no son individuos. Son arquetipos de un sueño decorativo.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Klimt utiliza pan de oro genuino, aplicado directamente al lienzo. Cada patrón es dibujado con obsesión pequeño-burguesa. Pero la escala es monumental. El lienzo tiene casi dos metros cuadrados. El beso parece eterno, aprisionado en lujo.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'En un mundo que se desmorona—a punto de una guerra terrible—Klimt pinta amor como último refugio. No en carne. No en vulnerabilidad. En oro, en patrones, en una realidad más verdadera que la realidad. Es el beso del fin del mundo, y es hermoso.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Óperas de Wagner, particularmente "Tristan e Isolda", con sus armonías sensuales prohibidas',
    musicSuggestion: 'Wagner Tristan Isolda opera dramatic',
  },

  /**
   * The Scream - Edvard Munch (1893)
   * Anxiety of modernity, the blood-red sky, most relatable painting
   */
  theScream: {
    titleKey: 'timeline.artworks.theScream',
    segments: [
      {
        text: 'Un puente al atardecer. Una figura central contorsionada, manos sobre el rostro, boca abierta en un grito silencioso. El cielo es rojo—no, es naranja—es sangre transformada en luz. A alrededor, dos figuras caminan indiferentes. Munch pinta mil ochocientos noventa y tres, pero podría ser hoy.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Munch dice que escuchó un grito a través de la naturaleza. No es un hombre gritando. Es la propia realidad gritando. Es angustia transformada en paisaje. Es lo que siente cuando las máquinas dominan, cuando la ciudad crece, cuando la identidad se disuelve en multitud anónima.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Existen cuatro versiones de esta obra. Óleo, pastel, litografía. Como si Munch no pudiera capturar completamente el grito. Cada intento lo toca de nuevo, lo revive. El sufrimiento es reproducible, infinito.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Las líneas ondulantes son casi caricaturescas. El rostro no tiene rasgo claro. Es arcilla emocional. Los colores complementarios chocan—rojo y azul, amarillo y púrpura—creando vibración física en la retina. Mirarlo duele. Exactamente el punto.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Miramos El Grito hoy y vemos nuestra propia ansiedad. No es pasado. Es presente. Es el espejo donde reconocemos que toda la modernidad, toda la velocidad, toda la conexión digital no ha eliminado la sensación de estar solo, de estar perdiéndose en un universo que no responde. Ese es su poder terrible.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La música atonal de Schoenberg, donde la armonía tradicional se desmorona en expresión pura',
    musicSuggestion: 'Schoenberg atonal classical expressionism',
  },

  // ────────────────── SURREALISM ──────────────────

  /**
   * The Persistence of Memory - Salvador Dalí (1931)
   * Melting clocks, the unconscious mind, surrealism as seeing
   */
  persistenceMemory: {
    titleKey: 'timeline.artworks.persistenceMemory',
    segments: [
      {
        text: 'Un reloj de bolsillo se derrite sobre un acantilado rojo. Otro fluye como queso derretido sobre una rama muerta. Un tercero está cubierto de hormigas. Dalí pinta mil novecientos treinta y uno, en respuesta a una pregunta simple: ¿qué es el tiempo realmente?',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Dalí cree en el "paranoia crítica"—una técnica donde pinta sus alucinaciones, sus delirios, su realidad tal como existe en el inconsciente. No es fantasía. Es aún más real que lo real. Los relojes rígidos de la industria se derriten bajo el calor del tiempo verdadero, que es fluido, que es percepción.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'El paisaje es Port Lligat, donde Dalí vive, cerca de la frontera francesa. Pero es Port Lligat transformado. Transformado en sueño. Un cuerpo durmiente ocupa el primer plano, su ojo cerrado. Está soñando todo esto. Tú estás dentro del sueño de Dalí.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Los relojes blandos no cumplen su función. No pueden medir. No pueden controlar. En su lugar, representan la victoria de la memoria sobre la mecánica, la emoción sobre la lógica. Un reloj duro en primer plano está todavía rígido—representando la muerte del tiempo linear, el tiempo muerto.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos esto y nos damos cuenta: el tiempo no es lo que miden los relojes. Es lo que experimentamos. La duración. El olvido. La nostalgia. Dalí ha pintado no el tiempo, sino la memoria del tiempo. Y eso, amiga, es lo único que realmente importa.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Las composiciones minimalistas de John Cage, donde el silencio es tiempo hecho audible',
    musicSuggestion: 'John Cage 4:33 surrealist experimental music',
  },
};
