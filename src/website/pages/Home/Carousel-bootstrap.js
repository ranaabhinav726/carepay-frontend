import React from "react";

import BusinessPartner from './BusinessPartner'

const BusinessPartnerCarousel = () => {
  return (
<>  
{/* <div id="carouselExampleControls" className="carousel slide mb-4" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item " data-interval= "3000">
    <BusinessPartner />
    </div>
    <div className="carousel-item active" data-interval= "3000">
    <BusinessPartner />
    </div>
    <div className="carousel-item" data-interval= "3000">
    <BusinessPartner />
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div> */}

<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" data-interval="3000">
    <div class="carousel-item active">
    <BusinessPartner />
    </div>
    <div class="carousel-item"data-interval="3000">
    <BusinessPartner />
    </div>
    <div class="carousel-item " data-interval="3000"> 
     <BusinessPartner />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev" style={{ width : "5%"}}>
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next" style={{ width : "5%"}}>
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </>
  );
};

export default BusinessPartnerCarousel;
