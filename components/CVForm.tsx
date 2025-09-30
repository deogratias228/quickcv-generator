import React, { useState } from 'react';
import { useCV } from '@/context/CVProvider';
import DynamicListManager from './DynamicListManager';
import ExperienceItemForm from './forms/ExperienceItemForm';
import EducationItemForm from './forms/EducationItemForm';
import CompetenceItemForm from './forms/CompetenceItemForm';
import LangueItemForm from './forms/LangueItemForm'; // NOUVEAU
import ProjetItemForm from './forms/ProjetItemForm'; // NOUVEAU
import SectionAccordion from './SectionAccordion'; // NOUVEAU
import { Education, Experience, Competence, Langue, Projet } from '@/lib/cvDataSchema'; // TYPES MIS À JOUR
import { v4 as uuidv4 } from 'uuid';

// --- Fonctions utilitaires pour créer de nouveaux éléments ---

const getNewExperience = (): Experience => ({
    id: uuidv4(), 
    titre: '',
    entreprise: '',
    ville: '',
    dateDebut: '',
    dateFin: '',
    description: [''],
});

const getNewEducationItem = (): Education => ({
    id: uuidv4(),
    diplome: '',
    etablissement: '',
    ville: '',
    dateDebut: '',
    dateFin: '',
    description: '',
});

const getNewCompetence = (): Competence => ({
    id: uuidv4(),
    nom: '',
    niveau: 'Intermédiaire',
});

const getNewLangue = (): Langue => ({ // NOUVEAU
    id: uuidv4(),
    nom: '',
    niveau: 'Bases',
});

const getNewProjet = (): Projet => ({ // NOUVEAU
    id: uuidv4(),
    titre: '',
    description: '',
    lien: '',
});

// --- Composant principal CVForm ---

