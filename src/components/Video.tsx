import { useContext, useEffect, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../context';
import {
    HAS_VIDEO_LOADED,
    PLAY_PAUSE,
    UPDATE_HOVERED_THUMBNAIL_URL,
    UPDATE_VIDEO_CURRENT_TIME,
} from '../context/actions';
import { constructUrl } from '../utils';

const { REACT_APP_BASE_URL, REACT_APP_VIDEO_URL, REACT_APP_VTT_URL } = process.env;
const VIDEO_SRC = constructUrl([REACT_APP_BASE_URL, REACT_APP_VIDEO_URL]);
const VTT_SRC = constructUrl([REACT_APP_BASE_URL, REACT_APP_VTT_URL]);

const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const trackRef = useRef<HTMLTrackElement>(null);
    const {
        isPlaying,
        muted,
        volume,
        currentTime,
        hoveredDuration,
        hoveredThumbnailUrl,
        isSeeking,
        totalDuration,
        hasVideoLoaded,
    } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const onPlayPause = () => {
        dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && isPlaying && !isSeeking) {
            dispatch({
                type: UPDATE_VIDEO_CURRENT_TIME,
                payload: {
                    currentTime: videoRef.current.currentTime,
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
        if (videoRef.current && (isSeeking || !isPlaying)) {
            videoRef.current.currentTime = currentTime;
        }
    }, [currentTime, isSeeking]);

    useEffect(() => {
        if (trackRef.current) {
            const { track } = trackRef.current;
            const allCues = track.cues;
            const cueIndex = Math.trunc(hoveredDuration);
            const currentCue = allCues?.[cueIndex];
            if (currentCue) {
                const { text } = currentCue as VTTCue;
                dispatch({ type: UPDATE_HOVERED_THUMBNAIL_URL, payload: text });
            }
        }
    }, [hoveredDuration]);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.addEventListener('loadeddata', () => {
                dispatch({
                    type: HAS_VIDEO_LOADED,
                    payload: {
                        hasVideoLoaded: true,
                        totalDuration: video.duration,
                    },
                });
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
        <>
            <div onClick={onPlayPause} className="html-video-container">
                <video onTimeUpdate={handleTimeUpdate} ref={videoRef} crossOrigin="">
                    <source src={VIDEO_SRC} type="video/mp4" />
                    <track ref={trackRef} default kind="metadata" src={VTT_SRC} />
                    test
                </video>
            </div>
            <code style={{ position: 'absolute' }}>
                {JSON.stringify(
                    {
                        isPlaying,
                        volume,
                        muted,
                        currentTime: currentTime,
                        totalDuration,
                        seeking: isSeeking,
                        hoveredDuration,
                        hoveredThumbnailUrl,
                        hasVideoLoaded,
                    },
                    null,
                    2,
                )}
            </code>
        </>
    );
};

export default Video;
