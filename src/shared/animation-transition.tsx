import { motion, useIsPresent } from "framer-motion";
import React from "react";

export const AnimationTransition: React.FC = () => {
  const isPresent = useIsPresent();

  return (
    <motion.div
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
      exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
      style={{ originX: isPresent ? 0 : 1 }}
      className="fixed inset-0 z-20 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors"
    />
  );
};