const CVForm: React.FC = () => {
    const { cvData, dispatch } = useCV();
    const [openSectionId, setOpenSectionId] = useState<string|null>('personnel');

    const toggleSection = (id: string) => {
        setOpenSectionId(openSectionId === id ? null : id);
    }

    // Fonction de gestion des changements pour les champs simples
    const handlePersonnelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Détermine la section (personnel ou profil) en fonction du nom du champ
        const section = e.target.name === 'texte' ? 'profil' : 'personnel';
        
        dispatch({
            type: 'UPDATE_FIELD',
            section: section as 'personnel' | 'profil',
            payload: { key: e.target.name, value: e.target.value }
        });
    };

    // Liste complète des clés pour la section personnelle
    const personalFields = [
        { key: 'nom', label: 'Nom', placeholder: 'Nom de Famille' },
        { key: 'prenom', label: 'Prénom', placeholder: 'Votre Prénom' },
        { key: 'titre', label: 'Titre Professionnel', placeholder: 'Ex: Développeur Full Stack Senior' },
        { key: 'villeResidence', label: 'Ville de Résidence', placeholder: 'Ex: Paris, France' },
        { key: 'telephone', label: 'Téléphone', placeholder: '+33 6...' },
        { key: 'email', label: 'Email', type: 'email', placeholder: 'contact@example.com' },
        { key: 'linkedin', label: 'Lien LinkedIn', placeholder: 'Ex: linkedin.com/in/profil' },
        { key: 'github', label: 'Lien GitHub', placeholder: 'Ex: github.com/votre-compte' },
        { key: 'portfolio', label: 'Lien Portfolio/Web', placeholder: 'Ex: mon-site-web.com' },
    ];


    return (
        <div className="space-y-4">
            
            {/* 1. SECTION INFORMATIONS PERSONNELLES */}
            <SectionAccordion
                id="personnel"
                title="1. Informations Personnelles et Contact"
                description="Votre identité, coordonnées et liens sociaux."
                isOpen={openSectionId === 'personnel'}
                onToggle={toggleSection}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {personalFields.map(({ key, label, type = 'text', placeholder }) => (
                        <div key={key}>
                            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type={type}
                                name={key}
                                id={key}
                                value={(cvData.personnel as any)[key] || ''}
                                onChange={handlePersonnelChange}
                                placeholder={placeholder}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    ))}
                </div>
            </SectionAccordion>

            {/* 2. SECTION PROFIL/RÉSUMÉ */}
            <SectionAccordion
                id="profil"
                title="2. Profil / Résumé Professionnel"
                description="Décrivez votre expérience et vos objectifs en quelques lignes."
                isOpen={openSectionId === 'profil'}
                onToggle={toggleSection}
            >
                <div>
                    <textarea
                        name="texte"
                        id="profil"
                        rows={5}
                        value={cvData.profil.texte}
                        onChange={handlePersonnelChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
                        placeholder="Décrivez votre expertise, votre expérience et vos objectifs professionnels..."
                    />
                </div>
            </SectionAccordion>

            {/* 3. SECTION EXPÉRIENCES PROFESSIONNELLES */}
            <SectionAccordion
                id="experiences"
                title="3. Expériences Professionnelles"
                description="Listez vos postes précédents et vos réalisations clés."
                isOpen={openSectionId === 'experiences'}
                onToggle={toggleSection}
            >
                <DynamicListManager<Experience>
                    title="Liste des Expériences"
                    buttonTitle='Ajouter une expérience professionnelle'
                    sectionKey="experiences"
                    items={cvData.experiences}
                    getNewItem={getNewExperience}
                    dispatch={dispatch}
                    renderItem={(item, onRemove, onUpdate) => (
                        <ExperienceItemForm item={item} onUpdate={onUpdate as (updatedItem: Experience) => void} />
                    )}
                />
            </SectionAccordion>
            
            {/* 4. SECTION FORMATION / ÉDUCATION */}
            <SectionAccordion
                id="education"
                title="4. Formation et Diplômes"
                description="Détaillez votre parcours académique et vos certifications."
                isOpen={openSectionId === 'education'}
                onToggle={toggleSection}
            >
                <DynamicListManager<Education>
                    title="Liste des Formations"
                    buttonTitle='Ajouter une formation'
                    sectionKey="education"
                    items={cvData.education}
                    getNewItem={getNewEducationItem}
                    dispatch={dispatch}
                    renderItem={(item, onRemove, onUpdate) => (
                        <EducationItemForm item={item} onUpdate={onUpdate as (updatedItem: Education) => void} />
                    )}
                />
            </SectionAccordion>

            {/* 5. SECTION COMPÉTENCES */}
            <SectionAccordion
                id="competences"
                title="5. Compétences Techniques"
                description="Listez vos hard skills (techniques) et leurs niveaux."
                isOpen={openSectionId === 'competences'}
                onToggle={toggleSection}
            >
                <DynamicListManager<Competence>
                    title="Liste des Compétences"
                    buttonTitle='Ajouter une compétence'
                    sectionKey="competences"
                    items={cvData.competences}
                    getNewItem={getNewCompetence}
                    dispatch={dispatch}
                    renderItem={(item, onRemove, onUpdate) => (
                        <CompetenceItemForm item={item} onUpdate={onUpdate as (updatedItem: Competence) => void} />
                    )}
                />
            </SectionAccordion>
            
            {/* 6. SECTION LANGUES (NOUVEAU) */}
            <SectionAccordion
                id="langues"
                title="6. Langues"
                description="Indiquez les langues que vous parlez et votre niveau."
                isOpen={openSectionId === 'langues'}
                onToggle={toggleSection}
            >
                <DynamicListManager<Langue>
                    title="Liste des Langues"
                    buttonTitle='Ajouter une langue'
                    sectionKey="langues"
                    items={cvData.langues}
                    getNewItem={getNewLangue}
                    dispatch={dispatch}
                    renderItem={(item, onRemove, onUpdate) => (
                        <LangueItemForm item={item} onUpdate={onUpdate as (updatedItem: Langue) => void} />
                    )}
                />
            </SectionAccordion>

            {/* 7. SECTION PROJETS CLÉS (NOUVEAU) */}
            <SectionAccordion
                id="projets"
                title="7. Projets Clés"
                description="Ajoutez des réalisations importantes avec liens et descriptions."
                isOpen={openSectionId === 'projets'}
                onToggle={toggleSection}
            >
                <DynamicListManager<Projet>
                    title="Liste des Projets"
                    buttonTitle='Ajouter un projet'
                    sectionKey="projets"
                    items={cvData.projets}
                    getNewItem={getNewProjet}
                    dispatch={dispatch}
                    renderItem={(item, onRemove, onUpdate) => (
                        <ProjetItemForm item={item} onUpdate={onUpdate as (updatedItem: Projet) => void} />
                    )}
                />
            </SectionAccordion>
            
        </div>
    );
};

export default CVForm;