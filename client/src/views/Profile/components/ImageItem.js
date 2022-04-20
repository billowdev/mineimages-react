import React from "react";

function ImageItem(props) {
  const { thumbnaiUrl } = props;
  return (
    <div className="ImageItem">
      <div className="ImageItem"></div>
      <img src={thumbnaiUrl} />
    </div>
  );
}

export default ImageItem;

