import { useContext, useEffect, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../context';
import { HAS_VIDEO_LOADED, PLAY_PAUSE, UPDATE_VIDEO_CURRENT_TIME } from '../context/actions';

const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { isPlaying, muted, volume } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const onPlayPause = () => {
        dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            dispatch({
                type: UPDATE_VIDEO_CURRENT_TIME,
                payload: {
                    currentTime: videoRef.current.currentTime,
                    totalDuration: videoRef.current.duration,
                },
            });
        }
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

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadeddata', () => {
                dispatch({ type: HAS_VIDEO_LOADED, payload: true });
            });
        }

        return () => {
            video &&
                video.removeEventListener('loadeddata', () => {
                    console.log('Loadeddata event removed');
                });
        };
    }, []);

    return (
        <div onClick={onPlayPause} className="html-video-container">
            <video
                onTimeUpdate={handleTimeUpdate}
                ref={videoRef}
                src="http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4"
            />
        </div>
    );
};

export default Video;
