# PDF Converter App

Web application for converting text to PDF documents with conversion history storage capability.

## Project Structure

## Core Modules

### PDFConverter

- Text input form component
- Text to PDF conversion handling
- Conversion status and error display

### PDFViewer

- PDF document display
- Zoom and navigation support
- react-pdf-viewer integration

### ConversionHistory

- Converted documents list display
- Document opening and deletion capabilities
- Creation date sorting

### useConversionHistory

- Conversion history management
- Document storage in IndexedDB
- Automatic resource cleanup

## Technologies

- Next.js
- React
- TypeScript
- TailwindCSS
- IndexedDB
- react-pdf-viewer
- Jest for testing

## Features

- Responsive design
- PDF storage in IndexedDB
- Automatic temporary URL cleanup
- Large document support
- Full-featured PDF viewer with additional functions

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
