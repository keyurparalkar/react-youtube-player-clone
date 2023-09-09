import styled from "styled-components";
import PlayButton, { PlayButtonProps } from "./PlayButton";

const StyledVideoControl = styled.div`
  position: absolute;
  width: 100%;
  color: #eee;
  bottom: 0rem;
  background: #ffffff00;
  background: linear-gradient(180deg, #ffffff00, #010101);
  display: none;
`;

const ControlToolbar = ({
  onClick: onPlayPause,
  isPlaying,
}: PlayButtonProps) => {
  return (
    <StyledVideoControl className="video-controls">
      <PlayButton onClick={onPlayPause} isPlaying={isPlaying} />
      <div id="volume"></div>
    </StyledVideoControl>
  );
};

export default ControlToolbar;
