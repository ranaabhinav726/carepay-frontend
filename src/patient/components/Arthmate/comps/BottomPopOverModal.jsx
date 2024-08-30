export default function BottomPopOverModal({showPopOver, setShowPopOver, color="#ECEBFF", ...props}){
    return(
        <div 
        className={'bottomPopOverModal ' + (showPopOver ? "open" : "")}
        onClick={()=>{setShowPopOver(false)}}
        style={{
            height:"100%",
            width:"100%",
            background:"rgba(0,0,0,0.2)",
            position:"absolute",
            top:"0",
            left:"0",
            zIndex:5,
            display:"flex",
            alignItems:"center",
            padding:"0"
        }}>
            <div 
                className="popUpCard-custom"
                style={{
                    width:"100%",
                    background:`${color}`,
                    borderRadius:"8px 8px 0px 0px",
                    padding:"1rem",
                    paddingBottom:"32px",
                    position:"absolute",
                    margin:"0"
                }}
                onClick={(e)=>e.stopPropagation()}
            >
                {console.log(props.children)}
                {props.children}
                
            </div>
        </div>
    )
}