import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BrandCard from "../components/BrandCard.jsx";
import BrandFilter from "../components/BrandFilter.jsx";

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc | desc

  const filteredBrands = brands
    .filter((brand) =>
      brand.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const resetFilters = () => {
    setSearchTerm("");
    setSortOrder("asc");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        // const res = await fetch("http://localhost:5000/api/brands");
        const API = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API}/api/brands`);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();

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
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
      <header className="hero section">
        <div className="container hero-wrapper">
          <div className="hero-content">
            {/* <span className="hero-subtitle">Premium Food Grocery Solutions</span> */}
            <h1>Premium Quality Products Food Products For Your Venture</h1>
            <p>
              JJ Impex delivers trusted international brands and premium-quality
              products to help your business grow faster and smarter.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById("brands")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Brands
              </button>

              <button
                className="secondary-btn"
                onClick={() =>
                  document
                    .getElementById("footer")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      {/* <section id="about" className="section about-section">
        <div className="container">
          <div className="about-main">
            <h2>About JJImpex</h2>
            <p>
              JJImpex connects global brands with growing businesses through
              trusted sourcing, premium quality, and reliable distribution. We
              focus on long-term partnerships and consistent excellence.
            </p>
          </div>

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
                to grow smarter.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* BRANDS */}
      {/* <section id="brands" className="section">
        <div className="container">
          <h2>Brands We Deal In</h2>
          {loading ? (
            <div className="loader-wrapper">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="brand-list">
              {brands.map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </section> */}

      <section id="brands" className="section">
        <div className="container">
          <h2>Brands We Deal In</h2>

          <BrandFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            resetFilters={resetFilters}
          />

          {loading ? (
            <div className="loader-wrapper">
              <span className="loader"></span>
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="no-results">
              <h3>No brands found</h3>
              <p>Try searching with a different keyword.</p>
            </div>
          ) : (
            <div className="brand-list fade-in">
              {filteredBrands.map((brand) => (
                <BrandCard
                  key={brand._id}
                  brand={brand}
                  searchTerm={debouncedSearch}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
