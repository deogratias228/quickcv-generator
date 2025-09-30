// components/Header.tsx
import React from 'react';
import { useCV } from '@/context/CVProvider';
import { generatePdfFromHtml } from '@/lib/pdfGenerator'; // <-- Importez la fonction PDF
import { Download } from 'lucide-react';
import CvExportButton from './CVExportButton';

const Header: React.FC = () => {
    const { cvData } = useCV(); 
    
    const handleExportPdf = () => {
        const { nom, prenom } = cvData.personnel;
        const filename = `${prenom}_${nom}_CV.pdf`.replace(' ', '_').toUpperCase();

        // L'élément à capturer doit correspondre à l'ID défini dans CVPreview.tsx
        generatePdfFromHtml('cv-preview-container', filename);
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm p-4 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-extrabold text-blue-600">QuickCV Generator</h1>
                
                <div className="space-x-4 flex items-center">
                    {/* Placeholder pour le sélecteur de template */}
                    <select className="p-2 border rounded-md shadow-sm">
                        <option>Template Élégance</option>
                        {/* Les autres templates seront ajoutés ici */}
                    </select>

                    {/* Bouton Export PDF (Mise à jour) */}
                    {/* <CvExportButton ></CvExportButton> */}
                    <button 
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-150"
                        onClick={handleExportPdf} // <-- Appel de la fonction
                    >
                        <Download size={18} />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;


