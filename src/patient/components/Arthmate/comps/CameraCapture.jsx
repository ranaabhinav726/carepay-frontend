import WebcamCapture from "./WebCam";

export default function CameraCapture({ref, height, width, imgSrc}){
    return(
        <div 
            style={{
                borderRadius:"16px",
                minHeight:"250px",
                width:"max-content",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                margin:"0 auto",
                padding:(imgSrc===null? "16px" : "4px"),
                margin:(imgSrc===null? "4px" : "16px"),
                transition:"all 0.3s ease-in-out",
                overflow:"clip",
                objectFit:"scale-down",
                backgroundImage: " repeating-linear-gradient(0deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(90deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(180deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px), repeating-linear-gradient(270deg, #514c9f, #514c9f 74px, transparent 74px, transparent 87px, #514c9f 87px)",
                backgroundSize: "4px 100%, 100% 4px, 4px 100% , 100% 4px",
                backgroundPosition: "0 0, 0 0, 100% 0, 0 100%",
                backgroundRepeat: "no-repeat" 
            }}
        >
            <WebcamCapture ref={ref} width={width} height={height} />
        </div>
    )
}