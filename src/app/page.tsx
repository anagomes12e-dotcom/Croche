'use client';

import { useState, useEffect } from 'react';
import { Heart, TrendingUp, Baby } from 'lucide-react';
import { AppData, Child, FoodEntry, SleepEntry, ActivityEntry, SymptomEntry, EntryType } from '@/lib/types';
import { loadData, saveData, getDayData, getTodayDate } from '@/lib/storage';
import { ChildSelector } from '@/components/custom/ChildSelector';
import { QuickActions } from '@/components/custom/QuickActions';
import { AddEntryModal } from '@/components/custom/AddEntryModal';
import { DayView } from '@/components/custom/DayView';

export default function Home() {
  const [data, setData] = useState<AppData>({
    children: [],
    entries: { food: [], sleep: [], activities: [], symptoms: [] }
  });
  const [selectedChild, setSelectedChild] = useState<Child | undefined>();
  const [currentDate, setCurrentDate] = useState(getTodayDate());
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState<EntryType>('food');
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar dados do localStorage
  useEffect(() => {
    const loadedData = loadData();
    setData(loadedData);
    
    // Selecionar primeira criança se existir
    if (loadedData.children.length > 0) {
      setSelectedChild(loadedData.children[0]);
    }
    
    setIsLoaded(true);
  }, []);

  // Salvar dados sempre que houver mudanças
  useEffect(() => {
    if (isLoaded) {
      saveData(data);
    }
  }, [data, isLoaded]);

  const handleAddChild = (child: Child) => {
    const newData = {
      ...data,
      children: [...data.children, child]
    };
    setData(newData);
    setSelectedChild(child);
  };

  const handleSelectChild = (child: Child) => {
    setSelectedChild(child);
    setCurrentDate(getTodayDate()); // Reset para hoje quando trocar de criança
  };

  const handleAddEntry = (type: EntryType) => {
    if (!selectedChild) return;
    setAddModalType(type);
    setShowAddModal(true);
  };

  const handleSaveEntry = (entry: FoodEntry | SleepEntry | ActivityEntry | SymptomEntry) => {
    const newData = { ...data };
    
    if ('food' in entry || 'amount' in entry) {
      newData.entries.food = [...newData.entries.food, entry as FoodEntry];
    } else if ('startTime' in entry && 'endTime' in entry) {
      newData.entries.sleep = [...newData.entries.sleep, entry as SleepEntry];
    } else if ('activity' in entry) {
      newData.entries.activities = [...newData.entries.activities, entry as ActivityEntry];
    } else if ('description' in entry && 'severity' in entry) {
      newData.entries.symptoms = [...newData.entries.symptoms, entry as SymptomEntry];
    }
    
    setData(newData);
    setShowAddModal(false);
  };

  const handlePreviousDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const isToday = currentDate === getTodayDate();
  const dayData = selectedChild ? getDayData(data, selectedChild.id, currentDate) : {
    date: currentDate,
    food: [],
    sleep: [],
    activities: [],
    symptoms: []
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Baby className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kids Health Tracker</h1>
                <p className="text-sm text-gray-600">Monitore a saúde do seu filho</p>
              </div>
            </div>
            
            {selectedChild && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Heart size={16} className="text-red-500" />
                <span>Cuidando de <strong>{selectedChild.name}</strong></span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Seletor de criança */}
          <ChildSelector
            children={data.children}
            selectedChild={selectedChild}
            onSelectChild={handleSelectChild}
            onAddChild={handleAddChild}
          />

          {selectedChild ? (
            <>
              {/* Ações rápidas */}
              <QuickActions onAddEntry={handleAddEntry} />

              {/* Visualização do dia */}
              <DayView
                dayData={dayData}
                onPreviousDay={handlePreviousDay}
                onNextDay={handleNextDay}
                isToday={isToday}
              />

              {/* Resumo rápido */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Alimentação</p>
                      <p className="text-lg font-semibold text-gray-900">{dayData.food.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sono</p>
                      <p className="text-lg font-semibold text-gray-900">{dayData.sleep.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Atividades</p>
                      <p className="text-lg font-semibold text-gray-900">{dayData.activities.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <TrendingUp size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sintomas</p>
                      <p className="text-lg font-semibold text-gray-900">{dayData.symptoms.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <Baby className="h-8 w-8 text-white mx-auto" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Bem-vindo ao Kids Health Tracker!</h2>
                <p className="text-gray-600 mb-4">
                  Comece adicionando uma criança para monitorar sua alimentação, sono, atividades e sintomas.
                </p>
                <p className="text-sm text-gray-500">
                  Identifique padrões e cuide melhor da saúde do seu filho.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal para adicionar entrada */}
      {showAddModal && selectedChild && (
        <AddEntryModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveEntry}
          type={addModalType}
          childId={selectedChild.id}
        />
      )}
    </div>
  );
}