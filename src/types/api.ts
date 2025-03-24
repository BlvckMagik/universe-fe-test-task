export interface CreatePDFRequest {
  text: string;
}

export interface CreatePDFResponse {
  data: Blob;
}

export interface APIError {
  message: string;
  status: number;
}
