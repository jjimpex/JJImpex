import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "../styles/contactAndFeedbackForm.css";

const FeedbackForm = ({ close }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comments: "",
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Valid email required";

    if (!form.comments.trim()) newErrors.comments = "Comments cannot be empty";

    if (!form.rating) newErrors.rating = "Please select a rating";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const API = import.meta.env.VITE_API_URL;

      const payload = {
        ...form,
        rating: Number(form.rating),
      };

      await axios.post(`${API}/api/feedback`, payload);

      await emailjs.send(
        "service_3v6bck8",
        "template_tbty15s",
        payload,
        "17S-3Wlzk1RdFeigW",
      );

      setSuccess(true);

      // Reset form
      setForm({
        name: "",
        email: "",
        rating: 5,
        comments: "",
      });

      setTimeout(() => {
        setSuccess(false);
        close();
      }, 2500);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
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

            <h3>Feedback Submitted Successfully!</h3>
            <div className="progress-bar"></div>

            <div className="confetti-wrapper">
              {Array.from({ length: 15 }).map((_, i) => (
                <span key={i} className="confetti"></span>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3>Feedback</h3>

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

            <textarea
              placeholder="Your Comments"
              value={form.comments}
              maxLength={500}
              onChange={(e) => setForm({ ...form, comments: e.target.value })}
            />
            {errors.comments && (
              <span className="error">{errors.comments}</span>
            )}

            <small style={{ display: "block"}}>
              {form.comments.length}/500 characters
            </small>

            {/* ⭐ Clickable Star Rating */}
            <label
              style={{
                display: "block",
                textAlign: "left",
                fontWeight: "600",
                marginTop: "-35px",
                color: "#575555",
                marginBottom: "4px",
              }}
            >
              Rate Us:
            </label>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${(hoverRating || form.rating) >= star ? "active" : ""}`}
                  onClick={() => setForm({ ...form, rating: star })}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <div className="rating-emoji">
              <span>
                {form.rating === 1 && "😡"}
                {form.rating === 2 && "😐"}
                {form.rating === 3 && "😇"}
                {form.rating === 4 && "🤗"}
                {form.rating === 5 && "🤩"}
              </span>
            </div>

            {errors.rating && <span className="error">{errors.rating}</span>}

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>

            <button
              type="button"
              className="close-btn"
              onClick={close}
              disabled={loading}
            >
              Close
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
