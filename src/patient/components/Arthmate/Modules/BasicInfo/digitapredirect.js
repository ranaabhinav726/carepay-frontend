import React, { useState } from "react";
import Loadinggif from '../../../../../utils/loader/loadergif'
import Logo from '../../../../assets/Logo-carepay.svg'
import DocImage from '../../assets/docimage.svg'
import { MdCall } from "react-icons/md";
import axios from "axios";
import { APIS } from "../../../../../utils/apifactory";
import { useNavigate } from "react-router-dom";
import routes from "../../../../../layout/Routes";
let userId = localStorage.getItem('userId')
let doctorId = localStorage.getItem('doctorId')
const DigitapRedirect = () => {
    let navigate = useNavigate()
    const [loaderState, setloaderState] = useState(false)
    const refreshButton = () => {
        axios.get(APIS.GET_DIGITA_BANK_REPORT + userId)
            .then((response) => {
                console.log(response.data.data.status)
                if (response.data.data.status === 'Success') {
                    navigate(routes.DIGITAP_DATA_RECEIVED)
                }
                if (response.data.data.status === 'Failure') {
                    navigate(routes.DIGITAP_REPORT_FAILURE)
                }

            })


    }


    return (
        <>
            {
                loaderState ?
                    <Loadinggif />
                    : ""}
            {loaderState === false ?
                <main className="arthCurrentEMIExpenses">

                    <div className='text-center'>
                        <img src={Logo} style={{ marginTop: '15px' }} />
                    </div>
                    <div className="text-center" style={{ marginTop: '30px', marginBottom: '20px' }}>
                        <img src={DocImage} />
                    </div>
                    <p className="text-center" style={{ marginTop: '20px', fontSize: '14px' }}>Receiving account data<br />
                        might take 1-2 minutes.</p>
                    <button className="submit" style={{ marginTop: '70px' }} onClick={() => refreshButton()}>Refresh status</button>
                    <div className='text-center' style={{ marginTop: '20px', fontSize: '14px' }}>For any details or enquiries, reach out to us</div>
                    <button className="submit" style={{ background: '#ECEBFF', color: '#504c9a' }}><a href="tel:+918069489655" className=''><MdCall className='btnIcon' /> Call support</a></button>
                </main>
                : ""}
        </>
    )
}
export default DigitapRedirect