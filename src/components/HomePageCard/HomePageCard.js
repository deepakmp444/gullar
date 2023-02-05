import { Container } from "react-bootstrap";
import "../../styles/HomePageCard.css";
import MenTShirt from "../../assests/Home/T-Shirt_landing.png";
import WomenJean from "../../assests/Home/Jeans_Landing.png";
import Goggle from "../../assests/Home/Goggle_landing.png";
import Blazers from "../../assests/Home/Blazers_landing.png";
import Jack from "../../assests/Home/JackLanding.png";
import Coat from "../../assests/Home/CoatLanding.png";
import Sweater from "../../assests/Home/Sweater_landing.png";
import Tops from "../../assests/Home/TopsLanding.png";
import ProfessionalShirt from "../../assests/Home/ProfessionalShirtPoster.png";
import Hoodie from "../../assests/Home/HoodiePoster.png";
import Shoe from "../../assests/Home/ShoeLanding.png";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function HomePageCard() {
  return (
    <Container>
      <div className="center">
        <div className="imgHoverEffect">
          <Link to="/product/jeans">
            <LazyLoadImage
              className="heightOfImg widthOfImg me-5"
              src={WomenJean}
              effect="blur"
            />
          </Link>
        </div>
        <div className="imgHoverEffect">
          <Link to="/product/mentshirt">
            <LazyLoadImage
              src={MenTShirt}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
      </div>

      <div className="flex-container mt-3 flex-container-side">
        <div className="item imgHoverEffect">
          <Link to="/product/goggle">
            <LazyLoadImage
              src={Goggle}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
        <div className="item imgHoverEffect">
          <Link to="/product/jacket">
            <LazyLoadImage
              src={Jack}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
        <div className="item imgHoverEffect">
          <Link to="/product/menblazer">
            <LazyLoadImage
              src={Blazers}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
        <div className="item imgHoverEffect">
          <Link to="/product/coat">
            <LazyLoadImage
              src={Coat}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
        <div className="item imgHoverEffect">
          <Link to="/product/sweater">
            <LazyLoadImage
              src={Sweater}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
        <div className="item imgHoverEffect">
          <Link to="/product/tops">
            <LazyLoadImage
              src={Tops}
              className="heightOfImg widthOfImg"
              effect="blur"
            />
          </Link>
        </div>
      </div>

      <div className="mt-2 imgHoverEffect">
        <Link to="/product/menshirt">
          <LazyLoadImage
            src={ProfessionalShirt}
            className="heightOfBigImg widthOfBigImg"
            effect="blur"
          />
        </Link>
      </div>
      <div className="mt-2 imgHoverEffect">
        <Link to="/product/shoes">
          <LazyLoadImage
            src={Shoe}
            className="heightOfBigImg widthOfBigImg"
            effect="blur"
          />
        </Link>
      </div>
      <div className="mt-2 imgHoverEffect">
        <Link to="/product/hoodies">
          <LazyLoadImage
            src={Hoodie}
            className="heightOfBigImg widthOfBigImg"
            effect="blur"
          />
        </Link>
      </div>
    </Container>
  );
}

export default HomePageCard;
