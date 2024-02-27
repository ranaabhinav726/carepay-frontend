import { forwardRef } from "react";
import Webcam from "react-webcam";

const WebcamCapture = forwardRef(function(props, ref){
    
    const videoConstraints = {
        // width: 300,
        // height: 460,
        facingMode: "user",
        screenshotQuality: 1
    };

    return (
      <>
        <Webcam
          audio={false}
          ref={ref}
        //   width={615}
          height={props.height || 400}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        
      </>
    );
  });
export default WebcamCapture;