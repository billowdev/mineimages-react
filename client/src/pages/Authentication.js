import React, { useEffect, useState } from "react";
import { Activation } from "../utils/api";
function Authentication() {
  const [activated, setActivated] = useState();

  useEffect(() => {
    const data = window.location.pathname.split("/");
    const token = { token: data[3] };
    const state = Activation(token)
		
	console.log(state)
  }, []);

  // console.log(activated)
  return (
    <div>
      Authentication
      {activated && <h2>Activated~</h2>}
    </div>
  );
}

export default Authentication;
