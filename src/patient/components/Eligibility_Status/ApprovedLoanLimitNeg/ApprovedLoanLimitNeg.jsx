import Header from '../../Header/Header'
import './approvedLoanLimitNeg.scss'

import oopsImg from '../../../assets/oops.png'

const ApprovedLoanLimitNeg = () =>{

    // let phoneNo = "+91 " + "772 182 3857";
    return(
    <>
        <Header progressbarDisplay="none" />

        <main className="approvedLoanLimitNeg">

            <img src={oopsImg} alt="" />

            <h3>Sorry!</h3>

            <p className='text'>We are unable to approve you a credit limit.</p>

            <div className="msgBox">We recommend you to try again<br/>in 30 days.</div>

        </main>
    </>
    )
}

export default ApprovedLoanLimitNeg