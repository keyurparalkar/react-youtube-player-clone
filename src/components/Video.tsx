import { useContext, useEffect, useMemo, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext, StateProps } from '../context';
import {
    HAS_VIDEO_LOADED,
    PLAY_PAUSE,
    UPDATE_HOVERED_THUMBNAIL_URL,
    UPDATE_VIDEO_CURRENT_TIME,
} from '../context/actions';
import { VIDEO_INFO_1, VIDEO_INFO_2 } from '../utils/constants';

type OnLoadType = Partial<StateProps>;

const Video = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const trackMetaDataRef = useRef<HTMLTrackElement>(null);
    const trackChaptersRef = useRef<HTMLTrackElement>(null);

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
        chapters,
        shouldhaveStats,
        selectedSampleVideo,
    } = useContext(PlayerContext);

    const videoSourceInfo = useMemo(() => {
        if (selectedSampleVideo === 'Sample 2') {
            return VIDEO_INFO_2;
        }

        return VIDEO_INFO_1;
    }, [selectedSampleVideo]);

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
        if (trackMetaDataRef.current) {
            const { track } = trackMetaDataRef.current;
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
        if (videoRef.current) videoRef.current.load();
    }, [selectedSampleVideo]);

    useEffect(() => {
        const video = videoRef.current;

        if (video) {
            video.addEventListener('loadeddata', () => {
                //TODO(Keyur): Load frametrack details in the store
                const payload: OnLoadType = {
                    hasVideoLoaded: true,
                    totalDuration: video.duration,
                };

                if (trackChaptersRef.current) {
                    const { track } = trackChaptersRef.current;
                    const cues = track.cues;
                    if (cues) {
                        payload['chapters'] = (Object.values(cues) as VTTCue[]).map((cue: VTTCue, index) => ({
                            index,
                            chapterName: cue.text,
                            endTime: cue.endTime,
                            startTime: cue.startTime,
                            percentageTime: (((cue.endTime - cue.startTime) / video.duration) * 100).toFixed(2),
                        }));
                    }
                }

                dispatch({
                    type: HAS_VIDEO_LOADED,
                    payload,
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
                <video onTimeUpdate={handleTimeUpdate} ref={videoRef} crossOrigin="" width={800}>
                    <source src={videoSourceInfo.src} type="video/mp4" />
                    <track ref={trackMetaDataRef} default kind="metadata" src={videoSourceInfo.vtt} />
                    <track ref={trackChaptersRef} default kind="chapters" src={videoSourceInfo.chapters} />
                </video>
            </div>
            {shouldhaveStats && (
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
                            chapters,
                            hasVideoLoaded,
                        },
                        null,
                        2,
                    )}
                </code>
            )}
        </>
    );
};

export default Video;
