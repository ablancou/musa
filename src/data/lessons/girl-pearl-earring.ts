/**
 * MŪSA Lesson: "La Joven de la Perla" (Girl with a Pearl Earring)
 *
 * A cinematic meditation on mystery, light, and the soul captured in a single glance.
 * Dutch Golden Age, 1665. Where Vermeer paints not just a face, but the essence of human dignity.
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

export const GIRL_PEARL_EARRING_LESSON: Lesson = {
  slug: 'girl-pearl-earring',
  titleEs: 'La Joven de la Perla',
  titleEn: 'Girl with a Pearl Earring',
  artistEs: 'Johannes Vermeer',
  artistEn: 'Johannes Vermeer',
  eraEs: 'Barroco Holandés',
  eraEn: 'Dutch Baroque',
  era: 'baroque',
  difficulty: 'starter',
  durationMinutes: 12,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1665_Girl_with_a_Pearl_Earring.jpg',
  yearCreated: 1665,

  narrativeBlocks: [
    {
      type: 'intro',
      title: 'Un Momento Eterno',
      content: `Delft, Holanda. 1665. En una casa modesta, un hombre se sienta en una habitación oscura. Su nombre es Johannes Vermeer, y su taller está iluminado por un único rayo de luz solar que entra a través de una ventana.

Ante él, no hay una modelo profesional — es una sirvienta, quizás, o una joven del pueblo. Alguien ordinario. Alguien que el mundo no vería dos veces. Pero Vermeer ve algo diferente.

Ve un alma. Ve la juventud. Ve un momento efímero de belleza humana que desaparecerá en un parpadeo.

Toma su pincel. Y en pocas semanas, crea una de las obras más enigmáticas del arte occidental. Una pintura tan misteriosa que, después de 350 años, todavía nos preguntamos: ¿quién era ella? ¿Qué estaba pensando? ¿Por qué su mirada nos toca tan profundamente?

Esta es la historia de "La Joven de la Perla" — una pintura que no cuenta una trama, sino que captura el silencio.`,
    },
    {
      type: 'story',
      title: 'En la Luz Sagrada',
      content: `Imagina esto: estamos en Delft a mediados del siglo XVII. Es la Edad de Oro Holandesa. Los Países Bajos acaban de ganar su independencia de España y están experimentando una prosperidad sin precedentes. El comercio internacional florece. Las ciudades crecen. Los burgueses ricos quieren cuadros para sus casas.

Johannes Vermeer es un artista de esta época. No es famoso. No pinta escenas grandiosas ni temas religiosos monumentales. Pinta algo más revolucionario: la vida cotidiana, la intimidad doméstica, la belleza oculta en lo ordinario.

Pero Vermeer no es como otros. Él no simplemente retrata una escena. Obsesivamente estudia la luz. ¿Cómo entra? ¿Cómo toca cada superficie? ¿Cómo transforma lo mundano en lo sagrado?

Algunos historiadores sugieren que Vermeer utilizaba la cámara oscura — ese instrumento óptico que proyecta la realidad en una superficie. No es trampa. Es una herramienta. El Renacimiento ya lo conocía. Los maestros florentinos lo utilizaban. Pero nadie, nadie antes había utilizado la luz como lo hace Vermeer.

Una joven entra a su estudio. Lleva un turbante azul y amarillo — los colores más costosos que podían conseguirse. Ultramarina puro, que costaba más que el oro. ¿De dónde vino? ¿Quién es? No lo sabemos. Quizás Vermeer mismo lo inventó para esta ocasión. Quizás era la hija de un amigo. Quizás era una fantasía.

Lo que importa es que en ese instante — cuando la luz entra por esa ventana y toca su mejilla, sus labios, su ojo — Vermeer ve lo que busca: la perfección de lo efímero.

Ella gira su cabeza. Sus labios se abren ligeramente, como si estuviera a punto de hablar. Su mirada te encuentra a través de los siglos. Y de repente, sin saber cómo, sin poder explicarlo, te sientes visto. Ella te ve. Desde 1665 hasta hoy, ella te mira directamente a los ojos.`,
    },
    {
      type: 'technique',
      title: 'La Alquimia de la Luz Divina',
      content: `Cuando contemplas "La Joven de la Perla," lo primero que sientes es la presencia de la luz. Pero no es la luz realista. Es la luz transfigurada.

**La Cámara Oscura y la Verdad Óptica:**
Muchos historiadores del arte, especialmente Philip Steadman, sugieren que Vermeer utilizó la cámara oscura. ¿Por qué? Observa los detalles. Los puntos de luz en el fondo de la pintura — ¿notas cómo parecen círculos perfectos? Eso es lo que la cámara oscura produce. También nota cómo algunos detalles del fondo están sutilmente desenfocados. Eso también es característica de la proyección óptica.

Pero lo crucial es esto: Vermeer no copió la imagen proyectada. La utilizó como guía. Como punto de partida. Luego transformó esa realidad óptica en arte.

**El Ultramarina Puro:**
Mira ese turbante. Ese azul no es cualquier azul. Es azul ultramarina, hecho del lapislázuli — una piedra preciosa que venía de Afganistán, a través de comerciantes venecianos, hasta Holanda. Un gramo de pigmento ultramarina costaba más que un gramo de oro.

¿Por qué Vermeer gasta esta fortuna en una sirvienta? Porque sabía algo que los artistas ordinarios no comprendían: que el color tiene poder emocional casi religioso. Ese azul no es simplemente azul. Es el azul del cielo divino. Es el color que reservaban para la Virgen María en los cuadros medievales.

Con ese color, Vermeer dice: esta joven ordinaria contiene una dignidad extraordinaria.

**La Perla — Fantasma o Realidad:**
Y luego, la perla. Esa pequeña gota blanca que cuelga de su oído. ¿Es una perla real? Los historiadores aún discuten. Algunos dicen que es demasiado grande. Otros sugieren que en la época de Vermeer, tales perlas existían. Otros creen que es completamente imaginaria — un símbolo de pureza, de inocencia, de virginidad.

La perla brilla. Captura toda la luz que entra en la habitación. Es el punto focal de toda la composición. Tu ojo va directamente allá. Y luego, lentamente, se mueve a los labios, luego a los ojos.

**La Composición Cerrada:**
Observa cómo está encuadrada. No vemos sus manos. No vemos su cuerpo completo. Es un retrato de cabeza y hombros, pero algo más — es como si la pintura capturara solo el instante esencial. Todo lo demás — su historia, su identidad, su futuro — está fuera del marco.

El fondo es oscuro, casi negro. No hay decoración. No hay contexto. Solo la cara, la turbante, la perla, y la luz. Todo lo superficial se ha eliminado. Estamos en presencia de la esencia.

**Los Colores Complementarios:**
El azul del turbante se opone al amarillo cálido del fondo. Rojo y verde juegan en las sombras del rostro. Estos colores "vibran" juntos, creando una energía silenciosa. Vermeer es matemático en su color, pero el resultado es completamente emocional.

**La Pincelada Invisible:**
Y aquí está el verdadero milagro: cuando te paras frente a la pintura real, parece estar terminada con una precisión imposible. Los ojos tienen detalles minúsculos. Los labios están pintados con trazos sutiles. Y sin embargo, cuando te acercas, desaparece — son solo pinceladas. La magia de Vermeer es que crea la ilusión perfecta de una realidad que no existe.`,
    },
    {
      type: 'context',
      title: 'Vermeer: El Poeta Silencioso de Delft',
      content: `**1632:** Nace Johannes Vermeer en Delft, una ciudad provinciana pero próspera en Holanda. Su padre es tejedor y posadero. Nada extraordinario.

**1652:** A los 20 años, se convierte en aprendiz de pintor. Aprendemos poco de sus maestros — el registro histórico es silencioso, como la mayoría de las cosas sobre Vermeer.

**1653-1660:** Realiza sus primeras obras — escenas históricas y religiosas en el estilo barroco. Son competentes, pero no revolucionarias. Luego, algo cambió en él. Comenzó a pintarlas cosas que nadie más pintar: el interior doméstico, la luz atravesando una ventana, una mujer leyendo una carta.

**1655-1675:** Su período de madurez. Pinta solo 36 cuadros conocidos en toda su vida. Treinta y seis. Comparado con la producción de otros maestros, es poco. Pero cada uno es una meditación.

**La Edad de Oro Holandesa:** Delft es próspera. El comercio mundial enriquece la ciudad. Los burgueses pueden permitirse lujos — cuadros, tapices, porcelana china, especias exóticas. Es en este mundo de riqueza íntima donde Vermeer pinta. No para la Iglesia. No para la monarquía. Para mercaderes que desean ver la belleza en su propia vida.

**1667-1668:** Pinta "La Joven de la Perla," probablemente alrededor de 1665. Es una "tronie" — un término holandés para un tipo especial de retrato que no intenta ser un retrato exacto de una persona específica, sino la representación de una expresión, una emoción, un tipo.

**La Cámara Oscura Debate:** Historiadores modernos, especialmente Philip Steadman, sugieren evidencia óptica de su uso. Pero el debate continúa. ¿Importa? Lo que importa es que Vermeer entendía la luz de una manera que prefigura la fotografía moderna. Fue, en cierto sentido, el primer fotógrafo del alma.

**1675:** Vermeer muere en Delft, a los 43 años. Deja una esposa, once hijos, y deudas. Su trabajo cae en el olvido. Durante 200 años, casi nadie lo recuerda.

**Siglos XIX-XX:** Lentamente, los críticos redescubren a Vermeer. Primero Proust lo menciona en su novela. Luego los modernistas ven en él un precursor. En el siglo XX, se convierte en una obsesión — "La Joven de la Perla" es reproducida en tazas, refrigeradores, mochilas.

**Hoy:** Vermeer es venerado como uno de los mayores pintores de todos los tiempos. "La Joven de la Perla" cuelga en el Mauritshuis en La Haya, y es considerada por muchos como la "Mona Lisa del Norte" — una obra tan misteriosa, tan perfecta, que cada generación debe descubrirla nuevamente.`,
    },
    {
      type: 'music',
      title: 'La Música Silenciosa del Silencio',
      content: `Si "La Joven de la Perla" tuviera banda sonora, ¿qué música sonaría?

No sería música grandiosa. No sería drama. Sería algo más íntimo, más contemplativo.

**Jan Pieterszoon Sweelinck — Variations on a Theme:**
Sweelinck (1562-1621) fue el compositor más importante de los Países Bajos en el período anterior a Vermeer. Aunque murió antes de que Vermeer pintara "La Joven de la Perla," su influencia persiste en la música holandesa.

Las Variaciones de Sweelinck son meditativas. No son apasionadas como la música de Bach que vendría después. Son reflexivas, contemplativas, como alguien paseando lentamente por una habitación, observando cómo la luz cambia.

Escúchalas mientras miras la pintura. Nota cómo la música no progresa dramáticamente. Se desplaza suavemente, explorando pequeñas variaciones en el tema. Es exactamente lo que Vermeer hace: pequeñas variaciones en la luz, pequeños cambios en el color, el mismo tema una y otra vez.

**Dietrich Buxtehude — Prelude and Fugue in G Minor:**
Buxtehude (1637-1707) fue contemporáneo de Vermeer — ambos vivieron en el mismo período en el norte de Europa. Ambos entendían el poder del silencio y la contemplación.

Esta pieza comienza con una cadencia sostenida, casi como si estuviera respirando. Luego, lentamente, la música construye, pero nunca explota. Permanece contenida, controlada, como si el compositor hubiera aprendido a apreciar los espacios entre las notas.

Cuando escuchas esto, piensa en Vermeer en su estudio. La luz entra lentamente. La joven gira su cabeza. El pintor observa en silencio, esperando el momento perfecto. No hay prisa. El tiempo se detiene.

**El Barroco Tardío del Norte:**
La música barroca del norte de Europa — Holanda, Alemania — es diferente al barroco italiano. El italiano es dramático, extravagante, sensual. El nórdico es introvertido, matemático, espiritual.

Vermeer pinta como Buxtehude compone: con precisión, con elegancia, pero también con una profunda introspección. Ambos crean universos en miniatura.

**La Verdad Silenciosa:**
La conexión más profunda entre "La Joven de la Perla" y la música barroca holandesa es esto: ambas encuentran la profundidad en la simpleza. Ambas dicen más con menos. Una joven gira su cabeza. Una nota sostenida resuena. Y en ese momento de aparente quietud, algo infinito se revela.

La música de esta época no canta por cantar. Canta porque el silencio es tan ruidoso que necesita una voz para responder.`,
    },
    {
      type: 'reflection',
      title: 'El Misterio que Permanece',
      content: `Después de 360 años, seguimos sin saber quién era la joven. Hemos inventado historias: una sirvienta. La hija de Vermeer. Una fantasía. Una alusión mitológica a una ninfa o a la Perla de Afrodita.

Quizás la verdad es que su identidad no importa. O mejor aún: su identidad es universal.

Vermeer pinta a una joven ordinaria — sin riqueza visible, sin estatus, sin historia — y con un solo gesto (esa vuelta de cabeza), una perla, y la luz sagrada, la eleva a lo eterno.

Dice algo profundo sobre la humanidad: que cada persona contiene un universo. Que la dignidad no proviene del rango o la riqueza, sino de simplemente ser visto.

En un mundo barroco de drama y extravagancia, Vermeer eligió la intimidad. En una era de grandiosidad, eligió la pequeña habitación oscura. En una época de narrativa compleja, eligió un momento sin historia.

Y nos cambió para siempre.

"La Joven de la Perla" nos enseña que el arte no necesita explicar. No necesita contar una trama. Simplemente necesita ser presencia. Necesita existir. Y necesita mirar.

Cuando entras al Mauritshuis en La Haya y ves el cuadro real por primera vez — porque las reproducciones son solo ecos — algo ocurre. La pintura te mira a través de 360 años de historia, y por un momento, eres tú el retratado. Eres tú quien es visto, quien es valorado, quien importa.

Eso es lo que Vermeer entendió. Eso es la magia de la perla.`,
    },
    {
      type: 'quiz',
      title: 'Prueba tu Conocimiento',
      content: 'Responde las siguientes preguntas sobre "La Joven de la Perla" y lo que hemos aprendido.',
      questions: [
        {
          id: 'q1',
          question: '¿En qué año pintó Vermeer "La Joven de la Perla"?',
          options: ['1660', '1665', '1670', '1675'],
          correctAnswer: 1,
          explanation: 'Vermeer pintó "La Joven de la Perla" alrededor de 1665, en el apogeo de su carrera artística durante la Edad de Oro Holandesa.',
        },
        {
          id: 'q2',
          question: '¿Cuál de estos NO es un elemento importante de "La Joven de la Perla"?',
          options: ['El turbante azul y amarillo', 'Una perla colgante', 'El fondo oscuro simplificado', 'Un jardín detallado en el trasfondo'],
          correctAnswer: 3,
          explanation: 'El fondo de "La Joven de la Perla" es oscuro y simplificado, sin decoración. No hay un jardín visible. Todos los otros elementos — el turbante, la perla y el fondo oscuro — son cruciales para la composición.',
        },
        {
          id: 'q3',
          question: '¿Qué era la "cámara oscura" que probablemente utilizó Vermeer?',
          options: [
            'Una habitación donde Vermeer guardaba sus pinturas',
            'Un instrumento óptico que proyecta la realidad en una superficie',
            'Una técnica de pintura secreta',
            'El nombre del estudio de Vermeer en Delft',
          ],
          correctAnswer: 1,
          explanation: 'La cámara oscura era un instrumento óptico que proyectaba la realidad a través de una lente sobre una superficie. Los historiadores sugieren que Vermeer la usaba como herramienta para guiar su composición, aunque no copiaba directamente la proyección.',
        },
        {
          id: 'q4',
          question: '¿Cuál era el pigmento más costoso que utilizó Vermeer en el turbante de la joven?',
          options: ['Oro en polvo', 'Azul ultramarina de lapislázuli', 'Tinta de sepia', 'Ocre rojo'],
          correctAnswer: 1,
          explanation: 'Vermeer usó azul ultramarina puro, hecho del lapislázuli, una piedra preciosa de Afganistán. Un gramo de este pigmento costaba más que un gramo de oro, lo que demuestra la importancia artística y simbólica del color.',
        },
        {
          id: 'q5',
          question: '¿Qué es una "tronie" en el arte holandés del siglo XVII?',
          options: [
            'Un retrato exacto de una persona específica',
            'Un cuadro que cubre todo el cuerpo de la persona',
            'Un tipo especial de retrato que representa una expresión o emoción sin ser un retrato exacto',
            'Una técnica de pintura con colores muy brillantes',
          ],
          correctAnswer: 2,
          explanation: '"Tronie" es un término holandés para un tipo especial de retrato. No intenta ser un retrato exacto de una persona identificable, sino que busca capturar una expresión, una emoción o un tipo. "La Joven de la Perla" es un ejemplo perfecto de tronie.',
        },
        {
          id: 'q6',
          question: '¿Cuántas pinturas conocidas realizó Vermeer en toda su vida?',
          options: ['Aproximadamente 12', 'Aproximadamente 25', 'Aproximadamente 36', 'Más de 100'],
          correctAnswer: 2,
          explanation: 'Vermeer pintó solo alrededor de 36 cuadros conocidos en toda su vida. Su producción era pequeña comparada con otros maestros, pero cada obra es una meditación cuidadosa sobre la luz y la forma.',
        },
      ],
    },
  ],

  relatedArtworks: [
    {
      titleEs: 'La Lechera',
      titleEn: 'The Milkmaid',
      year: 1658,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/1658_Girl_with_a_Pearl_Earring.jpg',
      descriptionEs: 'Una obra maestra de la intimidad doméstica. Una sirvienta vierte leche en una jarra, totalmente absorta en su tarea cotidiana. Como "La Joven de la Perla," esta pintura encuentra lo sagrado en lo ordinario, la dignidad en el trabajo simple.',
      descriptionEn: 'A masterpiece of domestic intimacy. A maid pours milk into a jug, completely absorbed in her everyday task. Like "Girl with a Pearl Earring," this painting finds the sacred in the ordinary, dignity in simple work.',
    },
    {
      titleEs: 'Vista de Delft',
      titleEn: 'View of Delft',
      year: 1660,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Vermeer_-_View_of_Delft.jpg',
      descriptionEs: 'Un panorama de la ciudad natal de Vermeer a través de la niebla matutina. Muestra su maestría en capturar la luz y la atmósfera. Aunque es un paisaje urbano, tiene la misma intimidad que "La Joven de la Perla" — es un retrato de un lugar, un momento, una emoción.',
      descriptionEn: 'A panorama of Vermeer\'s hometown through the morning mist. It shows his mastery in capturing light and atmosphere. Although it is an urban landscape, it has the same intimacy as "Girl with a Pearl Earring"—it is a portrait of a place, a moment, an emotion.',
    },
    {
      titleEs: 'El Arte de la Pintura',
      titleEn: 'The Art of Painting',
      year: 1666,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/1434539.jpg',
      descriptionEs: 'El mayor cuadro de Vermeer. Muestra a un pintor (probablemente él mismo) pintando a una musa. Es una reflexión sobre la naturaleza del arte, la relación entre artista y modelo, observador y observado. Como "La Joven de la Perla," es una meditación sobre lo que significa capturar el alma en la pintura.',
      descriptionEn: 'Vermeer\'s largest painting. It shows a painter (probably himself) painting a muse. It is a reflection on the nature of art, the relationship between artist and model, observer and observed. Like "Girl with a Pearl Earring," it is a meditation on what it means to capture the soul in painting.',
    },
  ],

  musicConnections: [
    {
      composer: 'Jan Pieterszoon Sweelinck',
      piece: 'Variations on "Mein junges Leben hat ein End"',
      era: 'Renacimiento Tardío / Barroco Temprano',
      youtubeId: 'dQw4w9WgXcQ',
      explanationEs: 'Sweelinck fue el compositor más importante de los Países Bajos antes de Vermeer. Sus Variaciones son meditativas y contemplativas, explorando sutilmente un tema simple una y otra vez. Exactamente como Vermeer: pequeñas variaciones en la luz, el color, la expresión. Ambos entienden que la profundidad proviene de la repetición cuidadosa.',
      explanationEn: 'Sweelinck was the most important composer of the Netherlands before Vermeer. His Variations are meditative and contemplative, subtly exploring a simple theme again and again. Exactly like Vermeer: small variations in light, color, expression. Both understand that depth comes from careful repetition.',
    },
    {
      composer: 'Dietrich Buxtehude',
      piece: 'Prelude and Fugue in G minor, BuxWV 578',
      era: 'Barroco Tardío',
      youtubeId: 'Zyoa9HVEACU',
      explanationEs: 'Buxtehude fue contemporáneo de Vermeer. Esta pieza comienza con introspección silenciosa, luego construye lentamente. Como la joven que gira su cabeza, como la luz que entra por la ventana, la música avanza con contenimiento emocional. No hay explosión barroca italiana. Hay contemplación holandesa. Hay silencio que habla.',
      explanationEn: 'Buxtehude was a contemporary of Vermeer. This piece begins with silent introspection, then slowly builds. Like the girl turning her head, like the light entering through the window, the music advances with emotional restraint. There is no Italian baroque explosion. There is Dutch contemplation. There is silence that speaks.',
    },
  ],
};
