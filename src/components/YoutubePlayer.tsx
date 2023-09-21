import { motion } from "framer-motion";
import styled from "styled-components";
import { PlayerProvider } from "../context";

import BezelIcon from "./BezelIcon";
import ControlToolbar from "./ControlToolbar";
import Video from "./Video";

const StyledVideoContainer = styled(motion.div)`
  position: relative;
  width: fit-content;
`;

const YoutubePlayer = () => {
  return (
    <PlayerProvider>
      <StyledVideoContainer initial="initial" whileHover="hover">
        <Video />
        <BezelIcon />
        <ControlToolbar />
      </StyledVideoContainer>
    </PlayerProvider>
  );
};

export default YoutubePlayer;
