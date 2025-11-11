'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Child } from '@/lib/types';
import { generateId, calculateAgeInMonths } from '@/lib/storage';

interface ChildSelectorProps {
  children: Child[];
  selectedChild?: Child;
  onSelectChild: (child: Child) => void;
  onAddChild: (child: Child) => void;
}

export function ChildSelector({ children, selectedChild, onSelectChild, onAddChild }: ChildSelectorProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildBirthDate, setNewChildBirthDate] = useState('');

  const handleAddChild = () => {
    if (newChildName.trim() && newChildBirthDate) {
      const newChild: Child = {
        id: generateId(),
        name: newChildName.trim(),
        birthDate: newChildBirthDate,
        createdAt: new Date().toISOString()
      };
      onAddChild(newChild);
      setNewChildName('');
      setNewChildBirthDate('');
      setShowAddForm(false);
    }
  };

  if (children.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Adicionar primeira criança</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="Nome da criança"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de nascimento</label>
            <input
              type="date"
              value={newChildBirthDate}
              onChange={(e) => setNewChildBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddChild}
            disabled={!newChildName.trim() || !newChildBirthDate}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Adicionar criança
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Selecionar criança</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {showAddForm ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
          <div>
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="Nome da criança"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <input
              type="date"
              value={newChildBirthDate}
              onChange={(e) => setNewChildBirthDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={handleAddChild}
            disabled={!newChildName.trim() || !newChildBirthDate}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            Adicionar
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {children.map((child) => {
          const ageInMonths = calculateAgeInMonths(child.birthDate);
          const ageText = ageInMonths < 12 
            ? `${ageInMonths} meses`
            : `${Math.floor(ageInMonths / 12)} anos`;

          return (
            <button
              key={child.id}
              onClick={() => onSelectChild(child)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                selectedChild?.id === child.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                  selectedChild?.id === child.id ? 'bg-blue-500' : 'bg-gray-400'
                }`}>
                  {child.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{child.name}</p>
                  <p className="text-sm text-gray-600">{ageText}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}