
export interface SurveyFormData {
  age: string;
  gender: string;
  timeSlot: string;
  frequency: string;
  locations: string[];
  genres: string[];
  favoriteArtist: string;
  musicEra: string;
  languageImportance: string;
  specialPrograms: string;
  technicalQuality: string;
  musicSelection: string;
  varietyNeeded: string;
  discoveryMethod: string;
  suggestions: string;
}

export interface Option {
  value: string;
  label: string;
}
