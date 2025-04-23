// import Particles from "./Particles";
import ImageToParticle from "react-image-particles";
// import test from "./assets/test.png";
import btg from "./assets/btg.png";
import Particles from "./Particles";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <p>Particles Component</p>
        {/* <ImageToParticle
          path={btg}
          width={500}
          height={500}
          numParticles={1500}
        /> */}
        <ImageToParticle
          path={btg}
          width={500}
          height={500}
          numParticles={500}
        />
      </div>

      <div style={{ width: "100%", height: "400px" }}>
        <Particles path={btg} particleSize={2} numParticles={1000} />
      </div>
    </>
  );
}

export default App;
