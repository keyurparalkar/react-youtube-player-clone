import { useContext } from "react";
import styled from "styled-components";
import { PlayerContext } from "../context";
import PlayButton from "./PlayButton";
import VolumeControl from "./VolumeControl";

const StyledVideoControl = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  width: 100%;
  color: #eee;
  bottom: 0rem;
  background: #ffffff00;
  background: linear-gradient(180deg, #ffffff00, #010101);
  display: ${(props) => (props.isPlaying ? "none" : "block")};

  &:hover {
    display: block;
  }
`;

const ControlToolbar = () => {
  const { isPlaying } = useContext(PlayerContext);

  return (
    <StyledVideoControl isPlaying={isPlaying} className="video-controls">
      <PlayButton />
      <VolumeControl />
    </StyledVideoControl>
  );
};

export default ControlToolbar;
