"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedReveal({
  children,
  className,
  delay = 0,
}: AnimatedRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.21, 1, 0.35, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
