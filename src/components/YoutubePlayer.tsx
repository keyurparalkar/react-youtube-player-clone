import styled from "styled-components";
import { PlayerProvider } from "../context";

import BezelIcon from "./BezelIcon";
import ControlToolbar from "./ControlToolbar";
import Video from "./Video";

const StyledVideoContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const YoutubePlayer = () => {
  return (
    <PlayerProvider>
      <StyledVideoContainer>
        <Video />
        <BezelIcon />
        <ControlToolbar />
      </StyledVideoContainer>
    </PlayerProvider>
  );
};

export default YoutubePlayer;
