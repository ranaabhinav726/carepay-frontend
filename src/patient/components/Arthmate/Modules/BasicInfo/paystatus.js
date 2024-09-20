import React, { useEffect } from "react";
import Happyface from '../../assets/Group (6).svg'
import Header from "../../../Header/Header";
import axios from "axios";
import { env } from "../../../../environment/environment";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
const Payustatus = () => {
    let navigate=useNavigate()

    let userId=localStorage.getItem('userId')
    const tryAgain = () => {
        navigate(routes.PAY_SCREEN)

    }


    return (
        <main className="personalDetails" style={{ position: "relative" }}>
            <>
                <Header progressbarDisplay="none" />

                <div style={{ textAlign: 'center' }}>
                    {/* <div style={{ width: '20%' }}> */}
                    <img src={Happyface} />
                    {/* </div> */}


                </div>
                <div style={{ textAlign: 'center', color: '#514C9F', marginTop: '40px' }}><b>Application failed!</b></div>

                <button className={'submit'} style={{ marginTop: '60px' }} onClick={() => tryAgain()}>Try Again</button>
                <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '80px', marginBottom: '10px', marginTop: '120px' }}>
                    Need help? Reach out to us.
                </p>
                <a
                    style={{ color: '#000', textDecoration: 'none', width: '100%' }}
                    href={"tel:+91 806 948 9655"}
                >
                    <button
                        className="submit"
                        style={{ background: '#ECEBFF', color: "#514C9F", marginTop: '-6px' }}
                    >
                        Contact Support
                    </button>
                </a>
            </>

        </main>
    )
}
export default Payustatus