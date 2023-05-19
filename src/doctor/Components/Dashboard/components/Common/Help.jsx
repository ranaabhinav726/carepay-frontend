import './common.scss'
import { MdChat, MdCall } from 'react-icons/md'

const Help = () =>{
    return(
        <div className="card help">
                <p className="line1">Need help? Stuck somewhere?<br/>We are here for you...</p>
                <p className="line2">Here to help you!</p>
                <a href="mailto:connect@carepay.money" className='roundBtn Btn1'><MdChat className='btnIcon' /> Email to us</a>
                <a href="tel:+918069489655" className='roundBtn Btn2'><MdCall className='btnIcon' /> Call support</a>
        </div>
    )
}

export default Help