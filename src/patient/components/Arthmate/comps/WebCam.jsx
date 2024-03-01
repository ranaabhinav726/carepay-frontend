import { forwardRef } from "react";
import Webcam from "react-webcam";

const WebcamCapture = forwardRef(function(props, ref){
    
    const videoConstraints = {
        width: props.width || 460,
        height: props.height || 300,
        facingMode: props.mode || "user",
        screenshotQuality: 1
    };
    console.log(props)
    return (
      <>
        <Webcam
          audio={false}
          ref={ref}
          width={props.width || 460}
          height={props.height || 300}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        
      </>
    );
  });
export default WebcamCapture;