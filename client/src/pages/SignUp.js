import React, { useContext } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, Authen } from "../utils/api";

import {
  Col,
  Row,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
} from "@themesberg/react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt, faSignature, faMobile } from "@fortawesome/free-solid-svg-icons";

function Registration() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const initialValues = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    telephone:"",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(5).max(70).required(),
    password: Yup.string().min(8).max(100).required(),
    email: Yup.string().min(4).max(150).required(),
    firstName: Yup.string().max(60).required(),
    lastName: Yup.string().max(60).required(),
    telephone: Yup.string(10).max(10).required(),
  });

  const onSubmit = (data) => {
   
    axios.post(`${API_URL}/auth/signup`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <Container>
      <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">
        Sign Up
      </h1>
      <Row className="mt-5">
        <div className="col-lg-12"></div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <Form>
              <div className="form-group">
                <label>First Name: </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faSignature} />
                  </div>
                  <ErrorMessage name="firstName" component="span" />
                  <Field
                    className="form-control"
                    type="text"
                    name="firstName"
                    placeholder="Your FirstName..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Last Name: </label>

                <div className="input-group">
                  <div className="input-group-text">
                  <FontAwesomeIcon icon={faSignature} />
                  </div>
                  <ErrorMessage name="lastName" component="span" />
                  <Field
                    className="form-control"
                    type="text"
                    name="lastName"
                    placeholder="Your LastName..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Username: </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <ErrorMessage name="username" component="span" />
                  <Field
                    className="form-control"
                    autoComplete="off"
                    name="username"
                    placeholder="(Ex. John123...)"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password: </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faUnlockAlt} />
                  </div>
                  <ErrorMessage name="password" component="span" />
                  <Field
                    className="form-control"
                    autoComplete="off"
                    type="password"
                    name="password"
                    placeholder="Your Password..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email: </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <ErrorMessage name="email" component="span" />
                  <Field
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="exsample@domain.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number: </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FontAwesomeIcon icon={faMobile} />
                  </div>
                  <ErrorMessage name="telephone" component="span" />
                  <Field
                    className="form-control"
                    type="telephone"
                    name="telephone"
                    placeholder="0987654321"
                  />
                </div>
              </div>
              <div className="d-grid mt-4">
                <button className="btn btn-success btn-block" type="submit">
                  Register
                </button>
              </div>
            </Form>
          </Col>
        </Formik>
      </Row>
    </Container>
  );
}

export default Registration;
