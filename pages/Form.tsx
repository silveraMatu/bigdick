import { useState, useMemo, FC } from 'react';
import { SurveyFormData } from '../types';
// Importamos todas las opciones desde constants.ts
import {
  GENDER_OPTIONS,
  TIME_SLOT_OPTIONS,
  FREQUENCY_OPTIONS,
  LOCATION_OPTIONS,
  GENRE_OPTIONS,
  MUSIC_ERA_OPTIONS,
  LANGUAGE_IMPORTANCE_OPTIONS,
  SPECIAL_PROGRAMS_OPTIONS,
  QUALITY_RATING_OPTIONS,
  SELECTION_RATING_OPTIONS,
  VARIETY_OPTIONS,
  DISCOVERY_OPTIONS,
} from '../constants';
import QuestionCard from '../components/QuestionCard';
import RadioGroup from '../components/RadioGroup';
import CheckboxGroup from '../components/CheckboxGroup';
import NumericInput from '../components/NumericInput';
import TextInput from '../components/TextInput';
import TextArea from '../components/TextArea';

const TOTAL_QUESTIONS = 15;

// 👇 REEMPLAZA ESTO CON TU URL REAL DE RENDER CUANDO DEPLOYES EL BACKEND
// Para local, si tu backend corre en el puerto 3000 y el front en otro (ej 5173), usa localhost:3000
const API_URL = "https://form-big-data-backend.onrender.com/api"; 

