import Logo from '../../../../assets/Logo-carepay.svg'
import Header from '../../../Header/Header'
import Happyface from '../../../../assets/Group (5).svg'
import { MdCall } from 'react-icons/md'
import routes from '../../../../../layout/Routes'
import axios from 'axios'
import { env } from '../../../../environment/environment'
import { useNavigate } from 'react-router-dom'
import Loadinggif from '../../../../../utils/loader/loadergif'
import { useEffect, useState } from 'react'
import LikeIMg from './like.svg'
let userId = localStorage.getItem('userId')
let doctorId = localStorage.getItem('doctorId')

const FailureReport = () => {
    const [loaderState, setloaderState] = useState(false)
    const [url, setUrl] = useState(false);

    let navigate = useNavigate()
    const refreshButton = () => {
        navigate(routes.MVREFRESH_FINAL)
        window.open(url, "_blank");
    }
    useEffect(() => {
        axios.get(env.api_Url + 'userDetails/getLoanDetailsByUserId?userId=' + localStorage.getItem('userId'))
            .then((loanData) => {
                console.log(loanData.data.data.loanId)
                axios.get(env.api_Url + 'checkReferenceIdInDrawDownOffers?loanId=' + loanData.data.data.loanId)
                    .then((res) => {
                        if (res.data.message === 'success') {

                            axios.get(env.api_Url + 'journeyUrl?loanId=' + loanData.data.data.loanId + '&schemaId=' + res.data.data.schemaId)
                                .then((jsourney) => {
                                    if (jsourney.data.message === 'success') {
                                        setUrl(jsourney.data.data)

                                    } else {
                                        alert(jsourney.data.data)
                                    }
                                })

                        }
                    })
            })

    }, [])

    return (
        <>

            <main className="arthCurrentEMIExpenses">

                <div className='text-center'>
                    <img src={Logo} style={{ marginTop: '15px' }} />
                </div>
                <div className='text-center'>
                    <img src={Happyface} />
                </div>


                <h3 className='text-center' style={{ marginTop: '15px', color: '#706cae' }}>Sorry!</h3>
                <p className='text-center' style={{ marginTop: '15px', fontSize: '14px' }}>Seems like your application is incomplete<br />
                    on our lending partner’s portal.</p>
                    <div style={{background:'#EBFEED',color:'#149540',justifyContent:'center',marginTop:'20px',marginBottom:'20px',borderRadius:'5px',width:'100%'}}>
                        <div style={{display:'flex',fontSize:'14px',justifyContent:'center'}}><img src={LikeIMg}/>&nbsp;&nbsp;<div style={{marginTop:'20px'}}>Don’t worry, your progress has been saved.</div></div>
                    </div>
                <div style={{background:'#ECEBFF',padding:'10px',borderRadius:'5px'}}>
                    <p className='text-center' style={{  fontSize: '14px' }}>Please complete your loan application.</p>
                   {url? <button className="submit" onClick={() => refreshButton()}>Continue to Moneyview</button>:""}
                </div>
                <div className='text-center' style={{ marginTop: '50px', fontSize: '14px' }}>Need help? Reach out to us.</div>
                <button className="submit" style={{ background: '#ECEBFF', color: '#504c9a' }}><a href="tel:+918069489655" className=''><MdCall className='btnIcon' /> Call support</a></button>

            </main>

        </>
    )
}
export default FailureReport