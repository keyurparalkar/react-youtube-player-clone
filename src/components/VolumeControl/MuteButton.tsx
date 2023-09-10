import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import { VolumeControlProps } from ".";
import { StyledIconButton } from "../utilities";

const MuteButton = ({
  muted,
  onMute,
}: Pick<VolumeControlProps, "muted" | "onMute">) => {
  const [isMuted, setIsMuted] = useState<boolean | undefined>(muted);
  const controls = useAnimationControls();

  const handleMuteClick = () => {
    if (onMute) {
      setIsMuted(!isMuted);
      onMute();
    }

    controls.start({
      pathLength: isMuted ? 0 : 1,
      transition: {
        duration: 0.5,
        ease: "linear",
      },
    });
  };

  return (
    <StyledIconButton onClick={handleMuteClick} iconSize="2rem">
      <motion.svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            transition: {
              duration: 1,
            },
          }}
        ></motion.path>
        <path d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5z"></path>
        <path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z" />
        <motion.path
          d="M 1,1 L 100,100"
          stroke-width="2"
          initial={{ pathLength: isMuted ? 1 : 0 }}
          animate={controls}
        />
      </motion.svg>
    </StyledIconButton>
  );
};

export default MuteButton;
