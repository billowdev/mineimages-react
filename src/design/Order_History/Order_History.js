import React from "react";
function Order_History() {
  return (
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
  );
}
export default Order_History;
