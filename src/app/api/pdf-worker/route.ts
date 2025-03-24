import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const workerPath = path.join(
    process.cwd(),
    "node_modules",
    "pdfjs-dist",
    "build",
    "pdf.worker.min.js"
  );
  const workerContent = fs.readFileSync(workerPath, "utf8");

  return new NextResponse(workerContent, {
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
