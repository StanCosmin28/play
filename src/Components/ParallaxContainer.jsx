import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "./Section";
import HorizontalScrollSection from "./HorizontalScrollSection";
import Box from "./Box";
import StackCollapseSections from "./StackCollapseSections";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ParallaxContainer = () => {
  // Refs for GSAP animations
  const horizontalSectionRef = useRef(null);

  useEffect(() => {
    // Cleanup function to avoid memory leaks
    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div className="parallax-app">
      {/* Vertical scroll sections */}
      <Section className="purple">
        <h1>Big Title</h1>
      </Section>

      <Section className="red">
        <h2>Second Section</h2>
      </Section>

      {/* Horizontal scroll section */}
      <HorizontalScrollSection ref={horizontalSectionRef} />

      {/* More vertical scroll sections */}
      <Section className="green">
        <Box className="box-3">3</Box>
      </Section>
    </div>
  );
};

export default ParallaxContainer;
