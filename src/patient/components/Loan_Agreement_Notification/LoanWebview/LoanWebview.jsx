import './loanWebview.scss'
import Header from '../../Header/Header'
import { useNavigate } from 'react-router-dom'

import underProcess from '../../../assets/underProcess.png'
import { useEffect } from 'react'

const LoanWebview = () =>{

    // let phoneNo = "+91 " + localStorage.getItem("phone_number");
    const navigate = useNavigate();
    let url = localStorage.getItem('Loan_url');

    useEffect(()=>{
        let elem = document.getElementById('link');
        elem.click();
    },[])

    return(
        <>
            <Header progressbarDisplay="block" progress="96" canGoBack />
            <main className='loanWebview'>
                <img src={underProcess} alt="" />
                <h3>Under Process</h3>
                <p className="text">Your credit agreement is getting reviewed.<br/>This might take a minute or two.</p>
                <button onClick={()=>navigate('VerifyingLoan')} className="submit">Refresh Status</button>
                <a id='link' style={{display:"none"}} href={url} target="_blank"></a>
            </main>
        </>
    )
}

export default LoanWebview