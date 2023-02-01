import { useNavigate, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Tab,
  Tabs,
  Modal,
} from "react-bootstrap";
import CartIcon from "../components/Icons/CartIcon";
import WishListIcon from "../components/Icons/WishListIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductById } from "../store/features/productSlice";
import ProductSpecification from "../components/ProductSpecs/ProductSpecification";
import ProductReturnPolicy from "../components/ProductSpecs/ProductReturnPolicy";
import ProductReview from "../components/ProductSpecs/ProductReview";
import { gotoProductBucket } from "../store/features/orderSlice";
import {
  addUserWishlist,
  clearWishlistMessageReducer,
} from "../store/features/wishlistSlice";
import {
  addUserCart,
  clearCartMessageReducer,
} from "../store/features/cartSlice";
import Loader from "../components/Loader";

function Product() {
  const { name, id } = useParams();
  const { singleProduct, singleProductErrorStatus } = useSelector(
    (state) => state.product
  );
  const { userProfile } = useSelector((state) => state.user);
  const { wishlistCreatedMessage, wishlistCreatedMessageStatus } = useSelector(
    (state) => state.wishlist
  );
  const { cartCreatedMessageStatus, cartCreatedMessage } = useSelector(
    (state) => state.cartList
  );

  console.log("cartCreatedMessage:", cartCreatedMessage);
  console.log("singleProductErrorStatus:", singleProductErrorStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [imgUrl, setImgUrl] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productMRP, setProductMRP] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productColor, setProductColor] = useState("");
  const [totalQty, setTotalQty] = useState("");

  const [cartWishlistModal, setCartWishlistModal] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      !(
        Object.keys(singleProduct).length === 0 &&
        singleProduct.constructor === Object
      )
    ) {
      const minPrice = singleProduct.ProductPropJson.reduce(
        (min, p) => (p.price < min ? p.price : min),
        singleProduct.ProductPropJson[0].price
      );
      const { mrp, stock, size, color, img } =
        singleProduct.ProductPropJson.find(
          (product) => product.price === minPrice
        );
      setProductPrice(minPrice);
      setTotalQty(stock);
      setProductMRP(mrp);
      setProductSize(size);
      setProductColor(color);
      setImgUrl(img);
    }
  }, [singleProduct]);

  useEffect(() => {
    if (wishlistCreatedMessageStatus || cartCreatedMessageStatus) {
      setShowModal(true);
    }
  }, [wishlistCreatedMessageStatus, cartCreatedMessageStatus]);

  useEffect(() => {
    if (singleProductErrorStatus) {
      navigate("/pagenotfound");
    }
  }, [navigate, singleProductErrorStatus]);

  const removeItem = () => {
    if (qty > 1) {
      setQty((pre) => pre - 1);
    }
  };

  const addItem = () => {
    if (totalQty > qty) {
      setQty((pre) => pre + 1);
    }
  };

  const getSizePrice = (e) => {
    const selectedSize = e.target.value;
    const selectedProduct = singleProduct.ProductPropJson.find(
      (product) => product.size === selectedSize
    );
    setProductPrice(selectedProduct.price);
    setProductMRP(selectedProduct.mrp);
    setTotalQty(selectedProduct.stock);
  };

  const addToCart = () => {
    if (
      Object.keys(userProfile).length === 0 &&
      userProfile.constructor === Object
    ) {
      navigate("/login");
    } else {
      setCartWishlistModal("cart");
      dispatch(
        addUserCart({
          productId: singleProduct.id,
          productType: name,
          imgUrl,
          heading: singleProduct.productHeading,
          subHeading: singleProduct.productSubheading,
          qty,
          price: productPrice,
          color: productColor,
          size: productSize,
          mrp: productMRP,
        })
      );
    }
  };

  const saveWishlist = () => {
    if (
      Object.keys(userProfile).length === 0 &&
      userProfile.constructor === Object
    ) {
      navigate("/login");
    } else {
      setCartWishlistModal("wishlist");
      dispatch(
        addUserWishlist({
          productId: singleProduct.id,
          productType: name,
          imgUrl,
          heading: singleProduct.productHeading,
          subHeading: singleProduct.productSubheading,
          qty,
          price: productPrice,
          color: productColor,
          size: productSize,
          mrp: productMRP,
        })
      );
    }
  };

  const buyNow = () => {
    if (
      Object.keys(userProfile).length === 0 &&
      userProfile.constructor === Object
    ) {
      navigate("/login");
    } else {
      if (qty === 0) {
        return alert("Out of Stock");
      }
      dispatch(
        gotoProductBucket([
          {
            imgUrl: imgUrl,
            productId: singleProduct.id,
            heading: singleProduct.productHeading,
            subHeading: singleProduct.productSubheading,
            qty: qty,
            size: productSize,
            color: productColor,
            price: productPrice,
            mrp: productMRP,
          },
        ])
      );
      navigate("/buynow");
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(clearWishlistMessageReducer());
    dispatch(clearCartMessageReducer());
  };

  return (
    <ErrorBoundary>
      <Container style={{ marginTop: "70px" }}>
        {Object.keys(singleProduct).length === 0 &&
        singleProduct.constructor === Object ? (
          <Loader />
        ) : (
          <>
            <Row>
              <Col sm={5}>
                <ImageGallery
                  items={
                    singleProduct &&
                    singleProduct.ProductPropJson &&
                    singleProduct.ProductPropJson.map((item) => {
                      return {
                        original: item.img,
                        thumbnail: item.img,
                      };
                    })
                  }
                />
              </Col>
              <Col sm={7}>
                <div className="fontsize40">{singleProduct.productHeading}</div>
                <div>{singleProduct.productSubheading}</div>
                <div className="d-flex">
                  <div className="text-success">Free delivery</div>
                </div>
                <div className="fontsize20 mb-3 text-success">
                  Price <strong>{productPrice}</strong>{" "}
                  <del className="text-danger ms-3">
                    MRP <strong>{productMRP}</strong>
                  </del>
                </div>
                <div className="card p-2 mt-2">
                  {singleProduct.productShortDesc}
                </div>
                <div className="mt-3">
                  <Row>
                    <Col sm={3}>
                      <p>Color</p>
                      <Form.Select
                        style={{ marginTop: "-15px" }}
                        defaultValue={productColor}
                      >
                        {[
                          ...new Set(
                            singleProduct.ProductPropJson.map(
                              (item) => item.color
                            )
                          ),
                        ].map((value, index) => {
                          return (
                            <option key={index} value={value}>
                              {value}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Col>
                    <Col sm={3}>
                      <p>Size</p>
                      <Form.Select
                        style={{ marginTop: "-15px" }}
                        defaultValue={productSize}
                        onChange={getSizePrice}
                      >
                        {singleProduct.ProductPropJson.map((value, index) => {
                          return (
                            <option key={index} value={value.size}>
                              {value.size}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Col>
                    <Col sm={4}>
                      <p>Qty</p>
                      {qty === 0 ? (
                        <p className="text-warning">Out of Stock</p>
                      ) : (
                        <div style={{ marginTop: "-15px" }}>
                          <Button
                            type="button"
                            className="me-2"
                            variant="danger"
                            onClick={removeItem}
                          >
                            Remove
                          </Button>
                          {qty}
                          <Button
                            className="ms-2"
                            type="button"
                            variant="success"
                            onClick={addItem}
                          >
                            Add
                          </Button>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
                <div>
                  <div style={{ marginTop: "20px" }}>
                    <Button type="button" variant="warning" onClick={buyNow}>
                      Buy Now
                    </Button>
                    <Button
                      className="ms-2"
                      type="button"
                      variant="success"
                      onClick={addToCart}
                    >
                      <div className="d-flex">
                        <div>
                          <CartIcon height="16" width="16" />
                        </div>
                        <div className="ms-1" style={{ marginTop: "2px" }}>
                          Add to Cart
                        </div>
                      </div>
                    </Button>
                    <Button
                      className="ms-2"
                      type="button"
                      variant="secondary"
                      onClick={saveWishlist}
                    >
                      <div className="d-flex">
                        <div>
                          <WishListIcon height="16" width="16" />
                        </div>
                        <div className="ms-1" style={{ marginTop: "2px" }}>
                          Save
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5 mb-5">
              <img src={singleProduct.OneImg} fluid="true" alt="" />
            </Row>
            <Row style={{ marginBottom: "200px" }}>
              <Tabs
                defaultActiveKey="specification"
                id="specificationTab"
                className="mb-3"
                fill
              >
                <Tab eventKey="specification" title="Specification">
                  <div className="overflow-auto removeScrollBar">
                    <ProductSpecification
                      value={singleProduct.productDetails}
                    />
                  </div>
                </Tab>
                <Tab eventKey="returnpolicy" title="Return Policy">
                  <div className="overflow-auto removeScrollBar">
                    <ProductReturnPolicy
                      value={singleProduct.productReturnPolicy}
                    />
                  </div>
                </Tab>
                <Tab eventKey="review" title="Review">
                  <ProductReview id={id} />
                </Tab>
              </Tabs>
            </Row>

            <Modal show={showModal} centered onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {cartWishlistModal === "wishlist" ? "Wishlist" : "Cart"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  {cartWishlistModal === "wishlist"
                    ? wishlistCreatedMessage
                    : cartCreatedMessage}
                </p>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Container>
    </ErrorBoundary>
  );
}

export default Product;
