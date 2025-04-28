import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";x
import Box from "./Box";

const HorizontalScrollSection = React.forwardRef((props, ref) => {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);
  const scrollTweenRef = useRef(null);

  // Add to panels ref array
  const addToPanelsRef = (el) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Only initialize when we have all panels and container
    if (panelsRef.current.length === 0 || !containerRef.current) return;

    const totalPanels = panelsRef.current.length;
    const totalWidth = 100 * (totalPanels - 1);

    // Create the horizontal scroll animation
    scrollTweenRef.current = gsap.to(panelsRef.current, {
      xPercent: -totalWidth,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => `+=${window.innerWidth * totalPanels * 0.5}`,
        markers: true,
        anticipatePin: 1,
      },
    });

    return () => {
      // Cleanup GSAP animations safely
      if (scrollTweenRef.current && scrollTweenRef.current.scrollTrigger) {
        scrollTweenRef.current.scrollTrigger.kill();
      }
      scrollTweenRef.current?.kill?.();
    };
  }, []);

  // Generate 7 mini sections
  const renderMiniSections = () => {
    return Array.from({ length: 7 }).map((_, index) => (
      <article
        key={`panel-${index}`}
        ref={addToPanelsRef}
        className={`panel panel-${index + 1} ${
          index % 2 === 0 ? "blue" : "red"
        }`}
      >
        <div className="box-container">
          <Box className={`box-${index + 1}`}>{index + 1}</Box>
          <Box className={`box-${index + 1}-sub`}>{index + 1}.1</Box>
          {/* <Box className={`box-${index + 1}-sub`}>{index + 1}.2</Box> */}
          {/* <Box className={`box-${index + 1}-sub`}>{index + 1}.3</Box> */}
          {/* <Box className={`box-${index + 1}-sub`}>{index + 1}.4</Box> */}
        </div>
      </article>
    ));
  };

  return (
    <section className="section container" ref={containerRef}>
      {renderMiniSections()}
    </section>
  );
});

export default HorizontalScrollSection;
