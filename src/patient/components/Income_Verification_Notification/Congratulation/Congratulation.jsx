import Header from '../../Header/Header';
import './congratulation.scss'

// import CongratsImg from '../../../assets/congrats.png'
import CongratsGIF from '../../../assets/GIFs/Congratulations.gif'
import { useNavigate } from 'react-router-dom';

import { BiRupee } from 'react-icons/bi';

    // let refID = localStorage.getItem("new_reference_id") || "FGDTH12345RR";


const Congrats = () =>{
    const navigate = useNavigate()
    let amount = localStorage.getItem("new_limit") || "0";
    amount = parseInt(amount).toLocaleString('en-IN');
    return(
    <>
        <main className='congrats'>
        <Header progressbarDisplay="none"/>
            {/* <img src={CongratsGIF} alt="" /> */}
            <div className="card">
                    {/* <p className="referenceID">Reference ID : {refID}</p> */}
                    <p className="congrats">Congratulations!<br />Your approved credit limit* is</p>
                    <div className="amount"><BiRupee />{amount}</div>
            </div>
            {/* <p className='title'>Congratulations!</p> */}
            {/* <p className='subtitle'>*Subject to necessary checks and verifications.</p> */}
            <div>
                <p>You are now just a few steps away<br/>from availing your treatment.</p>
                <ul>
                    <li><div className='encircle'>1</div><span className='v-line'></span>Verify your  bank details</li>
                    <li><div className='encircle'>2</div><span className='v-line'></span>Esign the credit agreement</li>
                    <li><div className='encircle'>3</div><span className='v-line'></span>Esign the E-mandate</li>
                    <li><div className='encircle'>4</div>Pay 1st EMI</li>
                </ul>
            </div>
            <button onClick={()=>navigate('LoanDetails')} className='submit'>Proceed</button>
        </main>
    </>
    )
}

export default Congrats