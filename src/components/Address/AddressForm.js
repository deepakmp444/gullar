import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAddress,
  orderAddressReducer,
  updateRemoveAddressIdReducer,
  updateUserAddressId,
} from "../../store/features/addressSlice";
import { validRegex } from "../../utils/Validation";

function AddressForm({ hideButton = "false" }) {
  const { orderAddress, updateAddress, updateAddressId, updateAddressDB } =
    useSelector((state) => state.address);

  const dispatch = useDispatch();
  console.log("updateAddressDB:", updateAddressDB);
  const [formAddress, setFormAddress] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
  });

  const handleAddress = (e) => {
    e.preventDefault();
    setFormAddress({
      ...formAddress,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormAddress(orderAddress);
  }, [orderAddress]);

  useEffect(() => {
    dispatch(orderAddressReducer(formAddress));
  }, [dispatch, formAddress]);

  const updateUserAddress = (e) => {
    e.preventDefault();
    const areTruthy = Object.values(formAddress).every((value) => value);
    if (!areTruthy) {
      console.log("Please Enter address");
      return alert("Please Enter address");
    }

    if (!formAddress.email.match(validRegex)) {
      return alert("Please Enter email address");
    }

    dispatch(
      updateUserAddressId({
        name: orderAddress.name,
        email: orderAddress.email,
        phone: orderAddress.phone,
        state: orderAddress.state,
        city: orderAddress.city,
        landmark: orderAddress.landmark,
        pincode: orderAddress.pincode,
        addressId: updateAddressId,
      })
    );

    dispatch(updateRemoveAddressIdReducer());
    setFormAddress({
      name: "",
      phone: "",
      email: "",
      state: "",
      city: "",
      landmark: "",
      pincode: "",
    });
  };

  const addAddress = (e) => {
    e.preventDefault();
    const areTruthy = Object.values(formAddress).every((value) => value);
    if (!areTruthy) {
      console.log("Please Enter address");
      return alert("Please Enter address");
    }

    if (!formAddress.email.match(validRegex)) {
      return alert("Please Enter email address");
    }
    if(formAddress.phone.length <10){
      return alert("Phone number at least 10 Digit number");
    }
    if(formAddress.pincode.length <6){
      return alert("Pincode number at least 6 Digit number");
    }

    dispatch(
      addUserAddress({
        name: orderAddress.name,
        email: orderAddress.email,
        phone: orderAddress.phone,
        state: orderAddress.state,
        city: orderAddress.city,
        landmark: orderAddress.landmark,
        pincode: orderAddress.pincode,
      })
    );

    setFormAddress({
      name: "",
      phone: "",
      email: "",
      state: "",
      city: "",
      landmark: "",
      pincode: "",
    });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formAddress.name}
              onChange={handleAddress}
              placeholder="Enter name"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formAddress.email}
              onChange={handleAddress}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter phone number"
              name="phone"
              value={formAddress.phone}
              onChange={handleAddress}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              name="state"
              value={formAddress.state}
              onChange={handleAddress}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={formAddress.city}
              onChange={handleAddress}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicLandmark">
            <Form.Label>Landmark</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter landmark"
              name="landmark"
              value={formAddress.landmark}
              onChange={handleAddress}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicPincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter pincode"
              name="pincode"
              value={formAddress.pincode}
              onChange={handleAddress}
            />
          </Form.Group>
        </Col>
      </Row>
      {hideButton === "false" && (
        <div>
          {updateAddress ? (
            <button
              className="btn btn-warning mb-4"
              onClick={updateUserAddress}
            >
              Update
            </button>
          ) : (
            <button className="btn btn-primary mb-4" onClick={addAddress}>
              Submit
            </button>
          )}
        </div>
      )}
    </Form>
  );
}

export default AddressForm;
