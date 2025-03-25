import { HistoryItem } from "@/types/history";

interface ConversionHistoryProps {
  history: HistoryItem[];
  onItemClick: (pdfUrl: string) => void;
  onItemRemove: (id: string) => void;
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({
  history,
  onItemClick,
  onItemRemove,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[450px] max-h-[300px] overflow-y-auto rounded-xl bg-gray-100 p-6">
      <h2 className="mb-4 text-lg font-semibold">Conversion History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-lg bg-white p-3"
          >
            <button
              onClick={() => onItemClick(item.pdfUrl)}
              className="flex-1 text-left hover:text-blue-600"
            >
              <p className="font-medium">{item.fileName}</p>
              <p className="text-sm text-gray-500">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </button>
            <button
              onClick={() => onItemRemove(item.id)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversionHistory;
