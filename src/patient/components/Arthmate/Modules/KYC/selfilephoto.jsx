import { useEffect, useRef, useState } from "react";
import { Header } from "../../comps/Header";
import { useCallback } from "react";

import { MdCloudUpload } from "react-icons/md";
import Logo from '../../../../assets/Logo-carepay.svg'
import lottie from "lottie-web";
import doneAnimData from '../../assets/Comp 1.json'
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import axios from "axios";
import { env } from "../../../../environment/environment";
import Loadinggif from "../../../../../utils/loader/loadergif";

export default function ArthSElfie() {
    let userId = localStorage.getItem("userId");

    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null)
    const [selfie, setselfie] = useState('')
    const [successfull, setsuccessfull] = useState('one')
    const [panCard, setpanCard] = useState('')
    const [panCardType, setpanCardType] = useState('')
    const [loaderState, setloaderState] = useState(false)
    const [refreshbuttonDisable,setrefreshbuttonDisable]=useState(false)

    let navigate = useNavigate()

    const capture = useCallback(() => {
        console.log(webcamRef);
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    function reCaptureImage() {
        setImgSrc(null);
    }
    const imageHanlder = (event) => {
        let file = event.target.files[0];
        // console.log(event.target.files[0])
        if (file) {
            if (file.type == "application/pdf") {
                setpanCardType('pdf')
            } else {
                setpanCardType('img')

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
        setpanCard(file)
    }
    function savefiles() {
        console.log(panCardType, 'panCardType')
        if (panCardType !== '') {
            setrefreshbuttonDisable(true)
            setloaderState(true)
            let data = new FormData();
            data.append("uploadfile", panCard);
            data.append("userId", userId);
            data.append("type", panCardType);
            data.append("fileName", "photograph");
            axios.post(env.api_Url + "uploadpdf", data)
                .then(res => {
                    if (res.status === 200) {
                        // navigate(routes.ARTH_KYC_SUCCESS)
                        axios.post(env.api_Url + "loanDocumentApi?userId=" + userId + '&documentName=' + 'selfie' + '&url=' + res.data)
                            .then(res => {
                                if (res.status === 200) {
                                    if (res.data.message === 'success') {
                                        // setUpload2(true)
                                        setrefreshbuttonDisable(false)

                                        setloaderState(false)

                                        navigate(routes.ARTH_KYC_SUCCESS)

                                    }else{
                                        setloaderState(false)

                                    }
                                }
                            }).catch(e => console.warn(e));

                    }else{
                        setloaderState(false)

                    }
                }).catch(e => console.warn(e));
        }
    }
    const submitHandler = () => {
        setsuccessfull('two')
        setTimeout(() => {
            navigate(routes.ARTH_AUTO_REPAYMENT)
        }, 5000);
    }
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#doneAnim"),
            animationData: doneAnimData,
            renderer: "canvas"
        });
    })

    return (
        <main id='uploadDocuments'>
          
            <Header progressBar={successfull === 'two' ? "hidden" : ''} />
            {loaderState ?
                <>
                    <Loadinggif />
                </>
                : ""}
            {successfull === 'one' && loaderState === false ? <>
                <h3 style={{ margin: "1.5rem 0" }}>Selfie upload</h3>
                <p>Upload your selfie.</p>
                <div className="inputGroup">
                    <p className='group-title'>Selfie</p>
                    <label className={(panCard) ? "uploaded" : ""} htmlFor="PAN">
                        {panCard == "" && <MdCloudUpload className="upload-icon" />}
                        {panCard == "" && "Click to " + (Boolean(panCard) ? "re-" : "") + "upload selfie"}
                        {panCard && panCard.name}
                        <input id="PAN" type="file" onChange={(e) => imageHanlder(e)} />
                    </label>
                    <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
                </div>
                <div className=''>
                    <button disabled={refreshbuttonDisable} className={panCard ? "carepay-button-purple" : 'carepay-button-purple-disable'} onClick={() => savefiles()}>Submit</button>
                </div>
            </>
                : ""}

            {successfull === 'two' && loaderState === false ? <>

                <div style={{ marginTop: "12%" }} id="doneAnim"></div>
                <p style={{ color: "#514C9F", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>KYC done successfully!</p>
            </>

                : ""}

        </main>
    )
}