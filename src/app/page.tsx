"use client";

import { useState } from "react";
import PDFViewer from "./widgets/PDFViewer";
import PDFConverter from "./widgets/PDFConverter";
import ConversionHistory from "./widgets/ConversionHistory";
import { useConversionHistory } from "@/hooks/useConversionHistory";

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { history, addToHistory, removeFromHistory } = useConversionHistory();

  const handlePdfGenerated = async (blob: Blob | null) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      await addToHistory(blob);
    } else {
      setPdfUrl(null);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col items-center justify-center gap-[8vw] p-8 md:p-14 lg:p-24 lg:flex-row">
      <div className="flex flex-col gap-8">
        <PDFConverter onPdfGenerated={handlePdfGenerated} />
        <ConversionHistory
          history={history}
          onItemClick={setPdfUrl}
          onItemRemove={removeFromHistory}
        />
      </div>
      <PDFViewer pdfUrl={pdfUrl} />
    </section>
  );
}
