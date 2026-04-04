/**
 * MŪSA Lesson: Gustav Klimt's "El Beso" (The Kiss)
 *
 * A cinematic descent into Vienna's golden fever. Ornament as passion.
 * Where Byzantine gold meets Viennese decadence, and a kiss becomes eternity.
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
  era: 'renaissance' | 'baroque' | 'impressionism' | 'post-impressionism' | 'expressionism' | 'modernism' | 'art-nouveau';
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

export const KLIMT_THE_KISS_LESSON: Lesson = {
  slug: 'klimt-the-kiss',
  titleEs: 'El Beso',
  titleEn: 'The Kiss',
  artistEs: 'Gustav Klimt',
  artistEn: 'Gustav Klimt',
  eraEs: 'Art Nouveau',
  eraEn: 'Art Nouveau',
  era: 'art-nouveau',
  difficulty: 'enthusiast',
  durationMinutes: 14,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Kiss_-_Gustav_Klimt_-_1908.jpg',
  yearCreated: 1908,

  narrativeBlocks: [
    {
      type: 'intro',
      title: 'Viena, 1907',
      content: `Camina por las calles de Viena en el otoño de 1907. El aire huele a café, a humo de cigarrillo, a algo que no puedes nombrar pero que te hace sentir vivo.

En las salas de conciertos, Gustav Mahler dirige su última sinfonía. En los cafés literarios, Sigmund Freud habla del inconsciente, de los deseos ocultos, de todo lo que bulle bajo la superficie de la sociedad civilizada. Y en los estudios de los artistas, hay una revolución silenciosa.

Su nombre es Gustav Klimt. Tiene 45 años. Su cabello es largo, sus ojos están ardientes. En este momento, en este preciso momento, está pintando lo que será reconocido como su obra maestra — un beso que no es un beso ordinario.

Es un beso envuelto en oro. Es un beso que contiene toda la sensualidad, toda la pasión, toda la decadencia de una ciudad que sabe que está muriendo.

Este es el momento. Este es el cuadro.`,
    },
    {
      type: 'story',
      title: 'La Rebelión Dorada',
      content: `**1862-1886: La Formación Académica**

Gustav Klimt nace en Baumgarten, un pequeño pueblo en las afueras de Viena. Su padre es joyero y grabador en oro — un detalle que será profundo en toda su obra. Klimt estudia en la Escuela de Artes y Oficios de Viena, aprendiendo los oficios tradicionales. Pintura mural. Decoración. La precisión minuciosa del renacimiento vienés.

Durante estos años, Klimt es académico. Es correctamente formal. Es seguro. Pero algo dentro de él está esperando despertar.

**1897: La Secesión de Viena**

Junto con otros jóvenes artistas — Egon Schiele, Oskar Kokoschka, Koloman Moser — Klimt funda la Secesión de Viena. El lema es revolucionario: "A cada tiempo su arte. A cada arte su libertad."

Rompen con la Academia. Rompen con la tradición. Rompen con todo lo que Viena representa: el conservadurismo imperial, la rigidez, la represión de los deseos que Freud está excavando en las mentes vienesas.

**1900-1903: El Escándalo**

Klimt recibe un encargo para decorar el techo de la Universidad de Viena con tres pinturas: Filosofía, Medicina, Jurisprudencia. Klimt las pinta, pero no pinta lo que esperaban. Pinta figuras desnudas retorciéndose, desesperadas, eróticamente perturbadas. Pinta la filosofía como caos. Pinta la medicina como dolor.

El escándalo es inmenso. Los profesores de la universidad exigen que retire las pinturas. El público se horroriza. Pero Klimt no se disculpa. La Secesión lo defiende. Y en esa defensa, algo permanece: la idea de que el arte debe ser provocador, debe ser honesto sobre los deseos humanos, debe desafiar.

**1903: El Viaje a Ravena**

Klimt viaja a Italia para ver los mosaicos bizantinos de Ravena. Es un peregrinaje. En las iglesias de Ravena, contempla oro que ha permanecido durante mil años. No es oro por lujo. Es oro como *material de lo sagrado*. El oro refleja luz de una manera que nada más puede. El oro contiene algo divino.

Regresa a Viena transformado. Comienza lo que los historiadores del arte llamarán su "Fase Dorada." A partir de este momento, casi todos sus cuadros estarán cubiertos de oro de verdad — oro de hoja, aplicado cuidadosamente, como si estuviera creando iconos para una religión nueva.

**1907: El Retrato de Adele Bloch-Bauer I**

Klimt pinta a una de las mujeres más hermosas y ricas de Viena. La rodea de oro. El vestido es oro. El fondo es oro. Ella está rodeada de formas geométricas, de patrones ornamentales. Es como si Klimt dijera: "Esta mujer no existe en el mundo real. Existe en un sueño de oro."

Ese mismo año, comienza a trabajar en lo que será su obra maestra. El beso. El último icono de la Viena imperial, antes de que todo se desmorona.

**1908: "El Beso" se Completa**

Klimt pinta un beso. En primer plano, una pareja se besa. Ella se inclina, casi cayendo de rodillas. Él la sostiene. Sus cuerpos están cubiertos de oro, de patrones, de formas geométricas. Alrededor de ellos, un abismo dorado. Detrás de ellos, la disolución del espacio.

Se dice que el modelo para la mujer fue Emilie Flögé, su compañera de toda la vida — aunque Klimt nunca confirmó esto. Emilie fue su musa, su compañera, la mujer con la que compartió toda su vida pero nunca se casó.

El cuadro es expuesto en la Galería de la Sezession. Se convierte inmediatamente en su obra más famosa. El mundo ve en él lo que Viena necesitaba: un símbolo de belleza en el caos, de pasión en la represión, de oro en la mediocridad.

**1918: El Final**

Klimt muere el 6 de febrero de 1918, a los 55 años. Viena está colapsando. El imperio está cayendo. Deja detrás cientos de obras, muchas inacabadas. Pero el legado que permanece es claro: demostró que el arte puede ser hermoso, erótico, provocador, y verdadero al mismo tiempo.

Su oro sigue brillando. Sus besos sigue resonando.`,
    },
    {
      type: 'technique',
      title: 'El Lenguaje del Oro',
      content: `Cuando contemplas "El Beso" de Klimt en el Museo Belvedere de Viena, algo extraño sucede. No estás mirando un cuadro. Estás siendo envuelto por él.

**El Oro Real**

Klimt no pinta oro. *Aplica* oro. Usa hojas de oro verdadero — el mismo material que se usa en iconos religiosos medievales, en manuscritos iluminados, en las cúpulas de las iglesias.

¿Por qué? Porque el oro tiene cualidades que la pintura no puede lograr. El oro refleja la luz de manera viva. El oro cambia según cómo lo miras. El oro existe en el espacio entre la realidad y la ilusión.

Cuando aplicas oro a un lienzo, no estás creando una ilusión de profundidad. Estás creando una superficie que vive, que respira, que vibra bajo la luz real. Es como si Klimt dijera: "Este no es un cuadro sobre amor. Es un acto de amor, hecho de la materia más preciosa que existe."

**La Tensión entre Ornamento y Carne**

Aquí está el genio de Klimt: dibuja las caras y las manos con precisión realista. Los rasgos están delicados, verdaderos, casi fotografía. Pero los cuerpos — los cuerpos están completamente decorativos.

Mira el vestido de ella: no es un vestido. Es un campo de círculos, flores geométricas, símbolos femeninos. Mira la ropa de él: rectángulos negros y blancos, líneas rectas, formas masculinas. Es como si Klimt dijera que la verdadera identidad no está en los rasgos, sino en los patrones, en lo decorativo, en lo que está más allá de la expresión facial.

Esta es una idea revolucionaria: que lo ornamental *es* lo real. Que el patrón geométrico puede expresar verdad emocional más profundamente que el realismo.

**La Composición Flotante**

El cuadro es un cuadrado perfecto: 180 × 180 centímetros. No hay horizonte. No hay perspectiva convencional. Los dos cuerpos flotan en un espacio dorado indefinido. ¿Están de pie? ¿Están de rodillas? ¿Están cayendo? No importa. El espacio no obedece las leyes de la gravedad.

Klimt está creando lo que después se llamaría arte "sin lugar" — un espacio que existe solo en el reino del sueño, la emoción, el deseo inconsciente.

**Los Patrones Eróticos**

Mira más de cerca. Los patrones de ella son principalmente círculos y flores — símbolos del cuerpo femenino, de la fertilidad, de las formas blandas. Los patrones de él son rectángulos y líneas — formas rectilíneas, agresivas, activas.

Esto no es accidental. Es una codificación del acto sexual mismo — la suavidad femenina, la dureza masculina, el contraste entre cuerpos que se encuentran. Klimt está haciendo que el ornamento narre una historia erótica.

**El Abismo Dorado**

Detrás de la pareja, el espacio se abre a un abismo dorado. No hay profundidad. Solo hay oro que se disuelve. Algunos historiadores lo interpretan como el inconsciente. Otros como el universo. Otros simplemente como la nada que espera.

Pero hay una sensación de que la pareja está a punto de caer en ese abismo. Su beso es un momento suspendido antes de la desaparición. Es hermoso y amenazante al mismo tiempo.

**La Influencia del Secesionismo**

Klimt es el maestro de lo que se llamaría Jugendstil (Art Nouveau austríaco). Este movimiento rompe radicalmente con la perspectiva renacentista, con el realismo, con todo lo que el arte occidental ha valorado durante quinientos años.

Dice: la realidad no es perspectiva lineal. La realidad es patrón, ritmo, superficie, decoración. El arte no debe copiar la naturaleza. Debe abstracerla, estilizarla, llevarla a su esencia decorativa.

Klimt lleva esto a su conclusión lógica: pinta figuras humanas como si fueran decoraciones. Pinta el amor como si fuera un patrón infinito. Pinta el deseo como oro puro.`,
    },
    {
      type: 'music',
      title: 'La Sinfonía de la Pasión',
      content: `En la Viena de 1908, mientras Klimt está terminando "El Beso," la música también está siendo revolucionada.

**Gustav Mahler — Sinfonía No. 5, Adagietto**

Gustav Mahler es el director de la Ópera Estatal de Viena durante los años en que Klimt crea sus obras maestras. Los dos hombres comparten el mismo aire, la misma ciudad, la misma obsesión por capturar lo inefable.

La Sinfonía No. 5 de Mahler fue compuesta en 1901-1902. El Adagietto, su cuarto movimiento, es una de las piezas más hermosas jamás escritas. Es un dueto de arpa y cuerdas. Es lamento. Es resignación. Es casi un adiós.

Cuando escuchas el Adagietto mientras contemplas "El Beso," entiendes algo: Mahler y Klimt estaban pintando/componiendo el mismo sueño. El sueño de una Viena que sabe que está muriendo. Una Viena que celebra la belleza precisamente porque sabe que será destruida.

El Adagietto tiene una cualidad de despedida, de amargura elegante, de amor que es tristeza. Exactamente lo que Klimt crea en su cuadro: un beso que es hermoso pero precario, que será destruido, que existe solo en el momento.

**Richard Strauss — "Der Rosenkavalier" (El Caballero de la Rosa)**

En 1911, tres años después de que Klimt termina "El Beso," Richard Strauss estrena "Der Rosenkavalier," una ópera sobre el amor, la belleza, la decadencia de la aristocracia vienesa.

Es una obra de una opulencia increíble. Orquesta gigante. Voces que cantan sobre la fugacidad del amor, sobre cómo la belleza siempre se desvanece. La famosa aria "Morgen!" de Strauss podría ser el acompañamiento perfecto a "El Beso" de Klimt.

Los dos artistas estaban viviendo la misma obsesión: capturar la belleza en un momento donde todo estaba cayendo.

**Arnold Schoenberg — La Revolución Atonalidad**

Arnold Schoenberg, otro vienés, está en estos mismos años inventando la música atonal. Está rompiendo el sistema tonal que ha gobernado la música occidental durante quinientos años, tal como Klimt está rompiendo la perspectiva renacentista.

Hay un paralelismo perfecto: así como Klimt hace que el cuadro sea decorativo y no representacional, Schoenberg hace que la música sea libre del tono central. Los dos artistas están diciendo: "No obedeceremos las leyes de la tradición. Crearemos nuevas reglas."

**La Conexión**

Viena en 1907-1908 es un momento extraordinario en la historia de la cultura. Todos los grandes artistas — músicos, pintores, literatos, filósofos — están revolucionando sus formas de arte simultáneamente.

"El Beso" de Klimt es música visual. El Adagietto de Mahler es pintura sonora. "Der Rosenkavalier" de Strauss es un cuadro que canta. Son tres arte tratando de capturar lo mismo: la belleza, la pasión, la transitoriedad de un momento dorado antes de la catástrofe.`,
    },
    {
      type: 'context',
      title: 'Viena Fin de Siglo',
      content: `**1880-1897: La Viena Académica**

Gustav Klimt es un pintor académico exitoso en los años 1880. Recibe encargos importantes. Pinta murales para edificios públicos. Es respetado, establecido, seguro.

Pero algo está cambiando en la sociedad. Freud publica "La Interpretación de los Sueños" en 1900. Arthur Schnitzler escribe sobre los deseos reprimidos de la clase media vienesa. La música está siendo revolucionada por Mahler. El teatro está siendo revolucionado por Frank Wedekind, quien escribe sobre sexualidad y adolescencia de forma que antes era impensable.

**1897: La Fundación de la Secesión**

Klimt y otros artistas jóvenes fundan la Secesión de Viena — un movimiento que rechaza la Academia y la tradición. El edificio de la Secesión, diseñado por Joseph Maria Olbrich, se convierte en templo del arte nuevo. Su cúpula dorada refleja luz como si fuera un ojo vigilante.

El lema del edificio es el grito de guerra de la generación: "A cada tiempo su arte. A cada arte su libertad."

**1900-1905: La Fase Oscura**

Klimt pinta sus murales universitarios. Son oscuros, perturbadores, sexuales en forma nueva e inquietante. La sociedad vienesa se horroriza. Pero esto es precisamente lo que Freud está diciendo: debajo de la respetabilidad vienesa, hay caos sexual, hay angustia, hay deseos reprimidos.

Klimt está pintando lo que Freud está teoría — está haciendo visible lo inconsciente.

**1903-1908: La Fase Dorada**

Klimt regresa de Italia con una revelación: el oro. A partir de 1903, prácticamente cada cuadro suyo incluirá oro verdadero. Es como si dijera: "El mundo es demasiado oscuro. Necesito cubrir todo con luz pura."

Esta es la época de sus retratos más hermosos — la Adele Bloch-Bauer, que se convertirá en "La Mujer en Oro" y vivirá una historia de restitución y belleza durante cien años.

**1907-1908: El Apogeo**

"El Beso" es pintalizado en el corazón de esta Fase Dorada. Es el punto culminante, la síntesis perfecta de todo lo que Klimt ha aprendido: la técnica de la Secesión, la influencia del oro bizantino, la obsesión por el ornamento, la necesidad de expresar el deseo sexual que la sociedad vienesa reprimía.

**1908-1918: El Fin de un Mundo**

Después de "El Beso," Klimt continúa pintando. Sus últimas obras son aún más abstractas, aún más ornamentales. Pero la historia está alcanzándolo.

En 1914, estalla la Primera Guerra Mundial. El Imperio Austro-Húngaro entra en colapso. Viena, la capital de una era, se convierte en la capital de un estado reducido, empobrecido, derrotado.

Klimt muere en 1918, el mismo año en que el imperio muere. Deja detrás un legado que sería olvidado durante décadas — hasta que en la década de 2000, sus obras se revalorizan como precursoras del Expresionismo Abstracto.

**Viena es Klimt. Klimt es Viena.** El arte fue su manera de decir: "Mientras esto dure, será hermoso. Mientras esto dure, habrá oro. Mientras esto dure, el beso será sagrado."`,
    },
    {
      type: 'reflection',
      title: 'El Beso Eterno',
      content: `Cuando te encuentras frente a "El Beso" en el Museo Belvedere, después de subir las escaleras, después de pasar por las salas de arte austriaco, algo sucede. No es racional. Es emocional.

Estás viendo un beso. Es íntimo, privado, sagrado. Pero también está envuelto en oro, rodeado de patrones, decorado como un ícono. Es al mismo tiempo lo más privado y lo más público que existe.

Eso es el genio de Klimt: hacer que lo privado sea público sin perder su intimidad.

**La Paradoja del Ornamento**

Hay una pregunta fundamental que Klimt plantea: ¿el ornamento distancia o acerca? ¿Cuando cubres algo con patrones, lo vuelves más lejano o más accesible?

La respuesta de Klimt es: ambas cosas. Los patrones hacen que el beso sea más distante — lo abstraen, lo hacen menos "realista." Pero al mismo tiempo, lo hacen más universal. Un beso cubierto de oro es todos los besos. Un beso en un patrón infinito es el beso eterno.

**El Deseo Como Belleza**

Freud estaba hablando de represión sexual. Klimt estaba pintándola. Estaba diciendo: el deseo no es sucio. El deseo es hermoso. El deseo merece oro.

En "El Beso," el contacto sexual — porque ese es lo que el beso representa, el preludio del acto sexual — no es vergüenza. Es gloria. Los cuerpos no están avergonzados. Están cubiertos de oro.

**La Transitoriedad**

Hay una tristeza en "El Beso." A pesar del oro, a pesar de la belleza, hay una sensación de que esto no durará. La pareja está a punto de caer en el abismo. El beso es un momento suspendido antes de la caída.

Klimt sabía que Viena estaba muriendo. Sabía que el imperio se desmoronaría. Sabía que la belleza es frágil. Por eso la cubría de oro — para que, incluso cuando se desmorona, el oro permanezca.

**La Igualdad de los Cuerpos**

Mira los patrones. El cuerpo masculino está cubierto de rectángulos. El cuerpo femenino está cubierto de flores y círculos. Son diferentes, pero son iguales en importancia. Son iguales en belleza. Son iguales en el acto del beso.

En una era donde las mujeres apenas comenzaban a tener derechos, Klimt estaba pintando una mujer que es tan activa, tan presente, tan importante como el hombre. Ella no es pasiva. Ella se inclina, ella participa, ella es igual.

**El Legado**

"El Beso" fue robado por los nazis. Fue recuperado. Fue vendido por casi 250 millones de dólares. Ha sido reproducido en carteles, en chocolatinas, en todo el merchandising turístico de Viena. Se ha vuelto icónico en el peor sentido — tan reproducido que casi perdemos de vista su poder.

Pero cuando lo ves en persona, cuando ves el oro de verdad, cuando sientes la escala, cuando entiendes que Klimt literalmente pasó semanas aplicando oro hoja por hoja — entonces entiendes que estás en presencia de algo sagrado.

"El Beso" es la última declaración de la Viena imperial. Es un grito de belleza en la cara del colapso. Es un beso que dura cien años.

Y cada vez que lo miras, dura un poco más.`,
    },
    {
      type: 'quiz',
      title: 'Prueba tu Conocimiento',
      content: 'Responde las siguientes preguntas sobre "El Beso" de Klimt y lo que hemos aprendido.',
      questions: [
        {
          id: 'q1',
          question: '¿Cuál fue el movimiento artístico que Klimt ayudó a fundar en 1897?',
          options: ['El Movimiento Modernista', 'La Secesión de Viena', 'El Expresionismo Alemán', 'El Futurismo Italiano'],
          correctAnswer: 1,
          explanation: 'La Secesión de Viena fue fundada por Klimt y otros artistas jóvenes que querían romper con la Academia tradicional. Su lema era "A cada tiempo su arte, a cada arte su libertad" — una declaración revolucionaria de libertad artística.',
        },
        {
          id: 'q2',
          question: '¿Qué material especial usa Klimt para crear el efecto dorado de "El Beso"?',
          options: ['Pintura acrílica dorada', 'Hoja de oro verdadera', 'Bronce pulido', 'Vidrio coloreado'],
          correctAnswer: 1,
          explanation: 'Klimt aplica hoja de oro verdadero — el mismo material que se usa en iconos religiosos medievales. Esta aplicación cuidadosa hace que el oro refleje luz de manera viva y cambiante, dándole una cualidad casi sagrada.',
        },
        {
          id: 'q3',
          question: '¿Dónde se encuentra actualmente "El Beso" de Klimt?',
          options: ['Museo del Louvre en París', 'Galería Nacional de Londres', 'Museo Belvedere en Viena', 'Museo Metropolitano en Nueva York'],
          correctAnswer: 2,
          explanation: '"El Beso" es la obra más preciada del Museo Belvedere en Viena, Austria. Es considerada una de las obras maestra del arte mundial y atrae a miles de visitantes cada año.',
        },
        {
          id: 'q4',
          question: '¿Qué viaje en 1903 inspiró a Klimt a utilizar oro en sus pinturas?',
          options: ['Un viaje a Grecia para estudiar arte clásico', 'Un viaje a Ravena, Italia para ver mosaicos bizantinos', 'Un viaje a Estambul para estudiar arte otomano', 'Un viaje a Egipto para estudiar arte antiguo'],
          correctAnswer: 1,
          explanation: 'Klimt viajó a Ravena para ver los mosaicos bizantinos que han permanecido durante mil años. Entendió que el oro no era mero lujo, sino un material sagrado que reflejaba luz de manera divina.',
        },
        {
          id: 'q5',
          question: '¿Cuál es el significado de los diferentes patrones en los cuerpos de la pareja en "El Beso"?',
          options: ['No tiene significado, es puramente decorativo', 'Los rectángulos representan riqueza, las flores representan pobreza', 'Los rectángulos (masculino) vs. círculos y flores (femenino) representan características de género', 'Los patrones representan diferentes épocas de la historia'],
          correctAnswer: 2,
          explanation: 'Los patrones son una codificación de lo masculino y lo femenino. El cuerpo del hombre está cubierto de rectángulos y líneas rectas (formas agresivas), mientras que el de la mujer está cubierto de círculos y flores (formas suaves). Klimt usa la decoración para narrar la historia de dos cuerpos diferentes que se encuentran.',
        },
        {
          id: 'q6',
          question: '¿Quién fue probablemente la modelo para la mujer en "El Beso"?',
          options: ['Adele Bloch-Bauer', 'Emilie Flögé', 'Maria Altmann', 'Gretl Flögé'],
          correctAnswer: 1,
          explanation: 'Se cree que Emilie Flögé fue la modelo, aunque Klimt nunca lo confirmó. Emilie fue su compañera de toda la vida — su musa, su confidente, la mujer con la que compartió su vida pero nunca se casó formalmente.',
        },
      ],
    },
  ],

  relatedArtworks: [
    {
      titleEs: 'El Retrato de Adele Bloch-Bauer I (La Mujer en Oro)',
      titleEn: 'Portrait of Adele Bloch-Bauer I (The Woman in Gold)',
      year: 1907,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Klimt_Adele_Bloch-Bauer.jpg',
      descriptionEs: 'Una de las obras más hermosas de Klimt, pintada el mismo año que comienza "El Beso." Adele está completamente rodeada de oro y patrones geométricos. Se convirtió en un ícono del arte del siglo XX después de su retorno a Austria en 2006.',
      descriptionEn: 'One of Klimt\'s most beautiful works, painted the same year he began "The Kiss." Adele is completely surrounded by gold and geometric patterns. It became an icon of 20th-century art after its return to Austria in 2006.',
    },
    {
      titleEs: 'Filosofía (Mural Universitario)',
      titleEn: 'Philosophy (University Ceiling)',
      year: 1900,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Klimt_Philosophy.jpg',
      descriptionEs: 'El mural que causó escándalo en la Viena de 1900. Klimt pinta figuras desnudas en caída y desesperación, reflejando las ideas de Freud sobre el inconsciente humano. Fue considerado obsceno pero se convirtió en símbolo de libertad artística.',
      descriptionEn: 'The mural that scandalized Vienna in 1900. Klimt paints nude figures in fall and desperation, reflecting Freud\'s ideas about the human unconscious. It was considered obscene but became a symbol of artistic freedom.',
    },
    {
      titleEs: 'Medicina (Mural Universitario)',
      titleEn: 'Medicine (University Ceiling)',
      year: 1901,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Klimt_Medicine.jpg',
      descriptionEs: 'El segundo mural universitario de Klimt, aún más perturbador que Filosofía. Representa la medicina como un acto de sacrificio y dolor, rodeado de figuras que sufren. Fue una crítica radical a la medicina tradicional.',
      descriptionEn: 'Klimt\'s second university mural, even more disturbing than Philosophy. It represents medicine as an act of sacrifice and pain, surrounded by suffering figures. It was a radical critique of traditional medicine.',
    },
    {
      titleEs: 'Agua Moviente',
      titleEn: 'Water Serpents II',
      year: 1904,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Klimt_water-serpents-II_1904.jpg',
      descriptionEs: 'Una obra donde Klimt explora el cuerpo femenino de forma casi abstracta, con patrones de oro y formas sensuales que se disuelven en el agua. Anticipa muchas de las técnicas que usará en "El Beso."',
      descriptionEn: 'A work where Klimt explores the female body in almost abstract form, with gold patterns and sensual shapes that dissolve into water. It anticipates many of the techniques he will use in "The Kiss."',
    },
    {
      titleEs: 'El Árbol de la Vida',
      titleEn: 'The Tree of Life',
      year: 1909,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Klimt_Tree_of_Life.jpg',
      descriptionEs: 'Pintado un año después de "El Beso," "El Árbol de la Vida" continúa con la Fase Dorada pero con una composición más vertical y espiritual. Es una meditación sobre la vida, la muerte y la eternidad.',
      descriptionEn: 'Painted a year after "The Kiss," "The Tree of Life" continues the Golden Phase but with a more vertical and spiritual composition. It is a meditation on life, death, and eternity.',
    },
    {
      titleEs: 'Espera',
      titleEn: 'Expectation',
      year: 1905,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Klimt_Expectation_1905-06.jpg',
      descriptionEs: 'Parte de un friso decorativo de Klimt, muestra a una mujer esperando. Es una exploración de la anticipación y el deseo, temas que culminan en "El Beso." La figura está rodeada de oro y patrones que sugieren tanto belleza como inquietud.',
      descriptionEn: 'Part of Klimt\'s decorative frieze, it shows a woman waiting. It is an exploration of anticipation and desire, themes that culminate in "The Kiss." The figure is surrounded by gold and patterns that suggest both beauty and unease.',
    },
  ],

  musicConnections: [
    {
      composer: 'Gustav Mahler',
      piece: 'Sinfonía No. 5, Adagietto',
      era: 'Romanticismo Tardío / Modernismo',
      youtubeId: 'QEzhxP-pdPA',
      explanationEs: 'Mahler compone esta sinfonía en 1901-1902, mientras Klimt está desarrollando su Fase Dorada. El Adagietto es un dueto de arpa y cuerdas que expresa una belleza melancólica y resignada — exactamente el espíritu de "El Beso." Ambos artistas compartían la Viena de 1900, donde la belleza se sentía como un adiós elegante a un mundo que se estaba desmoronando.',
      explanationEn: 'Mahler composed this symphony in 1901-1902, while Klimt was developing his Golden Phase. The Adagietto is a harp and strings duet that expresses a melancholic and resigned beauty — exactly the spirit of "The Kiss." Both artists shared turn-of-the-century Vienna, where beauty felt like an elegant farewell to a world that was falling apart.',
    },
    {
      composer: 'Richard Strauss',
      piece: 'Der Rosenkavalier (El Caballero de la Rosa)',
      era: 'Romanticismo Tardío',
      youtubeId: 'hXOjV9UXNjI',
      explanationEs: 'Strauss estrena esta ópera en 1911, tres años después de "El Beso." Es una celebración de la opulencia vienesa, del lujo, del amor en una sociedad aristocrática en declive. La música de Strauss es ornamental, hermosa, extravagante — exactamente como la decoración dorada de Klimt. Los dos artistas estaban creando belleza como acto de resistencia contra el colapso que se aproximaba.',
      explanationEn: 'Strauss premiered this opera in 1911, three years after "The Kiss." It is a celebration of Viennese opulence, luxury, and love in a declining aristocratic society. Strauss\'s music is ornamental, beautiful, extravagant — exactly like Klimt\'s golden decoration. Both artists were creating beauty as an act of resistance against the impending collapse.',
    },
  ],
};
