import React from "react";

import Hero from "../components/landpage/Hero";
import About from "../components/landpage/About";
import Aboutvd from "../components/landpage/Aboutvd";
import ClientSection from "../components/landpage/Clientsection";
import Cta from "../components/landpage/Cta";
import Team from "../components/landpage/Team";
import Pricing from "../components/landpage/Pricing";
import Faq from "../components/landpage/Faq";
import Contact from "../components/landpage/Contact";
import Header from "../components/landpage/Header";
import Footer from "../components/landpage/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="LandingPage">
        <Header />
        <Hero></Hero>
        <main id="main">
          <About></About>
          <Aboutvd></Aboutvd>
          <ClientSection></ClientSection>
          <Cta></Cta>
          <Team></Team>
          <Pricing></Pricing>
          <Faq></Faq>
          <Contact></Contact>
        </main>
      </div>
    </>
  );
};
export default LandingPage;
