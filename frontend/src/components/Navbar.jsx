import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [productsOpen, setProductsOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const handleContactClick = () => {
    setOpen(false);
    setProductsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        document
          .getElementById("footer")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300); // wait for page load
    } else {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false);
        setProductsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 FETCH BRANDS HERE
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/brands`);
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Navbar brand fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);
  useEffect(() => {
    const items = document.querySelectorAll(".dropdown-item");

    items.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        item.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translate(0,0)";
      });
    });
  }, [productsOpen]);
  // Hide on scroll
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 80) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setOpen(false);
    setProductsOpen(false);

    if (location.pathname !== "/") {
      window.location.href = `/${id}`;
      return;
    }

    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav ref={navbarRef} className={`navbar ${show ? "show" : "hide"}`}>
      <div className="logo">
        <h4 onClick={() => scrollToSection("#")}>JJ Impex</h4>
      </div>

      <div className="hamburger" onClick={() => setOpen(!open)}>
        <div className={`bar ${open ? "open" : ""}`}></div>
        <div className={`bar ${open ? "open" : ""}`}></div>
        <div className={`bar ${open ? "open" : ""}`}></div>
      </div>

      {productsOpen && window.innerWidth > 992 && (
        <div className="dropdown-backdrop"></div>
      )}

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li>
          <span onClick={() => scrollToSection("#")}>Home</span>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>

        {/* PRODUCTS */}
        <li
          className="products-li"
          onMouseEnter={() => window.innerWidth > 992 && setProductsOpen(true)}
          onMouseLeave={() => window.innerWidth > 992 && setProductsOpen(false)}
        >
          <span
            className="products-trigger"
            onClick={() => {
              if (window.innerWidth <= 992) {
                setProductsOpen(!productsOpen);
              }
            }}
          >
            Our Products
            <FaChevronDown
              className={`dropdown-icon ${productsOpen ? "rotate" : ""}`}
            />
          </span>
          {/* Desktop Dropdown */}
          <div className={`products-dropdown ${productsOpen ? "show" : ""}`}>
            {loading ? (
              <span className="dropdown-item">Loading...</span>
            ) : (
              brands.map((brand) => (
                <span
                  key={brand._id}
                  onClick={() => {
                    setOpen(false);
                    setProductsOpen(false);
                    navigate(`/brand/${brand._id}`);
                  }}
                  className="dropdown-item"
                >
                  {brand.name}
                </span>
              ))
            )}
          </div>

          {/* Mobile Dropdown */}
          <div
            className={`mobile-products ${productsOpen ? "show-mobile" : ""}`}
          >
            {brands.map((brand) => (
              <span
                key={brand._id}
                onClick={() => {
                  setOpen(false);
                  setProductsOpen(false);
                  navigate(`/brand/${brand._id}`);
                }}
                className="dropdown-item"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </li>

        <li>
          <span onClick={handleContactClick}>Contact Us</span>
        </li>
      </ul>

      {open && (
        <div className="nav-overlay" onClick={() => setOpen(false)}></div>
      )}
    </nav>
  );
};

export default Navbar;
