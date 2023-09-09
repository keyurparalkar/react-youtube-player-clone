import { useRef, useState } from "react";
import styled from "styled-components";

import BezelIcon from "./BezelIcon";
import ControlToolbar from "./ControlToolbar";

const StyledVideoContainer = styled.div<{ isPlaying: boolean }>`
  position: relative;
  width: fit-content;

  & .video-controls {
    display: ${(props) => (props.isPlaying ? "none" : "block")};
  }

  &:hover .video-controls {
    display: block;
  }
`;

const YoutubePlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const onPlayPause = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      setIsPlaying(video.paused);
      if (video.paused || video.ended) {
        video.play();
        // setIsPlaying(false);
      } else {
        video.pause();
        // setIsPlaying(true);
      }
    }
  };

  return (
    <StyledVideoContainer isPlaying={isPlaying}>
      <div onClick={onPlayPause} className="html-video-container">
        <video
          ref={videoRef}
          src="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4"
        />
      </div>
      <BezelIcon isPlaying={isPlaying} />
      <ControlToolbar onClick={onPlayPause} isPlaying={isPlaying} />
    </StyledVideoContainer>
  );
};

export default YoutubePlayer;
