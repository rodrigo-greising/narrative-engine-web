"use client"
import React, { useEffect, useState } from 'react';
import NavMenu from "@/components/NavMenu";
import Chat from "@/components/chat";
import { getPDFS3Url } from "@/lib/s3";
import PDFViewer from '@/components/PDFViewer';

function SourcebookView({ params }) {
    const { bookhash } = params;
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        const fetchPDF = async () => {
            const url = getPDFS3Url(bookhash);
            const response = await fetch(url);
            const blob = await response.blob();
            const objectURL = URL.createObjectURL(blob);
            setPdfUrl(objectURL);
        };

        fetchPDF();
        // Clean up the object URL on component unmount
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [bookhash]);
    

    return (
        <div className='h-screen'>
            <NavMenu />
            {pdfUrl && <iframe src={pdfUrl} className='w-full h-full'></iframe>}
            <Chat />
        </div>
    );
}

export default SourcebookView;
