// Tipos para o app de monitoramento de saúde infantil

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  avatar?: string;
  createdAt: string;
}

export interface FoodEntry {
  id: string;
  childId: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'drink';
  food: string;
  amount?: string;
  time: string;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface SleepEntry {
  id: string;
  childId: string;
  type: 'night' | 'nap';
  startTime: string;
  endTime: string;
  date: string;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  notes?: string;
  createdAt: string;
}

export interface ActivityEntry {
  id: string;
  childId: string;
  type: 'physical' | 'educational' | 'creative' | 'social' | 'outdoor';
  activity: string;
  duration?: number; // em minutos
  time: string;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface SymptomEntry {
  id: string;
  childId: string;
  type: 'fever' | 'cough' | 'runny_nose' | 'stomach_ache' | 'headache' | 'rash' | 'vomiting' | 'diarrhea' | 'other';
  severity: 'mild' | 'moderate' | 'severe';
  description: string;
  time: string;
  date: string;
  temperature?: number;
  notes?: string;
  createdAt: string;
}

export type EntryType = 'food' | 'sleep' | 'activity' | 'symptom';

export interface DayData {
  date: string;
  food: FoodEntry[];
  sleep: SleepEntry[];
  activities: ActivityEntry[];
  symptoms: SymptomEntry[];
}

export interface AppData {
  children: Child[];
  entries: {
    food: FoodEntry[];
    sleep: SleepEntry[];
    activities: ActivityEntry[];
    symptoms: SymptomEntry[];
  };
  selectedChildId?: string;
}