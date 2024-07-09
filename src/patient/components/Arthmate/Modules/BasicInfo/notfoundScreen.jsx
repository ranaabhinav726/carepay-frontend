import Logo from '../../../../assets/Logo-carepay.svg'
import Header from '../../../Header/Header'
import Happyface from '../../../../assets/notfoundface.svg'
import { MdCall } from 'react-icons/md'
import routes from '../../../../../layout/Routes'
import axios from 'axios'
import { env } from '../../../../environment/environment'
import { useNavigate } from 'react-router-dom'
import Loadinggif from '../../../../../utils/loader/loadergif'
import { useState } from 'react'
let userId = localStorage.getItem('userId')
let doctorId = localStorage.getItem('doctorId')

const NotFoundScreen = () => {
    const [loaderState, setloaderState] = useState(false)
    let navigate = useNavigate()
    const refreshButton = () => {
        setloaderState(true)
        axios.get(env.api_Url + "findSuitableNbfc?userId=" + userId + '&doctorId=' + doctorId)
            .then(response => {
                if (response.data.status === 200) {
                    setloaderState(false)

                    if (response.data.message === 'success') {
                        console.log(response.data.data)
                        let data = response.data.data;
                        if (!!data) {
                            window.localStorage.setItem('flowRedirect', data)
                            navigate(routes.CONNECTING_WITH_LENDERS)
                        }
                    }



                }
                if (response.data.message === 'Reject' || response.data.message === 'reject') {

                    navigate(routes.REJECTED_SCREEN)
                }
            }).catch(() => {
                console.log("Error fetching data");
                setloaderState(false)

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
                    <div className='text-center'>
                        <img src={Happyface} />
                    </div>
                    <h3 className='text-center' style={{ marginTop: '15px', color: '#706cae' }}>Please wait!</h3>
                    <p className='text-center' style={{ marginTop: '15px', fontSize: '14px' }}>Currently, we are unable to find a suitable lender<br />
                        for your loan application. <br />
                        Your progress has been saved.</p>
                    <div style={{ background: '#EBFEED', padding: '10px', textAlign: 'center', borderRadius: '5px', fontSize: '14px', marginTop: '20px' }}>
                        Arranging a suitable lender will take time,<br />
                        once done, our support executive will contact you on your registered contact number<br />
                        +91 {localStorage.getItem('phoneNumber')} to process this forward.
                    </div>
                    <button className="submit" onClick={() => refreshButton()}>Search again</button>
                    <div className='text-center' style={{ marginTop: '20px', fontSize: '14px' }}>Need help? Reach out to us.</div>
                    <button className="submit" style={{ background: '#ECEBFF', color: '#504c9a' }}><a href="tel:+918069489655" className=''><MdCall className='btnIcon' /> Call support</a></button>

                </main>
                : ""}
        </>
    )
}
export default NotFoundScreen