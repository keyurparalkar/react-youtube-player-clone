import { HiMiniPlay, HiMiniPause } from "react-icons/hi2";
import styled from "styled-components";

const StyledPlayPauseButton = styled.button`
  background-color: transparent;
  border: none;
  width: 40px;
  float: left;
  color: inherit;
`;

export type PlayButtonProps = {
  onClick: () => void;
  isPlaying?: boolean;
};

const PlayButton = ({ onClick, isPlaying }: PlayButtonProps) => {
  return (
    <StyledPlayPauseButton onClick={onClick}>
      {isPlaying ? <HiMiniPause size="35px" /> : <HiMiniPlay size="35px" />}
    </StyledPlayPauseButton>
  );
};

export default PlayButton;
