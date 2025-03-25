import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PDFConverter from "../index";
import { createPDF } from "@/app/actions/create-pdf";

jest.mock("@/app/actions/create-pdf");

describe("PDFConverter", () => {
  const mockOnPdfGenerated = jest.fn();
  const mockCreatePDFFn = jest.mocked(createPDF);

  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => "mock-url");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("має показувати повідомлення про помилку при невдалій конвертації", async () => {
    const mockError = {
      message: "Failed to create PDF",
      status: 500,
    };
    mockCreatePDFFn.mockResolvedValueOnce(mockError);

    render(<PDFConverter onPdfGenerated={mockOnPdfGenerated} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test text" } });

    const submitButton = screen.getByRole("button", {
      name: /convert to pdf/i,
    });
    fireEvent.click(submitButton);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/failed to create pdf/i)).toBeInTheDocument();
    });

    expect(mockCreatePDFFn).toHaveBeenCalledWith("Test text");
    expect(mockOnPdfGenerated).not.toHaveBeenCalled();
  });
});
