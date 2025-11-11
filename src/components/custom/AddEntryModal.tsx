'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { FoodEntry, SleepEntry, ActivityEntry, SymptomEntry, EntryType } from '@/lib/types';
import { generateId, getCurrentTime, getTodayDate } from '@/lib/storage';

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: FoodEntry | SleepEntry | ActivityEntry | SymptomEntry) => void;
  type: EntryType;
  childId: string;
}

export function AddEntryModal({ isOpen, onClose, onSave, type, childId }: AddEntryModalProps) {
  const [formData, setFormData] = useState({
    // Campos comuns
    time: getCurrentTime(),
    date: getTodayDate(),
    notes: '',
    
    // Alimentação
    foodType: 'breakfast',
    food: '',
    amount: '',
    
    // Sono
    sleepType: 'night',
    startTime: getCurrentTime(),
    endTime: '',
    quality: 'good',
    
    // Atividade
    activityType: 'physical',
    activity: '',
    duration: '',
    
    // Sintoma
    symptomType: 'fever',
    severity: 'mild',
    description: '',
    temperature: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const baseEntry = {
      id: generateId(),
      childId,
      time: formData.time,
      date: formData.date,
      notes: formData.notes || undefined,
      createdAt: new Date().toISOString()
    };

    let entry: FoodEntry | SleepEntry | ActivityEntry | SymptomEntry;

    switch (type) {
      case 'food':
        entry = {
          ...baseEntry,
          type: formData.foodType as FoodEntry['type'],
          food: formData.food,
          amount: formData.amount || undefined
        } as FoodEntry;
        break;
        
      case 'sleep':
        entry = {
          ...baseEntry,
          type: formData.sleepType as SleepEntry['type'],
          startTime: formData.startTime,
          endTime: formData.endTime,
          quality: formData.quality as SleepEntry['quality']
        } as SleepEntry;
        break;
        
      case 'activity':
        entry = {
          ...baseEntry,
          type: formData.activityType as ActivityEntry['type'],
          activity: formData.activity,
          duration: formData.duration ? parseInt(formData.duration) : undefined
        } as ActivityEntry;
        break;
        
      case 'symptom':
        entry = {
          ...baseEntry,
          type: formData.symptomType as SymptomEntry['type'],
          severity: formData.severity as SymptomEntry['severity'],
          description: formData.description,
          temperature: formData.temperature ? parseFloat(formData.temperature) : undefined
        } as SymptomEntry;
        break;
        
      default:
        return;
    }

    onSave(entry);
    onClose();
    
    // Reset form
    setFormData({
      time: getCurrentTime(),
      date: getTodayDate(),
      notes: '',
      foodType: 'breakfast',
      food: '',
      amount: '',
      sleepType: 'night',
      startTime: getCurrentTime(),
      endTime: '',
      quality: 'good',
      activityType: 'physical',
      activity: '',
      duration: '',
      symptomType: 'fever',
      severity: 'mild',
      description: '',
      temperature: ''
    });
  };

  if (!isOpen) return null;

  const getTitle = () => {
    const titles = {
      food: 'Adicionar Alimentação',
      sleep: 'Adicionar Sono',
      activity: 'Adicionar Atividade',
      symptom: 'Adicionar Sintoma'
    };
    return titles[type];
  };

  const renderFields = () => {
    switch (type) {
      case 'food':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de refeição</label>
              <select
                value={formData.foodType}
                onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="breakfast">Café da manhã</option>
                <option value="lunch">Almoço</option>
                <option value="dinner">Jantar</option>
                <option value="snack">Lanche</option>
                <option value="drink">Bebida</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alimento *</label>
              <input
                type="text"
                value={formData.food}
                onChange={(e) => setFormData({ ...formData, food: e.target.value })}
                placeholder="Ex: Banana, Leite, Arroz com feijão..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Ex: 1 copo, 2 colheres, 1/2 prato..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        );

      case 'sleep':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sono</label>
              <select
                value={formData.sleepType}
                onChange={(e) => setFormData({ ...formData, sleepType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="night">Sono noturno</option>
                <option value="nap">Soneca</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Início *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fim *</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualidade do sono</label>
              <select
                value={formData.quality}
                onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="excellent">Excelente</option>
                <option value="good">Bom</option>
                <option value="fair">Regular</option>
                <option value="poor">Ruim</option>
              </select>
            </div>
          </>
        );

      case 'activity':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de atividade</label>
              <select
                value={formData.activityType}
                onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="physical">Atividade física</option>
                <option value="educational">Educativa</option>
                <option value="creative">Criativa</option>
                <option value="social">Social</option>
                <option value="outdoor">Ao ar livre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Atividade *</label>
              <input
                type="text"
                value={formData.activity}
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                placeholder="Ex: Correr no parque, Desenhar, Ler livro..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duração (minutos)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="Ex: 30"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        );

      case 'symptom':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sintoma</label>
              <select
                value={formData.symptomType}
                onChange={(e) => setFormData({ ...formData, symptomType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fever">Febre</option>
                <option value="cough">Tosse</option>
                <option value="runny_nose">Nariz escorrendo</option>
                <option value="stomach_ache">Dor de barriga</option>
                <option value="headache">Dor de cabeça</option>
                <option value="rash">Erupção cutânea</option>
                <option value="vomiting">Vômito</option>
                <option value="diarrhea">Diarreia</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gravidade</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="mild">Leve</option>
                <option value="moderate">Moderado</option>
                <option value="severe">Grave</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o sintoma..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>
            {formData.symptomType === 'fever' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperatura (°C)</label>
                <input
                  type="number"
                  value={formData.temperature}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  placeholder="Ex: 38.5"
                  step="0.1"
                  min="35"
                  max="45"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{getTitle()}</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {renderFields()}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações adicionais..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Save size={16} />
              <span>Salvar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}