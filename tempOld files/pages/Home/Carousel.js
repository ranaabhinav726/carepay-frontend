import React from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";

//project imports
import BusinessPartner from "./BusinessPartner";

const Carousel = () => {
  const INTERVAL = 3000;
  const MAX = 3;

  const intervalRef = React.useRef(null);

  const callbackRef = React.useCallback(
    (glider) => {
      if (glider) {
        if (!intervalRef.current) {
          intervalRef.current = setInterval(() => {
            let index = glider.page;
            if (index < MAX) {
              index += 1;
            } else {
              index = 0;
            }
            glider.scrollItem(index, false);
          }, INTERVAL);
        }
      }
    },
    [intervalRef]
  );

  React.useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    },
    [intervalRef]
  );

  return (
    <Glider
      draggable
      hasDots
      slidesToShow={1}
      slidesToScroll={1}
      ref={callbackRef}
    >
      <BusinessPartner />
      <BusinessPartner />
      <BusinessPartner />
      <BusinessPartner />
    </Glider>
  );
};

export default Carousel;
