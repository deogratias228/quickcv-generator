"use client";

import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CvExportButton() {
  const [loading, setLoading] = useState(false);

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

    // Ajout d’un style temporaire pour neutraliser lab() et couleurs non supportées
    const styleEl = document.createElement("style");
    styleEl.id = "pdf-temp-styles";
    styleEl.textContent = `
      #cv-preview-container * {
        color: initial !important;
        background-color: initial !important;
      }

      /* Mapping de certaines classes Tailwind */
      .text-blue-600 { color: #2563eb !important; }
      .text-gray-900 { color: #111827 !important; }
      .text-gray-800 { color: #1f2937 !important; }
      .text-gray-700 { color: #374151 !important; }
      .text-gray-600 { color: #4b5563 !important; }
      .text-gray-500 { color: #6b7280 !important; }
      .border-gray-200 { border-color: #e5e7eb !important; }
      .bg-gray-50 { background-color: #f9fafb !important; }
      .bg-white { background-color: #ffffff !important; }
    `;
    document.head.appendChild(styleEl);

    // Nettoyage automatique après 3 secondes
    setTimeout(() => {
      document.getElementById("pdf-temp-styles")?.remove();
    }, 3000);

    // Sécurité : supprimer les couleurs lab() au cas où
    document.querySelectorAll("#cv-preview-container *").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.color.includes("lab(")) {
        (el as HTMLElement).style.color = "#000000";
      }
      if (style.backgroundColor.includes("lab(")) {
        (el as HTMLElement).style.backgroundColor = "#ffffff";
      }
    });
  };

  const exportPDF = async () => {
    setLoading(true);
    const input = document.getElementById("cv-preview-container");
    if (!input) {
      setLoading(false);
      return;
    }

    await prepareForCapture(input);

    const canvas = await html2canvas(input, {
      backgroundColor: "#ffffff",
      useCORS: true,
      scale: 2,
    } as any);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("cv.pdf");
    setLoading(false);
  };

  return (
    <button
      onClick={exportPDF}
      disabled={loading}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Export en cours..." : "Exporter en PDF"}
    </button>
  );
}
