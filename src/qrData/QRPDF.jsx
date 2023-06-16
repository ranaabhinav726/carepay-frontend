import './qrData.scss'
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";

import QrTemplate from "./QrTemplate";
import axios from "axios";
import Header from "../patient/components/Header/Header";

import FramedQR from './assets/frame.jpeg'
import BlurQR from './assets/qrBlur.jpeg'
import { useParams } from 'react-router-dom';


// let doctorId = "v7GvsC9EUtBHEE39cDkXj7r7eI0YokGU";

const QrPdfMaker = () =>{

    const params = useParams();
    const docId = params.doctorId;
    
    const [doctorId, setDoctorId] = useState(docId);
    const [doctorName, setDoctorName] = useState("Loading...");
    const [clinicName, setClinicName] = useState('Loading...');
    const [qrUrl, setQrUrl] = useState('');
    

    const reportTemplateRef = useRef(null);

    const handleGeneratePdf = () => {
            const doc = new jsPDF({
            format: "a4",
            unit: "px"
        });

        // Adding the fonts
        doc.setFont("DM Sans", "sans-serif");
        // doc.setFont("Inter-Regular", "normal");

        doc.html(reportTemplateRef.current, {
            async callback(doc) {
                await doc.save("document");
            },
            margin:[25, 0, 0, 24],
            // margin:[-150, 0 , 0, -85] //a6
        });
    };

    function downloadQR(){
        fetch(qrUrl)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = 'My-QR.png';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert('oh no!'));
    }

    useEffect(()=>{
        axios.get(process.env.REACT_APP_BACKEND + "getDoctorDetailByDoctorId?doctorId=" + doctorId)
            .then(response =>{
                if(response.data.status === 200){
                    // console.log(response)
                    setClinicName(response.data.data.clinic);
                    setQrUrl(response.data.data.qr_url);
                    setDoctorName(response.data.data.name);
                }else if(response.data.status === 500){
                    //error doctoId is wrong
                }
            }).catch(error =>{
                console.log(error)
            })
    }, [doctorId])

    return(
        <main className="qrDataPage">
            <Header progressbarDisplay="none" />

            <div className="doctorDetails">
                <div className="doctorDetailDiv">
                    <span className='title'>Doctor name : </span>
                    <span>{doctorName}</span>
                </div>
                <div className="doctorDetailDiv">
                    <span className='title'>Clinic name : </span>
                    <span>{clinicName}</span>
                </div>
            </div>

            <div className="qrDownloadOptions">
                <div className="downloadOption">
                    <div className="imgContainer"><img src={FramedQR} alt="" /></div>
                    <p>QR with frame</p>
                    <button onClick={()=>handleGeneratePdf()}>Download</button>
                </div>
                <div className="downloadOption">
                    <div className="imgContainer"><img src={BlurQR} alt="" /></div>
                    <p>QR without frame</p>
                    <button onClick={()=>downloadQR()}>Download</button>
                </div>
            </div>

            {/* <button className="button" onClick={handleGeneratePdf}>
                Generate PDF
            </button> */}
            <div style={{padding:"2rem", display:"none"}}>
                <QrTemplate clinicName={clinicName} qrUrl={qrUrl} ref={reportTemplateRef} />
            </div>
        </main>
    )
}

export default QrPdfMaker