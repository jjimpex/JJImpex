import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import BrandFilter from "../components/BrandFilter.jsx";
import '../styles/brandItems.css';

const BrandItems = () => {
  const { brandId } = useParams();

  const [items, setItems] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Scroll to top when brand changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandId]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API}/api/items/brand/${brandId}`);
        const data = await res.json();

        setBrandName(data.brandName);
        setItems(data.items);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [brandId]);

  // Reset
  const resetFilters = () => {
    setSearchTerm("");
    setSortOrder("asc");
  };

  // Filter + Sort
  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  // Highlight function (clean version)
  const highlightText = (text, search) => {
    if (!search || search.length < 2) return text;

    const escapedSearch = search.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      "\\$&"
    );

    const regex = new RegExp(`(${escapedSearch})`, "gi");

    return text.replace(
      regex,
      `<span class="highlight">$1</span>`
    );
  };

  return (
    <div>
      <Navbar />

      <div className="brand-items-header">
        <h1>{brandName ? `${brandName} Items` : "Items"}</h1>
      </div>

      <div className="container">

        {/* SAME FILTER COMPONENT */}
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
        ) : filteredItems.length === 0 ? (
          <div className="no-results">
            <h3>No items found</h3>
            <p>Try searching with a different keyword.</p>
          </div>
        ) : (
          <div className="items-list fade-in">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="item-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item-image-wrapper">
                  <img
                    src={`/assets/brands/${item.image}`}
                    alt={item.name}
                  />
                  <div className="glow"></div>
                </div>

                <h3
                  dangerouslySetInnerHTML={{
                    __html: highlightText(
                      item.name,
                      debouncedSearch
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BrandItems;