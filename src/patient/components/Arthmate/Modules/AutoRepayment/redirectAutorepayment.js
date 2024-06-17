import { useState, useEffect } from "react"
import { Header } from "../../comps/Header";
import EmandateImg from '../../assets/emandate.png'
import Paytm from '../../assets/paytm.png'
import Apl from '../../assets/apl.png'
import Bhim from '../../assets/bhim.png'
import Gpay from '../../assets/gPay.png'
import { BsInfoCircleFill } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import BottomPopOverModal from "../../comps/BottomPopOverModal";
import lottie from "lottie-web";
import animationData from '../../../../assets/GIFs/Comp 1.json'
import { createAuthRequest, getBankListByUserId, createCashfreeSubscription, getTxnApi, getPaymentStatusApi, verifyUpiAPi, getemiApi } from "./autopaycreator";
import PaymentImg from '../../assets/payment.svg'
import Logo from '../../../../assets/Logo-carepay.svg'
import Happyface from '../../assets/happyface.svg'
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
import FailureImage from '../../assets/failureemoji.svg'
import Greenthumb from '../../assets/greenthumb.svg'
import AutocompleteInput from "../../../utility/SuggestionInputBox/suggestionboxbank";
import '../../../../../patient/components/Arthmate/Modules/BasicInfo/styles/personalDetails.scss'
import { BiInfoCircle, BiRupee } from "react-icons/bi";
import BankLogo from '../../assets/banklogo.svg'
import completeAnimation from '../../../../assets/GIFs/Comp 1.json'
import { APIS } from "../../../../../utils/apifactory";
import axios from "axios";
import { env } from "../../../../environment/environment";
import CompletedGif from "../../../../../utils/loader/completegif";
import moment from "moment/moment";



const RedirectAutoRepayment = () => {
    const [screenState, setScreenState] = useState("netbankingrefresh"); // landing, methodSelection, summary, upiId
    const [cashFreeData, setCashfreeData] = useState('');
    const [userId, setUserId] = useState('');



    let navigate = useNavigate()
    useEffect(() => {
        // if (localStorage.getItem('userId') !== null && localStorage.getItem('userId') !== '') {

        //     createCashfreeSubscription(localStorage.getItem('userId'), callback => {
        //         console.log(callback)
        //         setCashfreeData(callback)
        //     })
        // }
        let url = window.location.href
        if (url.includes('/patient/nachmandatewait/')) {
            let userId = url.split('/patient/nachmandatewait/')
            console.log(userId)
            setUserId(userId[1])
            localStorage.setItem('userId', userId[1])
            createCashfreeSubscription(userId[1], callback => {
                console.log(callback)
                setCashfreeData(callback)
            })

        } else {
            navigate(routes.DOCTOR_NOT_AVAILABLE)
        }
    }, [])

    const refreshStatusBank = () => {

        getPaymentStatusApi(cashFreeData.data.loanId, 'E_MANDATE', callback => {
            console.log(callback)
            if (callback.message === 'success') {
                axios.put(env.api_Url + "loanStatusApi?userId=" + userId + '&status=' + 'credit_approved',)
                    .then((response) => {
                        console.log(response)
                        if (response.data.message === 'success') {

                        }
                    }).catch(error => {
                        console.log(error);
                    });
                lottie.loadAnimation({
                    container: document.querySelector("#completeAnimation"),
                    animationData: completeAnimation,
                    renderer: "canvas"
                });
                setScreenState('successScreen')
                redirect()
            } else {

            }
        })
    }
    const redirect = () => {
        setTimeout(() => {
            navigate(routes.FINAL_SCREEN_ARTH)
        }, 3000)
    }
    return (
        <main className="personalDetails" style={{ position: "relative" }}>
            {screenState === "netbankingrefresh" ?
                <>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={Logo} alt="carepay logo" style={{ height: "30px", aspectRatio: "107/26", margin: "18px auto" }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '20%' }}>
                            <img src={Happyface} width={'80px'} />
                        </div>
                        <div style={{ width: '80%' }}>
                            <div style={{ color: '#514C9F', fontSize: '18px', padding: '25px' }}>Fetching mandate status...</div>
                        </div>
                    </div>

                    <button className={'submit'} style={{}} onClick={() => refreshStatusBank()}>Refresh status</button>
                </>
                : ""}
            {screenState === "successScreen" ?
                <>
                    <CompletedGif text={'Auto-repayment setup complete!'} />

                </>
                : ""}
        </main>
    )
}
export default RedirectAutoRepayment