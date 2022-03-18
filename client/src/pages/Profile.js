import React, { useState, useEffect } from "react";
import AddressComponent from "../components/Profile/AddressComponent";
import ProfileComponent from "../components/Profile/ProfileComponent";
import MineimagesComponent from "../components/Profile/MineimagesComponent";
function Profile() {	
	
  return (
    <div>
      <ProfileComponent />
      <AddressComponent />
      <MineimagesComponent />
    
    </div>
  );
}

export default Profile;
