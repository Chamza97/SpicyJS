import React, { Component } from "react";

export default class About extends Component {
    
    render() {
        return (
            <aboutFrame>
            <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>About Us</h2>
          
        </div>

        <div class="row content">
          <div class="col-lg-6 offset-lg-3">
            <p>
              SpicyJs is a team of enthusiasts students who aim to deliver the following:
            </p>
            <ul class="list-inline mx-auto justify-content-center">
              <li><i class="ri-check-double-line"></i> A great user experience for the end user</li>
              <li><i class="ri-check-double-line"></i> A software that is bug free</li>
              <li><i class="ri-check-double-line"></i> We always thrive to satisfy the needs of our clients</li>
            </ul>
          </div>
          
        </div>

      </div>
    </section>
            </aboutFrame>
        );
        }
    }
