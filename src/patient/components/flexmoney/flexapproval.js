import '../../../patient/components/Income_Verification_Notification/Congratulation/congratulation.scss'
// import CongratsImg from '../../../assets/congrats.png'
import Confetti from '../../assets/GIFs/confetti.gif'
import { useNavigate } from 'react-router-dom';
import { BiRupee } from 'react-icons/bi';
import { useEffect, useRef, useState } from 'react';

import Header from '../Header/Header';
import Loadinggif from '../../../utils/loader/loadergif';
import routes from '../../../layout/Routes';
import { getLogoApi } from './actioncreator';
import ExploreOffer from './exporepopup';

// let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


const Congrats = () => {
    const navigate = useNavigate()
    const [amount, setAmount] = useState(30)
    const [loaderState, setloaderState] = useState(30)
    const [userData, setUserData] = useState('')
    const [showPopOver, setShowPopOver] = useState('')



    let ref = useRef(0);
    useEffect(() => {
        getLogoApi(localStorage.getItem('userId'), callback => {
            console.log(callback)
            if (callback.message === 'success' && callback.data.data !== null) {
                setUserData(callback.data)
                setAmount(callback.data.orderAmount)
            }
        })

    }, [])
    const submit = () => {
        navigate(routes.FLEX_APPROVAL_WAIT)


    }



    return (
        <>
            <main className='congrats'>
                <Header progressbarDisplay="none" />
                {/* {loaderState ? <Loadinggif /> : ""} */}
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
                    <p style={{ textAlign: 'center', marginTop: '40px' }}>from your bank</p>
                    {userData !== '' && userData !== null && userData.bankLogo !== null && userData.bankLogo !== undefined ? <img src={userData.bankLogo} /> : ""}


                    <button className='submit' style={{ marginTop: '100px' }} onClick={() => submit()}>Proceed with your bank</button>
                    <button className='submit' style={{ background: '#ECEBFF', color: '#504c9a', marginTop: '-2px' }} onClick={() => setShowPopOver('open')}>Explore other offers</button>
                    <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', marginBottom: '10px', marginTop: '120px' }}>Need help? Reach out to us.</p>
                    <a style={{ color: '#000', textDecoration: 'none', width: '100%' }} href={"tel:+91 806 948 9655"}>
                        <button className="submit" style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}>
                            Contact Support
                        </button>
                    </a>
                </>
                <ExploreOffer showPopOver={showPopOver} setShowPopOver={setShowPopOver} />
            </main>
        </>
    )
}

export default Congrats

///////////////////////////////////////////////////
