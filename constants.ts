
import { Option } from './types';

export const GENDER_OPTIONS: Option[] = [
  { value: 'female', label: 'Femenino' },
  { value: 'male', label: 'Masculino' },
  { value: 'non-binary', label: 'No Binario' },
  { value: 'prefer-not-to-say', label: 'Prefiero no especificar' },
];

export const TIME_SLOT_OPTIONS: Option[] = [
  { value: 'morning', label: 'Mañana (6:00 a 12:00)' },
  { value: 'afternoon', label: 'Tarde (12:00 a 18:00)' },
  { value: 'evening', label: 'Noche (18:00 a 00:00)' },
  { value: 'late-night', label: 'Madrugada (00:00 a 6:00)' },
];

export const FREQUENCY_OPTIONS: Option[] = [
  { value: 'multiple-daily', label: 'Varias veces al día' },
  { value: 'daily', label: 'Una vez al día' },
  { value: 'multiple-weekly', label: 'Varias veces a la semana' },
  { value: 'weekly', label: 'Una vez a la semana' },
  { value: 'occasionally', label: 'Ocasionalmente' },
];

export const LOCATION_OPTIONS: Option[] = [
  { value: 'home', label: 'Casa' },
  { value: 'work', label: 'Trabajo' },
  { value: 'commute', label: 'Coche o Transporte Público' },
  { value: 'gym', label: 'En el Gimnasio' },
  { value: 'other', label: 'Otros Lugares' },
];

export const GENRE_OPTIONS: Option[] = [
  { value: 'pop', label: 'Pop' },
  { value: 'rock', label: 'Rock' },
  { value: 'rnb', label: 'R&B' },
  { value: 'urban', label: 'Urbano (Reguetón, Trap)' },
  { value: 'electronic', label: 'Electrónica (House, Techno)' },
  { value: 'cumbia', label: 'Cumbia' },
  { value: 'folklore', label: 'Folklore' },
  { value: 'latin', label: 'Música Latina (Salsa, Bachata)' },
  { value: 'indie', label: 'Indie' },
  { value: 'classical', label: 'Clásica' },
  { value: 'metal', label: 'Metal' },
  { value: 'jazz', label: 'Jazz' },
];

export const MUSIC_ERA_OPTIONS: Option[] = [
  { value: 'classics', label: 'Principalmente música de antes (clásicos, hits antiguos)' },
  { value: 'new', label: 'Principalmente nuevos lanzamientos (actualidad)' },
  { value: 'balanced', label: 'Una mezcla equilibrada de ambos' },
];

export const LANGUAGE_IMPORTANCE_OPTIONS: Option[] = [
  { value: 'very-important', label: 'Muy importante' },
  { value: 'important', label: 'Importante' },
  { value: 'neutral', label: 'Me da igual' },
  { value: 'prefer-other', label: 'Prefiero música en otros idiomas' },
];

export const SPECIAL_PROGRAMS_OPTIONS: Option[] = [
  { value: 'yes', label: 'Sí, me gustaría (entrevistas, rankings, podcasts)' },
  { value: 'no', label: 'No, solo quiero música continua' },
  { value: 'unsure', label: 'No estoy seguro' },
];

export const QUALITY_RATING_OPTIONS: Option[] = [
    { value: 'excellent', label: 'Excelente' },
    { value: 'good', label: 'Buena' },
    { value: 'regular', label: 'Regular' },
    { value: 'bad', label: 'Mala' },
];

export const SELECTION_RATING_OPTIONS: Option[] = [
    { value: 'love-it', label: 'Me encanta' },
    { value: 'good', label: 'Buena' },
    { value: 'decent', label: 'Decente' },
    { value: 'dislike', label: 'No me gusta' },
];

export const VARIETY_OPTIONS: Option[] = [
    { value: 'morning', label: 'Mañana' },
    { value: 'afternoon', label: 'Tarde' },
    { value: 'evening', label: 'Noche' },
    { value: 'none', label: 'Ninguna' },
    { value: 'all', label: 'Todas necesitan variedad' },
];

export const DISCOVERY_OPTIONS: Option[] = [
    { value: 'social-media', label: 'Redes Sociales' },
    { value: 'friends-family', label: 'Amigos o Familiares' },
    { value: 'advertising', label: 'Publicidad' },
    { value: 'radio-search', label: 'Buscador de Radio' },
    { value: 'other', label: 'Otro' },
];
