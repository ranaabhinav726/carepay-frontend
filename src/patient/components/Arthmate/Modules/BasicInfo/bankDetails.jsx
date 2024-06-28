import { useState, useEffect, useRef } from "react";
import { Header } from "../../comps/Header"
// import './bankDetails.scss'

import axios from "axios";
import { env, showErrorOnUI, showWrapper, hideWrapper } from "../../../../environment/environment"

import { useLocation, useNavigate } from "react-router-dom";
import BottomPopOverModal from "../../../utility/BottomPopOverModal";

import SearchingDoc from '../../../../assets/GIFs/Document in process.gif'
import routes from "../../../../../layout/Routes";


// let bankname = localStorage.getItem('bankName');

const BankDetails = () => {

    // let token = localStorage.getItem('access_token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    const location = useLocation();
    let isReVisitToUploadStatement = location?.state?.reVisitToUploadStatement;

    // console.log(isReVisitToUploadStatement)

    let userId = localStorage.getItem('userId')
    let ref = useRef(0);
    let timerId = null;

    useEffect(() => {
        ref.current = document.getElementById('animation-wrapper');
        if (!!userId) {

            axios.get(env.api_Url + "userDetails/getAccountInfoByUserId?userId=" + userId)
                .then(response => {
                    if (response.data.message === "success") {
                        let data = response.data.data;
                        if (!!data) {
                            setBankName(data.bankName);
                            handleIFSC(data.ifscCode);
                            setAccountNumber(data.accountNumber);
                            setConfirmAccountNumber(data.accountNumber);
                        }
                    }
                }).catch(() => {
                    console.log("Error fetching data");
                })
        }

        if (isReVisitToUploadStatement === true) {
            timerId = setInterval(async () => {

                await axios.get(env.api_Url + "checkCFApproval?userId=" + userId)
                    .then(async (res) => {
                        if (res?.data?.message === "success" && res?.data?.data === true) {
                            setCfApproved(true);
                            if (!!timerId) {
                                clearInterval(timerId);
                            }
                        } else {
                            await axios.get(env.api_Url + "/checkNTCUser?userId=" + userId)
                                .then(res => {
                                    let ntc = res?.data?.data;
                                    // console.log(ntc)
                                    if (ntc === true) {
                                        setNtc(true);
                                        if (!!timerId) {
                                            clearInterval(timerId);
                                        }
                                    } else {
                                        getLoanStatus();
                                    }
                                }).catch(e => { })
                        }
                    }).catch(e => { })

            }, 5000)
        }

        if (!!timerId) {
            return () => clearInterval(timerId);
        }
    }, [])

    async function getLoanStatus() {
        await axios
            .post(env.api_Url + "initiateFlow?userId=" + userId + "&type=loan_details_get")
            .then(async (response) => {
                console.log(response)
                if (response.data.message === "success") {
                    // console.log(response)
                    let data = response?.data?.data;
                    if (data.loan_status === "105") {
                        setNextScreenOnApproved('/patient/congrats')
                    } else if (data.loan_status === "107") {
                        setNextScreenOnApproved('/patient/loanAppSuccessful')
                    }
                    else if (data.loan_status === "110") {   // if loan is rejected
                        setNextScreenOnApproved('/patient/RejectedScreen')
                    }
                }
            }).catch(error => {
                console.log(error)
            })
    }

    const [bankName, setBankName] = useState('');
    const [IFSC, setIFSC] = useState('');
    const [isIFSCValid, setIsIFSCValid] = useState(false);
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [branchName, setBranchName] = useState();
    const [branchAddress, setBranchAddress] = useState();

    const [apiError, setApiError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(true);

    const [focus, setFocus] = useState(false);
    const [showPopOver, setShowPopOver] = useState(false);

    const [ntc, setNtc] = useState(false);
    const [cfApproved, setCfApproved] = useState(false);
    const [nextScreenOnApproved, setNextScreenOnApproved] = useState("");
    const [loading, setLoading] = useState(false);
    const [accountType, setaccountType] = useState('Savings');
    const [nameAsBankAccount, setnameAsBankAccount] = useState('');
    const [didgitapData, setDigitapData] = useState('');

    let popUpMsg = "This account will be used to set up auto repayment of EMIs. Are you sure you want to proceed with this bank account?"
    // useEffect(()=>{
    //     axios.post(env.api_Url + "update_user_stage", {
    //             "onboarding_stage": "BankDetails"
    //         },
    //             config
    //         )
    //     .then((response) => {
    //         console.log(response)
    //     }).catch(error => {
    //         console.log(error);
    //     });

    //     setBankName(bankname);
    // }, [])



    const navigate = useNavigate();

    async function fetchBankDetailsFromIFSC(IFSC) {
        // let isKYCdone;
        await axios
            .get("https://ifsc.razorpay.com/" + IFSC)
            .then((response) => {
                console.log(response)
                let bankName = response.data.BANK;
                setBankName(bankName);
                let branchName = response.data.BRANCH;
                setBranchName(branchName);
                let branchAddress = response.data.ADDRESS;
                setBranchAddress(branchAddress);
                setIsIFSCValid(true);

            }).catch(error => {
                console.log(error);
            });
        // console.log(isKYCdone)
    }

    function handleIFSC(val) {
        // let val = e.target.value;
        val = val.toUpperCase();
        if (val.length < 11) {
            setIFSC(val);
            setIsIFSCValid(false)
        } else if (val.length == 11) {
            setIFSC(val);
            fetchBankDetailsFromIFSC(val);
        }
    }
    // function showErrorOnUI(elem){
    //     elem.classList.add('inputBoxError');

    //     setTimeout(()=>{
    //         elem.classList.remove('inputBoxError');
    //     }, 1000)
    // }

    async function onSubmit() {
        if (!(bankName && IFSC && accountNumber && (accountNumber === confirmAccountNumber))) {
            console.log(bankName, accountNumber, branchAddress, branchName, IFSC);
            // return;
        }
        // return;

        if (!accountNumber) {
            let elem = document.getElementById('accountNumber');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!confirmAccountNumber) {
            let elem = document.getElementById('confirmAccountNumber');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (accountNumber !== confirmAccountNumber) {
            let elem1 = document.getElementById('accountNumber');
            let elem2 = document.getElementById('confirmAccountNumber');
            if (elem1) showErrorOnUI(elem1, false);
            if (elem2) showErrorOnUI(elem2, false);
            let err = document.getElementById('error');
            if (err) err.style.display = "block";
            setTimeout(() => {
                let err = document.getElementById('error');
                if (err) err.style.display = "none";
            }, 3000);
            return;
        }

        if (!isIFSCValid || !IFSC) {
            let elem = document.getElementById('IFSC');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!bankName) {
            let elem = document.getElementById('bankName');
            if (elem) showErrorOnUI(elem);
            return;
        }
        if (!nameAsBankAccount) {
            let elem = document.getElementById('nameAsBankAccount');
            if (elem) showErrorOnUI(elem);
            return;
        }

        if (!canSubmit) {
            return;
        }
        setCanSubmit(false);
        showWrapper(ref.current)
        await axios
            .post(env.api_Url + "userDetails/addAccountDetails", {
                "userId": userId,
                "accountNumber": accountNumber,
                "accountType": accountType,
                "nameAsBankAccount": nameAsBankAccount,
                // "bank_address": branchAddress,
                "bankBranch": branchName,
                "bankName": bankName,
                "ifscCode": IFSC,
                "formStatus": ""
            })
            .then((response) => {
                console.log(response)
                if (response.data.message === "success") {
                    localStorage.setItem("bankName", bankName);
                    setShowPopOver(true);
                }
                //     axios.post(env.api_Url + "requestAScore?userId=" + userId)
                //     .then((response) => {
                //         console.log(response)
                //     }).catch(error => {
                //         console.log(error);
                //     });


                // }
            }).catch(error => {
                console.log(error);
                if (error.response.status == 406 && error.response.data.msg.error == "Bank Details already verified") {
                    setShowPopOver(true);

                }
            });
        setCanSubmit(true);
        hideWrapper(ref.current);
    }

    function checkAndNavigate() {
        // navigate(routes.ARTH_CONGRATULATIONS)
        axios.get(env.api_Url + "getFinalNbfc?userId=" + userId)
            .then((response) => {
                console.log(response.data.data)
                if (response.data.data === 'AM') {
                    navigate(routes.ARTH_CONGRATULATIONS)
                    // checkdigitapdataForAthMate()
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


            })
        setShowPopOver(false)
    }
    const checkdigitapdataForAthMate = () => {
        axios.get(env.api_Url + "checkAMFlowGreenOrAmber?userId=" + userId)
            .then(response => {
                if (response.data.message === "success") {
                    let data = response.data.data;
                    if (!!data) {
                        setDigitapData(data)
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

    return (
        <>
            <main className="bankDetails personalDetails" style={{ position: "relative" }}>
                {loading === true ?
                    <>
                        <Header progressBar="hidden" />
                        <div style={{ display: "flex", placeContent: "center", marginTop: "3rem" }}>
                            <img src={SearchingDoc} alt="" style={{ width: "50%" }} />
                        </div>
                        <p style={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }}>Sit back and relax!</p>
                        <p style={{ textAlign: "center", color: "#000000CC", fontSize: "16px", lineHeight: "20px" }}>while we assess your credit application...</p>
                    </>
                    :
                    <>
                        <Header progressbarDisplay="block" progress="80" canGoBack="/patient/EmploymentDetails" />
                        <h3>Bank Details</h3>

                        <div style={{ background: "#FAE1CD", padding: "16px", borderRadius: "8px", color: "#514C9F", textAlign: "center", wordSpacing: "1px", letterSpacing: "0.5px" }}>
                            Please enter details of your bank account where you receive your <strong>income/salary</strong> and make sure it has an active debit card or net banking.
                        </div>
                        <div className="gender" id="netBanking">
                            <p>Account Type :</p>
                            <div className="radioOption">
                                <input type="radio" name="saving" checked={accountType === 'Savings' ? true : false} onChange={(e) => setaccountType('Savings')} value={'Savings'} />
                                <label htmlFor="saving">Saving</label><br />
                            </div>
                            <div className="radioOption">
                                <input type="radio" name="current" checked={accountType === 'current' ? true : false} onChange={(e) => setaccountType('current')} value={'current'} />
                                <label htmlFor="current">Current</label><br />
                            </div>
                        </div>
                        {/* <p className="note"><b>NOTE:</b> Please add bank details of the same account as the bank statement submitted.</p> */}
                        <div className="accountName">
                            <p>Account number</p>
                            <input
                                type={focus ? "number" : "password"}
                                id="accountNumber"
                                value={accountNumber ?? ""}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                onFocus={() => setFocus(true)}
                                placeholder="Enter account number here"
                            />
                            <span className="fieldError">This field can't be empty.</span>
                        </div>
                        <div className="confirmAccountName">
                            <p>Confirm account number</p>
                            <input
                                type={focus ? "password" : "number"}
                                id="confirmAccountNumber"
                                value={confirmAccountNumber ?? ""}
                                onChange={(e) => setConfirmAccountNumber(e.target.value)}
                                onFocus={() => setFocus(false)}

                                placeholder="Re-enter account number here"
                            />
                            <span className="fieldError">This field can't be empty.</span>
                            <p id="error" className="apiError hide">Account numbers don't match.</p>
                        </div>
                        <div className="IFScode">
                            <p>IFSC code</p>
                            <input
                                type="text"
                                id="IFSC"
                                value={IFSC ?? ""}
                                onChange={(e) => handleIFSC(e.target.value)}
                                placeholder="Enter IFSC here"
                                autoCapitalize="characters"
                            />
                            <span className="fieldError">Please enter a correct IFSC</span>
                        </div>
                        <div className="bankName">
                            <p>Name as on Bank </p>
                            <input
                                id="nameAsBankAccount"
                                defaultValue={nameAsBankAccount ?? ""}
                                onChange={(e) => setnameAsBankAccount(e.target.value)}
                                type="text"
                                placeholder="Enter your Name as on bank"
                            />
                            <span className="fieldError">This field can't be empty.</span>
                        </div>

                        <span>
                            Bank name : <span style={{ opacity: "0.6" }}>{bankName || ""}</span>
                        </span>

                        <button onClick={() => onSubmit()} className="submit">Submit</button>
                        <BottomPopOverModal popUpMsg={popUpMsg} showPopOver={showPopOver} setShowPopOver={setShowPopOver} checkAndNavigate={checkAndNavigate} />

                    </>
                }
            </main>
        </>
    )
}

export default BankDetails