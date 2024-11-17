import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [food, setFood] = useState([]);
  const navigate = useNavigate(); // Menambahkan useNavigate untuk navigasi

  const handleCardClick = (id) => {
    navigate(`/food/${id}`); // Navigasi ke halaman detail resep berdasarkan ID
  };

  const getFood = async () => {
    const url = "https://tasty.p.rapidapi.com/recipes/list";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a95412fba6mshd56e0b9638904d8p1c9b87jsn09d7ebb659eb",
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setFood(result.results); // Menyimpan hasil API ke dalam state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFood();
  }, []); // Menambahkan array kosong agar hanya dipanggil sekali

  return (
    <div className="App ml-0 mr-0">
      {/* Carousel Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div
              id="imageCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {food.length > 0 ? (
                  food.slice(0, 9).map((item, index) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <img
                        src={item.thumbnail_url}
                        className="d-block w-100 rounded shadow"
                        alt={item.name}
                        style={{ objectFit: "cover", height: "400px" }} // Responsif gambar
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <h5 className="text-light">{item.name}</h5>
                        <p className="text-light">{item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              {/* Carousel Controls */}
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
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="container mt-3 mb-2">
        <h3 className="text-center light my-5">Recommendations for You</h3>
        <div className="row">
          {food.length > 0 ? (
            food.slice(10, 14).map((item, index) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={index}>
                <div
                  className="card text-center"
                  onClick={() => handleCardClick(item.id)} // Passing the id to handleCardClick
                >
                  <img
                    src={item.thumbnail_url}
                    className="card-img-top"
                    alt={item.name}
                    style={{ objectFit: "cover", height: "200px" }} // Responsif gambar
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