export const Form: FC = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    age: '',
    gender: '',
    timeSlot: '',
    frequency: '',
    locations: [],
    genres: [],
    favoriteArtist: '',
    musicEra: '',
    languageImportance: '',
    specialPrograms: '',
    technicalQuality: '',
    musicSelection: '',
    varietyNeeded: '',
    discoveryMethod: '',
    suggestions: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const answeredQuestions = useMemo(() => {
    return Object.values(formData).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== '' && value !== null;
    }).length;
  }, [formData]);

  const progress = (answeredQuestions / TOTAL_QUESTIONS) * 100;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, checked } = e.target;
    const key = name as keyof SurveyFormData;

    setFormData((prev) => {
      const prevValue = prev[key];
      if (Array.isArray(prevValue)) {
          const newValue = checked
            ? [...prevValue, value]
            : prevValue.filter((item) => item !== value);
          return { ...prev, [key]: newValue };
      }
      return prev;
    });
  };

  // --- FUNCIÓN DE ENVÍO (CONEXIÓN AL BACKEND) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answeredQuestions < TOTAL_QUESTIONS) return;

    setIsSubmitting(true);
    setSubmitError(null);

    // 1. Transformamos los datos al formato que espera el backend (en español)
    const dataForBackend = {
      edad: Number(formData.age),
      genero: formData.gender,
      franjaHoraria: formData.timeSlot,
      frecuenciaEscucha: formData.frequency,
      lugaresEscucha: formData.locations,
      generos: formData.genres,
      artistaSugerido: formData.favoriteArtist,
      musicaEpoca: formData.musicEra,
      importanciaIdioma: formData.languageImportance,
      interesProgramas: formData.specialPrograms,
      calidadTecnica: formData.technicalQuality,
      calidadSeleccion: formData.musicSelection,
      franjaMasVariedad: formData.varietyNeeded,
      comoNosEncontro: formData.discoveryMethod,
      sugerenciaAdicional: formData.suggestions,
    };

    try {
      // 2. Hacemos la petición POST
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataForBackend),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Si el backend responde con error (ej. 400 o 500)
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al guardar la encuesta.');
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      setSubmitError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-lg w-full">
          <svg className="w-16 h-16 mx-auto mb-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h1 className="text-3xl font-bold mb-2">¡Gracias por tu participación!</h1>
          <p className="text-gray-400">Tus respuestas han sido guardadas en nuestra base de datos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
            Formulario de Preferencias de Audiencia
          </h1>
          <p className="text-lg text-gray-400">
            Ayúdanos a mejorar nuestra radio online. ¡Tu opinión es muy importante!
          </p>
        </header>

        <div className="sticky top-0 z-10 bg-gray-900 py-4 mb-8">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-right text-sm text-gray-400 mt-2">{answeredQuestions} de {TOTAL_QUESTIONS} respondidas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Sección 1 */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-6 text-white">
              Sección 1: Datos Demográficos y Hábitos de Escucha
            </h2>
            <div className="space-y-8">
              <QuestionCard number={1} title="¿Cuál es tu edad?">
                <NumericInput name="age" value={formData.age} onChange={handleInputChange} placeholder="p. ej., 32" />
              </QuestionCard>
              <QuestionCard number={2} title="¿Cuál es tu género?">
                {/* AQUÍ SE USAN LAS CONSTANTES */}
                <RadioGroup name="gender" options={GENDER_OPTIONS} selectedValue={formData.gender} onChange={handleInputChange} />
              </QuestionCard>
              <QuestionCard number={3} title="¿En qué franja horaria sueles sintonizarnos o escuchar música en general?">
                <RadioGroup name="timeSlot" options={TIME_SLOT_OPTIONS} selectedValue={formData.timeSlot} onChange={handleInputChange} />
              </QuestionCard>
              <QuestionCard number={4} title="¿Con qué frecuencia escuchas nuestra estación de radio en línea?">
                <RadioGroup name="frequency" options={FREQUENCY_OPTIONS} selectedValue={formData.frequency} onChange={handleInputChange} />
              </QuestionCard>
              <QuestionCard number={5} title="¿Dónde nos escuchas con mayor frecuencia? (Selecciona una o dos)">
                 <CheckboxGroup name="locations" options={LOCATION_OPTIONS} selectedValues={formData.locations} onChange={handleCheckboxChange} maxSelections={2} />
              </QuestionCard>
            </div>
          </section>

          {/* Sección 2 */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-6 text-white">
              Sección 2: Preferencias y Tendencias Musicales
            </h2>
            <div className="space-y-8">
                <QuestionCard number={6} title="¿Qué géneros musicales te gustaría escuchar con más frecuencia? (Selecciona hasta 5)">
                    <CheckboxGroup name="genres" options={GENRE_OPTIONS} selectedValues={formData.genres} onChange={handleCheckboxChange} maxSelections={5} />
                </QuestionCard>
                <QuestionCard number={7} title="¿Qué artista o banda te gustaría que incluyéramos o pusiéramos más en nuestra estación?">
                    <TextInput name="favoriteArtist" value={formData.favoriteArtist} onChange={handleInputChange} placeholder="Nombre del artista o banda" />
                </QuestionCard>
                <QuestionCard number={8} title="En general, ¿prefieres escuchar música de 'antes' o los nuevos lanzamientos?">
                    <RadioGroup name="musicEra" options={MUSIC_ERA_OPTIONS} selectedValue={formData.musicEra} onChange={handleInputChange} />
                </QuestionCard>
                <QuestionCard number={9} title="¿Qué tan importante es para ti escuchar canciones en tu idioma principal?">
                    <RadioGroup name="languageImportance" options={LANGUAGE_IMPORTANCE_OPTIONS} selectedValue={formData.languageImportance} onChange={handleInputChange} />
                </QuestionCard>
                <QuestionCard number={10} title="¿Te gustaría que nuestra estación incluyera programas especiales?">
                    <RadioGroup name="specialPrograms" options={SPECIAL_PROGRAMS_OPTIONS} selectedValue={formData.specialPrograms} onChange={handleInputChange} />
                </QuestionCard>
            </div>
          </section>

          {/* Sección 3 */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 mb-6 text-white">
              Sección 3: Calidad de la Emisión y Retroalimentación
            </h2>
             <div className="space-y-8">
                <QuestionCard number={11} title="¿Cómo calificarías la calidad técnica de nuestra emisión?">
                    <RadioGroup name="technicalQuality" options={QUALITY_RATING_OPTIONS} selectedValue={formData.technicalQuality} onChange={handleInputChange} />
                </QuestionCard>
                <QuestionCard number={12} title="¿Cómo calificarías la selección musical que brindamos actualmente?">
                    <RadioGroup name="musicSelection" options={SELECTION_RATING_OPTIONS} selectedValue={formData.musicSelection} onChange={handleInputChange} />
                </QuestionCard>
                 <QuestionCard number={13} title="¿Hay alguna franja horaria en la que crees que nuestra programación necesita más variedad?">
                    <RadioGroup name="varietyNeeded" options={VARIETY_OPTIONS} selectedValue={formData.varietyNeeded} onChange={handleInputChange} />
                </QuestionCard>
                <QuestionCard number={14} title="¿Cómo te enteraste de nuestra estación de radio en línea?">
                    <RadioGroup name="discoveryMethod" options={DISCOVERY_OPTIONS} selectedValue={formData.discoveryMethod} onChange={handleInputChange} />
                </QuestionCard>
                <QuestionCard number={15} title="¿Tienes alguna sugerencia adicional sobre el tipo de música o contenido?">
                    <TextArea name="suggestions" value={formData.suggestions} onChange={handleInputChange} placeholder="Deja tus comentarios, sugerencias o tu nombre y apellido si lo deseas." />
                </QuestionCard>
            </div>
          </section>

          {/* Botón de envío */}
          <div className="text-center pt-6">
            <button 
              type="submit"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-900/50 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              disabled={answeredQuestions < TOTAL_QUESTIONS || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Encuesta'}
            </button>
             
             {answeredQuestions < TOTAL_QUESTIONS && !isSubmitting && (
                <p className="text-sm text-gray-500 mt-4">
                    Por favor, responde todas las preguntas para poder enviar el formulario.
                </p>
            )}
            
            {submitError && (
              <p className="text-sm text-red-400 mt-4">
                {submitError}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};