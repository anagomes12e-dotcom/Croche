'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { DayData } from '@/lib/types';
import { formatDate, formatTime, translateFoodType, translateSleepType, translateActivityType, translateSymptomType, translateSeverity, translateQuality } from '@/lib/storage';

interface DayViewProps {
  dayData: DayData;
  onPreviousDay: () => void;
  onNextDay: () => void;
  isToday: boolean;
}

export function DayView({ dayData, onPreviousDay, onNextDay, isToday }: DayViewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'food' | 'sleep' | 'activity' | 'symptom'>('all');

  const tabs = [
    { id: 'all', label: 'Todos', count: dayData.food.length + dayData.sleep.length + dayData.activities.length + dayData.symptoms.length },
    { id: 'food', label: 'Alimentação', count: dayData.food.length },
    { id: 'sleep', label: 'Sono', count: dayData.sleep.length },
    { id: 'activity', label: 'Atividades', count: dayData.activities.length },
    { id: 'symptom', label: 'Sintomas', count: dayData.symptoms.length }
  ];

  const getAllEntries = () => {
    const entries = [
      ...dayData.food.map(entry => ({ ...entry, entryType: 'food' as const })),
      ...dayData.sleep.map(entry => ({ ...entry, entryType: 'sleep' as const })),
      ...dayData.activities.map(entry => ({ ...entry, entryType: 'activity' as const })),
      ...dayData.symptoms.map(entry => ({ ...entry, entryType: 'symptom' as const }))
    ];
    
    return entries.sort((a, b) => {
      const timeA = 'startTime' in a ? a.startTime : a.time;
      const timeB = 'startTime' in b ? b.startTime : b.time;
      return timeA.localeCompare(timeB);
    });
  };

  const getFilteredEntries = () => {
    const allEntries = getAllEntries();
    
    if (activeTab === 'all') return allEntries;
    return allEntries.filter(entry => entry.entryType === activeTab);
  };

  const renderEntry = (entry: any) => {
    const time = 'startTime' in entry ? entry.startTime : entry.time;
    
    switch (entry.entryType) {
      case 'food':
        return (
          <div key={entry.id} className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-green-800">{translateFoodType(entry.type)}</span>
                  <span className="text-sm text-gray-600">{formatTime(time)}</span>
                </div>
                <p className="text-gray-800 font-medium">{entry.food}</p>
                {entry.amount && <p className="text-sm text-gray-600">Quantidade: {entry.amount}</p>}
                {entry.notes && <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>}
              </div>
            </div>
          </div>
        );

      case 'sleep':
        const duration = entry.endTime && entry.startTime ? 
          Math.round((new Date(`2000-01-01T${entry.endTime}`) - new Date(`2000-01-01T${entry.startTime}`)) / (1000 * 60)) : 0;
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        
        return (
          <div key={entry.id} className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-indigo-800">{translateSleepType(entry.type)}</span>
                  <span className="text-sm text-gray-600">{formatTime(entry.startTime)} - {formatTime(entry.endTime)}</span>
                </div>
                {duration > 0 && (
                  <p className="text-gray-800 font-medium">
                    Duração: {hours > 0 && `${hours}h`} {minutes > 0 && `${minutes}min`}
                  </p>
                )}
                <p className="text-sm text-gray-600">Qualidade: {translateQuality(entry.quality)}</p>
                {entry.notes && <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>}
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div key={entry.id} className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-orange-800">{translateActivityType(entry.type)}</span>
                  <span className="text-sm text-gray-600">{formatTime(time)}</span>
                </div>
                <p className="text-gray-800 font-medium">{entry.activity}</p>
                {entry.duration && <p className="text-sm text-gray-600">Duração: {entry.duration} minutos</p>}
                {entry.notes && <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>}
              </div>
            </div>
          </div>
        );

      case 'symptom':
        return (
          <div key={entry.id} className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-red-800">{translateSymptomType(entry.type)}</span>
                  <span className="text-sm text-gray-600">{formatTime(time)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    entry.severity === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                    entry.severity === 'moderate' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {translateSeverity(entry.severity)}
                  </span>
                </div>
                <p className="text-gray-800 font-medium">{entry.description}</p>
                {entry.temperature && <p className="text-sm text-gray-600">Temperatura: {entry.temperature}°C</p>}
                {entry.notes && <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const filteredEntries = getFilteredEntries();

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      {/* Header com navegação de data */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <button
          onClick={onPreviousDay}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex items-center space-x-2">
          <Calendar size={20} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {formatDate(dayData.date)}
            {isToday && <span className="ml-2 text-sm text-blue-600 font-normal">(Hoje)</span>}
          </h2>
        </div>
        
        <button
          onClick={onNextDay}
          disabled={isToday}
          className={`p-2 rounded-lg transition-colors ${
            isToday 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Calendar size={48} className="mx-auto" />
            </div>
            <p className="text-gray-600">
              {activeTab === 'all' 
                ? 'Nenhum registro para este dia'
                : `Nenhum registro de ${tabs.find(t => t.id === activeTab)?.label.toLowerCase()} para este dia`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map(renderEntry)}
          </div>
        )}
      </div>
    </div>
  );
}