import { AnimatePresence, motion } from "framer-motion";

function AnimationWrapper({
  children,
  intial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1.2 },
  keyValue,
  className,
}) {
  return (
    <motion.div
      key={keyValue}
      initial={intial}
      animate={animate}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimationWrapper;
