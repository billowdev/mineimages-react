import React from "react";
import "../../assets/css/style.css";
import ImagesComponent from "./components/ImagesComponent";
import { Button, Form, FormControl } from "react-bootstrap";

function Home() {
  return (
    <>
      <div className="home-body">
        <header class="page-header d-flex align-items-center">
          <div class="container">
            <h1 class="fw-bold"> MineImages </h1>
            <h2> Welcome </h2>
          </div>
        </header>
        <section class="container">
          <div class="row justify-content-center">
            <section class="col-12 col-md-8">
              <img
                src={require("../../assets/images/mineimageslogo.png")}
                class="avatar"
                alt=""
              />
              <div class="input-group mb-3">
               
                  <input
                    type="search"
                    class="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <button type="submit" class="btn btn-outline-success">
                    search
                  </button>
           
              </div>
            </section>
          </div>
          <div class="row py-5 g-3">
            <section class="col-12 pb-3 text-center">
              <h3>รูปภาพ</h3>
            </section>
           <ImagesComponent></ImagesComponent>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
