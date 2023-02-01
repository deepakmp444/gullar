import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAddress,
  orderAddressReducer,
  updateAddressIdReducer,
} from "../../store/features/addressSlice";
import DeleteIcon from "../Icons/DeleteIcon";

function AddressCard({ value, deleteButton = "true" }) {
  const deleteAddressStatus = useSelector(
    (state) => state.address.deleteAddressStatus
  );

  const [showDelete, setShowDelete] = useState(false);

  console.log("deleteAddressStatus:", deleteAddressStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteAddressStatus) {
      setShowDelete(false);
      window.location.reload();
    }
  }, [deleteAddressStatus]);

  const handleOptionChange = (value) => {
    dispatch(orderAddressReducer(value));
    dispatch(updateAddressIdReducer(value.id));
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const confirmDelete = (id) => {
    dispatch(deleteUserAddress({ id }));
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  return (
    <>
      <div>
        {/* <h5 className="text-center">OR</h5> */}
      </div>
      <Card className="p-4 mb-5" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="d-flex">
          <div>
            <Form.Check
              type="radio"
              id="address"
              name="address"
              onChange={() => handleOptionChange(value)}
            />
          </div>

          <div className="ms-2">
            <span>
              Name: <strong>{value.name}</strong>{" "}
            </span>
            <span className="ms-2">
              Email: <strong>{value.email}</strong>
            </span>
            <span className="ms-2">
              Phone: <strong>{value.phone}</strong>
            </span>
            <div>
              <span className="">
                State: <strong>{value.state}</strong>{" "}
              </span>
              <span className="ms-2">
                City: <strong>{value.city}</strong>{" "}
              </span>
              <span className="ms-2">
                Landmark: <strong>{value.landmark}</strong>{" "}
              </span>
              <span className="ms-2">
                Pincode: <strong>{value.pincode}</strong>{" "}
              </span>
            </div>
          </div>
        </div>
        {deleteButton === "true" && (
          <Row>
            <Col sm={4}>
              <button
                className="btn btn-danger btn-sm ms-4 mt-2"
                onClick={handleShowDelete}
              >
                Delete
                <DeleteIcon />
              </button>
            </Col>
          </Row>
        )}
      </Card>
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
            <Button variant="danger" onClick={() => confirmDelete(value.id)}>
              Confirm Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddressCard;
