
import { Variants } from 'framer-motion';

/**
 * Animation definitions for the Java Bridge component
 */
export const javaBridgeAnimation: Variants = {
  idle: {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
  },
  highlight: {
    boxShadow: "0 0 15px 5px rgba(0, 149, 255, 0.3)"
  },
  loading: {
    boxShadow: "0 0 10px 2px rgba(0, 149, 255, 0.2)",
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1
    }
  }
};

/**
 * Entrance animation for panels and cards
 */
export const panelAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * List item staggered animation
 */
export const listItemAnimation: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Container animation for staggered children
 */
export const listContainerAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Button hover animation
 */
export const buttonAnimation: Variants = {
  idle: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

/**
 * Alert notification animation
 */
export const alertAnimation: Variants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2
    }
  }
};
