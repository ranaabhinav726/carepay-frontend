import Header from '../../../Header/Header';
import '../../../../../patient/components/Income_Verification_Notification/Congratulation/congratulation.scss'
import Confetti from '../../../../assets/GIFs/confetti.gif'
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import routes from '../../../../../layout/Routes';



const Congrats = () => {
    const navigate = useNavigate()
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('phoneNumber');
    const [amount, setAmount] = useState("0");
    const [loaderState, setLoader] = useState(false);


    let ref = useRef(0);
    useEffect(() => {


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
                        number  <b>{localStorage.getItem('phoneNumber')}</b> and email ID  <b>{localStorage.getItem('email')}</b> after the amount is transferred.</p>




                </>

            </main >
        </>
    )
}

export default Congrats