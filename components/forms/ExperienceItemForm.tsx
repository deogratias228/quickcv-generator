import React from 'react';
import { Experience } from '@/lib/cvDataSchema';

interface ExperienceItemFormProps {
  item: Experience;
  onUpdate: (updatedItem: Experience) => void;
}

const ExperienceItemForm: React.FC<ExperienceItemFormProps> = ({ item, onUpdate }) => {

  // Gère les changements dans les champs de texte simples (titre, entreprise, etc.)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  // Gère les changements dans la liste des points de description (format text area)
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // On divise le texte par les sauts de ligne pour obtenir un tableau de chaînes
    const descriptionArray = e.target.value.split('\n').filter(line => line.trim() !== '');
    onUpdate({
        ...item,
        description: descriptionArray,
    });
  };

  return (
    <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
                type="text"
                name="titre"
                placeholder="Titre du poste (Ex: Développeur Senior)"
                value={item.titre}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                name="entreprise"
                placeholder="Entreprise"
                value={item.entreprise}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
            <input
                type="text"
                name="ville"
                placeholder="Ville (Ex: Lomé)"
                value={item.ville}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                name="dateDebut"
                placeholder="Date Début (Ex: 09/2020)"
                value={item.dateDebut}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <input
                type="text"
                name="dateFin"
                placeholder="Date Fin (Ex: Actuel ou 05/2024)"
                value={item.dateFin}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsabilités (un point par ligne)</label>
            <textarea
                name="description"
                placeholder="Liste des responsabilités et réalisations clés. Chaque nouvelle ligne sera un point dans votre CV."
                rows={4}
                value={item.description.join('\n')} // Convertir le tableau en chaîne pour le textarea
                onChange={handleDescriptionChange}
                className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
        </div>
    </div>
  );
};

export default ExperienceItemForm;