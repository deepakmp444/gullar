import { Container, Col, Dropdown, Row, Button, Form } from "react-bootstrap";
import "../../styles/NavBar.css";
import "../../styles/Search.css";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../Icons/CartIcon";
import PeopleIcon from "../Icons/PeopleIcon";
import WishListIcon from "../Icons/WishListIcon";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../store/features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/features/userSlice";

function NavBarComponet() {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState("");
  const [linkClicked, setLinkClicked] = useState(false);
  const [lengthOfSearch, setLengthOfSearch] = useState(0);
  const { product } = useSelector((state) => state.product);
  const { userProfile } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedData.length !== 0 && linkClicked === false) {
      dispatch(fetchProduct(searchedData));
    }
  }, [dispatch, linkClicked, searchedData]);

  useEffect(() => {
    if (lengthOfSearch !== searchedData.length) {
      setLinkClicked(false);
    }
  }, [lengthOfSearch, searchedData.length]);

  // Gullar heading CSS
  const fontSizeBig = {
    fontSize: "20px",
  };

  const searchQuery = (e) => {
    setSearchedData(e?.target?.value);
  };

  const handleSearchData = (value) => {
    setLengthOfSearch(value.length);
    setSearchedData(value);
    setLinkClicked(true);
  };
  const goToCart = () => {
    if (
      !(
        Object.keys(userProfile).length === 0 &&
        userProfile.constructor === Object
      )
    ) {
      navigate("/cart");
    }
  };
  const goToWishlist = () => {
    if (
      !(
        Object.keys(userProfile).length === 0 &&
        userProfile.constructor === Object
      )
    ) {
      navigate("/wishlist");
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <>
      <Container fluid className="navBarIndex">
        <Row className="p-2 bg-light">
          <Col>
            <Link style={fontSizeBig} className="link" to="/">
              <strong>Gullar</strong>
            </Link>
          </Col>
          <Col className="navBarMobile">
            <Form.Control
              type="search"
              placeholder="Search"
              value={searchedData}
              aria-label="Search"
              onChange={searchQuery}
            />
          </Col>
          <Col>
            <div className="d-flex justify-content-end">
              <Button variant="light" onClick={goToWishlist}>
                <WishListIcon />
              </Button>
              <Button variant="light" onClick={goToCart}>
                <CartIcon />
              </Button>
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {userProfile?.name}
                  <PeopleIcon />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.keys(userProfile).length === 0 &&
                  userProfile.constructor === Object ? (
                    <>
                      <Dropdown.Item>
                        <Link className="link" to="/login">
                          Sign In
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="link" to="/create-account">
                          Create Account
                        </Link>
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item>
                        <Link className="link" to="/setting">
                          Settings
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link className="link" to="/order-history">
                          Your orders
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          <Row>
            <div className="ms-2 mt-1 navBarDesktop">
              <Form.Control
                type="search"
                placeholder="Search"
                value={searchedData}
                aria-label="Search"
                onChange={searchQuery}
              />
            </div>
          </Row>
        </Row>
      </Container>
      {searchedData.length !== 0 && linkClicked === false && (
        <div className="center">
          <div className="search searchPosition p-3">
            {product.length === 0 && (
              <p className="mt-2 text-center">Product not found</p>
            )}
            {product.map((value) => {
              return (
                <Link
                  key={value.id}
                  className="link"
                  to={`/product/${value.SubCategory}/${value.id}`}
                  onClick={() => handleSearchData(value.productSubheading)}
                >
                  <div className="listItem">{value.productSubheading}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default NavBarComponet;
