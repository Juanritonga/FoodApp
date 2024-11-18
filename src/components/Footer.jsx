import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="container-fluid mr-0 ml-0">
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#5c5c57" }}
      >
        <div className="container">
          <section className="mt-5">
            <div className="row text-center d-flex justify-content-center pt-5">
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="/" className="text-white">
                    Home
                  </a>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="/resep" className="text-white">
                    Receipe
                  </a>
                </h6>
              </div>
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <a href="/about" className="text-white">
                    About Me
                  </a>
                </h6>
              </div>
            </div>
          </section>
          <hr className="my-5" />
          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p>
                  Learning to code is not just about writing lines of code its
                  about solving problems and turning ideas into reality. With
                  persistence and curiosity, every bug is a chance to learn, and
                  every challenge is an opportunity for growth. The more you
                  code, the more you unlock the limitless potential of your
                  creativity.
                </p>
              </div>
            </div>
          </section>
          <section className="text-center mb-5">
            <a href="#" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2020 Copyright : @juanritonga_
        </div>
      </footer>
    </div>
  );
};

export default Footer;
