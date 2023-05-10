import './header.scss'
import carepay from '../../assets/Logo-carepay.webp'

const Header = () =>{
    let initials = "DJ";
    return(
        <div id="header">
            <img id='logo' src={carepay} alt="" />
            <div className="user">
                <p className="initials">{initials}</p>
            </div>
        </div>
    )
}

export default Header