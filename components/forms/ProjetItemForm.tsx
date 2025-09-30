// components/forms/ProjetItemForm.tsx
import React from 'react';

// Le type pour Projet a été défini dans cvDataSchema comme:
// { id: string; titre: string; description: string; lien: string; }

interface Projet {
    id: string;
    titre: string;
    description: string;
    lien: string;
}

interface ProjetItemFormProps {
  item: Projet;
  onUpdate: (updatedItem: Projet) => void;
}

const ProjetItemForm: React.FC<ProjetItemFormProps> = ({ item, onUpdate }) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-3">
        <input
            type="text"
            name="titre"
            placeholder="Titre du Projet (Ex: QuickCV Generator)"
            value={item.titre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
        <input
            type="url"
            name="lien"
            placeholder="Lien (URL GitHub ou Démo)"
            value={item.lien}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
        <textarea
            name="description"
            placeholder="Description des technologies utilisées et des objectifs"
            rows={3}
            value={item.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm resize-none"
        />
    </div>
  );
};

export default ProjetItemForm;