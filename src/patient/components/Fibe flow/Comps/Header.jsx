import Logo from '../../../assets/Logo-carepay.svg'

export function Header({progressBar="visible", progress=33}){

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <img src={Logo} alt="carepay logo" style={{height:"30px", aspectRatio:"107/26", margin:"18px auto"}} />
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

