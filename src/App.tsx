import logo from './assets/logo.png';
import Patricia from './assets/Patricia.jpg';
import discoveryImg from './assets/Discovery-Active-learning-Club-Taller.jpg';
import arteImg from './assets/Arte-Club-Taller.jpg';
import musicaImg from './assets/musica-Club-Taller.png';
import inglesImg from './assets/Ingles-Club-Taller.jpg';
import gradosImg from './assets/de-Jardin-a-quinto-Club-Taller.jpg';
// Agrega estas dos líneas junto a las importaciones de imágenes que ya tenías
import matematicasImg from './assets/matematicas-club-taller.jpg';
import programacionImg from './assets/programacion-club-taller.jpg';
import comunidadImg from './assets/Comunidad-Homeschool.jpg';
import React, { useState } from 'react';
import { 
  Palette, 
  Music, 
  BookOpen, 
  CheckCircle, 
  Star,
  GraduationCap,
  Users,
  Brain,
  ChevronRight,
  Send,
  MessageCircle
} from 'lucide-react';
import { supabase } from './supabaseClient';

// --- CONFIGURACIÓN DE COLORES ---
const colors = {
  paper: '#fcf8f2', // Nuevo: Crema/marfil cálido que da sensación de cuaderno de dibujo
  grid: '#c7d2fe',  // Nuevo: Un azul lavanda/pastel suave que le da identidad a la cuadrícula
  inkBlue: '#1e3a8a',  // Azul marino profundo del texto "CLUB TALLER"
  inkGreen: '#65a30d', // Verde vivo del texto "HOMESCHOOL" y naturaleza
  inkRed: '#ea580c',   // Naranja/Rojo de "Discovery Active" y detalles de la ropa
  pencil: '#4b5563'
};

// --- COMPONENTES VISUALES (FUERA DE LA APP PARA EVITAR EL ERROR DEL CURSOR) ---
const HandDrawnBorder = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 border-2 border-gray-400 rounded-lg transform rotate-0.5 pointer-events-none" style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}></div>
    <div className="relative z-10 h-full flex flex-col">{children}</div>
  </div>
);

const Tape = () => (
  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-yellow-100 opacity-80 shadow-sm rotate-2 z-20 border-l border-r border-white/50"></div>
);

const contentSections = [
  {
    id: 'methodology',
    title: 'Discovery Active Learning',
    icon: <img src={discoveryImg} alt="Discovery Active Learning" className="w-14 h-14 rounded-full object-cover shadow-md border border-gray-100" />,
    colorCode: colors.inkBlue,
    description: "Nuestra metodología propia. Aprendizaje significativo basado en el descubrimiento.",
    details: ["Proyectos e Investigación.", "Criterio propio.", "Evaluación cualitativa.", "Planeación estratégica."]
  },
  {
    id: 'math',
    title: 'Matemáticas Vivas',
    icon: <img src={matematicasImg} alt="Matemáticas Vivas" className="w-14 h-14 rounded-full object-cover shadow-md border border-gray-100" />,
    colorCode: colors.inkRed,
    description: "El arte de descubrir el mundo. Las matemáticas no se memorizan: se viven, se tocan y se disfrutan.",
    details: [
      "Matemáticas en las manos: Material concreto (regletas de Cuisenaire).", 
      "Mente y cuerpo en movimiento: Sumar saltando y multiplicando con ritmos.", 
      "Retos para la vida: Premiamos la curiosidad y perder el miedo al error."
    ]
  },
  {
    id: 'structure',
    title: 'Estructura y Programación',
    icon: <img src={programacionImg} alt="Estructura y Programación" className="w-14 h-14 rounded-full object-cover shadow-md border border-gray-100" />,
    colorCode: colors.inkGreen,
    description: "Un camino claro, flexible y con sentido para despertar el pensamiento lógico y crítico.",
    details: [
      "Rutas de 16 Semanas: Bloques estructurados sin prisa.", 
      "Enfoque de Singapur: De la exploración a la abstracción.", 
      "Aprendizaje por Proyectos (ABP): Retos reales e integrados.",
      "Evaluación Formativa: Bitácoras y gestión del error, sin exámenes estresantes."
    ]
  },
  {
    id: 'arts',
    title: 'Arte, Música e Inglés',
    icon: (
      <div className="relative w-16 h-16 transform hover:scale-105 transition-transform duration-300">
        <img src={arteImg} alt="Arte" className="absolute top-0 left-0 w-10 h-10 rounded-full object-cover border-2 border-white shadow-md z-10" />
        <img src={musicaImg} alt="Música" className="absolute bottom-0 left-2 w-9 h-9 rounded-full object-cover border-2 border-white shadow-md z-20" />
        <img src={inglesImg} alt="Inglés" className="absolute top-1 right-0 w-10 h-10 rounded-full object-cover border-2 border-white shadow-md z-30" />
      </div>
    ),
    colorCode: colors.inkBlue,
    description: "No son 'relleno', son la base. El juego y la música son ejes transversales.",
    details: ["Arte y música integrada.", "Inglés natural.", "Expresión corporal."]
  },
  {
    id: 'grades',
    title: 'De Jardín a Quinto',
    icon: <img src={gradosImg} alt="De Jardín a Quinto" className="w-14 h-14 rounded-full object-cover shadow-md border border-gray-100" />,
    colorCode: colors.inkRed,
    description: "Acompañamos y certificamos procesos de educación en casa.",
    details: ["Niños de 1 a 12 años.", "Certificado Min. Educación.", "Sesiones en tiempo real."]
  },
  {
    id: 'community',
    title: 'Comunidad Homeschool',
    icon: <img src={comunidadImg} alt="Comunidad" className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-white" />,
    colorCode: colors.inkGreen,
    description: "Apoyamos a las familias con una propuesta flexible y personalizada.",
    details: ["Acompañamiento a padres.", "Cajita mensual física.", "Escuela para padres."]
  }
];

