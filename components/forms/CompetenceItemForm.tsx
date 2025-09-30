// components/forms/CompetenceItemForm.tsx
import React from 'react';
import { Competence } from '@/lib/cvDataSchema';

interface CompetenceItemFormProps {
  item: Competence;
  onUpdate: (updatedItem: Competence) => void;
}

const NIVEAUX = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

const CompetenceItemForm: React.FC<CompetenceItemFormProps> = ({ item, onUpdate }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 items-end">
        <div>
            <label htmlFor={`nom-${item.id}`} className="block text-xs font-medium text-gray-700">Nom de la Compétence</label>
            <input
                type="text"
                name="nom"
                id={`nom-${item.id}`}
                placeholder="Ex: TypeScript, Figma, Scrum"
                value={item.nom}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <div>
            <label htmlFor={`niveau-${item.id}`} className="block text-xs font-medium text-gray-700">Niveau</label>
            <select
                name="niveau"
                id={`niveau-${item.id}`}
                value={item.niveau}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
                {NIVEAUX.map(niveau => (
                    <option key={niveau} value={niveau}>{niveau}</option>
                ))}
            </select>
        </div>
    </div>
  );
};

export default CompetenceItemForm;