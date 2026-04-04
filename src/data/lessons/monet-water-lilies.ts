/**
 * MŪSA Lesson: Monet's "Los Nenúfares" (The Water Lilies)
 *
 * A cinematic journey through Monet's obsession with light, water, and the dissolution of form.
 * Impressionism's ultimate transformation. Where the artist loses his sight but finds infinity.
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

export const MONET_WATER_LILIES_LESSON: Lesson = {
  slug: 'monet-water-lilies',
  titleEs: 'Los Nenúfares',
  titleEn: 'The Water Lilies',
  artistEs: 'Claude Monet',
  artistEn: 'Claude Monet',
  eraEs: 'Impresionismo',
  eraEn: 'Impressionism',
  era: 'impressionism',
  difficulty: 'explorer',
  durationMinutes: 15,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/The_Japanese_Bridge_1899_Monet.jpg',
  yearCreated: 1906,

  narrativeBlocks: [
    {
      type: 'intro',
      title: 'Giverny, 1890',
      content: `Un anciano francés entra en un huerto abandonado en el pequeño pueblo de Giverny, a las afueras de París. Su nombre es Claude Monet, y tiene cincuenta años. No viene a este lugar para pintar lo que ve.

Viene para *crear* lo que verá.

En sus manos hay semillas de flores. En su mente hay un sueño que lo ha perseguido durante años. No quiere simplemente observar la naturaleza. Quiere construirla. Quiere crear un jardín que sea, en sí mismo, una obra de arte sin lienzo ni pintura.

Gira lentamente, observando el terreno. El agua fluye. Los sauces lloran. Y en este momento, algo profundo ocurre en su espíritu. Este no será un jardín ordinario. Será su obsesión. Su catedral. Su vida entera pintada en verde, agua y luz.`,
    },
    {
      type: 'story',
      title: 'La Obsesión de una Vida',
      content: `**1883: El Descubrimiento**

Claude Monet llega a Giverny por casualidad, pero nada en la vida de un verdadero artista ocurre por casualidad. Alquila una casa de campo, modesta, con un terreno que parece ser una promesa del universo. Alrededor de la propiedad hay un arroyo natural, un pequeño río que corre hacia el Sena.

Monet tiene una visión. No solo pintará este paisaje. Lo transformará. Lo reimaginará. Comprará la tierra, obtendrá permisos, desviará el agua. Durante una década, trabajará sin descanso, plantando flores exóticas importadas de todo el mundo.

**1893: El Puente Japonés**

Monet construye un puente delicado, inspirado en el arte y la filosofía japonesa. Es bajo, arqueado, cubierto con glicinas que cuelgan como cascadas de luz púrpura. Cuando cruza el puente por primera vez, comprende que ha creado algo más que un jardín. Ha creado un templo visual.

**1897-1899: Las Primeras Lilas de Agua**

Comienza a pintar los nenúfares. Las primeras obras son comparables a sus otras pinturas: composiciones claras, puntos de vista reconocibles, una sensación de orden. Pero dentro de Monet, algo está cambiando. No puede dejar de pintar el agua.

**1903-1908: La Obsesión Profundiza**

Monet vende 48 cuadros de los Nenúfares a su marchante Paul Durand-Ruel. Pero no puede parar. En los siguientes años, pinta cientos más. El mundo le pregunta por qué. "Porque," explica Monet, "el agua es la vida. Es movimiento, luz, color, tiempo, todo junto."

Monta enormes lienzos en su estudio. Algunos miden más de dos metros de altura. Trabaja con obsesión casi religiosa, capturando el mismo estanque a diferentes horas del día, bajo diferentes condiciones de luz. El amanecer. El atardecer. La lluvia. El reflejo de las nubes.

**1914-1926: Las Grandes Decoraciones y la Ceguera**

Monet es diagnosticado con cataratas. Su visión se desvanece gradualmente, tiñendo todo de amarillo y naranja. Un hombre menor que él se habría rendido. Pero Monet no es un hombre común.

Con la visión casi completamente desaparecida, pinta las obra más grandes y audaces de su vida. Las Grandes Decoraciones para el Museo del Orangerie en París, un proyecto monumental que imagina como su regalo final a Francia. Los paneles miden casi 2 metros de alto y más de 12 metros de largo. Algunos dicen que pinta en la oscuridad. Otros insisten que no — que está pintando desde la memoria, desde la emoción pura, desde un lugar más profundo que los ojos.

**1926: El Final**

Monet muere el 5 de diciembre de 1926, a los 86 años. Deja detrás 250 pinturas de nenúfares. Su jardín en Giverny sigue existiendo hoy, restaurado con precisión histórica.

Pero el verdadero legado no está en el jardín. Está en esos lienzos, donde el agua, la luz y el color se disuelven en una sinfonía sin final.`,
    },
    {
      type: 'technique',
      title: 'La Disolución de la Forma',
      content: `Cuando miras una pintura de los Nenúfares de Monet, especialmente las de la serie tardía, algo extraño ocurre. ¿Dónde termina el agua? ¿Dónde comienza el cielo? ¿Dónde están los límites?

La respuesta es: no hay límites.

**La Eliminación del Horizonte**

Los Impresionistas fueron revolucionarios al capturar la luz fugaz. Pero Monet va más allá. En sus Nenúfares, especialmente después de 1903, elimina deliberadamente el horizonte. No hay cielo. No hay tierra. El lienzo se convierte en una superficie infinita de agua.

Imagina estar tumbado al borde del estanque, tan cerca que el agua llenan todo tu campo visual. No puedes ver a dónde termina el agua. El reflejo del cielo está tan cerca que es indistinguible de la profundidad del agua. Monet quiere que *sientas* esa experiencia.

**Pintar Luz, No Objetos**

Los Impresionistas aprendieron a pintar la luz. Monet lleva esto al extremo. No pinta un nenúfar. Pinta la luz reflejada en el nenúfar. No pinta el agua. Pinta cómo la luz se disuelve en el agua. No pinta una nube. Pinta cómo la nube existe en el reflejo.

El nenúfar es apenas un pretexto, una excusa para explorar algo mucho más abstracto y fundamental: cómo la realidad se desvanece bajo la insistencia de la luz.

**La Escala Monumental**

Las Grandes Decoraciones fueron concebidas para rodear al espectador. No es una pintura que cuelga en una pared. Es un ambiente. Los paneles se curvan alrededor del espacio, creando una habitación que *es* el Nenúfar.

El artista contemporáneo Mark Rothko, doscientos años después, entenderá esta lección perfectamente. Las obras de arte monumental no simplemente se miran. Se experimentan.

**El Pincel Liberado**

En las últimas décadas de su vida, el pincel de Monet se vuelve casi salvaje. Los trazos son más grandes, menos precisos, más apasionados. Algunos cuadros parecen casi abstractos — campos de color, texturas, fragmentos de forma que apenas sugieren lo que representan.

¿Es esto falta de precisión por su vista deteriorada? Quizás. Pero también es libertad. Sin la obligación de representar exactitud, el pincel puede confesar sus propios deseos. Puede danzar sobre el lienzo sin justificación.

**La Paleta de Color**

Los colores de los Nenúfares son principalmente púrpura, azul, verde y rosa — tonos que raramente ves en la naturaleza "realista". Monet usa colores complementarios brutalmente. Los azules junto a los naranjas, los púrpuras junto a los amarillos. Estos colores "pelean" entre sí, creando una vibración óptica.

En sus últimos años, obsesionado con su catarata, los cuadros se vuelven cada vez más amarillos y anaranjados. Algunos críticos especulan que está pintando lo que realmente ve — la visión de un hombre ciego por la enfermedad. Otros insisten que está siendo deliberadamente expresionista.

La verdad probablemente está en ambos lados. El ojo enfermo se convierte en un instrumento artístico.

**La Influencia Japonesa**

Monet colecciona estampas de ukiyo-e japonesas. Ve en ellas una estética que comprende perfectamente: la simplificación, la asimetría, el espacio negativo, el énfasis en la naturaleza sobre la figura humana. El puente de Giverny no es accidental — es una declaración de amor a la estética japonesa.

La composición de muchos de los Nenúfares refleja esta influencia: puntos de vista elevados, fondos planos, énfasis en los patrones y las texturas más que en la profundidad realista.`,
    },
    {
      type: 'music',
      title: 'La Sinfonía del Agua',
      content: `Si los Nenúfares tuvieran una banda sonora, ¿qué sonaría?

En los mismos años en que Monet pinta sus obras maestras acuáticas, los compositores revolucionan la música en Europa.

**Debussy — "La Mer" (El Mar), 1905**

Claude Debussy y Claude Monet nunca se conocieron, pero eran hermanos espirituales. Ambos estaban derritiendo el Impresionismo en algo más fluido, menos definido, más cercano a lo abstracto.

"La Mer" de Debussy no es una descripción del mar. Es la sensación del movimiento del agua, la incertidumbre, el poder hipnótico de la naturaleza acuática. Se divide en tres movimientos: "De alba a mediodía en la costa," "Juego de las olas," y "Diálogo del viento y el mar."

Cuando escuchas "Juego de las olas," imagina el estanque de Monet. Las armonías son vagas, borrosas, cambiantes — como la superficie del agua reflejando la luz. No hay melodía clara. Hay textura, hay movimiento, hay una sensación de algo que nunca se completa, siempre en transformación.

Debussy dijo: "La música es una nebulosa." Exactamente lo que Monet pintó.

**Ravel — "Jeux d'eau" (Juego de Agua), 1901**

Ravel compone esta pieza de piano brillante, virtuosa, que captura el movimiento específico del agua. Es más energética que Debussy, más estructurada, pero igualmente hipnotizante. Los dedos del pianista deben danzar sobre el teclado como la luz sobre el agua.

Cuando escuchas "Jeux d'eau," piensas en movimiento, en reflejos, en la danza del agua bajo el sol. Ravel, como Monet, comprende que el agua es un sujeto que nunca se queda quieto, que cambia en cada momento.

**La Conexión Profunda**

Monet pinta agua. Debussy y Ravel componen agua. Ambos son Impresionistas en sus propios medios, intentando capturar la sensación de un momento que nunca se repite, una experiencia que es siempre nueva.

Cuando contemplas un Nenúfar de Monet mientras escuchas "La Mer" de Debussy, entiendes algo fundamental sobre el arte: que el arte verdadero no copia la realidad. Intenta capturar la *esencia* de la realidad, la vibración emocional que algo produce en el alma.

El agua no es un tema. Es una metáfora para la vida misma — siempre moviéndose, siempre reflejando, nunca completa, siempre transformándose.`,
    },
    {
      type: 'context',
      title: 'El Viaje hacia el Infinito',
      content: `**1840:** Nace Claude Monet en París, hijo de un comerciante de abarrotes. Su infancia transcurre en El Havre, donde descubre el mar.

**1859:** Se muda a París para estudiar arte. Se deja influenciar por los Barbizon painters y por la teoría del color que estaba revolucionando la Europa artística.

**1870:** Estalla la Guerra Franco-Prusiana. Monet huye a Inglaterra, donde observa los cuadros de Constable y Turner. Sus perspectivas sobre la luz y el color cambian dramáticamente.

**1872:** Pinta "Impresión, sol naciente," un cuadro del puerto de El Havre en la niebla. Un crítico de arte, de forma despectiva, utiliza la palabra "Impresión" para describir lo que considera una obra inacabada. Irónicamente, este insulto se convierte en el nombre de todo un movimiento que revolucionará el arte occidental.

**1883:** Se muda a Giverny con su familia. Comienza la transformación del terreno que será su obsesión de por vida.

**1890s:** Desarrolla su método de series — pintar el mismo tema bajo diferentes condiciones de luz. La Catedral de Rouen, los Almiares de grano, el Parlamento de Londres. Cada serie contiene 20, 30, a veces 50 cuadros diferentes, todos del mismo tema.

**1899:** Pinta el Puente Japonés. Comienza su obsesión formal con los nenúfares.

**1903-1908:** Viaja a Londres y Venecia. Continúa con las series. Pero siempre regresa a Giverny, al estanque, a los nenúfares.

**1914:** Se le diagnostica cataratas. Su visión comienza a deteriorarse. Pero es precisamente en este momento cuando crea sus obras más grandes y ambiciosas.

**1923:** A los 83 años, se somete a cirugía de cataratas. Algunos dicen que la operación cambió cómo ve los colores. Los cuadros posteriores muestran un cambio dramático en la paleta.

**1926:** Muere en Giverny el 5 de diciembre, dejando un legado de casi 300 cuadros de nenúfares.

**La Revolución Silenciosa:** Monet no fue un revolucionario que gritara en las calles. Fue un revolucionario silencioso, trabajando solo en su jardín durante décadas, obsesionado con los secretos de la luz y el agua. Su revolución fue tan profunda que cambió para siempre cómo los artistas ven el mundo.`,
    },
    {
      type: 'reflection',
      title: 'Lo que los Nenúfares nos Dicen',
      content: `Hay una pregunta que ha perseguido a los historiadores del arte durante un siglo: ¿los Nenúfares de Monet son realistas o abstractos?

La respuesta, naturalmente, es ambas cosas y ninguna.

Monet fue un observador naturalista. Pasaba horas junto a su estanque, observando cómo la luz cambiaba, cómo las sombras danzaban sobre el agua, cómo las flores se reflejaban y se distorsionaban. Pero fue también un artista completamente liberado por su propia obsesión — tanto que los límites entre realidad y emoción, entre precisión y libertad, se disolvieron completamente.

Los Nenúfares nos dicen que el arte no necesita elegir entre representación y expresión. Puede ser ambas. Puede ser una cosa cuando la miras desde lejos, y otra completamente diferente cuando te acercas.

Nos dicen que la verdadera maestría requiere una obsesión que raya en la locura. Monet no pintó el estanque en Giverny porque fuera hermoso. Lo pintó porque no podía dejar de hacerlo. Porque dentro de él, el agua y la luz contenían los secretos del universo.

Nos dicen que la edad y la enfermedad no tienen por qué significar el final de la creatividad. El hombre ciego, con su visión distorsionada, creó obras que serían imposibles para alguien con visión perfecta. Su limitación se convirtió en su libertad.

Cuando observas los Nenúfares de Monet en el Museo del Orangerie — rodeado completamente por esos paneles curvos que hacen parecer que estás dentro del estanque — entiendes que Monet no pintaba para ser visto. Pintaba para ser experimentado. Quería que desaparecieras en el agua, que perdieras la noción del espacio y el tiempo, que flotaras en un momento eterno de luz.

Los Nenúfares son la prueba de que el Impresionismo no fue un movimiento artístico pasajero. Fue la apertura de una puerta a nuevas formas de ver — formas que llevarían directo al Expresionismo Abstracto del siglo XX.

Monet pasó treinta años pintando el mismo estanque. Y en esos treinta años, no pintó el estanque una sola vez. Pintó una meditación infinita sobre la naturaleza de la percepción, la luz y la transformación.`,
    },
    {
      type: 'quiz',
      title: 'Prueba tu Conocimiento',
      content: 'Responde las siguientes preguntas sobre "Los Nenúfares" de Monet y lo que hemos aprendido.',
      questions: [
        {
          id: 'q1',
          question: '¿En qué pueblo francés construyó Monet su famoso jardín con el estanque de nenúfares?',
          options: ['Arles', 'Giverny', 'Aix-en-Provence', 'Rouen'],
          correctAnswer: 1,
          explanation: 'Monet alquiló una casa en Giverny en 1883 y comenzó a transformar el terreno en su jardín de ensueño. Este lugar se convirtió en su obsesión de por vida y es ahora un museo visitado por miles de personas cada año.',
        },
        {
          id: 'q2',
          question: '¿Cuál fue la estructura que Monet construyó en 1893 que se hizo icónica en sus pinturas?',
          options: ['Una casa de té', 'Un puente japonés arqueado', 'Una fuente de mármol', 'Una capilla'],
          correctAnswer: 1,
          explanation: 'El puente japonés arqueado, cubierto con glicinas púrpuras, se convirtió en uno de los símbolos más reconocibles del jardín de Monet y aparece en muchas de sus pinturas más famosas.',
        },
        {
          id: 'q3',
          question: '¿Qué enfermedad oftalmológica afectó la visión de Monet en sus últimos años?',
          options: ['Miopía progresiva', 'Cataratas', 'Daltonismo', 'Desprendimiento de retina'],
          correctAnswer: 1,
          explanation: 'Monet fue diagnosticado con cataratas que gradualmente tiñeron su visión de amarillo y naranja. A pesar de esta limitación, continuó creando algunas de sus obras más grandes y expresivas.',
        },
        {
          id: 'q4',
          question: '¿Cuál de estos compositores escribió "La Mer" en 1905, el mismo período en que Monet estaba obsesionado con los nenúfares?',
          options: ['Maurice Ravel', 'Claude Debussy', 'Gabriel Fauré', 'Saint-Saëns'],
          correctAnswer: 1,
          explanation: 'Claude Debussy compuso "La Mer" en 1905, exactamente cuando Monet profundizaba su serie de los Nenúfares. Ambos artistas compartían una filosofía Impresionista: capturar la sensación y la atmósfera en lugar de detalles precisos.',
        },
        {
          id: 'q5',
          question: '¿Aproximadamente cuántas pinturas de nenúfares creó Monet durante toda su vida?',
          options: ['Alrededor de 50', 'Alrededor de 100', 'Alrededor de 250', 'Alrededor de 500'],
          correctAnswer: 2,
          explanation: 'Se estima que Monet pintó más de 250 obras de nenúfares desde 1897 hasta su muerte en 1926. Esta obsesión representa una dedicación casi religiosa a explorar la naturaleza de la luz y el agua.',
        },
        {
          id: 'q6',
          question: '¿Dónde se encuentran las "Grandes Decoraciones" de Monet, sus paneles monumental de nenúfares?',
          options: ['Museo del Louvre', 'Musée d\'Orsay', 'Museo de la Orangerie', 'Galería Nacional de Londres'],
          correctAnswer: 2,
          explanation: 'Las Grandes Decoraciones fueron instaladas en el Museo de la Orangerie en París, exactamente como Monet lo imaginó. Los paneles curvados rodean al espectador, creando una experiencia inmersiva única.',
        },
      ],
    },
  ],

  relatedArtworks: [
    {
      titleEs: 'Los Nenúfares (serie Orangerie)',
      titleEn: 'The Water Lilies (Orangerie series)',
      year: 1914,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/1024x1024_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg',
      descriptionEs: 'Los paneles monumental pintados para el Museo de la Orangerie en París. Estas obras maestras finales de Monet crean un ambiente envolvente donde el espectador parece estar dentro del estanque mismo.',
      descriptionEn: 'The monumental panels painted for the Musée de l\'Orangerie in Paris. These final masterpieces by Monet create an immersive environment where the viewer seems to be within the pond itself.',
    },
    {
      titleEs: 'Impresión, Sol Naciente',
      titleEn: 'Impression, Sunrise',
      year: 1872,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Claude_Monet_-_Impression%2C_Sunrise.jpg',
      descriptionEs: 'El cuadro que accidentalmente nombró todo el movimiento Impresionista. Muestra el puerto de El Havre en la niebla, con solo las siluetas vagamente definidas del barco y el muelle.',
      descriptionEn: 'The painting that accidentally named the entire Impressionist movement. It shows the port of Le Havre in fog, with only vaguely defined silhouettes of ships and the wharf.',
    },
    {
      titleEs: 'El Puente Japonés',
      titleEn: 'The Japanese Bridge',
      year: 1899,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/The_Japanese_Bridge_1899_Monet.jpg',
      descriptionEs: 'Una de las composiciones más icónicas de Monet, mostrando el puente arqueado cubierto de glicinas sobre su estanque en Giverny. Símbolo de la obsesión de Monet con su jardín.',
      descriptionEn: 'One of Monet\'s most iconic compositions, showing the arched bridge covered in wisteria over his pond in Giverny. A symbol of Monet\'s obsession with his garden.',
    },
    {
      titleEs: 'La Catedral de Rouen (serie)',
      titleEn: 'Rouen Cathedral (series)',
      year: 1892,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Claude_Monet_-_Rouen_Cathedral_Facade_-_Google_Art_Project.jpg',
      descriptionEs: 'Monet pintó la misma catedral más de 30 veces bajo diferentes condiciones de luz. Esta serie revolucionó la idea de que una obra de arte debe capturar un objeto permanente.',
      descriptionEn: 'Monet painted the same cathedral over 30 times under different lighting conditions. This series revolutionized the idea that a work of art must capture a permanent object.',
    },
    {
      titleEs: 'Los Almiares de Grano',
      titleEn: 'The Haystacks (series)',
      year: 1890,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Claude_Monet_-_Grainstack_%28Sunset%29.jpg',
      descriptionEs: 'Otra serie donde Monet captura los mismos almiares bajo diferentes condiciones de luz. Demostró que el verdadero tema no es el objeto, sino cómo la luz lo transforma.',
      descriptionEn: 'Another series where Monet captures the same haystacks under different lighting conditions. It demonstrated that the true subject is not the object, but how light transforms it.',
    },
    {
      titleEs: 'Parlamento de Londres al Atardecer',
      titleEn: 'The Parliament of London at Sunset',
      year: 1904,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Monet_parliament.jpg',
      descriptionEs: 'Pintada en 1904 después de viajes a Londres. La serie del Parlamento muestra cómo Monet continuó explorando su método de series incluso en sus años posteriores.',
      descriptionEn: 'Painted in 1904 after trips to London. The Parliament series shows how Monet continued exploring his serial method even in his later years.',
    },
  ],

  musicConnections: [
    {
      composer: 'Claude Debussy',
      piece: 'La Mer (El Mar)',
      era: 'Impresionismo Musical',
      youtubeId: 'jDrwig8jMKk',
      explanationEs: 'Debussy compone "La Mer" en 1905, exactamente cuando Monet estaba profundizando su obsesión con los nenúfares. Ambos artistas comparten la misma filosofía: capturar la sensación y la atmósfera en lugar de describir literalmente. Los acordes vagos de Debussy son el equivalente musical de cómo Monet disuelve los límites entre el agua y el cielo en sus lienzos. No es una descripción del mar. Es la *experiencia* del mar.',
      explanationEn: 'Debussy composes "La Mer" in 1905, exactly when Monet was deepening his obsession with water lilies. Both artists share the same philosophy: capture feeling and atmosphere instead of literal description. Debussy\'s vague harmonies are the musical equivalent of how Monet dissolves the boundaries between water and sky in his canvases. It is not a description of the sea. It is the *experience* of the sea.',
    },
    {
      composer: 'Maurice Ravel',
      piece: 'Jeux d\'eau (Juego de Agua)',
      era: 'Impresionismo Musical',
      youtubeId: 'SnHnr8S_qGQ',
      explanationEs: 'Ravel compone esta obra maestra de piano en 1901, en el corazón de la obsesión de Monet con su estanque. "Jeux d\'eau" captura el movimiento específico del agua, cómo la luz danza sobre su superficie. Los dedos del pianista deben danzar sobre el teclado exactamente como la luz danza sobre el agua. Cuando escuchas "Jeux d\'eau" mientras observas los nenúfares de Monet, entiendes que ambos artistas están intentando lo mismo: capturar algo que nunca se queda quieto, algo que es siempre diferente en cada momento.',
      explanationEn: 'Ravel composed this piano masterpiece in 1901, at the heart of Monet\'s obsession with his pond. "Jeux d\'eau" captures the specific movement of water, how light dances on its surface. The pianist\'s fingers must dance across the keyboard exactly as light dances on water. When you listen to "Jeux d\'eau" while observing Monet\'s water lilies, you understand that both artists are attempting the same thing: to capture something that never stands still, something that is always different in every moment.',
    },
  ],
};
