import { useContext, useEffect, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../context';
import { HAS_VIDEO_LOADED, PLAY_PAUSE, UPDATE_VIDEO_CURRENT_TIME } from '../context/actions';

// Importing files locally
import myvideo from '../assets/videos/myvideo.mp4';
import thumbnailVtt from '../assets/videos/myvideo.vtt';

const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const trackRef = useRef<HTMLTrackElement>(null);
    const { isPlaying, muted, volume, currentTime, hasSeeked } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const onPlayPause = () => {
        dispatch({ type: PLAY_PAUSE, payload: !isPlaying });
    };

    const handleTimeUpdate = () => {
        if (videoRef.current && !hasSeeked) {
            dispatch({
                type: UPDATE_VIDEO_CURRENT_TIME,
                payload: {
                    currentTime: videoRef.current.currentTime,
                },
            });
        }
    };

    // const onCueChange = (e: any) => {
    //     console.log({ e });
    // };

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
        if (videoRef.current) {
            videoRef.current.currentTime = currentTime;
        }
    }, [hasSeeked]);

    useEffect(() => {
        const video = videoRef.current;
        // const track = trackRef.current;

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

        // if (track) {
        //     track.addEventListener('cuechange', (e) => {
        //         console.log({ e });
        //     });
        // }

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
                <video onTimeUpdate={handleTimeUpdate} ref={videoRef}>
                    <source src={myvideo} type="video/mp4" />
                    <track ref={trackRef} default kind="subtitles" src={thumbnailVtt} />
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
                        duration: videoRef.current ? videoRef.current.duration : 0,
                        // percentageCompleted: videoRef.current
                        //     ? (videoRef.current.currentTime / videoRef.current.duration) * 100
                        //     : 0,
                        hasSeeked,
                    },
                    null,
                    2,
                )}
            </code>
        </>
    );
};

export default Video;
