import { useContext, useEffect, useRef } from "react";
import { PlayerContext, PlayerDispatchContext } from "../context";
import { PLAY_PAUSE } from "../context/actions";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlaying, muted, volume } = useContext(PlayerContext);
  const dispatch = useContext(PlayerDispatchContext);

  const onPlayPause = () => {
    dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
  };

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted;
    }
  }, [muted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div onClick={onPlayPause} className="html-video-container">
      <video
        ref={videoRef}
        src="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4"
      />
    </div>
  );
};

export default Video;
