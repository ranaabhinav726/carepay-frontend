import './common.scss';
import { Link } from "react-router-dom"

function PrimaryButton({content="", to="", variant="dark", vanishOnCollapse=false, callback}){
    return(
        <Link className={vanishOnCollapse? "primary-btn-wrapper vanishable":'primary-btn-wrapper'} to={to} onClick={callback}>
            <button className={"primary-btn " + variant}>{content}</button>
        </Link>
    )
}

export default PrimaryButton