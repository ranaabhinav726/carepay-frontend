
export default function StepBar(){

    let stepNames = ["EMI plan selection", "PAN verification", "Final consent"];
    let steps = stepNames.map((stepName, idx)=>{
        return <Step step={idx+1} stepName={stepName} currStep={3}></Step>
    })
    return(
        <>
            <div style={{display:"flex", flexDirection:"row", width:"100%", alignItems:"center", justifyContent:"space-between"}}>
                {steps}
            </div>
        </>
    )
}

function Step({step=1, stepName, currStep}){

    
    let stepColor = "rgba(81, 76, 159, 0.5)";
    let stepTextColor = "rgba(81, 76, 159, 0.5)";
    let stepBgColor = "white";
    let stepBorderColor = "rgba(81, 76, 159, 0.4)";

    if(step == currStep){
        stepColor = "white";
        stepTextColor = "rgba(0,0,0,0.8)";
        stepBgColor = "rgba(81, 76, 159, 1)";
    }

    let spacerBgColor = "#ECEBFF";

    if(step < currStep){
        stepColor = "rgba(0,0,0,0.8)";
        stepTextColor = "rgba(0,0,0,0.8)";
        spacerBgColor = "#514C9F";
        stepBorderColor = "rgba(0,0,0,0.8)";
    }

    return(
        <>
            <div style={{display:"flex", flexDirection:"row", gap:"6px", maxWidth:"18%"}}>
                <div style={{minHeight:"100%", borderRadius:"100px", display:"flex", alignItems:"center", justifyContent:"center", background:`${stepBgColor}`, color:`${stepColor}`, minWidth:"30%", border:`2px solid ${stepBorderColor}`}}>{step}</div>
                <div style={{color:`${stepTextColor}`}}>{stepName}</div>
            </div>
            {step !==3 ? <div style={{width:"16%", background:`${spacerBgColor}`, height:"4px"}}></div> : ""}
        </>
    )
}