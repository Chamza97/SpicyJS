import React from "react";

export default () => {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div
        className="container position-relative"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9 text-center">
            <h1>Welcome Spicy Offers</h1>
            <h2>Where shopping is made easier</h2>
          </div>
        </div>
        <div className="text-center">
          <a href="#about" className="btn-get-started scrollto">
            Get Started
          </a>
        </div>

        <div className="row icon-boxes">
          <div
            className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="icon-box">
              <div className="icon">
                <i className="ri-timer-line"></i>
              </div>
              <h4 className="title">
                <a href="">Time Saving</a>
              </h4>
              <p className="description">
                Our service will save your time and you won't need to browse
                multiple websites to find your product
              </p>
            </div>
          </div>

          <div
            className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="icon-box">
              <div className="icon">
                <i className="ri-money-dollar-circle-line"></i>
              </div>
              <h4 className="title">
                <a href="">Money Saving</a>
              </h4>
              <p className="description">
                Using our service will allow you to save money by finding the
                cheapest products and avoid bloated prices.
              </p>
            </div>
          </div>

          <div
            className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            data-aos="zoom-in"
            data-aos-delay="400"
          >
            <div className="icon-box">
              <div className="icon">
                <i className="ri-search-eye-line"></i>
              </div>
              <h4 className="title">
                <a href="">Price Tracking</a>
              </h4>
              <p className="description">
                Keep an eye on the market by tracking prices of certain products
                across different shops.
              </p>
            </div>
          </div>

          <div
            className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            <div className="icon-box">
              <div className="icon">
                <i className="ri-spy-line"></i>
              </div>
              <h4 className="title">
                <a href="">Secured browsing</a>
              </h4>
              <p className="description">
                Using our service you will no longer be exposed to websites
                using browsing cookies and guard your identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
