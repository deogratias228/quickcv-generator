'use client'; 

import { useCV } from "@/context/CVProvider"; 
import dynamic from 'next/dynamic'; 
import Header from '@/components/Header'; 

// Ces composants sont déjà gérés côté client par le 'use client' ci-dessus,
// mais on garde dynamic pour le code splitting.
const CVForm = dynamic(() => import('@/components/CVForm'), { ssr: false });
const CVPreview = dynamic(() => import('@/components/CVPreview'), { ssr: false });

// Nous n'avons plus besoin d'exporter le composant par défaut avec une fonction asynchrone
// car c'est maintenant un Client Component.

export default function EditorPage() {
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* 1. Header et Barre d'actions */}
      <Header /> 

      {/* 2. Zone d'édition principale (Formulaire + Preview) */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne 1 : Le Formulaire de Saisie */}
          <section className="lg:col-span-1 space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800">Éditeur de CV</h1>
            
            <CVForm /> 
          </section>

          {/* Colonne 2 : La Prévisualisation */}
          <aside className="lg:col-span-2 h-fit">
              <h2 className="text-3xl font-semibold mb-4 text-gray-700">Prévisualisation Live</h2>
              <CVPreview />
          </aside>
          
        </div>
      </main>
    </div>
  );
}