import React, { useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Authen } from "../utils/api";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  

  const navigate = useNavigate();

  const signin = () => {
    const login = Authen(username, password);
    setAuthState(login);
    if (login) navigate("/");

  };

  return (
    <div className="container py-5 h-100">
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            {/* <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to homepage
            </Card.Link> */}
          </p>
          <Row className="justify-content-center form-bg-image">
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to Mineimages</h3>
                </div>
                <Form.Group id="username" className="mb-4">
                  <Form.Label>Your username</Form.Label>
                  <InputGroup
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  >
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </InputGroup.Text>
                    <Form.Control
                      autoFocus
                      required
                      type="username"
                      placeholder="username"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    >
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox">
                      <FormCheck.Input id="defaultCheck5" className="me-2" />
                      <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                        Remember me
                      </FormCheck.Label>
                    </Form.Check>
                    <Card.Link className="small text-end">
                      Lost password?
                    </Card.Link>
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-success w-100"
                  onClick={signin}
                >
                  Sign in
                </Button>
                {/* </Form> */}

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <a href="/signup">
                    {" "}
                    <span className="fw-normal">Not registered?</span>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default SignIn;
