import { motion } from "framer-motion";
import { useContext } from "react";
import styled from "styled-components";
import { PlayerContext } from "../context";
import PlayButton from "./PlayButton";
import VolumeControl from "./VolumeControl";

const StyledVideoControl = styled(motion.div)<{ isPlaying?: boolean }>`
  position: absolute;
  width: 100%;
  color: #eee;
  bottom: 0rem;
  background: #ffffff00;
  background: linear-gradient(180deg, #ffffff00, #010101);
`;

const hoverMotion = {
  initial: (isPlaying: boolean) => {
    return {
      opacity: isPlaying ? 0 : 1,
    };
  },
  hover: {
    opacity: 1,
  },
};

const ControlToolbar = () => {
  const { isPlaying } = useContext(PlayerContext);

  return (
    <StyledVideoControl
      className="video-controls"
      /**
       * We add dynamic key here because we want to re-render the component.
       * Wwe are re-rendering this component because we want the framer's variants
       * to recieve latest custom props.
       * */
      key={`animate-onloade-${isPlaying}`}
      custom={isPlaying}
      layout
      variants={hoverMotion}
    >
      <PlayButton />
      <VolumeControl />
    </StyledVideoControl>
  );
};

export default ControlToolbar;
