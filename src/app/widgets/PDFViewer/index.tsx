"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { SpecialZoomLevel } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PDFViewersProps {
  pdfUrl?: string | null;
}

const PDFViewers: React.FC<PDFViewersProps> = ({ pdfUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => defaultTabs,
  });

  return (
    <div className="lg:max-w-[800px] min-w-[300px] w-full lg:w-auto lg:max-h-[700px] lg:grow aspect-[0.83] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      <Worker workerUrl="/pdf.worker.min.js">
        <Viewer
          fileUrl={pdfUrl || "/dummy.pdf"}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
          theme={{
            theme: "light",
          }}
        />
      </Worker>
    </div>
  );
};

export default PDFViewers;
