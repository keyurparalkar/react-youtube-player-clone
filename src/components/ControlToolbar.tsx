import { forwardRef } from "react";
import styled from "styled-components";
import PlayButton, { PlayButtonProps } from "./PlayButton";
import VolumeControl, { VolumeControlProps } from "./VolumeControl";

type ControlToolbarProps = VolumeControlProps & PlayButtonProps;

const StyledVideoControl = styled.div`
  position: absolute;
  width: 100%;
  color: #eee;
  bottom: 0rem;
  background: #ffffff00;
  background: linear-gradient(180deg, #ffffff00, #010101);
  display: none;
`;

const ControlToolbar = (
  { onClick: onPlayPause, isPlaying, muted, volume, onMute }: ControlToolbarProps,
  ref: any
) => {
  /**
   * We can forward ref here
   * Make use of reducer to handle state logic
   * Move onPlayPause here and in the parent component make use of useImperativeHandle
   * Event handlers:
   * 1. onPlayPause
   * 2. onMute
   */
  return (
    <StyledVideoControl className="video-controls">
      <PlayButton onClick={onPlayPause} isPlaying={isPlaying} />
      <VolumeControl volume={volume} muted={muted} onMute={onMute}/>
    </StyledVideoControl>
  );
};

export default forwardRef(ControlToolbar);
