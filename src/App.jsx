// import Particles from "./Particles";
// import ImageToParticle from "react-image-particles";
// import test from "./assets/test.png";
// import btg from "./assets/btg.png";
// import Particles from "./Particles";
// import "./App.css";
// import Parallax from "./Components/Parallax";
import "./Components/parallax.css";
// import { GlobalStyles } from "./Components/GlobalStyles";
import ParallaxContainer from "./Components/ParallaxContainer";
import StackCollapseSections from "./Components/StackCollapseSections";
// import FocusCardDemo from "./Components/FocusCardDemo";
// import FocusCard from "./Components/FocusCard";
// import FocusCard from "./Components/FocusCard";

function App() {
  return (
    <>
      {/* <GlobalStyles /> */}
      <div className="app">
        <StackCollapseSections />
      </div>
      <ParallaxContainer />
      {/* <div style={{ minHeight: "100vh" }}>
        <StackCollapseSections />
      </div> */}
      {/* <Parallax /> */}
      {/* <div> */}
      {/* <p>Particles Component</p>
        <ImageToParticle
          path={btg}
          width={500}
          height={500}
          numParticles={1500}
        /> */}
      {/* <ImageToParticle
          path={btg}
          width={500}
          height={500}
          numParticles={500}
        /> */}
      {/* </div> */}

      {/* <div style={{ width: "100%", height: "400px" }}>
        <Particles path={btg} particleSize={2} numParticles={1000} />
      </div> */}
      {/* <FocusCard /> */}
      {/* <FocusCardDemo /> */}
    </>
  );
}

export default App;
