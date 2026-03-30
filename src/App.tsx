import logo from './assets/logo.png';
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
  paper: '#fdfdfd',
  grid: '#e0e0e0',
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
    icon: <Brain className="w-10 h-10" />,
    colorCode: colors.inkBlue,
    description: "Nuestra metodología propia. Aprendizaje significativo basado en el descubrimiento.",
    details: ["Proyectos e Investigación.", "Criterio propio.", "Evaluación cualitativa.", "Planeación estratégica."]
  },
  {
    id: 'arts',
    title: 'Arte, Música e Inglés',
    icon: <Palette className="w-10 h-10" />,
    colorCode: colors.inkRed,
    description: "No son 'relleno', son la base. El juego y la música son ejes transversales.",
    details: ["Arte y música integrada.", "Inglés natural.", "Expresión corporal."]
  },
  {
    id: 'grades',
    title: 'De Jardín a Quinto',
    icon: <GraduationCap className="w-10 h-10" />,
    colorCode: colors.inkGreen,
    description: "Acompañamos y certificamos procesos de educación en casa.",
    details: ["Niños de 1 a 12 años.", "Certificado Min. Educación.", "Sesiones en tiempo real."]
  },
  {
    id: 'community',
    title: 'Comunidad Homeschool',
    icon: <Users className="w-10 h-10" />,
    colorCode: colors.inkBlue,
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
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(${colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}>
      </div>

      <header className="relative z-10 pt-8 pb-4 px-4 text-center">
        <div className="max-w-4xl mx-auto border-b-4 border-double pb-4 mb-8 transform -rotate-1" style={{ borderColor: colors.inkRed }}>
          <div className="inline-block bg-white p-6 shadow-lg transform rotate-1 border border-gray-200 rounded-sm">
            {/*<h1 className="text-4xl md:text-6xl font-extrabold" style={{ fontFamily: 'Indie Flower', color: colors.inkBlue }}>
                CLUB TALLER <span className="text-green-600">HOMESCHOOL</span>
             </h1>*/}
            {/* AQUÍ REEMPLAZAMOS EL H1 POR LA IMAGEN */}
            <img src={logo} alt="Club Taller Logo" className="h-24 md:h-48 lg:h-56 mx-auto object-contain" />
          </div>
        </div>
      </header>


      <main className="relative z-10 max-w-6xl mx-auto px-4">
        {view === 'infographic' && (
          <div className="animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contentSections.map((section) => (
                <div key={section.id} 
                     className={`transition-all duration-500 transform ${expandedSection === section.id ? 'lg:col-span-2 row-span-2' : 'hover:-translate-y-1'}`}>
                  <HandDrawnBorder className={`bg-white h-full cursor-pointer shadow-lg ${readSections.includes(section.id) ? 'bg-green-50/30' : ''}`}>
                    <div className="p-6 h-full flex flex-col" onClick={() => handleSectionClick(section.id)}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-full border-2 border-dashed" style={{ borderColor: section.colorCode, color: section.colorCode }}>{section.icon}</div>
                        <h3 className="text-xl font-bold" style={{ fontFamily: 'Indie Flower', color: section.colorCode }}>{section.title}</h3>
                        {readSections.includes(section.id) && <CheckCircle className="ml-auto" style={{ color: colors.inkGreen }} />}
                      </div>

                      {expandedSection === section.id ? (
                        <div className="animate-in slide-in-from-top-2 flex-grow">
                          <p className="text-gray-800 mb-3 font-medium text-lg">{section.description}</p>
                          <ul className="space-y-2 bg-yellow-50 p-3 rounded border border-yellow-200 transform rotate-1">
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

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      }
    ].map((video, index) => (
      <div key={index} className="flex flex-col">
        <HandDrawnBorder className="bg-white p-2 shadow-xl transform hover:rotate-1 transition-transform duration-300">
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
          <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500">
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