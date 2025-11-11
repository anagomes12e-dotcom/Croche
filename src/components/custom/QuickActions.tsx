'use client';

import { useState } from 'react';
import { Plus, Utensils, Moon, Activity, AlertTriangle } from 'lucide-react';
import { EntryType } from '@/lib/types';

interface QuickActionsProps {
  onAddEntry: (type: EntryType) => void;
}

export function QuickActions({ onAddEntry }: QuickActionsProps) {
  const actions = [
    {
      type: 'food' as EntryType,
      label: 'Alimentação',
      icon: Utensils,
      color: 'from-green-400 to-emerald-600',
      hoverColor: 'hover:from-green-500 hover:to-emerald-700'
    },
    {
      type: 'sleep' as EntryType,
      label: 'Sono',
      icon: Moon,
      color: 'from-indigo-400 to-purple-600',
      hoverColor: 'hover:from-indigo-500 hover:to-purple-700'
    },
    {
      type: 'activity' as EntryType,
      label: 'Atividade',
      icon: Activity,
      color: 'from-orange-400 to-red-600',
      hoverColor: 'hover:from-orange-500 hover:to-red-700'
    },
    {
      type: 'symptom' as EntryType,
      label: 'Sintoma',
      icon: AlertTriangle,
      color: 'from-red-400 to-pink-600',
      hoverColor: 'hover:from-red-500 hover:to-pink-700'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Plus size={20} className="mr-2 text-blue-600" />
        Adicionar registro
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.type}
              onClick={() => onAddEntry(action.type)}
              className={`p-4 rounded-xl bg-gradient-to-br ${action.color} ${action.hoverColor} text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex flex-col items-center space-y-2">
                <Icon size={24} />
                <span className="text-sm font-medium">{action.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}