"use client";

import { useState } from "react";
import PDFViewer from "./widgets/PDFViewer";
import PDFConverter from "./widgets/PDFConverter";

export default function Home() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col items-center justify-center gap-[8vw] p-8 md:p-14 lg:p-24 lg:flex-row">
      <PDFConverter onPdfGenerated={setPdfUrl} />
      <PDFViewer pdfUrl={pdfUrl} />
    </section>
  );
}
