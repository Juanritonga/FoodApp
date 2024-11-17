import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Header.css";  // Pastikan file CSS ini ada
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

function Header() {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  // Fungsi untuk mengambil data dari API berdasarkan nama
  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);

    const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${searchQuery}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3c63ba124amshea9cc3d9dc74767p1a6d69jsn39ac4d4cdcc8",
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setSearchResults(result.results || []); // Simpan hasil pencarian
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Debounce untuk mencegah terlalu banyak permintaan API
  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounce); // Bersihkan timeout sebelumnya
  }, [fetchSearchResults]);

  return (
    <header className="header bg-white py-2 shadow-sm">
  <div className="container">
    <div className="row align-items-center justify-content-between w-100">
      {/* Logo */}
      <div className="col-auto d-flex align-items-center">
        <Link to="/" className="logo">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxWidth: "80px" }}
          />
        </Link>
        <h3 className="ms-3 mb-0 text-dark d-none d-md-block">
          What to Cook Today?
        </h3>
      </div>

      {/* Hamburger menu button for small screens */}
      <div className="col-auto d-md-none">
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isNavbarOpen}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Navbar / Navigation */}
      <div
        className={`col-md-auto navbar-collapse ${
          isNavbarOpen ? "d-block" : "d-none"
        } d-md-flex justify-content-md-end mt-3 mt-md-0`}
      >
        <nav className="nav">
          <ul className="navbar-nav d-flex flex-column flex-md-row align-items-center">
            <li className="nav-item mx-md-3">
              <Link to="/" className="nav-link text-dark">
                Home
              </Link>
            </li>
            <li className="nav-item mx-md-3">
              <Link to="/resep" className="nav-link text-dark">
                Recipe
              </Link>
            </li>
            <li className="nav-item mx-md-3">
              <Link to="/about" className="nav-link text-dark">
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <div className="col-auto search mt-3 mt-md-0 ms-md-3 position-relative">
          <div className="search-container">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search recipe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search search-icon"></i>
          </div>

          {/* Dropdown hasil pencarian */}
          {loading && (
            <div className="dropdown-menu show w-100 mt-2 p-2 shadow-sm text-center loading">
              Loading...
            </div>
          )}
          {!loading && searchQuery && searchResults.length > 0 && (
            <ul className="dropdown-menu show w-100 mt-2 p-2 shadow-sm results">
              {searchResults.map((result, index) => (
                <li key={index} className="dropdown-item">
                  <Link to={`/food/${result.id}`} className="text-dark">
                    {result.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!loading && searchQuery && searchResults.length === 0 && (
            <div className="dropdown-menu show w-100 mt-2 p-2 shadow-sm text-center no-results">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</header>

  );
}

export default Header;
