import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ContactForm from "./ContactForm.jsx";
import FeedbackForm from "./FeedbackForm.jsx";
import { FaWhatsapp } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../styles/footer.css";

const AccordionSection = ({ id, title, active, toggleSection, children }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const location = useLocation();



  useEffect(() => {
    if (active === id) {
      setHeight(contentRef.current.scrollHeight + "px");
    } else {
      setHeight("0px");
    }
  }, [active, id]);

  return (
    <div className="footer-accordion">
      <div
        className={`footer-header ${active === id ? "active" : ""}`}
        onClick={() => toggleSection(id)}
      >
        <h4>{title}</h4>
        {active === id ? <FaMinus /> : <FaPlus />}
      </div>

      <div ref={contentRef} className="footer-content" style={{ height }}>
        <div className="footer-inner">{children}</div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [active, setActive] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleSection = (section) => {
    setActive(active === section ? null : section);
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        {/* Contact Info */}
        <AccordionSection
          id="contact"
          title="Contact Info"
          active={active}
          toggleSection={toggleSection}
        >
          <p><b>Phone: </b> +91-9876543210</p>
          <p><b>Email:</b> jjimpex14.com</p>
          <p>
            <b>Address:</b> JJ Impex, B-74, Basement, Khasra No. 37/20, Suraj Park,
            Village Samaipur, Delhi
          </p>

          <div className="footer-map">
            <iframe
              title="JJImpex Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6996.133858802317!2d77.1279574348877!3d28.747418599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01998f216a79%3A0x1f2f2d99d381cdbf!2sSuraj%20park!5e0!3m2!1sen!2sin!4v1772304254170!5m2!1sen!2sin"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </AccordionSection>

        {/* Our Store */}
        <AccordionSection
          id="store"
          title="Our Store"
          active={active}
          toggleSection={toggleSection}
        >
          <ul>
            <li
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Why Choose Us
            </li>
          </ul>
        </AccordionSection>

        {/* Useful Links */}
        <AccordionSection
          id="links"
          title="Useful Links"
          active={active}
          toggleSection={toggleSection}
        >
          <ul>
            <li>
              <a
                href="/privacy-policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>

            <li
              onClick={() =>
                alert("We deliver across India within 5–7 working days.")
              }
            >
              Shipping Policy
            </li>

            <li>Terms & Conditions</li>
          </ul>
        </AccordionSection>

        {/* FAQ */}
        <AccordionSection
          id="faq"
          title="FAQ"
          active={active}
          toggleSection={toggleSection}
        >
          <Link
            to="/faq"
            style={{ textDecoration: "none" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            View Frequently Asked Questions →
          </Link>
        </AccordionSection>

        {/* Always Visible Buttons */}
        <div className="footer-actions">
          <div className="footer-buttons">
            <button
              className="contact-btn"
              onClick={() => setShowContact(true)}
            >
              Enquire
            </button>

            <button
              className="feedback-btn"
              onClick={() => setShowFeedback(true)}
            >
              Feedback
            </button>
          </div>

          <a
            href="https://wa.me/+918826411312"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <span className="whatsapp-icon">
              <FaWhatsapp size={20} />
            </span>
            Message Us on WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">© 2026 JJImpex. All rights reserved.</div>

      {showContact && <ContactForm close={() => setShowContact(false)} />}
      {showFeedback && <FeedbackForm close={() => setShowFeedback(false)} />}
    </footer>
  );
};

export default Footer;
