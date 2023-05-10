import Header from '../../Header/Header';
import './kycAlreadyVerified.scss'

// import CongratsImg from '../../../assets/congrats.png'
import CongratsGIF from '../../../assets/GIFs/Congratulations.gif'
import { useNavigate } from 'react-router-dom';


const KycAlreadyVerified = () =>{
    const navigate = useNavigate();
    return(
    <>

        <main className='kycAlreadyVerified'>
        <Header progressbarDisplay="none"/>
            <img src={CongratsGIF} alt="" />
            <p className='title'>Your KYC is already verified</p>
            <p className='subtitle'>Via your PAN details.</p>
            <div>
                <p>You may proceed further.<br/> You are now just a few steps away<br/>from availing your treatment.</p>
            </div>
            <button onClick={()=>navigate('/patient/StatementVerificationUnderProcess')} className='submit'>Proceed</button>
        </main>
    </>
    )
}

export default KycAlreadyVerified