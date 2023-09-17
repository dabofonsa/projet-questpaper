import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




const Viewer = ({ Doc, id }) => {
 
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };


  return (
    <div className="relative flex flex-col items-center p-3  w-full overflow-hidden border-2 bg-gray-100 ">
     <p className="absolute top-0  left-2">{id}</p>
      <a href={Doc}> 
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        className=" h-6 w-6 cursor-pointer hover:cursor-pointer hover:text-green-500 m-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3 }
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
      </a>
      <Document
        className="w-full justify-center p-1 "
        file={Doc}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p className="p-2">
        Page {pageNumber} of {numPages}
      </p>
      <div className="flex w-full items-center justify-evenly relative ">
        <button
          className="flex p-2 bg-gray-700 text-white mx-2  cursor-pointer hover:bg-gray-500"
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </button>

        <button
          className="p-2 bg-gray-700 text-white mx-2 cursor-pointe hover:bg-gray-500"
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Viewer;
