import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

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
    <div className="SignInContainer">
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={signin}> SignIn </button>
    </div>
  );
}

export default SignIn;
