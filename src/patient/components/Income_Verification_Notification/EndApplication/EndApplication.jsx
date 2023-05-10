import './endApplication.scss'
import Header from '../../Header/Header'
import oops from '../../../assets/oops.png'

const EndApplication = () =>{
    return(
    <>
        <Header progressbarDisplay="none" />

        <main className="endApplication">
            <img src={oops} alt="" />
            <p className='line'>Application rejected.</p>
        </main>
    </>
    )
}

export default EndApplication