// // components/TiltCard.tsx
// "use client";

// import { ReactNode, useEffect, useRef } from "react";

// type Props = {
//   children: ReactNode;
//   className?: string;
//   maxTilt?: number; // degrees
//   perspective?: number; // px
//   scale?: number; // hover scale
//   lift?: number; // px translateY on hover
// };

// export default function TiltCard({
//   children,
//   className = "",
//   maxTilt = 10,
//   perspective = 950,
//   scale = 1.02,
//   lift = 4,
// }: Props) {
//   const ref = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
//     const reduceMotion = !!mq?.matches;
//     if (reduceMotion) return;

//     let raf = 0;
//     let hovering = false;

//     const setTransform = (rx: number, ry: number, s: number, ty: number) => {
//       el.style.transform = `perspective(${perspective}px) translateY(${ty}px) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`;
//     };

//     const onEnter = () => {
//       hovering = true;
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => setTransform(0, 0, scale, -lift));
//     };

//     const onMove = (e: MouseEvent) => {
//       if (!hovering) return;

//       const r = el.getBoundingClientRect();
//       const px = (e.clientX - r.left) / r.width; // 0..1
//       const py = (e.clientY - r.top) / r.height; // 0..1

//       // clamp (safety)
//       const cx = Math.max(0, Math.min(1, px));
//       const cy = Math.max(0, Math.min(1, py));

//       const rotY = (cx - 0.5) * (maxTilt * 2);
//       const rotX = (0.5 - cy) * (maxTilt * 2);

//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => {
//         // slightly dampen rotation for smoothness
//         setTransform(
//           Number(rotX.toFixed(2)),
//           Number(rotY.toFixed(2)),
//           scale,
//           -lift
//         );
//       });
//     };

//     const onLeave = () => {
//       hovering = false;
//       cancelAnimationFrame(raf);
//       raf = requestAnimationFrame(() => setTransform(0, 0, 1, 0));
//     };

//     el.addEventListener("mouseenter", onEnter);
//     el.addEventListener("mousemove", onMove);
//     el.addEventListener("mouseleave", onLeave);

//     return () => {
//       el.removeEventListener("mouseenter", onEnter);
//       el.removeEventListener("mousemove", onMove);
//       el.removeEventListener("mouseleave", onLeave);
//       cancelAnimationFrame(raf);
//     };
//   }, [maxTilt, perspective, scale, lift]);

//   return (
//     <div
//       ref={ref}
//       className={`will-change-transform transition-transform duration-200 ease-out ${className}`}
//       style={{
//         transform: `perspective(${perspective}px) translateY(0px) scale(1) rotateX(0deg) rotateY(0deg)`,
//       }}
//     >
//       {children}
//     </div>
//   );
// }
// components/TiltCard.tsx
"use client";

import { ReactNode, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;      // Reduced default to 4 for a subtle, premium feel
  perspective?: number;  // px
  scale?: number;        // subtle scale up
  lift?: number;         // px lift
};

export default function TiltCard({
  children,
  className = "",
  maxTilt = 4,           // Subtle tilt
  perspective = 1000,
  scale = 1.01,          // Very slight scale
  lift = 5,              // Clean lift
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of card (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Calculate rotation: multiply by maxTilt
    // rotateY is affected by horizontal movement (x)
    // rotateX is affected by vertical movement (y) - inverted
    setRotateY(x * maxTilt * 2);
    setRotateX(-y * maxTilt * 2);
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform transition-all duration-300 ease-out ${className}`}
      style={{
        transform: isHovering 
          ? `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateY(-${lift}px)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}