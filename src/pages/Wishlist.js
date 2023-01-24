import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUserCart } from "../store/features/cartSlice";
import {
  deleteUserWishlist,
  fetchWishlist,
} from "../store/features/wishlistSlice";
function Wishlist() {
  const { wishlist, deletedWishlistStatus } = useSelector(
    (state) => state.wishlist
  );
  const { cartCreatedMessage, cartCreatedMessageStatus } = useSelector(
    (state) => state.cartList
  );
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (deletedWishlistStatus) {
      setShowDelete(false);
      window.location.reload();
    }
  }, [deletedWishlistStatus]);

  useEffect(() => {
    if (cartCreatedMessageStatus) {
      alert(cartCreatedMessage);
    }
  }, [cartCreatedMessage, cartCreatedMessageStatus]);

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const confirmDelete = (id) => {
    dispatch(deleteUserWishlist({ id }));
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleCart = (value) => {
    console.log("value:", value);

    dispatch(
      addUserCart({
        userId: value.userId,
        productId: value.productId,
        productType: value.productType,
        heading: value.heading,
        subHeading: value.subHeading,
        imgUrl: value.imgUrl,
        qty: value.qty,
        size: value.size,
        color: value.color,
        price: value.price,
        mrp: value.mrp,
      })
    );
    dispatch(deleteUserWishlist({ id: value.id }));
  };
  return (
    <Container style={{ marginTop: "70px" }}>
      <Row>
        <Col sm={2}></Col>
        <Col sm={8}>
          <h3 className="mb-3">Your wishlist cart</h3>
          {wishlist.length === 0 && (
            <h5 className="text-center">No product added in your Wishlist</h5>
          )}
          {wishlist.map((value) => {
            return (
              <Card className="bg-light p-2 mb-3" key={value.id}>
                <Row>
                  <Row>
                    <Col sm={2}>
                      <Link
                        to={`/product/${value.productType}/${value.productId}`}
                      >
                        <img
                          src={value.imgUrl}
                          className="rounded mx-auto d-block rounded"
                          alt="sss"
                          height={100}
                          width={100}
                        />
                      </Link>
                    </Col>
                    <Col sm={8} className="mt-2">
                      <Link
                        className="link"
                        to={`/product/${value.productType}/${value.productId}`}
                      >
                        {value.heading}
                      </Link>
                      <div>{value.subHeading}</div>
                      <div className="text-muted">
                        Price:
                        <span>
                          <strong> Rs.{value.price} &nbsp;</strong>
                        </span>
                        Color: <strong> {value.color}</strong>, Size:{" "}
                        <strong> {value.size} &nbsp;</strong>
                      </div>
                    </Col>
                    <Col sm={2}>
                      <div className="d-grid gap-2 mt-3">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={handleShowDelete}
                        >
                          Remove
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleCart(value)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Row>
                <Modal show={showDelete} centered onHide={handleCloseDelete}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="">Are you sure</p>
                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        variant="light"
                        className="me-2"
                        onClick={handleCloseDelete}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => confirmDelete(value.id)}
                      >
                        Confirm Delete
                      </Button>
                    </div>
                  </Modal.Body>
                </Modal>
              </Card>
            );
          })}
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  );
}

export default Wishlist;
