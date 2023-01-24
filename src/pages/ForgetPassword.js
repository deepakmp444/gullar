import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearForgotPasswordInfoAndError,
  userForgotPassword,
} from "../store/features/userSlice";
import emailIsValid from "../utils/EmailValidation";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const { forgotPasswordInfo, forgotPasswordInfoError } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    let timer1 = setTimeout(
      () => dispatch(clearForgotPasswordInfoAndError()),
      4000
    );
    return () => {
      clearTimeout(timer1);
    };
  }, [dispatch, forgotPasswordInfo, forgotPasswordInfoError]);

  const onClickBack = () => {
    navigate(-1);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const checkEmail = emailIsValid(email);
    if (checkEmail === false) {
      return alert("It should be email");
    }
    console.log("checkEmail:", checkEmail);
    dispatch(userForgotPassword({ email }));
  };
  return (
    <Container>
      <Row style={{ marginTop: "120px" }}>
        <Col sm={4}></Col>
        <Col sm={4}>
          <Card className="shadow-sm">
            <Card.Header>Forgot Password</Card.Header>
            <Card.Body>
              <h6 className="mt-2 mb-2">
                {forgotPasswordInfoError && (
                  <kbd>{forgotPasswordInfoError}</kbd>
                )}
              </h6>
              <h6 className="mt-2 mb-2">
                {forgotPasswordInfo && <kbd>{forgotPasswordInfo}</kbd>}
              </h6>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleForgotPassword}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <button className="btn btn-light mb-3" onClick={onClickBack}>
              Back
            </button>
          </Card>
        </Col>
        <Col sm={4}></Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
