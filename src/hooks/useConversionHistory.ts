import { useState, useEffect } from "react";
import { HistoryItem } from "@/types/history";

const DB_NAME = "pdf_conversion_db";
const STORE_NAME = "conversion_history";
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

export function useConversionHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadHistory();
    return () => {
      history.forEach((item) => {
        if (item.pdfUrl) {
          URL.revokeObjectURL(item.pdfUrl);
        }
      });
    };
  }, []);

  const loadHistory = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const items = request.result;
        const restoredHistory = items.map(
          (item: HistoryItem & { pdfBlob: Blob }) => ({
            ...item,
            pdfUrl: URL.createObjectURL(item.pdfBlob),
          })
        );
        setHistory(restoredHistory);
      };
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const addToHistory = async (blob: Blob) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const newItem = {
        id: crypto.randomUUID(),
        fileName: `Document_${new Date().toLocaleDateString()}`,
        pdfBlob: blob,
        createdAt: new Date().toISOString(),
      };

      const request = store.add(newItem);

      request.onsuccess = () => {
        const itemWithUrl = {
          ...newItem,
          pdfUrl: URL.createObjectURL(blob),
        };
        setHistory((prev) => [itemWithUrl, ...prev]);
      };
    } catch (error) {
      console.error("Error adding to history:", error);
    }
  };

  const removeFromHistory = async (id: string) => {
    try {
      const itemToRemove = history.find((item) => item.id === id);
      if (itemToRemove?.pdfUrl) {
        URL.revokeObjectURL(itemToRemove.pdfUrl);
      }

      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      await store.delete(id);

      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from history:", error);
    }
  };

  return { history, addToHistory, removeFromHistory };
}
