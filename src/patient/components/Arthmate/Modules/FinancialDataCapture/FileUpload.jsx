import { Header } from '../../comps/Header'
import './styles/fileUpload.scss'

import PDFIcon from '../../assets/PDFIcon.png'

import { AiFillCheckCircle, AiFillEye, AiFillEyeInvisible, AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'

import { FaPlus, FaArrowUp } from 'react-icons/fa'

import axios from "axios";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../../environment/environment"

import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import lottie from "lottie-web";
import animationData from '../../../../assets/GIFs/Comp 1.json'
import Redirecting from '../../assets/Redirecting.gif'

const ArthFileUpload = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    let isReVisitToUploadStatement = location?.state?.reVisitToUploadStatement;
    // console.log(isReVisitToUploadStatement)
    
    // let token = localStorage.getItem('access_token');
    const fileConfig = {
        headers: {"Content-Type": "multipart/form-data"}
    };
    // const config = {
    //     headers: { Authorization: `Bearer ${token}`}
    // };

    const [fileCount, setFileCount] = useState(0);
    const [files, setFiles] = useState([]);
    
    const [prevFiles, setPrevFiles] = useState([]);

    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [showPopOver, setShowPopOver] = useState(false);

    const [screenState, setScreenState] = useState("redirecting"); // notUploaded, uploaded, redirecting

    let userId = localStorage.getItem("userId");

    let ref = useRef(0);
    useEffect(()=>{
        ref.current = document.getElementById('animation-wrapper');

        async function makeApiCall(){
            await axios.get(env.api_Url + "/getDocumentsByUserId?userId=" + userId)
            .then(response =>{
                if(response.data.status === 200){
                    console.log(response)
                    let uploadedFiles = response?.data?.data?.multipleBankStatements?.split(',');
                    console.log(uploadedFiles)
                    setPrevFiles(uploadedFiles);
                }
            })
        }
        makeApiCall();
    },[])

    useEffect(() => {
        lottie.loadAnimation({
          container: document.querySelector("#searchAnimation"),
          animationData: animationData,
          renderer: "canvas"
        });

        // return ()=>{
        //     clearTimeout(timerId)
        // }
        
    }, []);

    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

    const today = new Date();

    let year = today.getFullYear();
    year =  year % 100; // to remove century, "2023" will remain "23"

    let curr_month = today.getMonth();
    let last_month = curr_month - 1;
    last_month = fixMonth(last_month);
    let third_last_month = last_month - 2;
    third_last_month = fixMonth(third_last_month);

    function fixMonth(month){
        if(month < 0){
            month = 12+month;
        }
        return month;
    }

    // PDFs need to uploaded of below months
    let from_month = months[third_last_month];
    let to_month = months[last_month];

    let fileList = [];
    for(let i=0; i<files.length; i++){
        fileList.push(<File fileName={files[i].name} files={files} setFiles={setFiles} fileCount={fileCount} setFileCount={setFileCount} key={i} />);
    }

    let fileIconList = [];
    for(let i=0; i<fileCount; i++){
        fileIconList.push(<FileIcon key={i} />);
    }

    let prevFilesList = [];
    for(let i=1; i<=prevFiles.length; i++){
        prevFilesList.push(<PrevFile link={prevFiles[i-1]} count={i} key={i} />)
    }

    function handleEyeClick(){
        let inputBox = document.getElementById('password');
        let type = inputBox.type;
        if(type == 'password'){
            inputBox.type = 'text';
        }else{
            inputBox.type = 'password';
        }
        setShowPass(!showPass) 
    }

    function invokeFileHandler(){
        document.getElementById('filePicker')?.click();
    }

    function passwordHandler(e){
        // let elem2 = document.getElementById('passError');
        // if(elem2) elem2.style.display = "none";

        setPassword(e.target.value);
    }

    function uploadHandler(event){
        let file = event.target.files[0];
        // console.log(event.target.files)
        if(file.type !== "application/pdf"){
            document.getElementById('errorMsg').style.visibility = "visible";
            setTimeout(()=>{
                document.getElementById('errorMsg').style.visibility = "hidden";
            }, 3500)
            return;
        }
        setFiles(files => [...files, file])
        setFileCount(fileCount => fileCount+1)
    }

    // let [objectState, setObjectState] = useState({});
    // let [fileURLs, setFileURLs] = useState([]);
    // let submitObj = {
    //     file_path: [...fileURLs],
    //     password: password
    // };
    

    async function checkAssignedNbfcAndNavigate(){
        //call initateFlow -> customer , if success, below code else same screen...
        // axios
        //     .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=customer", {},)
        //     .then(response =>{
        //         console.log(response)
                // if(response.data.message === "success"){

        if(isReVisitToUploadStatement === true){
            showWrapper(ref.current)
            await axios.post(env.api_Url + "uploadDocumentsDetailCF?userId=" + userId)
            .then(res=>{
                if(res.data.message === "success"){
                    hideWrapper(ref.current)
                    navigate("/patient/WaitingForApproval");
                }
            }).catch(err=>{
                hideWrapper(ref.current)
                console.log(err)
            })
        }else{
            navigate("/patient/CreditFairOffers");
        }
        
        // axios
        //     .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
        //     .then((response) => {
        //         if(response.data.message === "success"){
        //             let nbfc = response?.data?.data?.nbfcAssigned;
                    
        //         }
        //     }).catch(error => {
        //         console.log(error);
        //         // navigate(-1)
        //     });
        // }
        // }).catch(error =>{
        //     console.log(error)
        //     // navigate(-1);
        // })
    }

    async function uploadFiles(){
        // console.log(files[0])

        if(prevFiles.length > 0 && files.length === 0){
            // navigate('/patient/KycVerification');
            setShowPopOver(true);
            return;
        }
        if(!password){
            let elem = document.getElementById('password');
            let elem2 = document.getElementById('passError');

            elem.classList.add('errorAnimate');
            elem.classList.add('inputBoxError');
            if(elem2) elem2.style.display = "block";

            setTimeout(()=>{
                elem.classList.remove('errorAnimate');
                elem.classList.remove('inputBoxError');
            },500)
            // navigator.vibrate(
            //     [150, 30, 150, 30]
            // );
            return;
        }

        if(! canSubmit){
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)


        let data = new FormData()
        for(let i=0; i<files.length; i++){
            data.append("uploadfile", files[i]);
        }
        data.append("fileName", "multipleBankStatement");
        data.append("userId", userId);
        data.append("password", password);

        await axios.post(env.api_Url + "uploadMultipleBankStatements", data, fileConfig )
            .then((response) => {
                console.log(response)
                if(response.data.message === "success"){
                    // navigate('/patient/KycVerification');
                    setShowPopOver(true);
                }else{
                    apiErrorHandler();
                }
            }).catch(error => {
                apiErrorHandler();
                console.log(error);
            });
            
            setCanSubmit(true);
            hideWrapper(ref.current)
        // let canUploadLink = true;

        // for(let i=0; i<files.length; i++){
        //     const data = new FormData()
        //     data.append('filename', files[i])
        //     data.append('count', i+1)
        //     // console.log(data);

        //     await axios.post(env.api_Url + "upload_bank_statement",
        //     data,
        //     fileConfig )
        //     .then((response) => {
        //         // console.log(response)
        //         let path = "" + response.data.path;
        //         setFileURLs(fileURLs => [...fileURLs, path])
        //     }).catch(error => {
        //         canUploadLink = false;
        //         apiErrorHandler();
        //         setCanSubmit(true);
        //         hideWrapper(ref.current)
        //         console.log(error);
        //     });
        // }

        // if(!canUploadLink){
        //     console.log("file upload error")
        //     return;
        // }

        // console.log(fileURLs)
        // submitObj.password = password;
        // setObjectState(submitObj)
        // setCanSubmit(true);
        // hideWrapper(ref.current)
    }

    // useEffect(()=>{
    //         // console.log(submitObj)
    //         async function postCall(){
    //             if(fileCount == 0 || fileURLs.length != fileCount) return;
    //             await axios
    //             .post(env.api_Url + "submit_bank_statement",
    //             submitObj,
    //                 config )
    //             .then((response) => {
    //                 // console.log(response)
    //                 let responseCode = response.status+"";
    //                 if(responseCode[0] == '2'){
    //                     navigate('/StatementVerificationUnderProcess')
    //                 }
    //             }).catch(error => {
    //                 apiErrorHandler();
    //                 console.log(error);
    //             });
    //             setCanSubmit(true);
    //             hideWrapper(ref.current)
    //         }
    //         postCall();
    // }, [fileURLs])

    function apiErrorHandler(){
        setApiError(true)
        setTimeout(()=>{
            setApiError(false);
        }, 1500);
    }
    return(
    <>
        <main className='fileUpload' style={{position:"relative"}}>
        
        {screenState === "notUploaded" &&
        <>
        <Header progressbarDisplay="block" progress="91" canGoBack='/patient/IncomeVerification' />
        <h3>Account statement upload</h3>
            
        <div className="msg">Upload Bank Statement for the last 3 months from <span className='date'>{from_month} {year}</span> to <span className='date'>{to_month} {year}</span></div>
        <p id="errorMsg">Only PDFs are allowed to upload</p>

        {fileCount === 0 && 
            <div className="previouslyUploaded">
                <p className='h2'>Previously uploaded files</p>
                {prevFilesList}
            </div>
        }

        {fileCount>0 &&
        <>
            <div className="fileList">
                {fileList}
            </div>

            <div className="uploadedFiles">
                <p>Uploaded PDFs ({fileCount})</p>

                <div className="fileIconList">
                    {fileIconList}
                    {fileCount<3 && 
                        <div onClick={invokeFileHandler} className="uploadPDF">
                            <FaPlus style={{fontSize:"20px", color:"#514C9F"}} />
                            <p>Upload PDF</p>
                        </div>
                    }
                </div>
            </div>

            <div className="pdfPassword">
                <div className="passTitle">
                    <p>PDF Password</p>
                    <div className='pass-tooltip'>
                        <AiFillInfoCircle style={{color:"#908dc1", fontSize:"20px"}} />
                        <span className='tooltiptext'>This is the password to open your bank statement. Typically a combination of your DOB and phone number. You can find it in your bank's monthly statement email to you.</span>
                    </div>
                </div>
                <p className="fileNote"><b>NOTE:</b> Kindly enter correct password in the format provided by your bank (If PDF does not have any password,please type ‘0’ in the box below and submit).</p>
                <input 
                    value={password ?? ""}
                    onChange={(e)=> passwordHandler(e)}
                    type="password" 
                    name="" 
                    placeholder='Enter password here'
                    id="password"
                />
                <div onClick={()=>handleEyeClick()} className="eye">{showPass? <AiFillEyeInvisible/> : <AiFillEye/>}</div>
                {/* <p id="passError">Please enter your file password, if files don't have a password then put "0" in the password box.</p> */}
                
                <span className='safe'>Your data is encrypted and will be safe with us!</span>
            </div>
            <p className={apiError?"apiError": "apiError hide"} style={{marginTop:"10px"}}>An error has occured, please try again.</p>
        </>
        }
        {(fileCount>0 || prevFiles.length>0) &&
            <button onClick={()=>uploadFiles()} className='submit'>Continue</button>
        }
        {fileCount == 0 &&
            <button onClick={()=>invokeFileHandler()} className="uploadAccountStatement">
                <FaArrowUp style={{ color:"#514C9F", fontSize:"20px", marginRight:"10px"}} />
                <span>Upload Account Statement PDF</span>
            </button>
        }

        <input type="file" name="" id="filePicker" accept='.pdf' onChange={(e)=>uploadHandler(e)} />
        {/* <BottomPopOverModal searchAnimation={animationData} showPopOver={showPopOver} setShowPopOver={setShowPopOver} checkAndNavigate={checkAssignedNbfcAndNavigate} /> */}
        </>
        }
        {screenState === "uploaded" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"15%"}} id="searchAnimation"></div>
                <p style={{color:"#514C9F", fontWeight:"bold", fontSize:"18px", textAlign:"center"}}>Account statement collected!</p>
            </>
        }
        {screenState === "redirecting" &&
            <>
                <Header progressBar="hidden" />
                <div style={{marginTop:"15%", display:"flex", justifyContent:"center"}}>
                    <img src={Redirecting} alt="" style={{maxWidth:"60%"}} />
                </div>
                <p style={{fontSize:"16px", textAlign:"center", lineHeight:"150%"}}>Redirecting to partner platform for <br/>income verification...</p>
            </>
        }
        </main>
    </>
    )
}

export default ArthFileUpload

const File = ({fileName, files, setFiles, setFileCount}) =>{

    let name = fileName;
    name = name.split('.')[0];
    if(name.length > 40){
        name = name.slice(0,35).concat("...");
    }
    name = name.concat(".pdf");

    function removeFile(){
        // let newState = files.filter(file=> file.name !== fileName)
        let newState = [];
        let rem = false;
        for(let i=0; i<files.length; i++){
            if(!rem && files[i].name === fileName){
                rem = true;
                continue;
            }
            newState.push(files[i]);
        }
        setFiles(newState)
        setFileCount(newState.length)
        // console.log(files, fileCount)
    }
    
    return(
        <div className='file'>
            <AiFillCheckCircle style={{fontSize:"24px", marginRight:"10px"}} />
            <p>{name}</p>
            <AiOutlineClose className='remove' onClick={()=>removeFile()}/>
        </div>
    )
}

const FileIcon = () =>{
    return(
        <img className='pdfIcon' src={PDFIcon} alt="pdfIcon" />
    )
}

const PrevFile = ({link, count}) =>{
    return(
        <p className='prevFile'>File-{count} <a href={link} target='_blank' className="viewFile">Click to view</a></p>
    )
}
