import Header from "../Header/Header"
import './uploadDocuments.scss'

import { MdCloudUpload } from 'react-icons/md'
import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../environment"

const UploadDocuments = () =>{

    const navigate = useNavigate()
    const fileConfig = {
        headers: { "Content-Type": "multipart/form-data" }
    };

    let doctorId = localStorage.getItem('doctorId');

    const [panCard, setPanCard] = useState("");
    const [GSTIN, setGSTIN] = useState("");
    const [misc, setMisc] = useState("");

    const [accepted, setAccept] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [panCardUrl, setPanCardUrl] = useState("");
    const [GSTINUrl, setGSTINUrl] = useState("");
    const [miscUrl, setMiscUrl] = useState("");

    // const [panCardUploaded, setPanCardUploaded] = useState(false);
    let panCardUploaded = false;
    // const [GSTINUploaded, setGSTINUploaded] = useState(false);
    let GSTINUploaded = false;
    // const [miscUploaded, setMiscUploaded] = useState(false);
    let miscUploaded = false;

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');
    },[])

    useEffect(()=>{
        async function getCall(){
            showWrapper(ref.current);
            axios.get(env.api_Url+"getDocumentsByDoctorId?doctorId=" + doctorId)
            .then(response =>{
                console.log(response)
                if(response.data.status == "200"){
                    // console.log(response?.data?.data?.panCardUrl)
                    setPanCardUrl(response?.data?.data?.panCardUrl)
                    setGSTINUrl(response?.data?.data?.gstUrl)
                    setMiscUrl(response?.data?.data?.otherDocUrl)
                }
            }).catch(error =>{
                console.log(error)
            })
            hideWrapper(ref.current)
        }
        getCall();
    }, [])


    function panUploadHandler(event){
        let file = event.target.files[0];
        // console.log(event.target.files[0])
        if(!(file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")){
            let elem = document.getElementsByClassName('fileTypeError')[0];
            elem.style.display = "block";
            setTimeout(()=>{
                elem.style.display = "none";
            }, 3000)
            return;
        }
        setPanCard(file);
    }
    function GSTINUploadHandler(event){
        let file = event.target.files[0];
        if(!(file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")){
            let elem = document.getElementsByClassName('fileTypeError')[1];
            elem.style.display = "block";
            setTimeout(()=>{
                elem.style.display = "none";
            }, 3000)
            return;
        }
        setGSTIN(file);
    }
    function miscUploadHandler(event){
        let file = event.target.files[0];
        if(!(file.type === "application/pdf" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")){
            let elem = document.getElementsByClassName('fileTypeError')[2];
            elem.style.display = "block";
            setTimeout(()=>{
                elem.style.display = "none";
            }, 3000)
            return;
        }
        setMisc(file);
    }

    // function showErrorOnUI(elem){
    //     elem.scrollIntoView({ behavior: "smooth", block: "center"});
    //     elem.classList.add('inputBoxError');
    //     navigator.vibrate(
    //         [100, 30, 100, 30]
    //     );

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    async function onSubmit(){

        // if(! (panCard || panCardUrl)){
        //     let elem = document.getElementById('pan').parentElement;
        //     // console.log(elem)
        //     if(elem) showErrorOnUI(elem, false);
        //     return;
        // }
        // if(! GSTIN){
        //     let elem = document.getElementById('GSTIN').parentElement;
        //     console.log(elem)
        //     if(elem) showErrorOnUI(elem);
        //     return;
        // }


        if(! accepted){
            let elem = document.getElementById('terms');
            // let elem = document.getElementsByClassName('termsAndConditions')[0];
            let elem2 = document.getElementsByClassName('termsAndCond')[0];
            elem.style.color = "red";
            elem2.style.color = "red";
            elem.classList.add('errorAnimate');

            // navigator.vibrate(
            //     [100, 30, 100, 30]
            // );

            setTimeout(()=>{
                elem.classList.remove('errorAnimate');
                elem.style.color = "black";
                elem2.style.color = "black";
            },400)
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)

        let data = new FormData()
        if(panCard){
            data.append('fileName', "panCard"); //gst, other
            data.append('uploadfile', panCard);
            let type = panCard.type.split('/');
            if(type[1] == "pdf"){
                data.append('type', "pdf")
            }else if(type[0] == "image"){
                data.append('type', "img")
            }
            data.append('userId', doctorId)
            // console.log(data)
    
            await axios.post(env.api_Url+"uploadpdf", data, fileConfig)
            .then(response =>{
                if(response?.data?.errorCode){
                    console.log(response?.data?.errorCode)
                    apiErrorHandler();
                    return;
                }
                console.log(response);
                // setPanCardUploaded(true);
                panCardUploaded = true;
            }).catch(error =>{
                console.log(error);
            })
        }

        if(GSTIN){
            data = new FormData()
            data.append('fileName', "gst"); //gst, other
            data.append('uploadfile', GSTIN);
            let type = GSTIN.type.split('/');
            if(type[1] == "pdf"){
                data.append('type', "pdf")
            }else if(type[0] == "image"){
                data.append('type', "img")
            }
            data.append('userId', doctorId)
            // console.log(data)

            await axios.post(env.api_Url+"uploadpdf", data, fileConfig)
            .then(response =>{
                if(response?.data?.errorCode){
                    console.log(response?.data?.errorCode)
                    return;
                }
                console.log(response);
                // setGSTINUploaded(true);
                GSTINUploaded = true;
            }).catch(error =>{
                console.log(error);
            })
        }

        if(misc){
            data = new FormData()
            data.append('fileName', "other"); //gst, other
            data.append('uploadfile', misc);
            let type = misc.type.split('/');
            if(type[1] == "pdf"){
                data.append('type', "pdf")
            }else if(type[0] == "image"){
                data.append('type', "img")
            }
            data.append('userId', doctorId)
            // console.log(data)

            await axios.post(env.api_Url+"uploadpdf", data, fileConfig)
            .then(response =>{
                if(response?.data?.errorCode){
                    console.log(response?.data?.errorCode)
                    return;
                }else{
                    // setMiscUploaded(true);
                    miscUploaded = true;
                }
                console.log(response);
            }).catch(error =>{
                console.log(error);
            })
        }
        // console.log(Boolean(panCard) == panCardUploaded, panCard, panCardUploaded);
        setTimeout(() => {
            console.log((Boolean(panCard) == panCardUploaded) , (Boolean(GSTIN) == GSTINUploaded) , (Boolean(misc) == miscUploaded) )
            if((Boolean(panCard) == panCardUploaded) && (Boolean(GSTIN) == GSTINUploaded) && (Boolean(misc) == miscUploaded) ){
                navigate('/doctor/ThankYou')
            }else{
                // error
                apiErrorHandler();
            }
            setCanSubmit(true);
        }, 1000);

        setCanSubmit(true);
        hideWrapper(ref.current);
    }

    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }
    return(
        <>
        <main id="uploadDocuments">
        <Header progressbarDisplay="block" progress={95} canGoBack />
            <p className="heading">Upload documents</p>

            <div className="inputGroup">
                <p className='group-title'>Pan card {panCardUrl && <a href={panCardUrl} target="_blank" className="uploaded">View document</a>}</p>
                <label className={(panCardUrl || panCard)?"uploaded":""} htmlFor="pan">
                    {panCard == "" && <MdCloudUpload className="upload-icon" />}
                    {panCard == "" && "Click to " + (Boolean(panCardUrl)?"re-":"") + "upload PAN"}
                    {panCard && panCard.name}
                    <input id="pan" type="file" onChange={(e)=>panUploadHandler(e)} />
                </label>
                <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
            </div>

            <div className="inputGroup">
                <p className='group-title'>GSTIN {GSTINUrl && <a href={GSTINUrl} target="_blank" className="uploaded">View document</a>}</p>
                <label className={(GSTINUrl || GSTIN)?"uploaded":""} htmlFor="GSTIN">
                    {GSTIN == "" && <MdCloudUpload className="upload-icon" />}
                    {GSTIN == "" && "Click to " + (Boolean(GSTINUrl)?"re-":"") +"upload GSTIN"}
                    {GSTIN && GSTIN.name}
                    {/* <MdCloudUpload className="upload-icon" />Click to upload document */}
                    <input id="GSTIN" type="file" onChange={(e)=>GSTINUploadHandler(e)} />
                </label>
                <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
            </div>

            <div className="inputGroup">
                <p className='group-title'>Cancelled cheque {miscUrl && <a href={miscUrl} target="_blank" className="uploaded">View document</a>}</p>
                <label className={(miscUrl || misc)?"uploaded":""} htmlFor="other">
                    {misc == "" && <MdCloudUpload className="upload-icon" />}
                    {misc == "" && "Click to " + (Boolean(miscUrl)?"re-":"") + "upload document"}
                    {misc && misc.name}
                    {/* <MdCloudUpload className="upload-icon" />Click to upload document */}
                    <input id="other" type="file" onChange={(e)=>miscUploadHandler(e)} />
                </label>
                <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
            </div>

            <div className="termsAndConditions">
                <input type="checkbox" checked={accepted} onChange={e => setAccept(e.target.checked)} />
                <p id="terms">I accept the <a href="" className="termsAndCond">Terms & Conditions</a></p>
            </div>

            <p className={apiError?"apiError": "apiError hide"}>An error has occured, please try again.</p>
            <button onClick={()=>onSubmit()} className="submit">Submit</button>
        </main>
        </>
    )
}

export default UploadDocuments