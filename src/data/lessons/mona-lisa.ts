/**
 * MŪSA Lesson: Leonardo da Vinci's "La Mona Lisa"
 *
 * A cinematic descent into the most enigmatic portrait ever painted.
 * High Renaissance, 1503-1519. Where a woman's smile contains the secrets of the universe.
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
  era: 'renaissance' | 'baroque' | 'impressionism' | 'post-impressionism' | 'expressionism' | 'modernism' | 'high-renaissance';
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

export const MONA_LISA_LESSON: Lesson = {
  slug: 'mona-lisa',
  titleEs: 'La Mona Lisa',
  titleEn: 'The Mona Lisa',
  artistEs: 'Leonardo da Vinci',
  artistEn: 'Leonardo da Vinci',
  eraEs: 'Alto Renacimiento',
  eraEn: 'High Renaissance',
  era: 'high-renaissance',
  difficulty: 'starter',
  durationMinutes: 15,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg',
  yearCreated: 1503,

  narrativeBlocks: [
    {
      type: 'intro',
      title: 'La Sonrisa que Cautivó el Mundo',
      content: `Imagina una galería en París. Es una noche cualquiera, hace más de cinco siglos. Una mujer pequeña, casi insignificante, cuelga en la pared. Viste ropas oscuras. Su fondo es un paisaje desolado, imposible, como si fuera arrancado de un sueño.

Pero su sonrisa.

Esa sonrisa ha cautivado a más de ocho millones de personas al año. Ha inspirado infinitas interpretaciones. ¿Está contenta? ¿Está triste? ¿Sabe algo que nosotros no sabemos?

Nadie lo sabe. Nadie lo sabrá jamás.

Este es el poder de Leonardo da Vinci. No solo pintó un retrato. Pintó un misterio envuelto en aceite y pigmento. Pintó una pregunta que nunca será respondida. Y en esa pregunta, encontró la verdad más profunda del arte.`,
    },
    {
      type: 'story',
      title: 'El Viaje de una Mujer Desconocida',
      content: `¿Quién era realmente? Este es el primer misterio. La mayoría de los estudiosos cree que era Lisa Gherardini, una mujer florentina nacida alrededor de 1479, casada con Francesco del Giocondo, un comerciante de sedas adinerado. Pero da Vinci nunca lo confirmó. Y tal vez, eso fue lo más genial que hizo.

En 1503, Leonardo tenía 51 años. Era un hombre que había visto todo: la belleza, la muerte, la geometría perfecta de la naturaleza. Había trabajado para los Médici, para Ludovico Sforza, para el Papa mismo. Había diseñado máquinas de guerra, había estudiado la anatomía humana diseccionando cadáveres, había pintado frescos que hacían llorar a los hombres.

Francesco del Giocondo pidió a Leonardo que retratara a su esposa. Era una petición común de un comerciante rico. Leonardo aceptó.

Pero lo que sucedió a continuación fue alquimia pura.

Leonardo no simplemente copió los rasgos de Lisa. Algo mucho más profundo ocurrió. Durante años — algunos dicen que durante más de una década — Leonardo trabajo en este pequeño cuadro. Lo llevaba consigo. Lo modificaba. Lo estudiaba como si fuera un enigma a resolver.

Lisa Gherardini, que probablemente fue una mujer ordinaria, se convirtió en algo extraordinario. No bajo la mano del pintor, sino bajo su mente. Leonardo la transformó en una síntesis de toda la belleza humana posible. La belleza no de un rostro, sino del alma misma.

Cuando Leonardo finalmente partió a Francia, invitado por el Rey Francisco I en 1516, llevó consigo este pequeño cuadro. Junto con sus cuadernos, sus máquinas, sus sueños sin realizar. Y cuando murió en Amboise en 1519, el cuadro quedó en posesión del rey francés.

Así, la Mona Lisa se convirtió en francesa. O quizá, simplemente se convirtió en universal.`,
    },
    {
      type: 'technique',
      title: 'El Sfumato: El Humo que Crea la Ilusión',
      content: `Si tuvieras la chance de acercarte a la Mona Lisa con una lupa, verías algo sorprendente: no hay líneas. No hay fronteras claras entre la piel y el fondo, entre los ojos y las cejas, entre el rostro y el aire que lo rodea.

Todo es... difuminado. Suave. Como si alguien hubiera sopesado sobre la pintura y hubiera creado un humo que envuelve todo.

Eso es el sfumato. Y Leonardo da Vinci lo inventó.

**La Técnica de los Impalpables:**
La palabra sfumato viene del italiano "fumo" — humo. Leonardo aplicaba capas infinitesimales de pintura, tan finas que eran casi invisibles. No usaba pinceles gruesos. Usaba los dedos, esponjas, telas suaves. Trabajaba los pigmentos en la tela como un músico toca un instrumento delicado.

El resultado es que el ojo nunca se detiene en una línea. Viaja suavemente, como a través de aire, de una característica a otra. Es imposible decir dónde termina la mejilla y dónde comienza la sombra.

**El Misterio de la Sonrisa:**
Y aquí es donde ocurre la magia. Gracias al sfumato, la boca de Lisa no tiene un contorno claro. Las comisuras de los labios se desvanecen. La sonrisa no es declarada — es sugerida. Es insinuada.

Por eso no podemos estar seguros de qué está sonriendo. Cada observador ve algo diferente. Algunos ven alegría. Otros ven melancolia. Otros ven burla. Y Leonardo, sabiendo exactamente lo que hacía, creó esta ambigüedad deliberadamente.

**La Profundidad Sin Perspectiva Linear:**
El fondo del cuadro es arquitecturalmente imposible. Los caminos no convergen. Las montañas están a distintas alturas. El agua parece fluir en direcciones contradictorias. Pero gracias al sfumato, todo se siente coherente. Los colores se desvanecen en tonos azulados y verdosos a la distancia. El aire mismo parece tener peso, color, substancia.

Leonardo entendió algo que los pintores lineales no: que la realidad no es un conjunto de líneas y formas. Es un fenómeno óptico continuo, donde todo se mezcla con todo lo demás.

**La Luz como Caricia:**
La iluminación en la Mona Lisa es casi divina. Viene de ningún lugar específico, y de todas partes a la vez. No hay sombras duras. Hay únicamente gradaciones suaves de luz a oscuridad. El rostro de Lisa está iluminado como si fuera visto a través de una gasa de seda.

Esta luz, combinada con el sfumato, crea la ilusión de que estamos viendo no una pintura, sino una ventana a otro mundo. Un mundo donde la realidad física se ha transformado en algo más etéreo, más verdadero.`,
    },
    {
      type: 'context',
      title: 'Leonardo: El Hombre que Vio el Futuro',
      content: `**1452:** Nace Leonardo da Vinci en Vinci, una pequeña aldea cerca de Florencia. Es hijo ilegítimo de un notario y una campesina. Su nacimiento es un secreto, casi una vergüenza. Pero será el hombre más brillante de su era.

**1466-1481:** Se convierte en aprendiz en el taller de Andrea del Verrocchio en Florencia. Verrocchio es uno de los grandes maestros del Renacimiento. Leonardo estudia anatomía, óptica, geometría. Aprende a pintar como otros aprenden a respirar.

**1481:** A los 29 años, se muda a Milán. Aquí permanecerá 17 años. Trabaja para Ludovico Sforza, el "Moro," el gobernante de Milán. Durante estos años, pinta "La Última Cena" y diseña máquinas de guerra, canales de agua, sistemas de defensa. Leonardo es no simplemente artista, sino ingeniero, científico, filósofo.

**1499:** Cuando Ludovico es destituido, Leonardo se convierte en un nómada. Viaja a Venecia, Roma, Florencia. Lleva consigo sus cuadernos llenos de dibujos, observaciones, ideas que están siglos adelante de su tiempo.

**1503:** En Florencia, comienza la Mona Lisa. También trabaja en otros encargos. Pero la Mona Lisa se convierte en su obsesión secreta. Años pasan.

**1513:** Se muda a Roma, bajo el patrocinio del Papa León X. Pero la política Vaticana lo asfixia. Su genio no puede florecer en tales limitaciones.

**1516:** El Rey Francisco I de Francia lo invita. Leonardo acepta. Es un reconocimiento final — el reconocimiento de un rey. Leonardo viaja a Francia, llevando consigo la Mona Lisa, sus cuadernos, sus sueños.

**1519:** Muere en Amboise, Francia, el 2 de mayo. Tiene 67 años. No ha completado la mayoría de sus proyectos. Pero ha dejado una marca tan profunda en el mundo que cinco siglos después, seguimos estudiando cada línea que dibujó.

Leonardo dijo una vez: "Aprender a ver es el verdadero trabajo del arte." En la Mona Lisa, nos enseñó a mirar no solo con los ojos, sino con el alma.`,
    },
    {
      type: 'story',
      title: 'El Robo que Hizo Famosa una Pintura',
      content: `La historia de la Mona Lisa podría haber terminado siendo una pintura hermosa en una colección real francesa. Hermosa, sí, pero no diferente de cientos de otras obras maestras.

Pero entonces, algo extraordinario sucedió.

El 21 de agosto de 1911, un obrero italiano llamado Vincenzo Peruggia, que trabajaba en el Louvre, simplemente camionó hacia la Sala de las Pinturas donde colgaba la Mona Lisa. Pasó junto a los guardias (sí, el Louvre era sorprendentemente laxo en seguridad en ese entonces). Quitó el cuadro de la pared. Lo envolvió en una manta. Y se lo llevó.

Escondió la pintura bajo su cama en su pequeño apartamento durante dos años.

¿Por qué? Peruggia afirmó que quería devolver la pintura a Italia, su patria. Que era italiano, y la Mona Lisa debería estar en un museo italiano, no en el Louvre. Fue un acto de patriotismo, dijo. O tal vez de locura.

Pero el robo tuvo un efecto secundario extraordinario: la pintura se convirtió en mundialmente famosa de la noche a la mañana.

Antes de 1911, la Mona Lisa era conocida entre expertos y críticos de arte. Pero el hombre común no la había escuchado mencionar. Después del robo, su imagen fue en los periódicos de todo el mundo. Cuando fue recuperada por las autoridades francesas, Peruggia fue encarcelado brevemente, pero se convirtió en una especie de heroico criminal.

La Mona Lisa, entonces, fue bendecida con una nueva vida. Se convirtió en un símbolo — de Italia, de Francia, del Renacimiento, de la belleza eterna. Un simple cuadro se transformó en un ícono cultural.

Podrías decir que Vincenzo Peruggia, aunque accidentalmente, le dio a la Mona Lisa su trono. Y ahora, más de un siglo después, es la pintura más famosa del mundo. La más buscada, la más imitada, la más estudiada.

Un obrero italiano, un acto de robo, y la historia del arte cambió para siempre.`,
    },
    {
      type: 'reflection',
      title: 'La Sonrisa Eterna: ¿Qué Nos Dice?',
      content: `Cuando entras en la Sala de las Pinturas del Louvre por primera vez, pasas junto a docenas de cuadros extraordinarios. Hay obras de Delacroix, Ingres, Poussin. Hay pinturas de batalla, escenas religiosas, desnudos clásicos.

Y luego, en una caja blindada, detrás de cristal a prueba de balas, está la Mona Lisa.

Es pequeña. Más pequeña de lo que esperabas. Mide apenas 77 por 53 centímetros. Podría caber en una maleta. Y sin embargo, la habitación entera parece girar alrededor de ella.

¿Por qué?

Porque Leonardo hizo algo que va más allá de la técnica, más allá del sfumato, más allá de la belleza. Hizo algo casi mágico: creó una pintura que no revela sus secretos.

Siglos de críticos, historiadores, científicos han estudiado la Mona Lisa. Han usado tecnología de rayos X para ver los pentimentos — los cambios que Leonardo hizo mientras pintaba. Han analizado los pigmentos. Han estudiado la composición. Y después de todo este análisis, el misterio permanece.

¿Está embarazada? ¿Está enferma? ¿Tiene los ojos de alguien diferente? Quizá. O quizá Leonardo simplemente fue maestro de ambigüedad.

Pero aquí está el verdadero genio: esa ambigüedad es lo que nos hace volver. Una vez. Dos veces. Cien veces. Cada vez, esperamos descubrir el secreto. Cada vez, vemos algo ligeramente diferente. Y cada vez, la sonrisa nos elude.

La Mona Lisa nos enseña que el arte supremo no responde preguntas. Hace preguntas. La mejor pregunta — la más bella pregunta — es la que nunca puede ser completamente respondida.

Ese es el regalo de Leonardo. No nos dio una pintura. Nos dio un espejo donde vemos nuestra propia curiosidad, nuestra propia búsqueda de significado, reflejada infinitamente.

La Mona Lisa es universal porque podría ser cualquiera. Lisa Gherardini de Florencia se convirtió en la mona lisa para ti, para mí, para todos. Un rostro sin un rostro. Una sonrisa sin una razón clara. Una mujer que, gracias a Leonardo, se convirtió en la más famosa y a la vez la más desconocida del mundo.`,
    },
    {
      type: 'music',
      title: 'La Música del Silencio Renacentista',
      content: `Si la Mona Lisa tuviera una banda sonora, ¿qué música sonaría?

No sería música dramática. No sería un concierto explosivo. Sería algo mucho más sutil, más contemplativo. Sería música que respeta el silencio, que permite que el vacío sea parte de la composición.

**Josquin des Prez — Ave Maria:**
Josquin des Prez fue el compositor más grande del Renacimiento temprano, contemporáneo de Leonardo. Mientras Leonardo pintaba en Milán, Josquin componía para las catedrales de Italia. Ambos fueron revolucionarios en sus campos.

La "Ave Maria" de Josquin es extraordinariamente hermosa porque lo que *no* dice es tan importante como lo que dice. Las voces entran, dicen su parte, y se retiran. Hay respiración. Hay espacio. Como el sfumato de Leonardo, la música de Josquin es difuminada, suave, nunca completamente declarada.

Escucha esta pieza mientras miras la Mona Lisa. Notarás cómo las notas no son afiladas. Cómo cada acorde fluye hacia el siguiente sin líneas duras. Cómo el silencio entre las notas es tan musical como las notas mismas.

**La Conexión Profunda:**
Leonardo y Josquin compartían una filosofía: que la perfección no es la claridad extrema, sino el equilibrio perfecto entre revelación y misterio. Leonardo dijo: "La belleza es la manifestación de secretos." Josquin lo entendió en la música.

Ambos fueron obsesivos. Ambos trabajaban en sus composiciones durante años. Ambos entendían que la verdadera maestría consiste no en hacer lo que es obvio, sino en hacer lo que es invisible pero profundamente verdadero.

Cuando contemplas la Mona Lisa, imagina a Josquin sentado en una catedral italiana, escribiendo notas. Ambos estaban haciendo lo mismo: intentando capturar el alma humana. Uno con pintura y aceite. El otro con notas y silencio. Ambos con la misma elegancia, la misma paciencia, el mismo genio.

La música del Renacimiento no intenta impresionarte con virtuosidad. Intenta tocarte. Y la Mona Lisa hace exactamente lo mismo.`,
    },
  ],

  relatedArtworks: [
    {
      titleEs: 'La Última Cena',
      titleEn: 'The Last Supper',
      year: 1495,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Leonardo_da_Vinci_-_The_Last_Supper_-_high_res_2.jpg',
      descriptionEs: 'Otro trabajo maestro de Leonardo, esta vez en forma de fresco. Donde la Mona Lisa es intimidad y misterio, la Última Cena es drama y tragedia. Ambas obras muestran la capacidad de Leonardo para capturar la emoción humana en su forma más pura.',
      descriptionEn: 'Another Leonardo masterpiece, this time in fresco form. Where the Mona Lisa is intimacy and mystery, the Last Supper is drama and tragedy. Both works demonstrate Leonardo\'s ability to capture human emotion in its purest form.',
    },
    {
      titleEs: 'El Hombre de Vitruvio',
      titleEn: 'The Vitruvian Man',
      year: 1490,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Vitruvian_Man_by_Leonardo_da_Vinci.jpg',
      descriptionEs: 'Un dibujo de Leonardo que explora la geometría perfecta del cuerpo humano. Mientras que la Mona Lisa captura la belleza del rostro, el Hombre de Vitruvio captura la belleza matemática de la forma humana. Juntos, revelan la visión de Leonardo de la belleza universal.',
      descriptionEn: 'A Leonardo drawing exploring the perfect geometry of the human body. While the Mona Lisa captures the beauty of the face, the Vitruvian Man captures the mathematical beauty of human form. Together, they reveal Leonardo\'s vision of universal beauty.',
    },
    {
      titleEs: 'Dama con un Armiño',
      titleEn: 'Lady with an Ermine',
      year: 1489,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Lady_with_an_Ermine_-_Leonardo_da_Vinci.jpg',
      descriptionEs: 'Otro retrato de Leonardo, más joven y de mayor vivacidad que la Mona Lisa. La dama — probablemente Cecilia Gallerani — es retratada con vida y energía. Comparar este retrato con la Mona Lisa revela cómo Leonardo evolucionó su técnica hacia mayor misticismo y contemplación.',
      descriptionEn: 'Another Leonardo portrait, younger and livelier than the Mona Lisa. The lady — probably Cecilia Gallerani — is portrayed with life and energy. Comparing this portrait with the Mona Lisa reveals how Leonardo evolved his technique toward greater mysticism and contemplation.',
    },
  ],

  musicConnections: [
    {
      composer: 'Josquin des Prez',
      piece: 'Ave Maria',
      era: 'Renacimiento Temprano',
      youtubeId: 'oBILvvhVzQE',
      explanationEs: 'Josquin y Leonardo fueron contemporáneos e ideológicamente hermanos. La "Ave Maria" de Josquin comparte la delicadeza, la ambigüedad serena, y el balance perfecto entre revelación y misterio que caracteriza la Mona Lisa. Ambos artistas entendían que la verdadera belleza no grita — susurra. Las voces entran como el sfumato de Leonardo: sin líneas duras, con respiración entre las sílabas, permitiendo que el silencio sea tan musical como la música misma.',
      explanationEn: 'Josquin and Leonardo were contemporaries and ideological brothers. Josquin\'s "Ave Maria" shares the delicacy, serene ambiguity, and perfect balance between revelation and mystery that characterizes the Mona Lisa. Both artists understood that true beauty doesn\'t shout — it whispers. The voices enter like Leonardo\'s sfumato: without hard lines, with breathing between syllables, allowing silence to be as musical as the music itself.',
    },
    {
      composer: 'Orlando di Lasso',
      piece: 'Lagrime di San Pietro',
      era: 'Renacimiento Tardío',
      youtubeId: 'F7fZV5sXP1c',
      explanationEs: 'Las "Lágrimas de San Pedro" es una obra polifónica compleja que captura emociones conflictivas — el arrepentimiento, la gracia, la redención — todo simultáneamente. Como la sonrisa de Lisa que es feliz y triste a la vez, esta música es alegre y trágica a la vez. Orlando di Lasso fue influenciado por las innovaciones del Renacimiento italiano, y su trabajo demuestra cómo la música renacentista podía ser emocionalmente sofisticada, permitiendo múltiples interpretaciones simultáneamente.',
      explanationEn: 'The "Tears of Saint Peter" is a complex polyphonic work that captures conflicting emotions — repentance, grace, redemption — all simultaneously. Like Lisa\'s smile that is happy and sad at once, this music is joyful and tragic at once. Orlando di Lasso was influenced by innovations from the Italian Renaissance, and his work demonstrates how Renaissance music could be emotionally sophisticated, allowing multiple interpretations simultaneously.',
    },
  ],
};
