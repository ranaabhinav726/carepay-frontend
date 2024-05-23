import React, { useRef, useState, useEffect } from 'react';
import { Header } from "../../comps/Header";
import { useCallback } from "react";
import WebcamCapture from "../../comps/WebCam";
import { useNavigate } from "react-router-dom";
import { uploadDoc } from "../../servicesAndUtility/api";
import jsPDF from "jspdf";
import { MdCloudUpload } from 'react-icons/md';
import axios from 'axios';
import { env } from '../../../../environment/environment';
import routes from '../../../../../layout/Routes';
import loaderAnimData from '../../assets/loader simple.json'
import lottie from "lottie-web";
import Loader from '../../../../../utils/loader/Loading 3.gif'
import Loadinggif from '../../../../../utils/loader/loadergif';
export default function ArthAadhaarPhoto() {
    let userId = localStorage.getItem("userId");
    let navigate = useNavigate();
    const webcamRef = useRef(null);
    const [imgSrcFront, setImgSrcFront] = useState(null);
    const [imgSrcBack, setImgSrcBack] = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [imageset, setImage] = useState('1');
    const [img1, setimg1] = useState("");
    const [img2, setimg2] = useState("");
    const [img1Type, setImage1Type] = useState("");
    const [img2Type, setImage2Type] = useState("");
    const [upload1, setUpload1] = useState(false);
    const [upload2, setUpload2] = useState(false);
    const [loaderState, setLoader] = useState(false);

    useEffect(() => {
        // Reset image sources when imageset changes
      
        setImgSrcFront(null);
        setImgSrcBack(null);
        setPdfPreview(null);
    }, [imageset]);

    const captureFront = useCallback(() => {
        if (webcamRef.current) {
            setImage('2');
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrcFront(imageSrc);
        }
    }, [webcamRef]);

    const captureBack = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrcBack(imageSrc);
        }
    }, [webcamRef]);

    const uploadAadhaar = () => {
        mergeImagesToPDF();
    };

    const mergeImagesToPDF = () => {
        // Create a new PDF document
        const doc = new jsPDF();

        // Define the dimensions and positions for images in PDF
        const startX = 10;
        const startY = 10;
        const imageWidth = 100; // Adjust width as needed
        const imageHeight = 100; // Adjust height as needed
        const margin = 10;

        // Add first image to PDF
        if (imgSrcFront) {
            doc.addImage(imgSrcFront, 'JPEG', startX, startY, imageWidth, imageHeight);
        }

        // Calculate next image position
        const nextImageX = startX;
        const nextImageY = startY + imageHeight + margin;

        // Add second image to PDF
        if (imgSrcBack) {
            doc.addImage(imgSrcBack, 'JPEG', nextImageX, nextImageY, imageWidth, imageHeight);
        }

        // Get the PDF data as a data URI string
        let pdfData = doc.output('datauristring');

        // Remove filename=generated.pdf from the data URI string
        pdfData = pdfData.replace("filename=generated.pdf;", "");
        console.log(pdfData)
        // Set the PDF preview
        setPdfPreview(pdfData);


    };
    const imageHanlder = (event, type) => {
        if (type === 'front') {
            let file = event.target.files[0];
            // console.log(event.target.files[0])
            if (file) {
                if (file.type == "application/pdf") {
                    setImage1Type('pdf')
                } else {
                    setImage1Type('img')

                }
                if (!(file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) {

                    let elem = document.getElementsByClassName('fileTypeError')[0];
                    elem.style.display = "block";
                    setTimeout(() => {
                        elem.style.display = "none";
                    }, 3000)
                    return;
                }
            }
            setimg1(file);
            console.log(file)
        }
        if (type === 'back') {
            let file = event.target.files[0];
            // console.log(event.target.files[0])
            if (file) {
                if (file.type == "application/pdf") {
                    setImage2Type('pdf')
                } else {
                    setImage2Type('img')

                }
                if (!(file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) {

                    let elem = document.getElementsByClassName('fileTypeError')[1];
                    elem.style.display = "block";
                    setTimeout(() => {
                        elem.style.display = "none";
                    }, 3000)
                    return;
                }
            }
            setimg2(file);
            console.log(file)
        }
    }
    const submitimages = () => {
        let imageFormData = new FormData()
        imageFormData.append('file', img1)
        imageFormData.append('userId', userId)
        imageFormData.append("type", "pdf");
        imageFormData.append("fileName", 'adharCard');
        uploadDoc(imageFormData, callback => {
            console.log(callback)
        })
        let formData = new FormData()
        formData.append('file', img2)
        formData.append('userId', userId)
        formData.append("type", "pdf");
        formData.append("fileName", 'adharCardBack');
        uploadDoc(formData, callback => {
            console.log(callback)
        })
    }
    function savefiles() {
     
      
        if (img1Type !== '' && img2Type !== '') {
            setLoader(true)
            let data = new FormData();
            data.append("uploadfile", img1);
            data.append("userId", userId);
            data.append("type", img1Type);
            data.append("fileName", "adharCard");
            axios.post(env.api_Url + "uploadpdf", data)
                .then(res => {
                    if (res.status === 200) {

                        axios.post(env.api_Url + "loanDocumentApi?userId=" + userId + '&documentName=' + 'aadhar_card' + '&url=' + res.data)
                            .then(res => {
                                if (res.status === 200) {

                                    if (res.data.message === 'success') {
                                        setUpload1(true)
                                        chheckUpload(true, false)
                                        setLoader(false)

                                    } else {
                                        setLoader(false)
                                        alert('Upload Again')
                                    }
                                }
                            }).catch(e => console.warn(e));

                    }
                }).catch(e => console.warn(e));

            let data2 = new FormData();
            data2.append("uploadfile", img2);
            data2.append("userId", userId);
            data2.append("type", img2Type);
            data2.append("fileName", "adharCardBack");

            axios.post(env.api_Url + "uploadpdf", data2)
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                        axios.post(env.api_Url + "loanDocumentApi?userId=" + userId + '&documentName=' + 'aadhaar_card_back' + '&url=' + res.data)
                            .then(res => {
                                if (res.status === 200) {
                                    if (res.data.message === 'success') {
                                        // setUpload2(true)
                                        chheckUpload(true, true)
                                        setLoader(false)
                                    }else {
                                        setLoader(false)
                                        alert('Upload Again')
                                    }
                                }
                            }).catch(e => console.warn(e));
                    }
                }).catch(e => console.warn(e));
            console.log(upload1, upload2)

        } else {
            alert('upload agian !')
        }

    }
    const chheckUpload = (image1, image2) => {
        if (image1 && image2) {
            navigate(routes.ARTH_PAN_PHOTO)
        }

    }
    return (
        <main id='uploadDocuments'>
            <Header />
            {loaderState ?
                <>
                   <Loadinggif/>
                </>
                : ""}

            {loaderState === false ? <>
                <h3 style={{ margin: "1.5rem 0" }}>Aadhaar card photo</h3>
                <p>Please upload an image/PDF of your Aadhaar
                    card’s front and back.</p>
                <div className="inputGroup">
                    <p className='group-title'>Aadhaar card front</p>
                    <label className={(img1) ? "uploaded" : ""} htmlFor="front">
                        {img1 == "" && <MdCloudUpload className="upload-icon" />}
                        {img1 == "" && "Click to " + (Boolean(img1) ? "re-" : "") + "upload aadhaar front"}
                        {img1 && img1.name}
                        <input id="front" type="file" onChange={(e) => imageHanlder(e, 'front')} />
                    </label>
                    <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
                </div>
                <div className="inputGroup">
                    <p className='group-title'>Aadhaar card Back</p>
                    <label className={(img2) ? "uploaded" : ""} htmlFor="back">
                        {img2 == "" && <MdCloudUpload className="upload-icon" />}
                        {img2 == "" && "Click to " + (Boolean(img2) ? "re-" : "") + "upload aadhaar back"}
                        {img2 && img2.name}
                        <input id="back" type="file" onChange={(e) => imageHanlder(e, 'back')} />
                    </label>
                    <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
                </div>
                <div className=''>
                    <button disabled={!img1 || !img2 ? true : false} className={img1 && img2 ? "carepay-button-purple" : 'carepay-button-purple-disable'} onClick={() => savefiles()}>Submit</button>
                </div>
            </>
                : ""}
            {/* {imageset === '1' && (
                <>
                    <p style={{ color: "#514C9F", fontWeight: "700", opacity: "0.6", textAlign: "center", margin: "2rem 0", fontSize: "18px" }}>Front side of Aadhaar</p>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {imgSrcFront === null ? (
                            <WebcamCapture ref={webcamRef} width={370} height={250} />
                        ) : (
                            <img src={imgSrcFront} alt="Front side of Aadhaar" />
                        )}
                    </div>
                </>
            )}
            {imageset === '2' && (
                <>
                    <p style={{ color: "#514C9F", fontWeight: "700", opacity: "0.6", textAlign: "center", margin: "2rem 0", fontSize: "18px" }}>Back side of Aadhaar</p>
                    <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {imgSrcBack === null ? (
                            <WebcamCapture ref={webcamRef} width={370} height={250} />
                        ) : (
                            <img src={imgSrcBack} alt="Back side of Aadhaar" />
                        )}
                    </div>
                </>
            )}
          
            <button className="capture-btn" onClick={captureFront}>Capture Front</button>
            <button className="capture-btn" onClick={captureBack}>Capture Back</button>
            <button className="submit" onClick={uploadAadhaar}>Upload</button> */}
        </main>
    );
}
