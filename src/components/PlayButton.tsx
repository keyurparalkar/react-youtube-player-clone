import { HiMiniPlay, HiMiniPause } from "react-icons/hi2";
import { StyledIconButton } from "./utilities";

export type PlayButtonProps = {
  onClick: () => void;
  isPlaying?: boolean;
};

const PlayButton = ({ onClick, isPlaying }: PlayButtonProps) => {
  return (
    <StyledIconButton onClick={onClick}>
      {isPlaying ? <HiMiniPause size="35px" /> : <HiMiniPlay size="35px" />}
    </StyledIconButton>
  );
};

export default PlayButton;
