import Logo from '../../assets/Logo-carepay.svg'
import Happyface from './Group (7).svg'
import { MdCall } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import routes from '../../../layout/Routes'


const FailureReport = () => {
    const [loaderState, setloaderState] = useState(false)
    let navigate = useNavigate()
    const refreshButton = () => {
        navigate(routes.DOCTOR_AGREEMENT)
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
                <h3 className='text-center' style={{ marginTop: '15px', color: '#706cae' }}>Agreement signing failed!</h3>
               
                <button className="submit" onClick={() => refreshButton()}>Try again</button>
                <div className='text-center' style={{ marginTop: '50px', fontSize: '14px' }}>Need help? Reach out to us.</div>
                <button className="submit" style={{ background: '#ECEBFF', color: '#504c9a' }}><a href="tel:+918069489655" className=''><MdCall className='btnIcon' /> Call support</a></button>

            </main>

        </>
    )
}
export default FailureReport