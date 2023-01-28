import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAccountCreated,
  clearAuthError,
  loginAccount,
} from "../store/features/userSlice";

function Login() {
  const {
    error,
    profileLoading,
    loginButtonBasedOnProfile,
    createAccountBtnClickForLogin,
  } = useSelector((state) => state.user);
  console.log("profileLoading:", profileLoading);
  console.log("loginButtonBasedOnProfile:", loginButtonBasedOnProfile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(clearAccountCreated());
  }, []);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const loca = window.location.pathname;
  console.log("loca:", loca);
  useEffect(() => {
    if (profileLoading === false && createAccountBtnClickForLogin === false) {
      navigate(-1);
    }
  }, [profileLoading, navigate, createAccountBtnClickForLogin]);

  useEffect(() => {
    if (profileLoading === false && createAccountBtnClickForLogin === true) {
      navigate("/");
    }
  }, [profileLoading, navigate, createAccountBtnClickForLogin]);

  const handleForm = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (email === "" || password === "") {
      return alert("Please fill");
    }

    if (password.length < 6) {
      return alert("Password length should be 6 words");
    }

    dispatch(loginAccount({ email, password }));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Container>
        <Row style={{ marginTop: "120px" }}>
          <Col sm={4}></Col>
          <Col sm={4}>
            <Card className="shadow-sm">
              <Card.Header>Gullar</Card.Header>
              {error && (
                <h6 className="text-center text-danger mt-3">
                  <kbd>{error}</kbd>
                </h6>
              )}
              <Card.Body>
                <Form onSubmit={submitForm}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleForm}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleForm}
                    />
                  </Form.Group>
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      size="md"
                      disabled={loginButtonBasedOnProfile}
                    >
                      {!loginButtonBasedOnProfile ? "Login" : "Wait..."}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Link to="/forgotpassword" className="text-center mb-3">
                Forgot Password
              </Link>
              <Link to="/create-account" className="text-center mb-3">
                Create new account
              </Link>
            </Card>
          </Col>
          <Col sm={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
