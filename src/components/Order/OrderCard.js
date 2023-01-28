import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderCancel } from "../../store/features/orderSlice";
import {
  addUserReview,
  clearGetReviewFromOrderProductUser,
  deleteOrdeReview,
  getReviewFromOrderProductUser,
  updateUserReview,
} from "../../store/features/reviewSlice";
import ReviewModalForm from "./ReviewModalForm";
import moment from "moment";
function OrderCard({ value }) {
  console.log("value:", value);
  const {
    updateReviewStatus,
    createdReviewStatus,
    deleteReviewStatus,
    singleReviewForUpdate,
  } = useSelector((state) => state.review);

  const { userProfile } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [userDescriptions, setUserDescriptions] = useState("");
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (singleReviewForUpdate[0]) {
      setUserRating(singleReviewForUpdate[0].rating);
      setUserDescriptions(singleReviewForUpdate[0].descriptions);
    }
  }, [singleReviewForUpdate]);

  useEffect(() => {
    if (singleReviewForUpdate.length === 0) {
      setUserRating("");
      setUserDescriptions("");
    }
  }, [singleReviewForUpdate]);

  useEffect(() => {
    if (deleteReviewStatus || createdReviewStatus || updateReviewStatus) {
      window.location.reload();
    }
  }, [deleteReviewStatus, createdReviewStatus, updateReviewStatus]);

  const userOrderCancel = (id) => {
    dispatch(orderCancel({ id }));
  };

  const handleClose = () => {
    setShow(false);
    dispatch(clearGetReviewFromOrderProductUser());
  };

  const handleDeleteReview = (reviewId) => {
    setShow(false);
    dispatch(deleteOrdeReview({ id: reviewId }));
  };

  const writeReview = () => {
    console.log("writeReview");
    dispatch(
      addUserReview({
        name: userProfile.name,
        rating: userRating,
        descriptions: userDescriptions,
        productId: productId,
        orderId: value.id,
        userId: userProfile.id,
      })
    );
  };

  const showModal = (productId) => {
    if (value.orderStatus !== "Pending" && value.orderStatus !== "Cancel") {
      setShow(true);
      setProductId(productId);
      dispatch(
        getReviewFromOrderProductUser({
          productId,
          orderId: value.id,
          userId: userProfile.id,
        })
      );
    } else {
      alert("Your order is not completed");
    }
  };

  const showModalUpdateReview = (id) => {
    setShow(true);
    dispatch(
      updateUserReview({
        rating: parseFloat(userRating),
        descriptions: userDescriptions,
        id,
      })
    );
  };

  return (
    <Card className="p-3 mb-3 bg-light">
      <Row>
        <Col sm={6}>
          <div>
            <strong>Order Id</strong>: {value.id}
            <span>
              {" "}
              &#x2022;<strong>{value.orderStatus}</strong>
            </span>
          </div>
          <div className="text-muted">
            Date: {moment(value.createdAt).format("LLLL")}
          </div>
        </Col>
        {value.orderStatus !== "Pending" && (
          <Col sm={6}>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => userOrderCancel(value.id)}
              disabled={value.orderStatus === "Cancel" ? true : false}
            >
              Cancel order
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="ms-2"
              disabled={
                value.trackingId === null || value.orderStatus === "Cancel"
              }
            >
              Track order
            </Button>
          </Col>
        )}
      </Row>
      <hr />
      <Row>
        <Col sm={4}>
          <div className="text-muted">Contact</div>
          <div>Name: {value.OrderAddress.name}</div>
          <div>Phone: {value.OrderAddress.phone}</div>
          <div>Email: {value.OrderAddress.email}</div>
        </Col>
        <Col sm={4}>
          <div className="text-muted">Shipping address</div>
          <div>{value.OrderAddress.landmark}</div>
          <div>{value.OrderAddress.city}</div>
          <div>{value.OrderAddress.state}</div>
          <div>{value.OrderAddress.pincode}</div>
        </Col>
        <Col sm={4}>
          <div className="text-muted">Payment</div>
          <div>
            <h6>
              {value.paymentStatus === "Pending" && (
                <Badge bg="warning">Pending</Badge>
              )}
              {value.paymentStatus !== "Pending" && (
                <Badge bg="success">
                  {value.paymentStatus === "true" ? "Success" : "Refunded"}
                </Badge>
              )}
            </h6>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        {value.ProductOrderList.map((productValue, index) => {
          return (
            <Col sm={4} className="mb-2" key={index}>
              <div className="d-flex">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded"
                    src={productValue.imgUrl}
                    height="50"
                    width="50"
                    alt="loading"
                  />
                </div>
                <div className="ms-3">
                  <div>{productValue.heading}</div>
                  <div>{productValue.subHeading}</div>
                  <div className="d-flex">
                    <div>{productValue.color}</div>
                    <div className="ms-2">{productValue.size}</div>
                  </div>
                  <div className="d-flex">
                    <div>QTY: {productValue.qty}</div>
                    <div className="ms-2">Price: {productValue.price}</div>
                  </div>
                </div>
              </div>
              {/* {value.orderStatus !== "Pending"} */}
              <Button
                variant="primary"
                size="sm"
                className="ms-2 mt-1"
                onClick={() => showModal(productValue.productId)}
                // disabled={value.trackingId === null ? true : false}
              >
                Your review
              </Button>
            </Col>
          );
        })}
      </Row>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewModalForm
            setUserRating={setUserRating}
            setUserDescriptions={setUserDescriptions}
            userRating={userRating}
            userDescriptions={userDescriptions}
          />
        </Modal.Body>
        <Modal.Footer>
          {singleReviewForUpdate[0] && (
            <Button
              variant="danger"
              onClick={() => handleDeleteReview(singleReviewForUpdate[0].id)}
            >
              Delete
            </Button>
          )}
          {singleReviewForUpdate[0] && (
            <Button
              variant="warning"
              onClick={() => showModalUpdateReview(singleReviewForUpdate[0].id)}
            >
              Update
            </Button>
          )}
          {!singleReviewForUpdate[0] && (
            <Button variant="primary" onClick={writeReview}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default OrderCard;
