// import React, { useRef, useEffect } from "react";

// // Throttle function to limit event frequency
// const throttle = (func, limit) => {
//   let lastFunc;
//   let lastRan;
//   return (...args) => {
//     if (!lastRan) {
//       func(...args);
//       lastRan = Date.now();
//     } else {
//       clearTimeout(lastFunc);
//       lastFunc = setTimeout(() => {
//         if (Date.now() - lastRan >= limit) {
//           func(...args);
//           lastRan = Date.now();
//         }
//       }, limit - (Date.now() - lastRan));
//     }
//   };
// };

// // Detect mobile device
// const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

// const Particles = ({
//   path,
//   width = "100%",
//   height = "100%",
//   particleSize = 2,
//   numParticles = null,
// }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     console.log("Particles: Initializing component");
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const parent = canvas.parentElement;

//     // Responsive canvas sizing
//     const resizeCanvas = () => {
//       canvas.width = Math.min(parent.clientWidth, 600); // Cap for performance
//       canvas.height = parent.clientHeight || canvas.width;
//       console.log(
//         `Particles: Canvas resized to ${canvas.width}x${canvas.height}`
//       );
//     };
//     resizeCanvas();
//     window.addEventListener("resize", resizeCanvas);

//     // Particle settings
//     const particleSizeAdjusted = isMobile ? particleSize * 1.5 : particleSize;
//     const gridSize = (canvas.width + canvas.height) / (isMobile ? 5 : 7); // Larger cells
//     const maxParticles = isMobile ? 200 : numParticles || 400;
//     const interactionRadius = gridSize * 2;

//     // Simplified grid (array-based)
//     const gridRows = Math.ceil(canvas.height / gridSize);
//     const gridCols = Math.ceil(canvas.width / gridSize);
//     const grid = Array.from({ length: gridRows }, () =>
//       Array.from({ length: gridCols }, () => [])
//     );

//     // Mouse/touch interaction
//     let mouse = { x: null, y: null };
//     let isActive = false;

//     const handleMove = throttle(
//       (e) => {
//         const rect = canvas.getBoundingClientRect();
//         let clientX, clientY;
//         if (e.type === "mousemove") {
//           clientX = e.clientX;
//           clientY = e.clientY;
//         } else if (e.type === "touchmove") {
//           e.preventDefault();
//           const touch = e.touches[0];
//           clientX = touch.clientX;
//           clientY = touch.clientY;
//         }
//         mouse.x = clientX - rect.left;
//         mouse.y = clientY - rect.top;
//         isActive = true;
//         console.log(`Particles: Move detected at (${mouse.x}, ${mouse.y})`);
//       },
//       isMobile ? 100 : 50
//     );

//     window.addEventListener("mousemove", handleMove);
//     window.addEventListener("touchmove", handleMove, { passive: false });

//     // Particle initialization
//     let particles = [];
//     let imageLoaded = false;
//     let needsRedraw = true;

//     const initializeParticles = (imageData, width, height) => {
//       console.log("Particles: Initializing particles");
//       const pixelCount = imageData
//         ? imageData.data.filter(
//             (_, i) => i % 4 === 3 && imageData.data[i] > 128
//           ).length
//         : width * height;
//       const particleLimit = Math.min(maxParticles, pixelCount);

//       // Fallback: Generate particles if no image data
//       const data = imageData || {
//         width,
//         height,
//         data: new Uint8ClampedArray(width * height * 4).fill(255),
//       };
//       const step = Math.max(
//         1,
//         Math.floor(data.width / Math.sqrt(particleLimit))
//       ); // Skip pixels

//       for (let y = 0; y < data.height; y += step) {
//         for (let x = 0; x < data.width; x += step) {
//           const index = (y * data.width + x) * 4;
//           if (!imageData || data.data[index + 3] > 128) {
//             if (
//               numParticles &&
//               particleLimit < pixelCount &&
//               Math.random() > particleLimit / pixelCount
//             ) {
//               continue;
//             }
//             const scaledX =
//               0.1 * canvas.width + 0.8 * (x / data.width) * canvas.width;
//             const scaledY =
//               0.1 * canvas.height + 0.8 * (y / data.height) * canvas.height;
//             const color = imageData
//               ? `rgb(${data.data[index]},${data.data[index + 1]},${
//                   data.data[index + 2]
//                 })`
//               : "#ffffff";

