import '../../../patient/components/Income_Verification_Notification/Congratulation/congratulation.scss'
// import CongratsImg from '../../../assets/congrats.png'
import Confetti from '../../assets/GIFs/confetti.gif'
import { useNavigate } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';
// import { MdOutlineElectricBolt } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { IoIosStar } from "react-icons/io";
import { MdOutlineElectricBolt } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Loadinggif from '../../../utils/loader/loadergif';
import SearchingDoc from '../../assets/GIFs/Document in process.gif'
import routes from '../../../layout/Routes';
import NoteText from '../Fibe flow/Comps/NoteText';
import Incredlogo from './images/incredlogo.svg'
import { env } from '../../environment/environment';
// let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


const Congrats = () => {
    const navigate = useNavigate()
    // let amount = localStorage.getItem("new_limit") || "0";
    let userId = localStorage.getItem('userId');
    let email = localStorage.getItem('email')
    let number = localStorage.getItem('phoneNumber');
    const [amount, setAmount] = useState("0");
    const [loaderState, setLoader] = useState(false);

    // amount = parseInt(amount).toLocaleString('en-IN');

    let ref = useRef(0);
    useEffect(() => {
        if (window.localStorage.getItem('doctorId') !== '9CQtIYcGcOiUTaM8otKQcAE1GyRbMdct') {
            axios.get(env.api_Url + "getLoanApprovedDetailForUser?userId=" + userId + '&type=INCRED')
                .then(response => {
                    console.log(response.data.data)
                    if (response.data.message === "success") {
                        setAmount(response.data.data.loanAmount)

                    }


                })
        }
    }, [])
    const submit = () => {
        navigate(routes.INCRED_DOWNLOAD)

    }



    return (
        <>
            <main className='congrats'>
                <Header progressbarDisplay="none" />
                {loaderState ? <Loadinggif /> : ""}
                <>
                    <div style={{ display: "flex", position: "relative", flexDirection: "row", alignItems: "baseline", justifyContent: "space-around", marginTop: "1rem" }}>
                        <img src={Confetti} style={{ transform: "scaleX(-1)", maxWidth: "25%" }} alt="" />
                        <p style={{ position: "absolute", fontSize: "24px", lineHeight: "26px", color: "#149540", fontWeight: "700", marginTop: "1rem" }}>Congratulations</p>
                        <img src={Confetti} style={{ maxWidth: "25%" }} alt="" />
                    </div>
                    <p className='subtitle'>Your credit application is <span style={{ color: "#149540", fontWeight: "700" }}>approved</span> for</p>
                    <div style={{ width: "90%", color: "#149540", height: "max-content", padding: "10px 16px", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", borderRadius: "4px", background: "#EBFEED" }}>
                        <BiRupee /> {amount}
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '10px' }}>by your best matched lender,</p>
                    <div><img src={Incredlogo} style={{ maxWidth: '100%', marginTop: '10px' }} /></div>

                    <button className='submit' onClick={() => submit()}>Proceed with Incred</button>
                </>

            </main>
        </>
    )
}

export default Congrats