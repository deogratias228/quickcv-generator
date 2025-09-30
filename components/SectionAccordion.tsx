// components/SectionAccordion.tsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SectionAccordionProps {
    id: string; // Identifiant unique de la section (ex: 'personnel', 'experiences')
    title: string;
    description: string; // Petite description pour guider l'utilisateur
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: (id: string) => void;
}

const SectionAccordion: React.FC<SectionAccordionProps> = ({ id, title, description, children, isOpen, onToggle }) => {
    return (
        <div className="border border-gray-300 rounded-xl shadow-md overflow-hidden bg-white">
            
            {/* Header de la section */}
            <button
                onClick={() => onToggle(id)}
                className={`w-full cursor-pointer flex justify-between items-center p-5 text-left transition duration-200 ${isOpen ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {isOpen ? <ChevronUp size={24} className="text-blue-600" /> : <ChevronDown size={24} className="text-gray-500" />}
            </button>

            {/* Contenu de la section */}
            {isOpen && (
                <div className="p-5 border-t border-gray-200 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
};

export default SectionAccordion;