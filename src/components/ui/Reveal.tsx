"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  height?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  overflow?: "hidden" | "visible";
}

export const Reveal = ({ 
  children, 
  width = "100%", 
  height = "fit-content",
  delay = 0.2,
  direction = "up",
  className = "",
  overflow = "visible"
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
    },
  };

  if (reducedMotion) {
    return (
      <div className={cn(className, overflow === "hidden" && "contain-layout")} style={{ position: "relative", width, height, overflow }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(className, overflow === "hidden" && "contain-layout")}
      style={{ position: "relative", width, height, overflow }}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.45, delay, ease: [0.2, 0.65, 0.3, 1] }}
        className="will-change-transform"
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
};
