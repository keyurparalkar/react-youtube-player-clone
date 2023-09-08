import { useRef, useState } from "react";
import styled from "styled-components";
import BezelIcon from "./BezelIcon";
import PlayButton from "./PlayButton";

const StyledVideoContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledVideoControl = styled.div`
  position: absolute;
  bottom: 1rem;
  width: 100%;
  color: #eee;
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
    <StyledVideoContainer>
      <div onClick={onPlayPause} className="html-video-container">
        <video
          ref={videoRef}
          src="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4"
        />
      </div>
      <BezelIcon isPlaying={isPlaying} />
      <StyledVideoControl id="video-controls">
        <PlayButton onClick={onPlayPause} isPlaying={isPlaying} />
        <div id="volume"></div>
      </StyledVideoControl>
    </StyledVideoContainer>
  );
};

export default YoutubePlayer;
