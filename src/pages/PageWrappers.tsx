import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface FadingComponentWrapperProps {
  children: ReactNode;
  fadeDurationSec?: number;
}

export function FadingComponentWrapper({
  children,
  fadeDurationSec,
}: FadingComponentWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: fadeDurationSec ?? 0.5 }}
    >
      {children}
    </motion.div>
  );
}
