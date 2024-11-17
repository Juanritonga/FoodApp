import  { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Detail.css";

function FoodDetail() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFoodDetail = useCallback(async () => {
    const url = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a95412fba6mshd56e0b9638904d8p1c9b87jsn09d7ebb659eb",
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setFood(result);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
      setError("Failed to fetch recipe details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getFoodDetail();
  }, [getFoodDetail]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5 text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger text-center">{error}</p>;
  }

  if (!food) {
    return <p className="text-center">Recipe not found</p>;
  }

  return (
    <div className="container food-detail mt-4">
  <div className="row">
    {/* Nama resep */}
    <div className="col-12 text-center">
      <h1 className="display-4">{food.name}</h1>
    </div>
  </div>

  <div className="row">
    {/* Thumbnail */}
    {food.thumbnail_url && (
      <div className="col-12 text-center mb-4">
        <img
          src={food.thumbnail_url}
          alt={`${food.name} Thumbnail`}
          className="img-fluid rounded-circle shadow"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      </div>
    )}
  </div>

  <div className="row">
    {/* Gambar utama */}
    {food.image && (
      <div className="col-12 text-center mb-4">
        <img
          src={food.image}
          alt={food.name}
          className="img-fluid rounded shadow"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>
    )}
  </div>

  <div className="row">
    {/* Deskripsi */}
    {food.description && (
      <div className="col-12 text-center mb-3">
        <p className="text-muted">{food.description}</p>
      </div>
    )}
  </div>

  <div className="row">
  {/* Instruksi */}
  <div className="col-md-6 mb-4">
    <h2 className="h5 mb-3 text-primary">Instructions</h2>
    {food.instructions && food.instructions.length > 0 ? (
      <ol className="list-group list-group-numbered shadow-sm rounded">
        {food.instructions.map((instruction, index) => (
          <li key={index} className="list-group-item border-0">
            {instruction.display_text}
          </li>
        ))}
      </ol>
    ) : (
      <p className="text-danger">No instructions available.</p>
    )}
  </div>

  {/* User Ratings */}
  <div className="col-md-6 mb-4">
    <h2 className="h5 mb-3 text-primary">User Ratings</h2>
    {food.user_ratings ? (
      <div className="p-3 shadow-sm rounded bg-light">
        <p className="mb-2">
          <strong className="text-success">Positive Reviews:</strong>{" "}
          {food.user_ratings.count_positive || 0}
        </p>
        <p className="mb-2">
          <strong className="text-danger">Negative Reviews:</strong>{" "}
          {food.user_ratings.count_negative || 0}
        </p>
        <p className="mb-0">
          <strong className="text-primary">Overall Score:</strong>{" "}
          {food.user_ratings.score ? `${food.user_ratings.score}/1` : "N/A"}
        </p>
      </div>
    ) : (
      <p className="text-danger">No user ratings available.</p>
    )}
  </div>
</div>



  <div className="row">
    {/* Kandungan Nutrisi */}
    {food.nutrition && Object.keys(food.nutrition).length > 0 && (
      <div className="col-12 mb-4">
        <h2 className="h5">Nutrition Information</h2>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(food.nutrition).map(([key, value], index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>

  <div className="row">
    {/* Video Resep */}
    {food.video && (
      <div className="col-12 text-center mt-4">
        <h2 className="h5">Watch Video</h2>
        <div className="ratio ratio-16x9">
          <iframe
            src={food.video}
            title="Recipe Video"
            allowFullScreen
            className="rounded shadow"
          ></iframe>
        </div>
      </div>
    )}
  </div>
</div>



  );
}
  
export default FoodDetail;

      
      