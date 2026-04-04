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

  // ────────────────── BAROQUE MASTERPIECES ──────────────────

  /**
   * The Night Watch - Rembrandt van Rijn (1642)
   * Dutch Golden Age, dramatic light, militia portrait as narrative
   */
  nightWatch: {
    titleKey: 'timeline.artworks.nightWatch',
    segments: [
      {
        text: 'Ámsterdam, mil seiscientos cuarenta y dos. Rembrandt pinta a una compañía de milicia—treinta personajes en movimiento—pero no es un retrato formal. Es teatro. Es drama. Una luz dorada cae sobre el capitán mientras el resto desaparece en sombras profundas como la noche.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Los burgueses que pagaron por este cuadro esperaban su propia imagen clara, dignificada, reconocible. Pero Rembrandt les da algo mejor: dramaticidad. Les da inmortalidad. Les pinta como héroes en una epopeya que nunca vivieron, pero que merecen.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Una niña pequeña aparece en el caos con una gallina dorada—símbolo del oro, del lujo, de lo inesperado. La escena está llena de movimiento. Algunos cargan mosquetes. Otros tocan el tambor. Es el instante antes de la batalla, congelado en aceite y luz.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Rembrandt revoluciona la técnica del claroscuro. No usa contornos claros. La luz es protagonista, modelando cuerpos, creando volumen, dirigiendo tu atención con precisión cruel. Un pincelada delgada sugiere un rostro. Una mancha de luz define un costado.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'En la oscuridad, toda la humanidad brilla. La milicia se convierte en mito. Y miramos hoy ese lienzo inmenso y entendemos: Rembrandt no pinta lo que es. Pinta lo que podría ser. La grandeza dormida en cada uno de nosotros, esperando que la luz caiga sobre nosotros.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La grandiosidad barroca de Bach, con sus fugues elaboradas y cortesía matemática que suena como drama celestial',
    musicSuggestion: 'Bach Brandenburg Concerto baroque grand',
  },

  /**
   * Las Meninas - Diego Velázquez (1656)
   * The painter\'s masterpiece, impossible perspective, the royal mirror
   */
  lasMeninas: {
    titleKey: 'timeline.artworks.lasMeninas',
    segments: [
      {
        text: 'Velázquez está de pie en el lienzo, pincel en mano, mirando hacia afuera—hacia ti. Detrás de él, una infanta rodeada de damas de honor. En el espejo del fondo, los reyes se reflejan. Pero ¿quién está en primer plano? ¿Quién está siendo pintado? Mil seiscientos cincuenta y seis. Nadie lo sabe.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'La Infanta Margarita es la joven radiante en el centro, pero ella es secundaria a la presencia del artista. Velázquez hace algo revolucionario: se pone a sí mismo en el cuadro, en su propio nivel de importancia que los nobles. El acto de crear es tan importante como lo creado.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'La composición desafía la lógica. Las líneas perspectivas no convergen donde deberían. Los espacios son imposibles. Es como si Velázquez estuviera pintando un sueño donde la geometría se rinde al misterio. La luz entra desde la izquierda, iluminando rostros, dejando otros en sombra intencional.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Usa técnica llamada "sfumato fino"—capas delgadas de pintura, casi transparentes, creando atmósfera más que forma. Los perros en primer plano son casi abstracciones. Las damas de honor flotan con una indiferencia elegante que sugiere que están esperando algo que no pueden nombrar.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Las Meninas es el cuadro más complejo jamás pintado. Trescientos sesenta y ocho años después, seguimos descubriendo nuevos significados. Es un espejo. Es un acertijo. Es Velázquez diciéndole al mundo: lo que ves no es lo que ves. La realidad es más profunda. El pintor es el rey.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Las Cuatro Estaciones de Vivaldi, donde cada movimiento revela un mundo diferente dentro del mismo universo',
    musicSuggestion: 'Vivaldi Four Seasons baroque violin concerto',
  },

  // ────────────────── IMPRESSIONISM ──────────────────

  /**
   * Water Lilies - Claude Monet (1906)
   * The Japanese bridge, optical dissolution, nature as abstraction
   */
  waterLilies: {
    titleKey: 'timeline.artworks.waterLilies',
    segments: [
      {
        text: 'Giverny, Francia. Monet construye un estanque y lo siembra de nenúfares. Luego pasa treinta años mirándolo. El color cambia cada hora: azul al amanecer, rosa al mediodía, púrpura al atardecer. El agua es espejo, es profundidad, es existencia misma.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Monet tiene casi setenta años cuando comienza esta serie. Su obsesión es simple: capturar el momento cuando el agua y el reflejo se vuelven indistinguibles. Pinta la línea de horizonte donde la realidad se disuelve. No hay separación entre arriba y abajo. Todo es color, luz, flotación.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'Sus ojos envejecen. Las cataratas lo afectan. El color se vuelve más cálido, más rojo. Algunos dicen que pinta sus propias enfermedades. Otros dicen que pinta la belleza última: la aceptación de que el tiempo disuelve todas las formas, todas las certezas.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Las pinceladas son libres, casi salvajes. El lienzo es enorme—a veces casi cinco metros de ancho—y la superficie entera vibra con movimiento. No hay punto focal. Tu ojo puede viajar infinitamente en cualquier dirección. Es como estar dentro del agua, viendo desde adentro hacia afuera.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Miramos esto y olvidamos la forma. Olvidamos el significado. Solo queda sensación pura. La música de Debussy hecha pintura. El tiempo desaparece. Somos nenúfares flotando en un universo de color. Y por un momento, entendemos qué significa estar vivo.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La orquesta impresionista de Debussy en "La Mer", donde el océano se vuelve estructura musical flotante',
    musicSuggestion: 'Debussy La Mer impressionist orchestral',
  },

  // ────────────────── MODERN WAR ART ──────────────────

  /**
   * The Third of May 1808 - Francisco Goya (1808)
   * Execution as execution, the birth of modern war art, civilian massacre
   */
  goyaThirdMay: {
    titleKey: 'timeline.artworks.goyaThirdMay',
    segments: [
      {
        text: 'Madrid, el tres de mayo de mil ochocientos ocho. Los franceses fusilaln civiles españoles en represalia. Goya pinta esto treinta años después, pero con la sangre aún fresca en su memoria. Un hombre de brazos abiertos, a punto de morir, iluminado como un mártir en un cuadro religioso. Pero no hay Dios aquí.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Goya es viejo, amargado, sordo. Ha visto dos guerras. Ha visto la revolución española devorar sus hijos. Ha visto a la razón perder contra la brutalidad. Este cuadro es su testamento. Es su grito mudo hecho visible.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'La composición es brutal en su claridad. Un pelotón de fusilamiento—sin rostro, sin individualidad—apunta sus rifles a civiles aterrorizados. El hombre central está casi crucificado, brazos extendidos, camisa blanca bañada en sangre futura. A su alrededor, otros esperan su turno.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Goya inventa la pintura de guerra moderna. No hay gloria aquí. No hay heroísmo. Solo carne y terror. Usa colores oscuros—marrones, negros, grises—excepto por la sangre. La sangre es rojo puro, frecuente, inevitable. La técnica es casi sucia, como si pintara en la oscuridad.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Este cuadro influencia todo lo que viene después. Manet, Picasso, todos ven en Goya la verdad de la guerra. No es política. Es fotografía emocional de la muerte civil. Y al mirarlo, nos vemos nosotros mismos—como ejecutados, como ejecutores, como testigos que no podemos hacer nada.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La música sombreada de Shostakovich, particularmente sus sinfonías oscuras donde la esperanza batalla contra la desesperación',
    musicSuggestion: 'Shostakovich Symphony 7 dark classical war',
  },

  // ────────────────── ROMANTICISM ──────────────────

  /**
   * Liberty Leading the People - Eugène Delacroix (1830)
   * Revolution as grace, the bare-breasted allegory, democracy as artwork
   */
  libertyLeading: {
    titleKey: 'timeline.artworks.libertyLeading',
    segments: [
      {
        text: 'Francia, mil ochocientos treinta. Las barricadas todavía arden. Los cadáveres aún no están enterrados. Delacroix sube a una barricada, observa, luego regresa a su estudio. Pinta a la Libertad—desnuda, radiante, una pica en una mano, la bandera tricolor en la otra—guiando a multitudes de diferentes clases sobre cuerpos de muertos.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Pero esta no es la Libertad de los filósofos. Es Libertad como madre, como mujer, como fuerza vital que emerge del caos. Sus senos están descubiertos, escandaloso para la época. Pero ese desnudez es honestidad. Es pureza en medio del horror.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'A su alrededor, multitudes heterogéneas. Un niño con dos pistolas. Burgueses junto a campesinos. Soldados junto a civiles. Todos bajo un cielo oscuro, todos bañados en luz dorada que parece venir de la Libertad misma. Es lo opuesto a la jerarquía. Es caos convertido en dignidad.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Delacroix es maestro del color dramático. El rojo revolucionario domina sin ser vulgar. Usa pinceladas rápidas, casi salvajes, que sugieren movimiento, urgencia, inevitabilidad. El paisaje urbano está casi destruido—casas quemadas, calles destrozadas—pero la Libertad está intacta, imposible de destruir.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos esto hoy y no vemos una pintura política. Vemos poesía. Vemos el momento eterno donde la opresión se quiebra. Vemos a una mujer que dice: sígueme. No es promesa. Es convocación. Y aunque seamos del siglo veintiséis, sentimos el llamado.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La Symphonie Fantastique de Berlioz, con su pasión desenfrenada y su crescendo de multitud revolucionaria',
    musicSuggestion: 'Berlioz Symphonie Fantastique romantic orchestral',
  },

  /**
   * Wanderer above the Sea of Fog - Caspar David Friedrich (1818)
   * Romantic solitude, the soul confronting infinity, back-turned recluse
   */
  wandererFog: {
    titleKey: 'timeline.artworks.wandererFog',
    segments: [
      {
        text: 'Un hombre de pie sobre un pico montañoso, de espalda a nosotros, mirando un mar de niebla. La niebla es infinita. Las montañas emergen como islas en la nada. Friedrich pinta mil ochocientos dieciocho, capturando el momento donde el alma humana se da cuenta de su pequeñez.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'El hombre no tiene identidad. No podemos ver su rostro. Podría ser cualquiera. Podría ser nosotros. Está solo, pero no parece solo. Está contemplando algo inefable. La niebla no es obstáculo. Es revelación. Es lo Infinito mostrándose a sí mismo.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Friedrich es el pintor del Romanticismo alemán. Cree que la naturaleza es el espejo del alma. Pinta bosques oscuros, monasterios en ruinas, árboles retorcidos. Pero en este cuadro, la naturaleza no es aterradora. Es magnifica. Es un sermón silencioso.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'El color es limitado: grises, azules suaves, marrones. Una chaqueta oscura del Wanderer contrasta contra el cielo turbio. Las líneas son nítidas en primer plano, desaparecen en el misterio. Es técnica romántica pura—claridad donde estamos, misterio donde no estamos.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos el Wanderer y nos vemos reflejados. Todos estamos en una montaña, mirando niebla, preguntándonos qué hay más allá. Y Friedrich no responde. Solo pinta la pregunta. La pregunta es suficiente. Es más que suficiente. Es todo lo que necesitamos.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La Sonata Claro de Luna de Beethoven, donde la soledad se convierte en grandeza y el espíritu se expande',
    musicSuggestion: 'Beethoven Moonlight Sonata romantic piano',
  },

  // ────────────────── REALISM & IMPRESSIONISM BRIDGE ──────────────────

  /**
   * Olympia - Édouard Manet (1863)
   * The prostitute as subject, the direct gaze, scandal and modernity
   */
  olympia: {
    titleKey: 'timeline.artworks.olympia',
    segments: [
      {
        text: 'Un desnudo femenino sobre una cama blanca. Pero esta no es una Venus idealizada. Es una mujer real, con cuerpo real, mira directamente al espectador con una frialdad absoluta. Es mil ochocientos sesenta y tres, y el Salón de París reacciona con horror moral.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Manet la llama Olympia—un nombre de cortesana. Ella sostiene un ramo de flores—regalo de un admirador. Hay una negra traída por la criada, un gesto de exotismo racial. Pero el verdadero escándalo es que Olympia no es seductora. No es romántica. Es transaccional. Es realidad sin poetización.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'La pose está basada en la Venus de Tiziano, obra maestra renacentista. Pero Manet la invierte. En lugar de sumisión melancólica, tenemos agencia. En lugar de fantasía, tenemos comercio. Es el Renacimiento despertando a la modernidad, y la modernidad es incómoda.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Manet pinta con pinceladas planas, casi gráficas. No hay gradaciones suaves de luz. Las formas son definidas por color, no por sombreado. El fondo es vacío—nada que distraiga de la presencia abrumadora de Olympia. Es técnica revolucionaria, casi fotográfica en su frialdad.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Olympia marca el fin de una era y el comienzo de otra. Después de esto, la pintura nunca será solo bella. Debe ser verdadera. Debe atreverse a ofender. Debe mirar a la sociedad a los ojos y decir: esto es lo que eres. Y mientras Chopin toca en salones elegantes, Manet pinta la realidad que nadie quiere ver.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Las Nocturnos de Chopin, donde la elegancia romántica enmasca una melancolía profunda y casi lasciva',
    musicSuggestion: 'Chopin Nocturnes romantic piano',
  },

  /**
   * The Dance Class - Edgar Degas (1874)
   * Ballet as modern subject, the rehearsal studio, grace interrupted
   */
  danceClass: {
    titleKey: 'timeline.artworks.danceClass',
    segments: [
      {
        text: 'Un estudio de ballet en París. Niñas en posición de ballet bajo la dirección de un maestro de danza. Pero no es una escena de gracia perfecta. Es el momento entre movimientos. Es el trabajo antes de la belleza. Es mil ochocientos setenta y cuatro, y Degas ve la verdad de la danza.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Degas está obsesionado con el ballet. No por la fantasía, sino por el movimiento corporal. Ve a bailarinas como atletas. Ve sus cuerpos como máquinas de expresión. Pasa horas en los estudios, dibujando, observando, capturando el momento donde el control y la naturalidad se encuentran.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Una bailarina se estira contra una pared. Otra pone su zapatilla. El maestro, un hombre viejo, está casi fuera del cuadro. Las posiciones son desiguales, accidentales—como si Degas hubiera tomado una fotografía mental justo antes de que todo se resolviera en forma.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Degas es revolucionario en composición. La perspectiva es asimétrica. El horizonte está bajo. Los personajes están cortados por los bordes del cuadro, como si estuviera viendo una película. Usa pastel—pigmento puro, delicado, casi precario. El color es sutil pero vibrante.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos este cuadro y vemos el secreto del ballet: es labor, es disciplina, es cuerpos cansados persiguiendo la ilusión de facilidad. Y cuando Tchaikovsky compone el Lago de los Cisnes, está oyendo el sonido de estos cuerpos trabajando, de estos pies golpeando el piso, de esta búsqueda eterna de gracia.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'El ballet Lago de los Cisnes de Tchaikovsky, donde la música llora la disciplina y el sacrificio oculto',
    musicSuggestion: 'Tchaikovsky Swan Lake ballet classical',
  },

  /**
   * The Card Players - Paul Cézanne (1892)
   * Still geometry, working class dignity, structure as meditation
   */
  cardPlayers: {
    titleKey: 'timeline.artworks.cardPlayers',
    segments: [
      {
        text: 'Dos hombres, probablemente campesinos, juegan a las cartas sobre una mesa simple. No hay drama. No hay narrativa. Solo concentración. Cézanne pinta esto a los cincuenta años, después de décadas de rechazo, y crea la obra que define la modernidad tardía.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Cézanne dice que quiere "hacer de Poussin sobre la naturaleza". Quiere estructura. Quiere que cada pincelada sea un acto de pensamiento. No busca emociones románticas. Busca la verdad de la forma. La mesa no es una mesa. Es geometría. El jugador no es una persona. Es volumen.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Los hombres son dignos en su sencillez. Hay botella de vino, un sombrero en el piso. El ambiente es pobre pero no es patético. Cézanne ve en los trabajadores algo que la burguesía no ve: humanidad fundamental. Existencia sin pretensión.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'La perspectiva es imposible. Si miraras desde estos ángulos, el cuadro se desmoronaría. Pero funciona. Porque Cézanne no pinta lo que ve. Pinta lo que piensa sobre lo que ve. Cada línea está donde debe estar según la lógica interna del cuadro, no según la óptica.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos los Jugadores de Cartas y entendemos por qué Picasso, Matisse, Kandinsky todos veneran a Cézanne. No porque sea bonito. Porque es verdadero. Porque ha descubierto que la forma es sueño, y que el sueño es más real que la realidad. Que la geometría es la poesía del universo.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'Las Gymnopédies de Satie, donde la repetición minimalista crea profundidad meditativa y estructural',
    musicSuggestion: 'Erik Satie Gymnopedies minimalist piano',
  },

  // ────────────────── EARLY MODERN ──────────────────

  /**
   * The Dream - Henri Rousseau (1910)
   * Naive surrealism, jungle unconscious, sleeping on furniture
   */
  theDream: {
    titleKey: 'timeline.artworks.theDream',
    segments: [
      {
        text: 'Una mujer desnuda duerme sobre un sofá rojo en medio de una jungla exótica. Leones la rodean sin atacar. Flores gigantes flotan en la oscuridad. Un hombre toca la flauta. Rousseau pinta esto en mil novecientos diez, cuando tiene sesenta y seis años, pintor sin entrenamiento formal, visionario del sueño.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Rousseau trabaja de aduanero en París toda su vida, pero su mente vive en junglas que nunca ha visto. Ha visitado el Jardin des Plantes, estudiado plantas exóticas, llenado su imaginación de bestias desconocidas. Cuando pinta, es como si destapara su propio inconsciente.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'El sofá es la realidad. Es lo material, lo que ancla. Pero todo a su alrededor es sueño: vegetación lujuriante, animales salvajes que no atacan, colores imposibles. El hombre tocando la flauta es casi invisible en la negrura. Es música guiando el sueño.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Rousseau no tiene técnica académica. Eso es su fuerza. Su pincelada es ingenua, casi infantil. Las líneas son limpias, los colores puros. No hay luz dramática. Solo iluminación del sueño—una lógica visual que desafía la realidad física. Es hipnótico.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Los surrealistas adorarían a Rousseau, aunque él nunca se consideró surrealista. Pintaba su verdad: que la imaginación es más real que la realidad, que el sueño es donde la verdadera humanidad existe. Mientras Ravel compone Bolero—repetición hipnótica transformada en obsesión—Rousseau pinta el momento donde la vigilia se rinde al sueño.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'El Bolero de Ravel, donde la repetición obsesiva se transforma en trance hipnótico',
    musicSuggestion: 'Ravel Bolero modernist orchestral mesmerizing',
  },

  /**
   * Composition VII - Wassily Kandinsky (1913)
   * Pure abstraction, spiritual vibration, the artist as mystic
   */
  compositionVII: {
    titleKey: 'timeline.artworks.compositionVII',
    segments: [
      {
        text: 'No hay formas reconocibles. Solo formas geométricas, líneas, color puro. Kandinsky pinta en mil novecientos trece, convencido de que el color tiene sonido, que la forma tiene espiritualidad. Este lienzo es sinfónica. Es la música hecha visible.',
        emphasis: 'dramatic',
        pause: 1300,
      },
      {
        text: 'Kandinsky cree que el arte no debe imitar la naturaleza. Debe dirigirse al alma directamente, como la música. Rojo es trompeta. Azul es violonchelo. Formas agudas son tensión. Formas redondeadas son paz. Está pintando un idioma universal de la emoción pura.',
        emphasis: 'normal',
        pause: 1400,
      },
      {
        text: 'Composition VII es caótico pero equilibrado. A primera vista, es salvajismo. Pero mirando más, hay orden. Los colores están en armonía. Las líneas están en relación. Es como Stravinsky componiendo un ritmo que parece aleatorio pero es perfectamente estructurado.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Kandinsky usa pinceladas gestuales, casi violentas. Los colores chocan—rojo contra azul, amarillo contra púrpura—pero crean vibración, no cacofonía. Es técnica de la intuición. Pinta lo que siente, no lo que piensa. Cada trazo es decisión espiritual.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos Composition VII sin saber qué vemos, pero sentimos todo. Es como escuchar la Consagración de la Primavera por primera vez: ataque, confusión, luego revelación. Kandinsky ha demostrado que el arte no necesita forma para ser profundo. Solo necesita verdad espiritual. Y la verdad espiritual es invisible, siempre.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La Consagración de la Primavera de Stravinsky, donde el ritmo caótico se convierte en estructura revolucionaria',
    musicSuggestion: 'Stravinsky Rite of Spring classical modernist',
  },

  // ────────────────── ANCIENT WORLDS ──────────────────

  /**
   * Bust of Nefertiti - Unknown Artist (c. 1345 BCE)
   * Egyptian refinement, lost dynasty, the eternal profile
   */
  nefertiti: {
    titleKey: 'timeline.artworks.nefertiti',
    segments: [
      {
        text: 'Una mujer usa una corona alta y delgada. Su cuello es el de un cisne. Su rostro está en perfil absoluto, como si fuera pintado, pero es escultura. Es piedra caliza pintada, estuco, casi tres mil trescientos años vieja, encontrada en el taller del escultor Thutmose en el antiguo Egipto, alrededor de mil trescientos cuarenta y cinco antes de Cristo.',
        emphasis: 'dramatic',
        pause: 1400,
      },
      {
        text: 'Nefertiti fue esposa del faraón Akenatón, quien intentó una revolución religiosa. Rechazó los dioses antiguos, proclamó a Atón, el disco solar, como único dios. Su esposa lo apoyaba. Fue transformación radical en una civilización antigua.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'El busto es idealizador pero honesto. Los ojos están lejanos, mirando hacia la eternidad. La boca tiene una suavidad que sugiere sabiduria. El cuello es implausiblemente largo, tal vez estética de la época, tal vez belleza idealizada. Ella no es humana. Es arquetipo de belleza.',
        emphasis: 'normal',
        pause: 1300,
      },
      {
        text: 'Los antiguos egipcios creían que la forma podía preservar el alma. Este busto fue creado para existir forever. Cada simetría, cada curva, es acto de eternidad. El artista ha olvidado sus propias manos. Solo existe Nefertiti, perfecta, inmutable.',
        emphasis: 'normal',
        pause: 1200,
      },
      {
        text: 'Miramos este busto hoy y encontramos una mujer que perdió su dinastía hace tres milenios, pero ganó la inmortalidad. Su rostro es más conocido que el de emperadores más poderosos. Y mientras la música antigua egípcia se reconstruye desde papiros, esta forma persiste. Piedra caliza, luz y sombra. Un corazón eterno.',
        emphasis: 'soft',
        pause: 0,
      },
    ],
    musicConnection: 'La música reconstruida del antiguo Egipto, con sus instrumentos de viento primitivos y tonos melismáticos',
    musicSuggestion: 'Ancient Egyptian reconstructed music harp flute',
  },
};
