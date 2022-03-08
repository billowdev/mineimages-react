import React from 'react'
import "../../App.css"
import "./MainComponents.css"

function MainComponent() {
  return (
    <div className='MainComponent'>
        <div className="hero-image">
    <div className="hero-text">
      <h1 className='title'>I am Mineimages</h1>
      <p>And I'm a Photographer</p>
      <button>Hire me</button>
    </div>
  </div>
  
        <div id="myBtnContainer">
        <button className="btn active" > Show all</button>
        <button className="btn" > Nature</button>
        <button className="btn" > Cars</button>
        <button className="btn"> People</button>
        
      </div>

    </div>
  )
}

export default MainComponent