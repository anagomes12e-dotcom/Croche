// Utilitários para persistência local e manipulação de dados

import { AppData, Child, FoodEntry, SleepEntry, ActivityEntry, SymptomEntry } from './types';

const STORAGE_KEY = 'kids-health-tracker';

// Dados iniciais
const initialData: AppData = {
  children: [],
  entries: {
    food: [],
    sleep: [],
    activities: [],
    symptoms: []
  }
};

// Salvar dados no localStorage
export const saveData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

// Carregar dados do localStorage
export const loadData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
  return initialData;
};

// Gerar ID único
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Formatar data para exibição
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Formatar hora para exibição
export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Obter data de hoje no formato YYYY-MM-DD
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Obter hora atual no formato HH:MM
export const getCurrentTime = (): string => {
  return new Date().toTimeString().slice(0, 5);
};

// Calcular idade em meses
export const calculateAgeInMonths = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birth.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 30.44); // Média de dias por mês
};

// Obter dados de um dia específico
export const getDayData = (data: AppData, childId: string, date: string) => {
  return {
    date,
    food: data.entries.food.filter(entry => entry.childId === childId && entry.date === date),
    sleep: data.entries.sleep.filter(entry => entry.childId === childId && entry.date === date),
    activities: data.entries.activities.filter(entry => entry.childId === childId && entry.date === date),
    symptoms: data.entries.symptoms.filter(entry => entry.childId === childId && entry.date === date)
  };
};

// Obter últimos N dias de dados
export const getRecentDays = (data: AppData, childId: string, days: number = 7) => {
  const result = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    result.push(getDayData(data, childId, dateStr));
  }
  return result.reverse();
};

// Traduzir tipos para português
export const translateFoodType = (type: string): string => {
  const translations = {
    breakfast: 'Café da manhã',
    lunch: 'Almoço',
    dinner: 'Jantar',
    snack: 'Lanche',
    drink: 'Bebida'
  };
  return translations[type as keyof typeof translations] || type;
};

export const translateSleepType = (type: string): string => {
  const translations = {
    night: 'Sono noturno',
    nap: 'Soneca'
  };
  return translations[type as keyof typeof translations] || type;
};

export const translateActivityType = (type: string): string => {
  const translations = {
    physical: 'Atividade física',
    educational: 'Educativa',
    creative: 'Criativa',
    social: 'Social',
    outdoor: 'Ao ar livre'
  };
  return translations[type as keyof typeof translations] || type;
};

export const translateSymptomType = (type: string): string => {
  const translations = {
    fever: 'Febre',
    cough: 'Tosse',
    runny_nose: 'Nariz escorrendo',
    stomach_ache: 'Dor de barriga',
    headache: 'Dor de cabeça',
    rash: 'Erupção cutânea',
    vomiting: 'Vômito',
    diarrhea: 'Diarreia',
    other: 'Outro'
  };
  return translations[type as keyof typeof translations] || type;
};

export const translateSeverity = (severity: string): string => {
  const translations = {
    mild: 'Leve',
    moderate: 'Moderado',
    severe: 'Grave'
  };
  return translations[severity as keyof typeof translations] || severity;
};

export const translateQuality = (quality: string): string => {
  const translations = {
    excellent: 'Excelente',
    good: 'Bom',
    fair: 'Regular',
    poor: 'Ruim'
  };
  return translations[quality as keyof typeof translations] || quality;
};