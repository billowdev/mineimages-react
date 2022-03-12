import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();

  const signin = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/signin", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        Cookies.set("access-token", response.data, { expires: 30 });
        setAuthState(true);
        navigate("/");
      }
    });
  };

  return (
    <div className="container py-5 h-100">
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Login Form</h1>
          </div>
        </div>
      <div className="row d-flex align-items-center justify-content-center h-100">
        <div className="col-md-7 col-lg-5 col-xl-6 mt-5">

          <div className="form-outline mb-4">
            <input
              className="form-control form-control-lg"
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="form-outline mb-4">
            <input
              className="form-control form-control-lg"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button className="btn btn-primary" onClick={signin}> SignIn </button>


          
        </div>
      </div>
    </div>
  );
}

export default SignIn;
