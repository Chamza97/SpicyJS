import React from "react"

const Pricing = () => {
    return(
        <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Pricing</h2>
          <p>Here you can see our pricing plans</p>
        </div>

        <div class="row">

          <div class="col-lg-4 offset-lg-1 col-md-6" data-aos="zoom-im" data-aos-delay="100">
            <div class="box">
              <h3>Free</h3>
              <h4><sup>$</sup>0<span> / month</span></h4>
              <ul>
                <li>Search Products</li>
                <li>Bot interactivity</li>
                <li class="na">voice search</li>
                <li class="na">Price Tracking</li>
                <li class="na">Products management</li>
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 offset-lg-2 col-md-6 mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="100">
            <div class="box featured">
              <h3>Business</h3>
              <h4><sup>$</sup>19<span> / month</span></h4>
              <ul>
                <li>Search Products</li>
                <li>Bot interactivity</li>
                <li>voice search</li>
                <li>Price Tracking</li>
                <li>Products management</li>
              </ul>
              <div class="btn-wrap">
                <a href="#" class="btn-buy">Buy Now</a>
              </div>
            </div>
          </div>

          

        </div>

      </div>
    </section>
    )
}
export default Pricing;