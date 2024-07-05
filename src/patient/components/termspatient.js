import React from 'react';
import PdfFile from './terms.pdf'
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
const TermsAndConditionsPatient = () => {
    return (
        <div className='' style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '20px' }}>
            <div className="terms-and-conditions">
                {/* <iframe src={PdfFile}></iframe> */}
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                           <Viewer fileUrl={PdfFile} />
                        </Worker>
            </div>
        </div>
    );
};

export default TermsAndConditionsPatient;
