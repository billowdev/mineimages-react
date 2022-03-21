import React from "react";
import "../App.css";
import ImagesComponent from "../components/Home/ImagesComponent";
import { Button, Form, FormControl } from "react-bootstrap";

function Home() {
  return (
    // <div className="home-body">
    //   <div className="MainComponent">
    //     <div className="hero-image">
    //       <img src={require("../assets/images/bg.jpg")}></img>
    //     </div>

    //     <div className="home-text">
    //       <h1 className="title">MineImages</h1>
    //       <p>Welcome to our website</p>

    //       <Form className="d-flex search__form">
    //         <FormControl
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success" className="btn__search">
    //           Search
    //         </Button>
    //       </Form>
    //     </div>

    //     <div id="myBtnContainer">
    //       <button className="btn active"> Show all</button>
    //       <button className="btn"> Nature</button>
    //       <button className="btn"> Cars</button>
    //       <button className="btn"> People</button>
    //     </div>

    //     <h4 className="text-center font-weight-light text-light mb-3">
    //       React Gallery with Bootstrap
    //     </h4>
    //     {/* <ImagesComponent /> */}
    //   </div>
    // </div>

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
                src={require("../assets/images/img3.jpg")}
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
            {/* <blog-component v-for="blog in blogs" ></blog-component> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
