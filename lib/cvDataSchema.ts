// --- Types de base pour les blocs répétitifs ---

export type Experience = {
  id: string; // Utilisé pour les clés dans React et l'édition facile
  titre: string;
  entreprise: string;
  ville: string;
  dateDebut: string; // Format 'YYYY-MM' ou 'Mois YYYY'
  dateFin: string;   // Format 'YYYY-MM' ou 'Mois YYYY' ou 'Actuel'
  description: string[]; // Liste de points à puces
};

export type Education = {
  id: string;
  diplome: string;
  etablissement: string;
  ville: string;
  dateDebut: string;
  dateFin: string;
  description: string;
};

export type Competence = {
  id: string;
  nom: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
};

export type Langue = {
  id: string;
  nom: string;
  niveau: string;
};

export type Projet = {
  id: string;
  titre: string;
  description: string;
  lien: string;
};

// --- Le type principal du CV ---

export type CVData = {
  // 1. Informations Personnelles
  personnel: {
    nom: string;
    prenom: string;
    titre: string; // Ex: Développeur Full Stack
    telephone: string;
    email: string;
    linkedin: string;
    github: string; // Optionnel
    portfolio: string; // Optionnel
    villeResidence: string;
    photoURL?: string; // URL vers la photo (optionnel)
  };

  // 2. Profil / Résumé
  profil: {
    texte: string;
  };

  // 3. Expériences Professionnelles
  experiences: Experience[];

  // 4. Formation / Éducation
  education: Education[];

  // 5. Compétences Techniques et Linguistiques
  competences: Competence[];

  // 6. Langues
  langues: {
    id: string;
    nom: string;
    niveau: string; // Ex: B2, C1, Bilingue
  }[];

  // 7. Projets / Autres (optionnel)
  projets: {
    id: string;
    titre: string;
    description: string;
    lien: string; // Lien vers le projet (GitHub, démo)
  }[];
};

// --- Données d'exemple pour le développement ---

export const initialCVData: CVData = {
  personnel: {
    nom: 'DUPONT',
    prenom: 'Jean',
    titre: 'Développeur Front-end Next.js',
    telephone: '+33 6 00 00 00 00',
    email: 'jean.dupont@dev.com',
    linkedin: 'linkedin.com/in/jeandupont',
    github: 'github.com/jeandupont',
    portfolio: 'portfolio.com/jean',
    villeResidence: 'Paris, France',
    photoURL: undefined,
  },
  profil: {
    texte: "Développeur passionné avec 5 ans d'expérience dans la création d'interfaces utilisateur modernes et performantes. Expertise solide en React, Next.js et gestion de l'état global. Recherche un poste où je pourrai mettre à profit mes compétences en architecture logicielle et en design d'expérience utilisateur (UX).",
  },
  experiences: [
    {
      id: 'exp1',
      titre: 'Développeur Front-end Senior',
      entreprise: 'TechInnov S.A.',
      ville: 'Lyon',
      dateDebut: 'Juin 2022',
      dateFin: 'Actuel',
      description: [
        'Conception et développement de la nouvelle plateforme e-commerce en Next.js (App Router).',
        "Optimisation des performances (Lighthouse Score > 90) grâce à la mise en cache et au SSR/SSG.",
        'Mise en place de tests unitaires avec Jest et React Testing Library.',
      ],
    },
    {
      id: 'exp2',
      titre: 'Développeur Web Junior',
      entreprise: 'Startup Agile',
      ville: 'Marseille',
      dateDebut: 'Septembre 2020',
      dateFin: 'Mai 2022',
      description: [
        'Intégration de maquettes Figma en HTML/CSS moderne et responsive.',
        "Participation au développement d'une application interne basée sur React.",
      ],
    },
  ],
  education: [
    {
      id: 'edu1',
      diplome: 'Master Ingénierie du Web',
      etablissement: 'Université de la Technologie',
      ville: 'Paris',
      dateDebut: 'Septembre 2018',
      dateFin: 'Juin 2020',
      description: 'Spécialisation en architecture logicielle et cloud computing.',
    },
  ],
  competences: [
    { id: 'comp1', nom: 'Next.js', niveau: 'Expert' },
    { id: 'comp2', nom: 'TypeScript', niveau: 'Avancé' },
    { id: 'comp3', nom: 'Tailwind CSS', niveau: 'Avancé' },
    { id: 'comp4', nom: 'Node.js', niveau: 'Intermédiaire' },
  ],
  langues: [
    { id: 'lang1', nom: 'Français', niveau: 'Langue maternelle' },
    { id: 'lang2', nom: 'Anglais', niveau: 'Courant (C1)' },
  ],
  projets: [
    {
      id: 'proj1',
      titre: 'QuickCV Generator (ce projet!)',
      description: 'Générateur de CV moderne et gratuit utilisant Next.js et l\'export PDF.',
      lien: 'github.com/moncompte/quickcv',
    },
  ]
};