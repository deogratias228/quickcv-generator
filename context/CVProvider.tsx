'use client';

import { Competence, CVData, Education, Experience, initialCVData } from "@/lib/cvDataSchema";
import { createContext, useReducer, ReactNode, useContext } from "react";

type Action =
    | { type: 'UPDATE_FIELD'; section: keyof CVData; payload: { key: string, value: any } }
    | { type: 'ADD_ITEM'; section: 'experiences' | 'education' | 'competences'; payload: Experience | Education | Competence }
    | { type: 'REMOVE_ITEM'; section: 'experiences' | 'education' | 'competences'; payload: { id: string } }
    | { type: 'UPDATE_ITEM'; section: 'experiences' | 'education' | 'competences'; payload: Experience | Education | Competence }

// --- Le Reducer ---
// Il prend l'état actuel et une action pour retourner le nouvel état
const cvReducer = (state: CVData, action: Action) : CVData => {
    switch (action.type) {
        case 'UPDATE_FIELD': {
            const {section, payload} = action;
            return {
                ...state,
                [section]: {
                    ...state[section],
                    [payload.key]: payload.value,
                },
            };
        }
        case 'ADD_ITEM': {
            const {section, payload} = action;
            return {
                ...state,
                [section]: [...state[section], payload],
            };
        }
        case 'REMOVE_ITEM': {
            const {section, payload} = action;
            return {
                ...state, 
                [section]: state[section].filter(item => item.id !== payload.id),
            };
        }
        case 'UPDATE_ITEM': {
            const {section, payload} = action;
            return {
                ...state,
                [section]: state[section].map(item => 
                    item.id === (payload as any).id ? payload: item
                ),
            };
        }
        default:
            return state;
    }
};


// --- Création du Contexte ---
// On définit ici l'état (CVData) et la fonction de dispatch pour envoyer les actions
interface CVContextType {
    cvData: CVData,
    dispatch: React.Dispatch<Action>;
}

export const CVContext = createContext<CVContextType | undefined>(undefined);


// --- Le Provider (le composant qui fournit le contexte) ---
interface CVProviderProps {
    children: ReactNode
}

export const CVProvider = ({children}: CVProviderProps) => {
    const [cvData, dispatch] = useReducer(cvReducer, initialCVData);

    return (
        <CVContext.Provider value={{ cvData, dispatch }}>
            {children}
        </CVContext.Provider>
    );
};


// Hook personalisé pour l'utilisation du context ---
// C'est une bonne pratique pour éviter de devoir importer `useContext` partout.
export const useCV = () => {
    const context = useContext(CVContext);
    if (context === undefined) {
        throw new Error('useCV must be used within a CVProvider');
    }

    return context;
}
