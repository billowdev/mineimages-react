import React from "react";
import { Tab,Tabs } from 'react-bootstrap';
import ImageItem from "./ImageItem";

function MineimagesComponent() {
  return (
    <Tabs
      defaultActiveKey="posts"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="posts" title="Posts">
        <div className="App-grid">
          <div class="py-4 px-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="mb-0">Recent photos</h5>
              <a href="#" class="btn btn-link text-muted">
                Show all
              </a>
            </div>
            <div class="App-grid">
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            </div>
          </div>
          <div class="py-4 px-4">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="mb-0">Recent photos</h5>
              <a href="#" class="btn btn-link text-muted">
                Show all
              </a>
            </div>
            <div class="App-grid">
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
              <ImageItem thumbnaiUrl="https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
            </div>
          </div>
        </div>
      </Tab>
      <Tab eventKey="history" title="History">
      <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Order History</h5>
                </div>
                <div className="card-body">
                  {/* Single item */}
                  <div className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      {/* Image */}
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://images7.alphacoders.com/730/thumb-1920-730738.png"
                          className="w-100"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          />
                        </a>
                      </div>
                      {/* Image */}
                    </div>
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      {/* Data */}
                      <p>
                        <strong>Beatiful Girl</strong>
                      </p>
                      <p>Artist: <a href="https://www.google.com/" target="_blank">Smiler</a></p> 
                      <strong>Ordered On</strong>
                      <p>16/03/2022</p>

                      {/* Data */}
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      {/* Quantity */}
                      {/* Quantity */}
                      {/* Price */}
                      <p className="text-start text-md-center">
                        <strong>$17.99</strong>
                      </p>
                      {/* Price */}
                    </div>
                  </div>
                  {/* Single item */}
                  <hr className="my-4" />
                  {/* Single item */}
                  <div className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      {/* Image */}
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://images2.alphacoders.com/598/thumb-1920-598673.jpg"
                          className="w-100"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          />
                        </a>
                      </div>
                      {/* Image */}
                    </div>
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      {/* Data */}
                      <p>
                        <strong>Your Lie in April</strong>
                      </p>
                      <p>Artist: <a href="https://www.google.com/" target="_blank">PipapongZa</a></p>
                      <strong>Ordered On</strong>
                      <p>16/03/2022</p>
                      {/* Data */}
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      {/* Quantity */}

                      {/* Quantity */}
                      {/* Price */}
                      <p className="text-start text-md-center">
                        <strong>$17.99</strong>
                      </p>
                      {/* Price */}
                    </div>
                  </div>
                  {/* Single item */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

      </Tab>
    </Tabs>
  );
}

export default MineimagesComponent;
