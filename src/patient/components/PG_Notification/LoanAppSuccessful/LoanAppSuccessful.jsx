import Header from '../../Header/Header'
import './loanAppSuccessful.scss'

import congratsImg from '../../../assets/GIFs/Congratulations.gif'
import { useNavigate } from 'react-router-dom'

const LoanAppSuccessful = () =>{
    const navigate = useNavigate()
    return(
    <>
        <main className="loanAppSuccessful">
        <Header progressbarDisplay="none" />

            <img src={congratsImg} alt="" />

            <div className="textGroup">
                <h3 className="congrats">Congratulations!</h3>
                <p>Your credit has been processed successfully.<br/>The amount has been credited to the doctor's bank account.</p>
                <p>Now you can proceed with your treatment.</p>
            </div>

            <div className="btn-group">
                <p>To track your EMIs</p>
                <button onClick={()=>navigate('/patient/UserDashboard')} className='submit'>Go to Dashboard</button>
            </div>

            
        </main>
    </>
    )
}

export default LoanAppSuccessful