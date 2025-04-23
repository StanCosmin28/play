import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import Particles from "./Particles";
import ImageToParticle from "react-image-particles";
// import test from "./assets/test.png";
import btg from "./assets/btg.png";

import "./App.css";

function App() {
  return (
    <>
      <div>
        <p>Particles Component</p>
        <ImageToParticle
          path={btg}
          width={500}
          height={500}
          numParticles={1500}
        />
        {/* <Particles /> */}
      </div>
    </>
  );
}

export default App;
