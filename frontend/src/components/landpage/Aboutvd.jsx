import React from "react"

const Aboutvd = () => {
    return (
      <section id="about-video" className="about-video">
      <div className="container" data-aos="fade-up">
      
        <div className="row">

          <div className="col-lg-6 video-box align-self-baseline" data-aos="fade-right" data-aos-delay="100">
            <img src="assets/img/about-video.jpg" className="img-fluid" alt="" />
            <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
          </div>

          <div className="col-lg-6 pt-3 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
            <h3>A humanized customer service experience </h3>
            <p className="font-italic">
              Our chat bot uses Artificial to deliver a humanized customer service experience that will mimic actual human as if he was a real person infront of you and it will ensure the following:
            </p>
            <ul>
              <li><i className="bx bx-check-double"></i> Understand what you are saying whether it's text or voice.</li>
              <li><i className="bx bx-check-double"></i> Will note your preferences and search history for better results.</li>
              <li><i className="bx bx-check-double"></i> Will talk to your if you give it voice access on your browser.</li>
              <li><i className="bx bx-check-double"></i> Easy to interact with.</li>
            </ul>
            
          </div>

        </div>

      </div>
    </section>
    );
};
export default Aboutvd;