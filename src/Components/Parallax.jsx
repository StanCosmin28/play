import "./parallax.css";
// import gsap from "gsap";
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

export default function Parallax() {
  gsap.registerPlugin(ScrollTrigger);

  let panels = gsap.utils.toArray(".panel");

  let scrollTween = gsap.to(panels, {
    xPercent: -100 * (panels.length - 1.25),
    ease: "expo.inOut",
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      scrub: 0.1,
      start: "center center",
      end: "+=115",
      markers: true,
    },
  });

  gsap.utils.toArray(".section").forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      pin: true,
      pinSpacing: false,
      markers: true,
    });
  });

  return (
    <>
      <section class="section purple">
        <h1>Big Title</h1>
      </section>

      <section class="section container">
        <article class="panel panel-1 blue">
          <div class="box-1 box">1</div>
        </article>

        <article class="panel panel-2 red">
          <div class="box-container">
            <div class="box-2 box">2</div>
            <div class="box-2 box">2.1</div>
            <div class="box-2 box">2.2</div>
          </div>
        </article>
      </section>

      <section class="section green">
        <div class="box box-3">3</div>
      </section>

      <section class="section last gray">
        <div class=" box-3 box">4</div>
      </section>
    </>
  );
}
