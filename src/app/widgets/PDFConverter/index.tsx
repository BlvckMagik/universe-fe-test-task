"use client";

import {
  Fieldset,
  Legend,
  Field,
  Button,
  Description,
  Textarea,
} from "@headlessui/react";
import { useRef, useState, useEffect } from "react";
import { FormStatus } from "@/types/form";
import { createPDF } from "@/app/actions/create-pdf";

interface PDFConverterProps {
  onPdfGenerated: (blob: Blob | null) => void;
}

const PDFConverter: React.FC<PDFConverterProps> = ({ onPdfGenerated }) => {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorText, setErrorText] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (formStatus === "success") {
      timeoutId = setTimeout(() => {
        setFormStatus("idle");
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 3000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const text = formData.get("description") as string;

    if (!text) {
      setErrorText("Please enter some text");
      setFormStatus("error");
      return;
    }

    try {
      const response = await createPDF(text);

      if ("status" in response) {
        setErrorText(response.message);
        setFormStatus("error");
        return;
      }

      if (!(response.data instanceof Blob)) {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const pdfObjectUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfObjectUrl);
        onPdfGenerated(blob);
      } else {
        const pdfObjectUrl = URL.createObjectURL(response.data);
        setPdfUrl(pdfObjectUrl);
        onPdfGenerated(response.data);
      }

      setFormStatus("success");
    } catch (error) {
      console.error(error);
      setErrorText("Failed to create PDF");
      setFormStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full lg:w-auto xl:min-w-[450px] max-w-[450px]"
      id="applyForm"
    >
      <Fieldset
        form="applyForm"
        className="space-y-6 rounded-xl bg-gray-100 p-6 sm:p-10"
      >
        {formStatus !== "success" ? (
          <>
            <Legend className="text-base/7 text-center mb-2 font-semibold">
              Type anything
            </Legend>

            <Field>
              <Description className="max-w-96 text-center text-sm/6">
                Really, feel free to type anything ↯
              </Description>
              <Textarea
                id="description"
                name="description"
                className="mt-3 block w-full resize-none rounded-lg border-none bg-white px-3 py-1.5 text-sm/6 focus:outline-none"
                rows={3}
              />
            </Field>
            <Button
              type="submit"
              className="mx-auto block items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white"
            >
              {formStatus === "sending" ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline h-8 w-8 animate-spin fill-gray-600 text-gray-200"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Convert to PDF"
              )}
            </Button>
            {formStatus === "error" && (
              <p className="mt-4 text-center text-red-500">{errorText}</p>
            )}
          </>
        ) : (
          <div className="flex max-w-96 flex-col items-center gap-2 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>PDF successfully created!</p>
            {pdfUrl && (
              <a
                href={pdfUrl}
                download="converted.pdf"
                className="mt-2 text-blue-500 hover:text-blue-700 underline"
              >
                Download PDF
              </a>
            )}
          </div>
        )}
      </Fieldset>
    </form>
  );
};

export default PDFConverter;
