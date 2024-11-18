import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Resep.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Resep = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/food/${id}`);
  };

  const getFood = async () => {
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=${(currentPage - 1) * 9}&size=9`;
    const options = {
      method: "GET",
      headers: {
        'x-rapidapi-key': '3c63ba124amshea9cc3d9dc74767p1a6d69jsn39ac4d4cdcc8',
        'x-rapidapi-host': 'tasty.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFood(result.results);
      setTotalPages(Math.ceil(result.count / 9));
    } catch (error) {
      setError("Gagal memuat data. Silakan coba lagi.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFood();
  }, [currentPage]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Cooking Recipe</h1>
      <p className="text-center mb-4">
        Here is the place for all the delicious cooking recipes! We have prepared a variety of fun homemade dishes, perfect for everyday meals.
      </p>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <div className="custom-grid">
          {food.map((item, index) => (
            <div className="custom-card" key={index}>
              <div className="card h-100">
                <img
                  src={item.thumbnail_url}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-secondary">
                      {item.total_time_minutes || "N/A"} minutes
                    </span>
                    <span className="badge bg-secondary">
                      {item.nutrition?.calories || "N/A"} Calories
                    </span>
                  </div>
                  <button
                    onClick={() => handleCardClick(item.id)}
                    className="btn btn-primary"
                  >
                    Lihat Resep
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination-container">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Resep;
