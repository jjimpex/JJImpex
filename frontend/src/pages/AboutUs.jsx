import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import '../styles/aboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    /* Counter Animation */
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter) => {
      counter.innerText = "0";

      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = `${target}+`;
        }
      };

      updateCounter();
    });

    /* Stats Bar Animation */
    const bars = document.querySelectorAll(".bar-fill");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const value = entry.target.getAttribute("data-percentage");
            entry.target.style.width = value + "%";
          }
        });
      },
      { threshold: 0.5 },
    );

    bars.forEach((bar) => observer.observe(bar));
  }, []);

  return (
    <div className="page-wrapper about-page">
      {/* Floating Grains Background */}
      <div className="floating-grains-wrapper">
        <div className="container grains-container">
          <span>🌾</span>
          <span>🌾</span>
          <span>🌾</span>
          <span>🌾</span>
          <span>🌾</span>
          <span>🌾</span>
        </div>
      </div>

      <Navbar />

      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <h1>About JJImpex</h1>
          <p className="about-hero-subtext">
            Connecting global brands with growing businesses through trust,
            quality, and long-term partnerships.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section about-section">
        <div className="container">
          <div className="about-main">
            <h2>Who We Are</h2>
            <p>
              JJImpex connects international brands with fast-growing businesses
              by delivering premium-quality products with reliability and
              transparency.
            </p>
          </div>

          {/* COUNTERS (Always Horizontal) */}
          <div className="about-counters">
            <div className="counter-box">
              <h3 className="counter" data-target="10">
                0
              </h3>
              <p>Global Brands</p>
            </div>

            <div className="counter-box">
              <h3 className="counter" data-target="500">
                0
              </h3>
              <p>Happy Clients</p>
            </div>

            <div className="counter-box">
              <h3 className="counter" data-target="15">
                0
              </h3>
              <p>Years Experience</p>
            </div>
          </div>

          {/* OUR STRENGTHS */}
          <div className="stats-section">
            <h2 className="section-title">Our Strengths</h2>

            <div className="stats-flex">
              <div className="stat-card">
                <div className="stat-header">
                  <span>Quality Assurance</span>
                  <span>95%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" data-percentage="95"></div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>Client Satisfaction</span>
                  <span>98%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" data-percentage="98"></div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>On-Time Delivery</span>
                  <span>92%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" data-percentage="92"></div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span>Supply Chain Efficiency</span>
                  <span>94%</span>
                </div>
                <div className="bar-bg">
                  <div className="bar-fill" data-percentage="94"></div>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION & VISION */}
          <div className="mission-vision">
            <div className="mv-box">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                Deliver premium international products with reliability,
                transparency, and efficiency.
              </p>
            </div>

            <div className="mv-box">
              <div className="mv-icon">🚀</div>
              <h3>Our Vision</h3>
              <p>
                Become a leading global sourcing partner empowering businesses
                to grow smarter and faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
