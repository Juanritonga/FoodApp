import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../styles/About.css"; 
import personal from "../assets/personal.jpg";

function App() {
  return (
    <div className="container-about py-4">
      <div className="profile d-flex flex-column align-items-center text-center">
        <img src={personal} alt="Donald McKinney" className="profile-img mb-3" />
        <div className="info">
          <h1 className="name mb-2">JUANDA RITONGA</h1>
          <p className="position mb-3">JUNIOR FRONT END DEVELOPER</p>
          <p className="bio mb-4">
          This journey will provide me with an opportunity to showcase my abilities and growth as a front-end developer, while further enhancing my skills in creating intuitive and responsive user interfaces.
          </p>
          <ul className="contact-list list-unstyled">
            <li>
              <i className="fas fa-calendar-alt"></i>
              8th December, 2001
            </li>
            <li>
              <i className="fas fa-phone-alt"></i>
              (+62) 895 2938 8788
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              ritongajuanda46@gmail.com
            </li>
            <li>
              <i className="fas fa-home"></i>
              Jakarta
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
