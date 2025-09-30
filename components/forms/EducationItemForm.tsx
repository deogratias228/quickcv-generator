import React from 'react';
import { Education } from '@/lib/cvDataSchema';

// L'import de 'lodash/uniqueId' a été retiré car l'ID est géré par DynamicListManager.

interface EducationItemFormProps {
  item: Education;
  // onUpdate est la fonction fournie par DynamicListManager pour mettre à jour l'état global.
  onUpdate: (updatedItem: Education) => void; 
}

const EducationItemForm: React.FC<EducationItemFormProps> = ({ item, onUpdate }) => {

  // Gère les changements dans n'importe quel champ de texte (input ou textarea).
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Utilisation de e.target.name pour identifier le champ et e.target.value pour la nouvelle valeur.
    onUpdate({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-3">
        
        {/* Ligne 1: Diplôme et Établissement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor={`diplome-${item.id}`} className="block text-xs font-medium text-gray-700">Diplôme/Titre</label>
                <input
                    type="text"
                    name="diplome"
                    id={`diplome-${item.id}`}
                    placeholder="Ex: Master Ingénierie du Web"
                    value={item.diplome}
                    onChange={handleTextChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor={`etablissement-${item.id}`} className="block text-xs font-medium text-gray-700">Établissement</label>
                <input
                    type="text"
                    name="etablissement"
                    id={`etablissement-${item.id}`}
                    placeholder="Nom de l'école ou de l'université"
                    value={item.etablissement}
                    onChange={handleTextChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>
        
        {/* Ligne 2: Ville et Dates */}
        <div className="grid grid-cols-3 gap-4">
            <div>
                <label htmlFor={`ville-${item.id}`} className="block text-xs font-medium text-gray-700">Ville</label>
                <input
                    type="text"
                    name="ville"
                    id={`ville-${item.id}`}
                    placeholder="Ville (Ex: Lomé)"
                    value={item.ville}
                    onChange={handleTextChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor={`dateDebut-${item.id}`} className="block text-xs font-medium text-gray-700">Date Début</label>
                <input
                    type="text"
                    name="dateDebut"
                    id={`dateDebut-${item.id}`}
                    placeholder="Mois YYYY"
                    value={item.dateDebut}
                    onChange={handleTextChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div>
                <label htmlFor={`dateFin-${item.id}`} className="block text-xs font-medium text-gray-700">Date Fin</label>
                <input
                    type="text"
                    name="dateFin"
                    id={`dateFin-${item.id}`}
                    placeholder="Mois YYYY ou 'Actuel'"
                    value={item.dateFin}
                    onChange={handleTextChange}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
        </div>

        {/* Ligne 3: Description/Notes (Champ simple, non pas une liste) */}
        <div>
            <label htmlFor={`description-${item.id}`} className="block text-xs font-medium text-gray-700">Notes / Mention / Sujet de mémoire (Optionnel)</label>
            <textarea
                name="description"
                id={`description-${item.id}`}
                placeholder="Ex: Mention Très Bien, ou description du sujet de votre mémoire..."
                rows={2}
                value={item.description}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
        </div>
    </div>
  );
};

export default EducationItemForm;