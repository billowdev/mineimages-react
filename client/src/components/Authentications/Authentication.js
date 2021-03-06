import React, { useEffect, useState } from "react";
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

import toast from "react-hot-toast";

function Authentication() {
  const [activated, setActivated] = useState();
  const API_URL = process.env.REACT_APP_API_URL;
  const axios = require("axios");

  useEffect(() => {
    const data = window.location.pathname.split("/");
    const token = { token: data[3] };
    const activate = axios.post(`${API_URL}/auth/email-activate`, token).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        setActivated(false);
      } else {
        setActivated(true);
      }
    });
    toast.promise(activate, {
      loading: "Loading...",
      success: "Activate account success",
      error: "link activation has already expriry",
    });
  }, []);

  // console.log(activated)
  return (
    <div>
      {activated && <Container>
          <Row className="mt-5">
            <div
              className="shadow-sm  p-3 text-center rounded"
              style={{ marginTop: "10rem" }}
            >
              <h1 className="text-success">
                Activate Account success <br />
                Welcome to mineimages
              </h1>
              <hr />
              <Button className="btn-success" href="/auth/signin">Sign in</Button>
            </div>
            
          </Row>
        </Container>}
      {!activated && (
        <Container>
          <Row className="mt-5">
            <div
              className="shadow-sm  p-3 text-center rounded"
              style={{ marginTop: "10rem" }}
            >
              <h1 className="text-warning">
                Account have been activated <br />
              </h1>
              <hr />
              <Button className="btn-success" href="/auth/signin">Sign in</Button>
            </div>
            
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Authentication;
