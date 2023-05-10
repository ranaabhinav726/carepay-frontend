import Header from '../../Header/Header'
import './popupBlocked.scss'
import oopsImg from '../../../assets/oops.png' 

const KycPopupBlocked = () =>{
    let phoneNo = "+91 " + localStorage.getItem("phone_number");
    return(
    <>
        <Header progressbarDisplay="none" />

        <main className="loanAppOnHold">
            <img src={oopsImg} alt="" />
            <h3>Redirection blocked!</h3>
            <div className="msg">Please unblock popup blocker in your browser and then click <b>‘Retry’</b>.</div>
            <button className="submit">Retry</button>
        </main>
    </>
    )
}

export default KycPopupBlocked