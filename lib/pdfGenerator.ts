// lib/pdfGenerator.ts
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Génère un PDF optimisé à partir du CV
 */
export const generatePdfFromHtml = async (elementId: string, filename: string) => {
  const input = document.getElementById(elementId);

  if (!input) {
    console.error(`Élément DOM avec l'ID '${elementId}' introuvable.`);
    alert("Erreur: Impossible de trouver l'aperçu du CV pour la génération PDF.");
    return;
  }

  try {
    console.log("🔄 Début de la génération PDF...");

    await prepareForCapture(input);

    // Capture avec meilleures options
    const canvas = await html2canvas(input, {
      background: "#ffffff",
      useCORS: true,
      scale: 2, // meilleure qualité
      logging: false,
    } as any);

    console.log(`Canvas généré: ${canvas.width}x${canvas.height}px`);

    const imgData = canvas.toDataURL("image/jpeg", 0.85);

    // Initialiser PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Première page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Si contenu dépasse une page -> ajouter d’autres pages
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // Sauvegarde
    pdf.save(filename);
    console.log("PDF généré avec succès !");
  } catch (error) {
    console.error("Erreur lors de la génération PDF:", error);

    try {
      console.log("Tentative avec méthode simplifiée...");
      await generateSimplePdf(input, filename);
    } catch (fallbackError) {
      console.error("Échec fallback:", fallbackError);
      alert(
        `Erreur: Impossible de générer le PDF.\n${
          error instanceof Error ? error.message : "Erreur inconnue"
        }`
      );
    }
  }
};

/**
 * Prépare l'élément pour la capture
 */
const prepareForCapture = async (element: HTMLElement): Promise<void> => {
  element.style.visibility = "visible";
  element.style.opacity = "1";
  element.style.transform = "scale(1)";
  element.offsetHeight;

  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });

  // Mapping explicite Tailwind → HEX (au cas où)
  const styleEl = document.createElement("style");
  styleEl.id = "pdf-temp-styles";
  styleEl.textContent = `
      .text-blue-600 { color: #2563eb !important; }
      .text-gray-900 { color: #111827 !important; }
      .text-gray-800 { color: #1f2937 !important; }
      .text-gray-700 { color: #374151 !important; }
      .text-gray-600 { color: #4b5563 !important; }
      .text-gray-500 { color: #6b7280 !important; }
      .border-gray-200 { border-color: #e5e7eb !important; }
      .bg-gray-50 { background-color: #f9fafb !important; }
      .bg-white { background-color: #ffffff !important; }
      .icon { padding-top: 1px;}
      .icon-label { padding-bottom: 3px; }
      .border-b-2 { border-bottom-style: solid; border-bottom-width: 2px; margin-top: 4px;}
      .mb { margin-bottom: 3px;}
  `;
  document.head.appendChild(styleEl);

  setTimeout(() => {
    document.getElementById("pdf-temp-styles")?.remove();
  }, 3000);
};


/**
 * Fallback simplifié
 */
const generateSimplePdf = async (input: HTMLElement, filename: string): Promise<void> => {
  const canvas = await html2canvas(input, {
    background: "#ffffff",
    scale: 1,
  } as any);

  const imgData = canvas.toDataURL("image/jpeg", 0.7);
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);

  console.log("✅ PDF généré avec fallback simplifié");
};