const quizQuestions = [
  {
    id: 'q1',
    text: "¿Cuál es nuestra metodología propia?",
    options: ["Memorización Tradicional", "Discovery Active Learning", "Educación a distancia simple"],
    correct: "Discovery Active Learning"
  },
  {
    id: 'q2',
    text: "¿Qué áreas son ejes transversales en Club Taller?",
    options: ["Solo Matemáticas", "Arte, Música e Inglés", "Deporte competitivo"],
    correct: "Arte, Música e Inglés"
  }
];

export default function App() {
  const [view, setView] = useState<'infographic' | 'form' | 'success'>('infographic');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [readSections, setReadSections] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    q1: '',
    q2: ''
  });
  
  const [errors, setErrors] = useState<any>({});

  const handleSectionClick = (id: string) => {
    if (expandedSection === id) {
      setExpandedSection(null);
    } else {
      setExpandedSection(id);
      if (!readSections.includes(id)) {
        setReadSections([...readSections, id]);
      }
    }
  };

  const allRead = readSections.length === contentSections.length;

  const validateForm = () => {
    let newErrors: any = {};
    if (!formData.parentName) newErrors.parentName = "Nombre requerido";
    if (!formData.email) newErrors.email = "Correo requerido";
    if (!formData.phone) newErrors.phone = "WhatsApp requerido";
    if (formData.q1 !== quizQuestions[0].correct) newErrors.q1 = "Respuesta incorrecta.";
    if (formData.q2 !== quizQuestions[1].correct) newErrors.q2 = "Respuesta incorrecta.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('inscripciones')
          .insert([{ 
            nombre: formData.parentName, 
            email: formData.email, 
            telefono: formData.phone,
            pregunta1: formData.q1,
            pregunta2: formData.q2
          }]);
        if (error) throw error;
        setView('success');
      } catch (error) {
        alert('Error al guardar. Verifica tu conexión o la config de Supabase.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const whatsappLink = `https://wa.me/573204193266?text=Hola,%20soy%20${encodeURIComponent(formData.parentName)}.%20Ya%20completé%20el%20test%20de%20Club%20Taller.`;

  return (
    <div className="min-h-screen font-sans text-gray-700 relative pb-10" style={{ backgroundColor: colors.paper }}>
      {/* Cambiamos opacity-30 por opacity-60 para que la cuadrícula tenga más presencia */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}>
      </div>

      <header className="relative z-10 pt-8 pb-4 px-4 text-center">
        <div className="max-w-4xl mx-auto border-b-4 border-double pb-4 mb-8 transform -rotate-1" style={{ borderColor: colors.inkRed }}>
          <div className="inline-block bg-white p-6 md:p-10 shadow-lg transform rotate-1 border border-gray-200 rounded-sm">
      
            {/* Tu Logo Actual */}
            <img src={logo} alt="Club Taller Logo" className="h-24 md:h-40 lg:h-48 mx-auto object-contain" />

            {/* --- NUEVO TÍTULO EMOCIONAL --- */}
            <h2 
              className="mt-6 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'Indie Flower', 
                color: colors.inkBlue,
                // Un pequeño ajuste de espaciado entre letras para que parezca más caligrafía real
                letterSpacing: '-0.02em' 
              }}
            >
             "Deja atrás la confusión y regala a tus hijos la educación que siempre soñaste"
            </h2>
      
          </div>
        </div>
      </header>

      {/* --- SECCIÓN: CONOCE A TU GUÍA (PATRICIA RIVEROS) --- */}
<section className="mb-20 px-4 max-w-5xl mx-auto">
  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
    
    {/* Columna de la Imagen: Efecto Polaroid */}
    <div className="w-full md:w-1/3 flex-shrink-0">
      <div className="relative transform -rotate-2 hover:rotate-0 transition-transform duration-300">
        <div className="bg-white p-3 shadow-2xl border border-gray-100 pb-12">
          {/* Aquí va la foto de Patricia */}
          <div className="aspect-[4/5] bg-gray-200 overflow-hidden rounded-sm mb-4">
             <img 
               src={Patricia}
               alt="Patricia Riveros - Fundadora" 
               className="w-full h-full object-cover"
             />
          </div>
          <p className="text-center font-bold text-lg" style={{ fontFamily: 'Indie Flower', color: colors.inkBlue }}>
            Patricia Riveros
          </p>
          <p className="text-center text-xs uppercase tracking-widest text-gray-400">Fundadora & Mamá</p>
        </div>
        <Tape /> {/* Reutilizamos tu componente Tape para el efecto visual */}
      </div>
    </div>

    {/* Columna de Texto: Estilo Carta */}
    <div className="w-full md:w-2/3">
      <HandDrawnBorder className="bg-white p-6 md:p-10 shadow-xl relative">
        <h2 className="text-3xl font-bold leading-tight mb-6" 
            style={{ 
              fontFamily: 'Indie Flower', 
              color: colors.inkBlue,
              textShadow: '1px 1px 0px white' 
            }}>
          Transforma la educación de tus hijos con la guía de quien ya recorrió el camino.
        </h2>
    
        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
          <p>
            Elegir la educación en casa es un acto de amor, pero también un desafío que genera preguntas: 
            <span className="bg-yellow-100 px-1 font-medium">¿Estoy cubriendo lo que necesitan? ¿Cómo mantengo su interés?</span>
          </p>

          <p>
            <strong>Soy Patricia Riveros</strong> y entiendo perfectamente esas dudas. Mi perspectiva es única porque une dos mundos:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex gap-3 items-start">
              <CheckCircle className="flex-shrink-0 mt-1" size={20} style={{ color: colors.inkGreen }} />
              <span><strong>Más de 15 años como pedagoga</strong> y docente profesional, diseñando procesos de aprendizaje efectivos.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle className="flex-shrink-0 mt-1" size={20} style={{ color: colors.inkGreen }} />
              <span><strong>13 años como madre homeschooler</strong> viviendo en primera persona la realidad de educar en el hogar.</span>
            </li>
          </ul>

      {/* HISTORIA DEL CLUB */}
          <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 mt-8" style={{ borderColor: colors.inkBlue }}>
            <h3 className="font-bold mb-2 text-xl" style={{ color: colors.inkBlue }}>Club Taller Homeschool: 9 años creando comunidades con propósito.</h3>
            <p className="text-base">
              Hace casi una década fundé este espacio para ofrecer lo que yo misma busqué al inicio: Una guía clara, técnica y profundamente humana. Aquí, la educación no es una imposición, es una experiencia significativa.
            </p>
          </div>

          {/* METODOLOGÍA */}
          <div className="mt-8 px-2">
            <h4 className="font-bold text-xl mb-3" style={{ color: colors.inkRed }}>
              Metodología Discovery Active Learning (2 a 12 años)
            </h4>
            <p className="mb-4">
              A través de mi experiencia docente, he perfeccionado un método donde el niño es el protagonista. No buscamos que memoricen; buscamos que descubran. Nuestro programa ofrece:
            </p>
            <ul className="space-y-3 ml-2">
              <li className="flex gap-2 items-start">
                <span className="text-xl leading-none" style={{ color: colors.inkRed }}>•</span>
                <span><strong>Estructura pedagógica:</strong> Respaldada por mi trayectoria como docente.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-xl leading-none" style={{ color: colors.inkRed }}>•</span>
                <span><strong>Flexibilidad real:</strong> Adaptada a las dinámicas de un hogar real.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-xl leading-none" style={{ color: colors.inkRed }}>•</span>
                <span><strong>Aprendizaje Activo:</strong> Herramientas para que el conocimiento sea duradero y emocionante.</span>
              </li>
            </ul>
          </div>

          {/* LLAMADO A LA ACCIÓN Y EBOOK */}
          <div className="mt-10 bg-green-50/40 p-6 md:p-8 rounded-xl border border-green-100 shadow-sm">
            <h4 className="font-bold text-2xl mb-3" style={{ fontFamily: 'Indie Flower', color: colors.inkGreen }}>
              Empieza hoy mismo: El aprendizaje no puede esperar
            </h4>
            <p className="mb-4">
              Te invito a conocer un programa diseñado para darte paz mental como padres y herramientas de vida a tus hijos. Únete a las familias que ya educan desde la autonomía y el respeto.
            </p>
            <p className="mb-6 font-medium text-gray-800">
              Te invito a explorar nuestra página y a llenar tus datos. Da el primer paso.
            </p>
        
            <div className="border-t border-dashed border-green-200 pt-6 mt-2">
              <p className="font-bold text-xl mb-6" style={{ fontFamily: 'Indie Flower', color: colors.inkRed }}>
                🎁 Como bienvenida a nuestra comunidad, te enviaré directamente a tu correo nuestro Ebook: “El hogar como escuela de vida”
              </p>
           
              {/* BOTÓN CON SCROLL HACIA EL FORMULARIO */}
              <button 
                onClick={() => {
                  setView('form');
                  setTimeout(() => {
                    const element = document.getElementById('seccion-formulario');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100); 
                }}
                className="w-full sm:w-auto group flex justify-center items-center gap-2 text-sm md:text-base font-bold uppercase tracking-widest transition-all hover:gap-4 bg-yellow-100 hover:bg-yellow-200 py-4 px-6 rounded-lg shadow-md"
                style={{ color: colors.inkBlue }}
              >
                Dar el primer paso y recibir Ebook <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </HandDrawnBorder>
    </div>
  </div>
</section>


      <main className="relative z-10 max-w-6xl mx-auto px-4">
        {view === 'infographic' && (
          <div className="animate-in fade-in duration-700">
            <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {contentSections.map((section) => (
                <div key={section.id} 
                     className={`transition-all duration-500 transform ${expandedSection === section.id ? 'lg:col-span-2 row-span-2' : 'hover:-translate-y-1'}`}>
                  <HandDrawnBorder className={`bg-white h-full cursor-pointer shadow-lg ${readSections.includes(section.id) ? 'bg-green-50/30' : ''}`}>
                    <div className="p-6 h-full flex flex-col" onClick={() => handleSectionClick(section.id)}>
                      <div className="flex items-center gap-3 mb-4">
                        {/* Redujimos p-3 a p-1 para que la imagen o mosaico encaje mejor en el anillo punteado */}
                        <div className="p-1 rounded-full border-2 border-dashed" style={{ borderColor: section.colorCode }}>
                          {section.icon}
                        </div>
                        
                        <h3 className="text-xl font-bold" style={{ fontFamily: 'Indie Flower', color: section.colorCode }}>{section.title}</h3>
                        {readSections.includes(section.id) && <CheckCircle className="ml-auto" style={{ color: colors.inkGreen }} />}
                      </div>

                      {expandedSection === section.id ? (
                        <div className="animate-in slide-in-from-top-2 flex-grow">
                          <p className="text-gray-800 mb-3 font-medium text-lg">{section.description}</p>
                          {/* Cambiamos a shadow-sm y un color de texto un poco más firme para que sea muy fácil de leer */}
                          <ul className="space-y-2 bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm transform rotate-1 text-base md:text-lg">
                            {section.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-gray-700">• {detail}</li>
                            ))}
                          </ul>
                          <div className="mt-6 text-right text-xs font-bold text-gray-400 uppercase">Cerrar ↑</div>
                        </div>
                      ) : (
                        <div className="mt-auto pt-4 border-t border-dashed border-gray-200">
                          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{section.description}</p>
                          <div className="flex items-center justify-between font-bold" style={{ color: colors.inkBlue }}>
                            <span className="text-sm uppercase tracking-wider">Leer más</span>
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      )}
                    </div>
                  </HandDrawnBorder>
                </div>
              ))}
            </div>
            {/* --- SECCIÓN DE TESTIMONIOS (Pégalo aquí) --- */}
            {/* --- VIDEO TESTIMONIAL --- */}
{/* --- SECCIÓN DE EVIDENCIA Y TESTIMONIOS --- */}
{/* --- SECCIÓN DE TESTIMONIOS EN VIDEO (EL MURO DE CONFIANZA) --- */}
<section className="mt-16 mb-20 px-4 max-w-6xl mx-auto">
  <h2 className="text-4xl font-bold text-center mb-4" style={{ fontFamily: 'Indie Flower', color: colors.inkBlue }}>
    Voces de nuestra Comunidad
  </h2>
  <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Indie Flower', fontSize: '1.2rem' }}>
    Mira cómo nuestras familias viven la experiencia Club Taller y el progreso real de sus hijos.
  </p>

  {/* Cambiamos a md:grid-cols-2 para tener una cuadrícula simétrica de 2x2 para los 4 videos */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    {[
      { 
        id: "3d-C3sXhRgk", 
        name: "Lucía (5 años)", 
        family: "Familia de María Antonia",
        quote: "De trazos simples a escribir en letra cursiva con amor."
      },
      { 
        id: "ZM8DwtPyQZE", 
        name: "Marquito", 
        family: "Familia de Carolina Cubes",
        quote: "Desarrollo integral: lectura, escritura y clases de música."
      },
      { 
        id: "wjJ2s-teG_8", 
        name: "María José (4 años)", 
        family: "Familia Benavides Galvis",
        quote: "Estimulación temprana, arte e inglés desde el juego."
      },
      { 
        id: "Dd_cvtLZFUU", 
        name: "Alison (8 años)", 
        family: "Familia de Gerson Barrera",
        quote: "Metodologías estructuradas que fortalecen la disciplina y la felicidad al aprender."
      }
    ].map((video, index) => (
      <div key={index} className="flex flex-col">
        <HandDrawnBorder className={`bg-white p-2 shadow-xl transform transition-transform duration-300 ${index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'}`}>
          <div className="relative pb-[177.77%] h-0 overflow-hidden rounded-lg bg-gray-100">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-4 text-center">
            <h3 className="font-bold text-lg" style={{ color: colors.inkBlue }}>{video.name}</h3>
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-widest">{video.family}</p>
            <p className="text-gray-700 italic leading-tight" style={{ fontFamily: 'Indie Flower', fontSize: '1.1rem' }}>
              "{video.quote}"
            </p>
          </div>
        </HandDrawnBorder>
      </div>
    ))}
  </div>
</section>
            <div className="text-center mt-12">
              <button 
                onClick={() => setView('form')}
                disabled={!allRead}
                className={`px-10 py-5 text-xl font-bold text-white rounded-lg shadow-xl transition-all ${allRead ? 'hover:scale-105' : 'bg-gray-400 opacity-50 cursor-not-allowed'}`}
                style={{ backgroundColor: allRead ? colors.inkGreen : undefined }}
              >
                {allRead ? '¡Quiero ser Familia Club Taller!' : 'Lee las 4 notas para habilitar el botón'}
              </button>
            </div>
          </div>
        )}

        {view === 'form' && (
          <div id="seccion-formulario" className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
             <button onClick={() => setView('infographic')} className="mb-4 font-bold hover:underline" style={{ color: colors.inkBlue }}>← Volver</button>
             <HandDrawnBorder className="bg-white p-8 md:p-10 shadow-2xl relative">
                <Tape />
                <h2 className="text-3xl font-bold mb-6 text-center" style={{ fontFamily: 'Indie Flower', color: colors.inkBlue }}>Validación de Ingreso</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {quizQuestions.map((q) => (
                    <div key={q.id} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="font-bold mb-3">{q.text}</p>
                      {q.options.map((opt) => (
                        <label key={opt} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded">
                          <input 
                            type="radio" 
                            name={q.id} 
                            checked={formData[q.id as keyof typeof formData] === opt}
                            onChange={() => setFormData({...formData, [q.id]: opt})}
                            className="w-5 h-5 text-blue-600"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                      {errors[q.id] && <div className="text-red-600 text-xs font-bold mt-1">{errors[q.id]}</div>}
                    </div>
                  ))}
                  
                  <div className="grid grid-cols-1 gap-4 bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Nombre completo..." 
                        className="w-full p-3 border-b-2 bg-transparent outline-none focus:border-blue-500" 
                        value={formData.parentName}
                        onChange={e => setFormData({...formData, parentName: e.target.value})} 
                      />
                      {errors.parentName && <span className="text-red-600 text-[10px] font-bold">{errors.parentName}</span>}
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="WhatsApp..." 
                        className="w-full p-3 border-b-2 bg-transparent outline-none focus:border-blue-500" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                      />
                      {errors.phone && <span className="text-red-600 text-[10px] font-bold">{errors.phone}</span>}
                    </div>
                    <div>
                      <input 
                        type="email" 
                        placeholder="Correo..." 
                        className="w-full p-3 border-b-2 bg-transparent outline-none focus:border-blue-500" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                      />
                      {errors.email && <span className="text-red-600 text-[10px] font-bold">{errors.email}</span>}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full text-white font-bold py-4 rounded-lg text-xl shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 transition-transform hover:scale-105"
                    style={{ backgroundColor: colors.inkGreen }}
                  >
                    {loading ? 'Guardando...' : <><Send size={24} /> Enviar Solicitud</>}
                  </button>
                </form>
             </HandDrawnBorder>
          </div>
        )}

        {view === 'success' && (
          <div className="max-w-xl mx-auto text-center animate-in bounce-in duration-700">
            <HandDrawnBorder className="bg-white p-10 shadow-2xl border-t-8" style={{ borderTopColor: colors.inkGreen }}>
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Indie Flower', color: colors.inkGreen }}>¡Excelente!</h2>
              <p className="text-xl text-gray-600 mb-8">Datos guardados. Ya puedes contactarnos.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-full shadow-lg inline-flex items-center gap-3 text-lg transition-transform hover:scale-105">
                <MessageCircle /> Finalizar por WhatsApp
              </a>
            </HandDrawnBorder>
          </div>
        )}
      </main>
      {/* --- FOOTER (Pégalo aquí) --- */}
      <footer className="relative z-10 mt-20 py-10 border-t border-dashed border-gray-300 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" style={{ fontFamily: 'Indie Flower' }}>
            <div className="flex flex-col">
              <span className="font-bold" style={{ color: colors.inkGreen }}>WhatsApp</span>
              <span className="text-lg">305 298 0690</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold" style={{ color: colors.inkBlue }}>Email</span>
              <span className="text-lg">infoclubtallerhs@gmail.com</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold" style={{ color: colors.inkRed }}>Comunidad</span>
              <span className="text-lg">@clubtallerhomeschool</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            © 2026 Club Taller Homeschool • Discovery Active Learning
          </p>
        </div>
      </footer>
      {/* Botón Flotante de WhatsApp */}
      <a 
        href="https://wa.me/573052980690?text=Hola!%20Quiero%20más%20información%20sobre%20Club%20Taller%20Homeschool" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={32} />
        {/* Globito de texto que aparece al pasar el mouse (opcional) */}
        <span className="absolute right-16 bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
          ¿Tienes dudas? ¡Escríbenos!
        </span>
      </a>
    </div>
  );
}