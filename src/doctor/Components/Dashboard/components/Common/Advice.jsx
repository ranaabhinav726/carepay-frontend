import './common.scss'
import { RiPencilFill } from 'react-icons/ri'

const Advice = () =>{
    return(
        <div className="card advice">
                <p className="line1">We will be more than happy to receive<br/>our customers’ valuable advices!</p>
                <p className="line2">Have some advice?</p>

                <button className='roundBtn'><RiPencilFill className='btnIcon' />Send feedback</button>
            </div>
    )
}

export default Advice