import Logo from '../../../../assets/Logo-carepay.svg'
import Header from '../../../Header/Header'
import Happyface from '../../../../assets/Group (5).svg'
import { MdCall } from 'react-icons/md'
import routes from '../../../../../layout/Routes'
import axios from 'axios'
import { env } from '../../../../environment/environment'
import { useNavigate } from 'react-router-dom'
import Loadinggif from '../../../../../utils/loader/loadergif'
import { useState } from 'react'
let userId = localStorage.getItem('userId')
let doctorId = localStorage.getItem('doctorId')

const FailureReport = () => {
    const [loaderState, setloaderState] = useState(false)
    let navigate = useNavigate()
    const refreshButton = () => {
        navigate(routes.DIGITAP_AGREEGATOR)
    }

    return (
        <>

            <main className="arthCurrentEMIExpenses">

                <div className='text-center'>
                    <img src={Logo} style={{ marginTop: '15px' }} />
                </div>
                <div className='text-center'>
                    <img src={Happyface} />
                </div>
                <h3 className='text-center' style={{ marginTop: '15px', color: '#706cae' }}>Account data not fetched!</h3>
                <p className='text-center' style={{ marginTop: '15px', fontSize: '14px' }}>We were unable to fetch your<br />
                    account statement data.</p>
                <p className='text-center'  style={{ marginTop: '15px', fontSize: '14px' }}>Please try again using another method.</p>
                <button className="submit" onClick={() => refreshButton()}>Try again</button>
                <div className='text-center' style={{ marginTop: '50px', fontSize: '14px' }}>Need help? Reach out to us.</div>
                <button className="submit" style={{ background: '#ECEBFF', color: '#504c9a' }}><a href="tel:+918069489655" className=''><MdCall className='btnIcon' /> Call support</a></button>

            </main>

        </>
    )
}
export default FailureReport