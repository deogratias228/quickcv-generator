// components/CVPreview.tsx

import React from 'react';
import { useCV } from '@/context/CVProvider';
import TemplateA from './Templates/TemplateA';

const CVPreview: React.FC = () => {
    const { cvData } = useCV();

    // IMPORTANT: Ne pas ajouter de wrapper supplémentaire
    // Le TemplateA contient déjà l'ID 'cv-preview-container'
    return <TemplateA data={cvData} />;
};

export default CVPreview;