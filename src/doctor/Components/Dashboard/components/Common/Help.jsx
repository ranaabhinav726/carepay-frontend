import './common.scss'
import { MdChat, MdCall } from 'react-icons/md'

const Help = () =>{
    return(
        <div className="card help">
                <p className="line1">Need help? Stuck somewhere?<br/>We are here for you...</p>
                <p className="line2">Here to help you!</p>
                <button className='roundBtn Btn1'><MdChat className='btnIcon' /> Chat with us</button>
                <button className='roundBtn Btn2'><MdCall className='btnIcon' /> Call support</button>
        </div>
    )
}

export default Help