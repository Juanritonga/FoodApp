import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/food/${id}`);
  };

  const getFood = async () => {
    const url = "https://tasty.p.rapidapi.com/recipes/list";
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
      setFood(result.results || []); // Pastikan result.results ada
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getFood();
  }, []);

  return (
    <div className="App ml-0 mr-0">
      {/* Carousel Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div
                id="imageCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {food.slice(3, 9).map((item, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <img
                        src={item.thumbnail_url}
                        className="d-block w-100 rounded shadow"
                        alt={item.name || "Food Image"}
                        style={{ objectFit: "cover", height: "400px" }}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="text-light">{item.name}</h5>
                        <p className="text-light">
                          {item.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#imageCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#imageCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="container mt-3 mb-2">
        <h3 className="text-center light my-5">Recommendations for You</h3>
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            food.slice(10, 14).map((item, index) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={index}>
                <div
                  className="card text-center"
                  onClick={() => handleCardClick(item.id)}
                >
                  <img
                    src={item.thumbnail_url}
                    className="card-img-top"
                    alt={item.name || "Food Image"}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
