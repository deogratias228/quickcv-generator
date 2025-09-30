// components/forms/LangueItemForm.tsx
import React from 'react';

// Le type pour Langue a été défini dans cvDataSchema comme:
// { id: string; nom: string; niveau: string; }

interface Langue {
    id: string;
    nom: string;
    niveau: string;
}

interface LangueItemFormProps {
  item: Langue;
  onUpdate: (updatedItem: Langue) => void;
}

const LangueItemForm: React.FC<LangueItemFormProps> = ({ item, onUpdate }) => {

  const NIVEAUX = [
    'Bases', 'Conversationnel', 'Courant (B2/C1)', 'Bilingue/Maternelle'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onUpdate({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 items-end">
        <div>
            <label htmlFor={`nom-${item.id}`} className="block text-xs font-medium text-gray-700">Langue</label>
            <input
                type="text"
                name="nom"
                id={`nom-${item.id}`}
                placeholder="Ex: Espagnol, Anglais"
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

export default LangueItemForm;