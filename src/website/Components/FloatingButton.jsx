import './common.scss'
import { Link } from 'react-router-dom'

function FloatingButton({content, to, callback}){
    return(
        <Link className='floating-btn-wrapper' to={to} onClick={callback}>
            <button className="floating-btn">{content}</button>
        </Link>
    )
}

export default FloatingButton