"use server";

import { axiosInstance } from "@/lib/axios";
import { CreatePDFRequest, CreatePDFResponse, APIError } from "@/types/api";

export async function createPDF(
  text: string
): Promise<CreatePDFResponse | APIError> {
  try {
    const response = await axiosInstance.post(
      `/create-pdf?apiKey=${process.env.API_KEY}`,
      { text } as CreatePDFRequest,
      {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/pdf",
          "Content-Type": "application/json",
        },
      }
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    return { data: blob } as CreatePDFResponse;
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create PDF",
      status: 500,
    } as APIError;
  }
}
