import React, { useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import toast from "react-hot-toast";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();


  const signin = () => {
    // let status = false;
    if (email != "" && password != "") {
      const data = { email: email, password: password };
      const login = axios
        .post(`${API_URL}/auth/signin`, data)
        .then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            Cookies.set("access-token", response.data, { expires: 7 });
            // console.log("res=",response.data)
            setAuthState(true);
            navigate("/")
          }
        });
      toast.promise(login, {
        loading: "Loading...",
        success: "Sign in sucessfuly",
        error: "sign in failed",
      });
    }
    // if (status) {
    // toast.success("Sign In Successfully!");

    //   navigate("/");
    // } else {

    // }
  };

  return (
    <>
      <Container>
        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
          Sign in
        </h1>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <InputGroup
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                >
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    autoFocus
                    required
                    type="email"
                    placeholder="email"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
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
              <Button
                variant="btn btn-success btn-block mt-3 w-100"
                type="button"
                onClick={signin}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
        {/* <h6 className="mt-5 p-5 text-center text-secondary ">
          Copyright © 2021 Masud Rana. All Rights Reserved.
        </h6> */}
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default SignIn;