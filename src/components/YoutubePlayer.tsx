import { useRef, useState } from "react";
import styled from "styled-components";
import BezelIcon from "./BezelIcon";
import PlayButton from "./PlayButton";

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

const StyledVideoControl = styled.div`
  position: absolute;
  width: 100%;
  color: #eee;
  bottom: 0rem;
  background: #ffffff00;
  background: linear-gradient(180deg, #ffffff00, #010101);
  display: none;
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
      <StyledVideoControl className="video-controls">
        <PlayButton onClick={onPlayPause} isPlaying={isPlaying} />
        <div id="volume"></div>
      </StyledVideoControl>
    </StyledVideoContainer>
  );
};

export default YoutubePlayer;
