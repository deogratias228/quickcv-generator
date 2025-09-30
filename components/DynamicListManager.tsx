import React, { useState } from 'react';
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react'; // Ajout d'icônes d'accordéon

// Le type générique T étend un objet qui doit avoir une propriété 'id'
interface DynamicListManagerProps<T extends { id: string }> {
    title: string;
    buttonTitle: string; // <-- Ajout de la prop pour le titre du bouton
    sectionKey: 'experiences' | 'education' | 'competences' | 'langues' | 'projets';
    items: T[];
    renderItem: (item: T, onRemove: (id: string) => void, onUpdate: (updatedItem: T) => void) => React.ReactNode;
    getNewItem: () => T;
    dispatch: any;
}

const DynamicListManager = <T extends { id: string }>({
    title,
    buttonTitle,
    sectionKey,
    items,
    renderItem,
    getNewItem,
    dispatch,
}: DynamicListManagerProps<T>) => {

    // État pour gérer quel élément est ouvert. Peut être l'ID de l'élément ou null.
    const [openItemId, setOpenItemId] = useState<string | null>(items.length > 0 ? items[0].id : null);

    const handleAddItem = () => {
        const newItem = getNewItem();
        dispatch({
            type: 'ADD_ITEM',
            section: sectionKey,
            payload: newItem,
        });
        // Ouvre le nouvel élément immédiatement
        setOpenItemId(newItem.id);
    };

    const handleRemoveItem = (id: string) => {
        dispatch({
            type: 'REMOVE_ITEM',
            section: sectionKey,
            payload: { id },
        });
        // Ferme l'accordéon s'il était ouvert
        if (openItemId === id) {
            setOpenItemId(null);
        }
    };

    const handleUpdateItem = (updatedItem: T) => {
        dispatch({
            type: 'UPDATE_ITEM',
            section: sectionKey,
            payload: updatedItem,
        });
    };

    // Fonction utilitaire pour obtenir le titre à afficher sur l'accordéon plié
    const getItemDisplayTitle = (item: T): string => {
        if ('titre' in item && 'entreprise' in item) {
            // Pour Expérience
            return `${item.titre || 'Poste sans titre'} chez ${item.entreprise || 'Entreprise'}`;
        }
        if ('diplome' in item && 'etablissement' in item) {
            // Pour Éducation
            return `${item.diplome || 'Diplôme sans nom'} (${item.etablissement || 'Établissement'})`;
        }
        if ('nom' in item) {
            // Pour Compétences ou Langues
            return item.nom || 'Nouvelle entrée';
        }
        return 'Élément';
    };


    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">{title}</h2>

            {items.length === 0 && (
                <p className="text-gray-500 italic text-sm">Aucun élément ajouté. Cliquez sur "Ajouter" pour commencer.</p>
            )}

            <div className="space-y-3">
                {items.map((item) => {
                    const isOpen = openItemId === item.id;
                    const displayTitle = getItemDisplayTitle(item);

                    return (
                        <div key={item.id} className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden">

                            {/* En-tête de l'accordéon */}
                            <div
                                onClick={() => setOpenItemId(isOpen ? null : item.id)}
                                className="w-full flex justify-between cursor-pointer items-center p-4 text-left font-semibold text-gray-700 hover:bg-gray-50 transition"
                            >
                                <span className="truncate pr-4">{displayTitle}</span>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveItem(item.id);
                                        }}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        title="Supprimer cet élément"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>

                            {/* Corps de l'accordéon (Contenu du Formulaire) */}
                            {isOpen && (
                                <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
                                    {/* L'élément est rendu par la fonction 'renderItem' passée en prop */}
                                    {/* Nous retirons onRemove du renderItem car il est géré dans le header de l'accordéon */}
                                    {renderItem(item, handleRemoveItem, handleUpdateItem)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <button
                onClick={handleAddItem}
                className="flex items-center space-x-2 px-4 py-3 text-sm bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 shadow-md"
            >
                <PlusCircle size={20} />
                <span>{buttonTitle}</span> {/* Utilisation de la nouvelle prop */}
            </button>
        </div>
    );
};

export default DynamicListManager;