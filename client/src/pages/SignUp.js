import React, {useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Registration() {
  const navigate = useNavigate();
  const { setAuthState } = useContext(AuthContext);
  const initialValues = {
    username: "",
    password: "",
    email:"",
	firstName:"",
	lastName:""
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
    axios.post("http://localhost:3001/signup", data).then((response) => {
		if (response.data.error) {
			alert(response.data.error);
		  } else {
			axios.post("http://localhost:3001/signin", {username:data.username,password:data.password}).then((response) => {
				if (response.data.error) {
				  alert(response.data.error);
				} else {
				  Cookies.set("access-token", response.data, { expires: 30 });
				  setAuthState(true);
				  navigate("/");
				}
			  });
			
		  }
    });
  };

  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="mt-5">Sign Up</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12"></div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form>
		  <div className="form-group">
              <label>First Name: </label>
              <ErrorMessage name="firstName" component="span" />
              <Field
                className="form-control"
                type="text"
                name="firstName"
                placeholder="Your FirstName..."
              />
            </div>

			<div className="form-group">
              <label>Last Name: </label>
              <ErrorMessage name="lastName" component="span" />
              <Field
                className="form-control"
                type="text"
                name="lastName"
                placeholder="Your LastName..."
              />
            </div>

            <div className="form-group">
              <label>Username: </label>
              <ErrorMessage name="username" component="span" />
              <Field
                className="form-control"
                autoComplete="off"
                name="username"
                placeholder="(Ex. John123...)"
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <ErrorMessage name="password" component="span" />
              <Field
                className="form-control"
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Your Password..."
              />
            </div>
			<div className="form-group">
              <label>Email: </label>
              <ErrorMessage name="email" component="span" />
              <Field
                className="form-control"
                type="email"
                name="email"
                placeholder="exsample@domain.com"
              />
            </div>
			<div className="form-group">
              <label>Phone Number: </label>
              <ErrorMessage name="telephone" component="span" />
              <Field
                className="form-control"
                type="telephone"
                name="telephone"
                placeholder="exsample@domain.com"
              />
            </div>
            <div className="d-grid mt-4">
              <button className="btn btn-primary btn-block" type="submit">
                Register
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
