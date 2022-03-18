import React from "react";
import "../App.css";

import ImagesComponent from "../components/Home/ImagesComponent";
import { Button, Form, FormControl } from "react-bootstrap";

function Home() {
  return (
    <div>
      <div className="MainComponent">
      <div className="hero-image">
        <img src={require("../assets/images/bg.jpg")}></img>
      </div>

      <div className="home-text">
        <h1 className="title">MineImages</h1>
        <p>Welcome to our website</p>

        <Form className="d-flex search__form">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success" className="btn__search">Search</Button>
        </Form>
      </div>

      <div id="myBtnContainer">
        <button className="btn active"> Show all</button>
        <button className="btn"> Nature</button>
        <button className="btn"> Cars</button>
        <button className="btn"> People</button>
      </div>

      <h4 className="text-center font-weight-light text-light mb-3">React Gallery with Bootstrap</h4>
        <ImagesComponent />

    </div>
    </div>
  );
}

export default Home;
