import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";
import "../styles/contactAndFeedbackForm.css";

const ContactForm = ({ close }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🔹 Live phone validation (international)
  const handlePhoneChange = (value, country) => {
    const formattedNumber = "+" + value;

    setForm({ ...form, phone: formattedNumber });

    if (!isValidPhoneNumber(formattedNumber)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Invalid phone number for selected country",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Valid email required";

    if (!isValidPhoneNumber(form.phone))
      newErrors.phone = "Enter a valid international phone number";

    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const API = import.meta.env.VITE_API_URL;

      const payload = { ...form };

      await axios.post(`${API}/api/contact`, payload);

      await emailjs.send(
        "service_3v6bck8",
        "template_14aqfdb",
        payload,
        "17S-3Wlzk1RdFeigW",
      );

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        close();
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="premium-modal">
        {success ? (
          <div className="success-animation">
            <div className="accent-ring"></div>

            <div className="success-icon">
              <svg className="checkmark-svg" viewBox="0 0 52 52">
                <circle
                  className="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  className="checkmark-check"
                  fill="none"
                  d="M14 27l7 7 16-16"
                />
              </svg>
            </div>

            <h3>Message Sent Successfully!</h3>
            <div className="progress-bar"></div>

            <div className="confetti-wrapper">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className="confetti"></span>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Contact Us</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            {/* 🌍 International Phone Input */}
            <PhoneInput
              country={"in"}
              enableSearch={true}
              value={form.phone.replace("+", "")}
              onChange={handlePhoneChange}
              inputStyle={{
                width: "100%",
              }}
              containerStyle={{
                marginBottom: "10px",
              }}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            >
              <option>General Inquiry</option>
              <option>Bulk Order</option>
              <option>Partnership</option>
              <option>Support</option>
            </select>

            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {errors.message && <span className="error">{errors.message}</span>}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            <button type="button" className="close-btn" onClick={close}>
              Close
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
