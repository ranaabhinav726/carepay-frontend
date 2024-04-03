import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo-carepay.svg'
import { BiArrowBack } from "react-icons/bi";

export function Header({progressBar="visible", progress=33, canGoBack=false}){

    const navigate = useNavigate();

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", position:"relative"}}>
            {canGoBack && <BiArrowBack style={{position:"absolute", fontSize:"30px", left:"0", top:"50%", transform:"translateY(-65%)", cursor:"pointer"}} onClick={()=>navigate(canGoBack)} />}
            <img src={Logo} alt="carepay logo" style={{height:"30px", aspectRatio:"107/26", margin:"20px auto 18px auto"}} />
            <ProgressBar visibility={progressBar} progress={progress} />
        </div>
    )
}

function ProgressBar({visibility, progress=1}){

    if(progress>100) progress = 100;

    return(
        <div className='progressBar-outer' style={{visibility:visibility, width:"100%", height:"4px", borderRadius:"10px", background:"#ECEBFF", margin:"4px 0"}}>
            <div className="progressBar-child" style={{width:`${progress}%`, height:"100%", borderRadius:"inherit", background:"#514C9F", animation:"anim 2s cubic-bezier(0,1.02,1,1) 1 forwards"}}>
            </div>
        </div>
    )
}

