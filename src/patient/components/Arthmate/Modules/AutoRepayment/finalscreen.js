import Header from '../../../Header/Header';
import '../../../../../patient/components/Income_Verification_Notification/Congratulation/congratulation.scss'
import Confetti from '../../../../assets/GIFs/confetti.gif'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import routes from '../../../../../layout/Routes';
import axios from 'axios';
import { env } from '../../../../environment/environment';



const Congrats = () => {
    const navigate = useNavigate()
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('phoneNumber');
    const [amount, setAmount] = useState("0");
    const [loaderState, setLoader] = useState(false);
    const [emailIdFromApi, setEmailId] = useState('');
    const [mobileNumberApi, setMobileNumber] = useState('');


    let ref = useRef(0);
    useEffect(() => {
        axios.get(env.api_Url + "userDetails/getUserDetailsByUserId?userId=" + userId)
            .then(response => {
                if (response.data.message === "success") {
                    console.log(response.data.data)
                    setEmailId(response.data.data.emailId)
                    setMobileNumber(response.data.data.mobileNumber)

                }
            })
    }, [])

    const submit = () => {
        if (amount !== '0') {
            navigate(routes.ARTH_KYC)
        }
    }



    return (
        <>
            <main className='congrats'>
                <Header progressbarDisplay="none" />
                {/* <Loadinggif /> */}
                <>
                    <div style={{ display: "flex", position: "relative", flexDirection: "row", alignItems: "baseline", justifyContent: "space-around", marginTop: "1rem" }}>
                        <img src={Confetti} style={{ transform: "scaleX(-1)", maxWidth: "25%" }} alt="" />
                        <p style={{ position: "absolute", fontSize: "24px", lineHeight: "26px", color: "#149540", fontWeight: "700", marginTop: "1rem" }}>Congratulations</p>
                        <img src={Confetti} style={{ maxWidth: "25%" }} alt="" />
                    </div>
                    <p style={{ marginTop: '30px', textAlign: 'center', padding: '10px' }} className='subtitle'>Your credit has been processed successfully.
                        The amount will be credited to the doctor’s
                        bank account shortly.</p>
                    <p style={{ marginTop: '30px', textAlign: 'center', background: '#effdee', padding: '10px', borderRadius: '5px' }} className='subtitle'>You will be notified on your registered
                        number  <b>{mobileNumberApi}</b> and email ID  <b>{emailIdFromApi}</b> after the amount is transferred.</p>




                </>

            </main >
        </>
    )
}

export default Congrats