//             const particle = {
//               x: scaledX,
//               y: scaledY,
//               baseX: scaledX,
//               baseY: scaledY,
//               color,
//               size: particleSizeAdjusted,
//               density: 10 * Math.random() + 1, // Lower density
//               gridRow: Math.floor(scaledY / gridSize),
//               gridCol: Math.floor(scaledX / gridSize),
//               update: function () {
//                 if (!isActive || mouse.x === null || mouse.y === null)
//                   return false;
//                 const dx = mouse.x - this.x;
//                 const dy = mouse.y - this.y;
//                 const distance = dx * dx + dy * dy;
//                 if (distance < interactionRadius * interactionRadius) {
//                   const force =
//                     (1 - distance / (interactionRadius * interactionRadius)) *
//                     this.density *
//                     0.3;
//                   this.x -= (dx / interactionRadius) * force;
//                   this.y -= (dy / interactionRadius) * force;
//                   this.calculateGridPosition();
//                   return true;
//                 }
//                 return false;
//               },
//               draw: function () {
//                 ctx.fillStyle = this.color;
//                 ctx.beginPath();
//                 ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//                 ctx.fill();
//               },
//               calculateGridPosition: function () {
//                 const newRow = Math.floor(this.y / gridSize);
//                 const newCol = Math.floor(this.x / gridSize);
//                 if (newRow !== this.gridRow || newCol !== this.gridCol) {
//                   if (this.gridRow >= 0 && this.gridCol >= 0) {
//                     grid[this.gridRow][this.gridCol] = grid[this.gridRow][
//                       this.gridCol
//                     ].filter((p) => p !== this);
//                   }
//                   if (
//                     newRow >= 0 &&
//                     newRow < gridRows &&
//                     newCol >= 0 &&
//                     newCol < gridCols
//                   ) {
//                     grid[newRow][newCol].push(this);
//                     this.gridRow = newRow;
//                     this.gridCol = newCol;
//                   } else {
//                     this.gridRow = -1;
//                     this.gridCol = -1;
//                   }
//                 }
//               },
//               applyForceBackToOriginalPosition: function () {
//                 const dx = this.x - this.baseX;
//                 const dy = this.y - this.baseY;
//                 if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
//                   this.x -= dx / 25; // Smoother return
//                   this.y -= dy / 25;
//                   this.calculateGridPosition();
//                   return true;
//                 }
//                 return false;
//               },
//             };

//             particles.push(particle);
//             if (particle.gridRow >= 0 && particle.gridCol >= 0) {
//               grid[particle.gridRow][particle.gridCol].push(particle);
//             }
//           }
//         }
//       }
//       console.log(`Particles: Initialized ${particles.length} particles`);
//     };

//     // Load image
//     console.log(`Particles: Fetching image from ${path}`);
//     fetch(path)
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP ${res.status}`);
//         return res.blob();
//       })
//       .then(createImageBitmap)
//       .then((bitmap) => {
//         const offscreen = new OffscreenCanvas(canvas.width, canvas.height);
//         const offCtx = offscreen.getContext("2d");
//         offCtx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
//         const imageData = offCtx.getImageData(
//           0,
//           0,
//           canvas.width,
//           canvas.height
//         );
//         initializeParticles(imageData, canvas.width, canvas.height);
//         imageLoaded = true;
//         needsRedraw = true;
//         console.log("Particles: Image loaded successfully");
//       })
//       .catch((err) => {
//         console.error("Particles: Failed to load image:", err);
//         // Fallback: Initialize particles without image
//         initializeParticles(null, canvas.width, canvas.height);
//         imageLoaded = true;
//         needsRedraw = true;
//       });

//     // Animation loop
//     let lastFrame = 0;
//     const animate = (timestamp) => {
//       if (isMobile && timestamp - lastFrame < 66) {
//         // ~15fps on mobile
//         requestAnimationFrame(animate);
//         return;
//       }
//       lastFrame = timestamp;

//       if (!imageLoaded) {
//         requestAnimationFrame(animate);
//         return;
//       }

//       let moved = false;
//       if (isActive && mouse.x !== null && mouse.y !== null) {
//         const mouseRow = Math.floor(mouse.y / gridSize);
//         const mouseCol = Math.floor(mouse.x / gridSize);
//         const neighbors = [
//           [0, 0],
//           [0, 1],
//           [0, -1],
//           [1, 0],
//           [-1, 0],
//         ];

//         for (const [dr, dc] of neighbors) {
//           const row = mouseRow + dr;
//           const col = mouseCol + dc;
//           if (row >= 0 && row < gridRows && col >= 0 && col < gridCols) {
//             for (const particle of grid[row][col]) {
//               if (particle.update()) moved = true;
//             }
//           }
//         }
//       }

//       for (const particle of particles) {
//         if (particle.applyForceBackToOriginalPosition()) moved = true;
//       }

//       if (moved || needsRedraw) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         for (const particle of particles) {
//           particle.draw();
//         }
//         needsRedraw = false;
//         console.log("Particles: Frame rendered");
//       }

//       isActive = false;
//       requestAnimationFrame(animate);
//     };
//     requestAnimationFrame(animate);

//     // Cleanup
//     return () => {
//       window.removeEventListener("mousemove", handleMove);
//       window.removeEventListener("touchmove", handleMove);
//       window.removeEventListener("resize", resizeCanvas);
//       console.log("Particles: Cleaned up event listeners");
//     };
//   }, [path, particleSize, numParticles]);

//   // Inline styles
//   const styles = `
//     .particles-container {
//       width: 100%;
//       height: auto;
//       max-width: 100vw;
//       overflow: hidden;
//       position: relative;
//       background: #000; /* Fallback background */
//     }
//     canvas {
//       width: 100% !important;
//       height: auto !important;
//       display: block;
//       border: 1px solid #333; /* Debug border */
//     }
//   `;

//   return (
//     <div className="particles-container">
//       <canvas ref={canvasRef} />
//       <style>{styles}</style>
//     </div>
//   );
// };

// export default Particles;
