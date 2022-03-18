import React, { useContext } from "react";
import "./ProfileComponent.css";


function ProfileComponent() {

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-3">
        <div className="d-flex align-items-center">
          <div className="image">
            <img
              src="https://github.com/lacakp/lacakp/raw/main/Images/t_Panda.gif"
              className="rounded"
              width="155"
            />
          </div>
          <div className="ml-3 w-100">
            <h4 className="mb-0 mt-0">Akira Yamato</h4> <span>CEO SaneDev</span>
            <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
              <div class="d-flex flex-column">
                {" "}
                <span class="articles">About</span>{" "}
                <span class="number1">Web Developer </span>{" "}
              </div>
		
            </div>
            <div className="button mt-2 d-flex flex-row align-items-center">
              {" "}
              <button className="btn btn-sm btn-outline-primary w-100">
                MineImage
              </button>{" "}
              <button class="btn btn-sm btn-primary w-100 ml-2">Order</button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
