import { useEffect, useRef, useState, useCallback } from "react";
import { Header } from "../../comps/Header";
import { MdCloudUpload } from "react-icons/md";
import Webcam from "react-webcam";
import lottie from "lottie-web";
import doneAnimData from '../../assets/Comp 1.json';
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import axios from "axios";
import { env } from "../../../../environment/environment";
import Loadinggif from "../../../../../utils/loader/loadergif";

export default function ArthSelfie() {
    const userId = localStorage.getItem("userId");
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [selfie, setSelfie] = useState(null);
    const [successfull, setSuccessful] = useState('one');
    const [panCard, setPanCard] = useState('');
    const [panCardType, setPanCardType] = useState('');
    const [loaderState, setLoaderState] = useState(false);
    const [refreshButtonDisable, setRefreshButtonDisable] = useState(false);

    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const reCaptureImage = () => {
        setImgSrc(null);
    };

    const imageHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            const isValidType = ["application/pdf", "image/png", "image/jpg", "image/jpeg"].includes(file.type);
            setPanCardType(file.type === "application/pdf" ? "pdf" : "img");

            if (!isValidType) {
                const elem = document.getElementsByClassName('fileTypeError')[1];
                elem.style.display = "block";
                setTimeout(() => elem.style.display = "none", 3000);
                return;
            }
            setPanCard(file);
        }
    };
    function checkAndNavigate() {
        // navigate(routes.ARTH_CONGRATULATIONS)
        setLoaderState(false)
        axios.get(env.api_Url + "getFinalNbfc?userId=" + userId)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.data === 'AM') {
                    // navigate(routes.ARTH_CONGRATULATIONS)
                    checkdigitapdataForAthMate()
                }
                if (response.data.data === 'CF') {
                    navigate(routes.CONGRATS)
                }
                if (response.data.data === 'FIBE') {
                    axios.get(env.api_Url + "checkFibeFlow?userId=" + userId)
                        .then((response) => {
                            if (response.data.data === 'GREEN') {
                                navigate(routes.FIBE_LOAN_APPROVED)
                            }
                            if (response.data.data === 'AMBER') {
                                navigate(routes.FIBE_BANK_STATEMENT_REQUIRED)

                            }

                        })

                    // 
                }
                if (response.data.data === 'INCRED') {


                    axios.get(env.api_Url + "getIncredStatusForUser?userId=" + userId)
                        .then((response) => {
                            console.log(response.data.data.status, 'response.data.data')
                            if (response.data.data.status === 'GREEN') {
                                navigate(routes.APPROVAL_INCRED)
                            }
                            if (response.data.data.status === 'AMBER') {
                                navigate(routes.INCRED_PREAPPROVED)

                            }

                        })

                }
                if (response.data.data === 'WAIT') {
                    navigate(routes.WAIT_FOR_PROCESSING)

                }
                if (response.data.data === 'LOL') {
                    navigate(routes.REJECTED_SCREEN)

                }
                if (response.data.data === 'NOT_FIT') {
                    navigate(routes.REJECTED_SCREEN)
                }
                if (response.data.data === 'MV') {
                    // navigate(routes.REJECTED_SCREEN)
                    // mvscrees
                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {
                            axios.get(env.api_Url + 'moneyViewActivityStatus?loanId=' + loanData.data.data.loanId)
                                .then((res) => {
                                    if (res.data.data.leadStatus === 'DOCS_REQUIRED') {
                                        navigate(routes.MONEY_VIEW_BANKSTATEMENT)

                                    }
                                    if (res.data.data.leadStatus === 'NOT_REQUIRED') {
                                        navigate(routes.MV_CONGRATULATIONS)


                                    }



                                })
                        })
                }
                if (response.data.data === 'FINZY') {


                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {
                            axios.get(env.api_Url + 'finzy/getFinzyDetailByLoanId?loanId=' + loanData.data.data.loanId)
                                .then((res) => {
                                    if (res.data.message === 'success') {
                                        if (res.data.data.amount === loanData.data.data.loanAmount) {
                                            navigate(routes.FINZY_APPROVAL)
                                        } else {
                                            navigate(routes.FINZY_APPROVE_LESS_AMOUNT)

                                        }

                                    }
                                })
                        })
                }




            })
    }
    function checkAndNavigatedigitap() {
        // navigate(routes.ARTH_CONGRATULATIONS)
        setLoaderState(false)

        axios.get(env.api_Url + "getFinalNbfc?userId=" + userId)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.data === 'AM') {
                    // navigate(routes.ARTH_CONGRATULATIONS)
                    checkdigitapdataForAthMate()
                }
                if (response.data.data === 'CF') {
                    navigate(routes.CONGRATS)
                }
                if (response.data.data === 'FIBE') {
                    axios.get(env.api_Url + "checkFibeFlow?userId=" + userId)
                        .then((response) => {
                            if (response.data.data === 'GREEN') {
                                navigate(routes.FIBE_LOAN_APPROVED)
                            }
                            if (response.data.data === 'AMBER') {
                                navigate(routes.FIBE_BANK_STATEMENT_REQUIRED)

                            }

                        })

                    // 
                }
                if (response.data.data === 'INCRED') {


                    axios.get(env.api_Url + "getIncredStatusForUser?userId=" + userId)
                        .then((response) => {
                            console.log(response.data.data.status, 'response.data.data')
                            if (response.data.data.status === 'GREEN') {
                                navigate(routes.APPROVAL_INCRED)
                            }
                            if (response.data.data.status === 'AMBER') {
                                navigate(routes.INCRED_PREAPPROVED)

                            }

                        })

                }
                if (response.data.data === 'WAIT') {
                    navigate(routes.WAIT_FOR_PROCESSING)

                }
                if (response.data.data === 'LOL') {
                    navigate(routes.DIGITAP_BANK_STATEMENT)

                }
                if (response.data.data === 'NOT_FIT') {
                    navigate(routes.DIGITAP_BANK_STATEMENT)
                }
                if (response.data.data === 'MV') {
                    // navigate(routes.REJECTED_SCREEN)
                    // mvscrees
                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {
                            axios.get(env.api_Url + 'moneyViewActivityStatus?loanId=' + loanData.data.data.loanId)
                                .then((res) => {
                                    if (res.data.data.leadStatus === 'DOCS_REQUIRED') {
                                        navigate(routes.MONEY_VIEW_BANKSTATEMENT)

                                    }
                                    if (res.data.data.leadStatus === 'NOT_REQUIRED') {
                                        navigate(routes.MV_CONGRATULATIONS)


                                    }



                                })
                        })
                }
                if (response.data.data === 'FINZY') {

                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {
                            // axios.get(env.api_Url + 'finzy/bankInfo?loanId=' + loanData.data.data.loanId)
                            //     .then((res) => {
                            //         if (res.data.message === 'success') {
                            axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                .then((res) => {
                                    if (res.data.message === 'success' && res.data.data === 'APPROVED') {
                                        axios.get(env.api_Url + 'finzy/loanAccept?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                            .then((res) => {
                                                if (res.data.message === 'success') {
                                                    axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                                        .then((res) => {
                                                            if (res.data.message === 'success' && res.data.data === 'DOCUMENTATION') {
                                                                //  navigate()
                                                                navigate(routes.FINZY_AGREEMENT)
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                    if (res.data.message === 'success' && res.data.data === 'PRE-APPROVED') {
                                        axios.get(env.api_Url + 'finzy/loanSanction?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                            .then((res) => {
                                                if (res.data.message === 'success') {
                                                    axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                                        .then((res) => {
                                                            if (res.data.message === 'success' && res.data.data === 'APPROVED') {
                                                                axios.get(env.api_Url + 'loanAccept?loanId=' + loanData.data.data.loanId + '&accept=true')
                                                                    .then((res) => {
                                                                        if (res.data.message === 'success') {
                                                                            axios.get(env.api_Url + 'finzy/finzyLoanDetailByRefId?loanId=' + loanData.data.data.loanId + '&sanctionAmount=' + loanData.data.data.loanAmount)
                                                                                .then((res) => {
                                                                                    if (res.data.message === 'success' && res.data.data === 'DOCUMENTATION') {
                                                                                        // esignscreennavigate
                                                                                        navigate(routes.FINZY_AGREEMENT)
                                                                                    }
                                                                                })
                                                                        }
                                                                    })
                                                            }
                                                        })
                                                }
                                            })
                                    }
                                    if (res.data.message === 'success' && res.data.data === 'KYC') {
                                        navigate(routes.STATUS_WAIT_FINZY)
                                    }
                                })
                            //     }




                            // })
                        })
                }




            })
    }
    const checkdigitapdataForAthMate = () => {
        axios.get(env.api_Url + "checkAMFlowGreenOrAmber?userId=" + userId)
            .then(response => {
                if (response.data.message === "success") {
                    let data = response.data.data;
                    if (!!data) {
                        // setDigitapData(data)
                        if (data === 'GREEN') {
                            navigate(routes.ARTH_CONGRATULATIONS)
                        }
                        if (data === 'AMBER') {
                            navigate(routes.DIGITAP_BANK_STATEMENT)
                        }

                    }
                }
            }).catch(() => {
                console.log("Error fetching data");
            })
    }


    // const saveFiles = () => {
    //     if (!panCardType) return;

    //     setRefreshButtonDisable(true);
    //     setLoaderState(true);

    //     const data = new FormData();
    //     data.append("uploadfile", panCard);
    //     data.append("userId", userId);
    //     data.append("type", panCardType);
    //     data.append("fileName", "photograph");

    //     axios.post(`${env.api_Url}uploadpdf`, data)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 // axios.post(`${env.api_Url}getImageLivelinessInfo?userId=${userId}&imageString=${res.data}`)
    //                 //     .then((res) => {
    //                 //         if (res.status === 200 && res.data.message === 'success') {
    //                 //             setLoaderState(false);
    //                 //             // navigate(routes.ARTH_KYC_SUCCESS);
    //                 //             checkAndNavigate()
    //                 //         }
    //                 //     }).catch(e => console.warn(e));
    //             }
    //         }).catch(e => console.warn(e));
    // };
    const saveFiles = () => {
        console.log(imgSrc)
        if (!imgSrc) return;

        setRefreshButtonDisable(true);
        setLoaderState(true);
        const data = new FormData();
        data.append("imageString", (imgSrc.split('base64,')[1]));
        data.append("userId", userId);


        axios.post(`${env.api_Url}getImageLivelinessInfo`, data)
            .then((res) => {
                console.log(res)
                if (res.status === 200 && res.data.message === 'success') {

                    axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
                        .then((loanData) => {

                            axios.get(env.api_Url + 'finzy/liveliness?loanId=' + loanData.data.data.loanId)
                                .then((live) => {
                                    if (live.status === 200 && live.data.message === 'success') {
                                        axios.get(env.api_Url + 'finzy/uploadDocument?loanId=' + loanData.data.data.loanId)
                                            .then((upload) => {
                                                if (upload.status === 200 && upload.data.message === 'success') {
                                                    axios.get(env.api_Url + 'finzy/additionalInfo?loanId=' + loanData.data.data.loanId)
                                                        .then((additional) => {
                                                            console.log(additional, 'additionalinfo')

                                                            if (additional.data.message === 'success') {
                                                                console.log(loanData.data.data.loanAmount, 'loanData.data.data.loanAmount')
                                                                if (loanData.data.data.loanAmount >= 75000) {

                                                                    checkAndNavigatedigitap()
                                                                } else {
                                                                    axios.get(env.api_Url + 'finzy/cibilApi?loanId=' + loanData.data.data.loanId)
                                                                        .then((additional) => {
                                                                            if (additional.status === 200 && additional.data.message === 'success') {
                                                                                checkAndNavigate()

                                                                            }else{
                                                                                checkAndNavigate()
                                                                            }

                                                                        })
                                                                }

                                                            }

                                                        })
                                                } else {
                                                    navigate(routes.WAIT_DOC_UPLOAD)
                                                }

                                            })
                                    }

                                })

                        })



                } else {
                    setLoaderState(false);
                    alert(res.data.data)

                }
            }).catch(e => console.warn(e));

    };
    const submitHandler = () => {
        setSuccessful('two');
        setTimeout(() => navigate(routes.ARTH_AUTO_REPAYMENT), 5000);
    };

    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#doneAnim"),
            animationData: doneAnimData,
            renderer: "canvas"
        });
    }, []);

    return (
        <main id='uploadDocuments'>
            {console.log(imgSrc)}
            <Header progressBar={successfull === 'two' ? "hidden" : ''} />
            {loaderState && <Loadinggif />}
            {successfull === 'one' && !loaderState && (
                <>
                    <h3 style={{ margin: "1.5rem 0" }}>Selfie Upload</h3>
                    <p>Upload your selfie or capture a new one.</p>
                    <div className="inputGroup">
                        <p className='group-title'>Selfie</p>
                        {imgSrc ? (
                            <>
                                <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '300px' }}>
                                    <img src={imgSrc} alt="Selfie" className="captured-image" style={{ borderRadius: '10px', border: '5px solid #504c9a', padding: '5px', }} />

                                </div>
                                <button

                                    className="submit"
                                    onClick={saveFiles}
                                >
                                    Yes
                                </button>
                                <button style={{ padding: '19px' }} className={panCard ? "carepay-button-purple" : 'carepay-button-purple-disable'} onClick={reCaptureImage}>No, let’s retake</button>

                            </>
                        ) : (
                            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '66%', marginTop: '20px', marginBottom: '20px' }}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={300}
                                    // height={300}
                                    style={{ borderRadius: '10%' }}
                                />
                                <p style={{ textAlign: 'center',color:'red',marginTop:'10px' }}>Please submit a clear selfie!</p>
                            </div>
                        )}
                        {!imgSrc && <button className="submit" onClick={capture}>Capture Selfie</button>}
                    </div>

                    {/* <div className="inputGroup">
                        <label className={panCard ? "uploaded" : ""} htmlFor="PAN">
                            {panCard ? panCard.name : "Click to upload selfie or pan card"}
                            <input id="PAN" type="file" onChange={imageHandler} />
                        </label>
                        <p className="fileTypeError">Only .pdf, .png, .jpg and .jpeg files are allowed</p>
                    </div> */}


                </>
            )}

            {successfull === 'two' && !loaderState && (
                <>
                    <div style={{ marginTop: "12%" }} id="doneAnim"></div>
                    <p style={{ color: "#514C9F", fontWeight: "bold", fontSize: "18px", textAlign: "center" }}>KYC done successfully!</p>
                </>
            )}
        </main>
    );
}
