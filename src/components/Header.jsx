import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Header.css"; // Pastikan ini terhubung dengan benar
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types"; // Impor PropTypes

function Header({ onSearch }) {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery); // Memanggil fungsi callback dengan query pencarian
    }
  };

  return (
    <header className="header bg-light py-2 shadow-sm">
      <div className="container">
        <div className="row align-items-center justify-content-between w-100">
          {/* Logo */}
          <div className="col-auto d-flex align-items-center">
            <Link to="/" className="logo">
              <img
                src={logo}
                alt="Masak Apa Hari Ini"
                className="img-fluid"
                style={{ maxWidth: "80px" }}
              />
            </Link>
            <h3 className="ms-4 mb-0 d-none d-md-block">What to Cook Today?</h3>
          </div>

          {/* Hamburger menu button for small screens */}
          <div className="d-md-none col-auto">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              aria-controls="navbarNav"
              aria-expanded={isNavbarOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Navbar / Navigation */}
          <div
            className={`col-12 col-md-auto navbar-collapse ${isNavbarOpen ? "d-block" : "d-none"} d-md-flex justify-content-md-center mt-3 mt-md-0`}
          >
            <nav className="nav">
              <ul className="navbar-nav d-flex flex-column flex-md-row align-items-center">
                <li className="nav-item mx-md-3">
                  <Link to="/" className="nav-link text-dark px-3">Home</Link>
                </li>
                <li className="nav-item mx-md-3">
                  <Link to="/resep" className="nav-link text-dark px-3">Recipe</Link>
                </li>
                <li className="nav-item mx-md-3">
                  <Link to="/about" className="nav-link text-dark px-3">About</Link>
                </li>
              </ul>
            </nav>

            {/* Search Bar */}
            <div className="col-auto d-flex align-items-center search mt-3 mt-md-0 ms-md-3">
              <form className="d-flex align-items-center" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search recipe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update query saat input berubah
                />
                <button type="submit" className="btn btn-sm btn-outline-secondary ms-2">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Menambahkan validasi PropTypes
Header.propTypes = {
  onSearch: PropTypes.func.isRequired, // Menandakan bahwa onSearch harus berupa fungsi dan wajib ada
};

export default Header;
