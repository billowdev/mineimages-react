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
      <Tab eventKey="history" title="History"></Tab>
    </Tabs>
  );
}

export default MineimagesComponent;
