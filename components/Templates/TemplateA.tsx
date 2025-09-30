import React from 'react';
import { CVData, Experience, Education } from '@/lib/cvDataSchema';
import { Mail, Phone, MapPin, Link, Github, Linkedin } from 'lucide-react';

interface TemplateAProps {
    data: CVData;
}

const HeaderGauche: React.FC<Pick<TemplateAProps, 'data'>['data']> = ({ personnel }) => (
    <div className="pb-4 border-b border-gray-200">
        <h2 className="text-2xl mb-1 font-extrabold leading-none" style={{ color: '#111827' }}>
            {personnel.prenom}
        </h2>
        <h1 className="text-3xl font-extrabold leading-none mb-1" style={{ color: '#2563eb' }}>
            {personnel.nom}
        </h1>
        <p className="text-md font-semibold mt-2" style={{ color: '#374151' }}>
            {personnel.titre}
        </p>

        <div className="mt-4 space-y-2 text-xs">
            {personnel.telephone && (
                <p className="flex items-center">
                    <Phone size={14} className="mr-2 icon" style={{ color: '#2563eb' }} />
                    <span style={{ color: '#111827' }} className='icon-label'>{personnel.telephone}</span>
                </p>
            )}
            {personnel.email && (
                <p className="flex items-center">
                    <Mail size={14} className="mr-2 icon" style={{ color: '#2563eb' }} />
                    <span style={{ color: '#111827' }} className='icon-label'>{personnel.email}</span>
                </p>
            )}
            {personnel.villeResidence && (
                <p className="flex items-center">
                    <MapPin size={14} className="mr-2 icon" style={{ color: '#2563eb' }} />
                    <span style={{ color: '#111827' }} className='icon-label'>{personnel.villeResidence}</span>
                </p>
            )}
            {personnel.linkedin && (
                <a 
                    href={`https://${personnel.linkedin}`} 
                    target="_blank" 
                    className="flex items-center hover:opacity-75 transition"
                    style={{ color: '#111827' }}
                >
                    <Linkedin size={14} className="mr-2 icon" style={{ color: '#2563eb' }} />
                    {personnel.linkedin.replace(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//i, '')}
                </a>
            )}
            {personnel.github && (
                <a 
                    href={`https://${personnel.github}`} 
                    target="_blank" 
                    className="flex items-center hover:opacity-75 transition"
                    style={{ color: '#111827' }}
                >
                    <Github size={14} className="mr-2 icon" style={{ color: '#2563eb' }} />
                    {personnel.github.replace(/^(https?:\/\/)?(www\.)?github\.com\//i, '')}
                </a>
            )}
        </div>
    </div>
);

const TemplateA: React.FC<TemplateAProps> = ({ data }) => {
    return (
        <div
            id="cv-preview-container"
            className="bg-white p-6 lg:p-8 w-[794px] mx-auto text-sm font-sans"
            style={{ 
                minHeight: '1123px',
                maxWidth: '794px',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                boxShadow: 'none',
                border: 'none'
            }}
        >
            <div className="flex h-full">
                {/* Colonne Gauche (30%) */}
                <div 
                    className="w-1/3 p-6 border-r" 
                    style={{ 
                        backgroundColor: '#f9fafb',
                        borderColor: '#e5e7eb'
                    }}
                >
                    <HeaderGauche personnel={data.personnel} profil={{
                        texte: ''
                    }} experiences={[]} education={[]} competences={[]} langues={[]} projets={[]} />

                    <div className="space-y-6 mt-6">
                        <SectionGauche title="Compétences">
                            <ul className="list-none space-y-1">
                                {data.competences.map((c) => (
                                    <li key={c.id} className="text-sm">
                                        <span className="font-semibold" style={{ color: '#111827' }}>
                                            {c.nom}
                                        </span>
                                        <span style={{ color: '#4b5563' }}> ({c.niveau})</span>
                                    </li>
                                ))}
                            </ul>
                        </SectionGauche>

                        <SectionGauche title="Langues">
                            <ul className="list-none space-y-1">
                                {data.langues.map((l) => (
                                    <li key={l.id} className="text-sm">
                                        <span className="font-semibold" style={{ color: '#111827' }}>
                                            {l.nom}
                                        </span>
                                        <span style={{ color: '#4b5563' }}> : {l.niveau}</span>
                                    </li>
                                ))}
                            </ul>
                        </SectionGauche>

                        {data.projets.length > 0 && (
                            <SectionGauche title="Projets Clés">
                                <ul className="list-none space-y-3">
                                    {data.projets.map((p) => (
                                        <li key={p.id}>
                                            <p className="font-semibold" style={{ color: '#374151' }}>
                                                {p.titre}
                                            </p>
                                            <a 
                                                href={p.lien} 
                                                target="_blank" 
                                                className="text-xs hover:underline flex items-center"
                                                style={{ color: '#2563eb' }}
                                            >
                                                <Link size={12} className="mr-1" />
                                                Lien
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </SectionGauche>
                        )}
                    </div>
                </div>

                {/* Colonne Droite (70%) */}
                <div className="w-2/3 p-6 space-y-8">
                    <SectionDroite title="Profil">
                        <p className="text-justify leading-relaxed mb" style={{ color: '#1f2937' }}>
                            {data.profil.texte}
                        </p>
                    </SectionDroite>

                    <SectionDroite title="Expérience Professionnelle">
                        <div className="space-y-4 mb">
                            {data.experiences.map((exp) => (
                                <ExperienceItem key={exp.id} item={exp} />
                            ))}
                        </div>
                    </SectionDroite>

                    <SectionDroite title="Formation">
                        <div className="space-y-4 mb">
                            {data.education.map((edu) => (
                                <EducationItem key={edu.id} item={edu} />
                            ))}
                        </div>
                    </SectionDroite>
                </div>
            </div>
        </div>
    );
};

const SectionGauche: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 
            className="text-lg font-bold pb-1 mb-2 border-b-2" 
            style={{ 
                color: '#1f2937',
                borderColor: '#60a5fa'
            }}
        >
            {title}
        </h3>
        {children}
    </div>
);

const SectionDroite: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 
            className="text-xl font-extrabold border-b-2 pb-1 mb-3 uppercase tracking-wider" 
            style={{ 
                color: '#1f2937',
                borderColor: '#2563eb'
            }}
        >
            {title}
        </h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const ExperienceItem: React.FC<{ item: Experience }> = ({ item }) => (
    <div className="mb-4">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-md" style={{ color: '#111827' }}>
                    {item.titre} - {item.entreprise}
                </h4>
                <p className="text-xs" style={{ color: '#6b7280' }}>
                    {item.ville}
                </p>
            </div>
            <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#4b5563' }}>
                {item.dateDebut} - {item.dateFin}
            </span>
        </div>
        <ul className="list-disc ml-4 mt-1 text-sm space-y-0.5">
            {item.description.filter(p => p.trim() !== '').map((point, index) => (
                <li key={index} className="leading-snug" style={{ color: '#1f2937' }}>
                    {point}
                </li>
            ))}
        </ul>
    </div>
);

const EducationItem: React.FC<{ item: Education }> = ({ item }) => (
    <div className="mb-4">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="font-bold text-md" style={{ color: '#111827' }}>
                    {item.diplome} - {item.etablissement}
                </h4>
                <p className="text-xs" style={{ color: '#6b7280' }}>
                    {item.ville}
                </p>
            </div>
            <span className="text-xs font-semibold whitespace-nowrap" style={{ color: '#4b5563' }}>
                {item.dateDebut} - {item.dateFin}
            </span>
        </div>
        {item.description && (
            <p className="mt-1 text-sm italic" style={{ color: '#1f2937' }}>
                {item.description}
            </p>
        )}
    </div>
);

export default TemplateA;