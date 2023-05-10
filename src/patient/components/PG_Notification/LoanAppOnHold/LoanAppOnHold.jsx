import Header from '../../Header/Header'
import './loanAppOnHold.scss'
import oopsImg from '../../../assets/oops.png' 

const LoanAppOnHold = () =>{
    let phoneNo = "+91 " + localStorage.getItem("phone_number");
    return(
    <>
        <Header progressbarDisplay="none" />

        <main className="loanAppOnHold">
            <img src={oopsImg} alt="" />
            <h3>On-Hold</h3>
            <div className="msg">Don't worry! Your payment is safe with us.<br/>A support executive will get in touch with you shortly on your registered contact number <strong style={{whiteSpace: "nowrap"}}>{phoneNo}</strong> to assist you complete the process.</div>
        </main>
    </>
    )
}

export default LoanAppOnHold