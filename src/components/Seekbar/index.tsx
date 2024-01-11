import { useContext, useEffect, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { UPDATE_HOVERED_DURATION, UPDATE_SEEKING, UPDATE_VIDEO_CURRENT_TIME } from '../../context/actions';
import { numberToFixed } from '../../utils';
import Slider, { SliderRefProps } from '../common/Slider';
import Tooltip from '../common/Tooltip';
import FrameTooltip from './FrameTooltip';

const tooltipStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
};

const Seekbar = () => {
    const { chapters, currentTime, totalDuration, hoveredDuration, hoveredThumbnailUrl, isSeeking } =
        useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const sliderRef = useRef<SliderRefProps>(null);

    const onPositionChangeByDrag = (completedPercentage: number) => {
        let currentTime = (completedPercentage * totalDuration) / 100;
        currentTime = numberToFixed(currentTime, 4);

        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime },
        });
        dispatch({
            type: UPDATE_SEEKING,
            payload: true,
        });
    };

    const handleMouseUp = () => {
        dispatch({
            type: UPDATE_SEEKING,
            payload: false,
        });
    };

    const onPositionChangeByClick = (currentPercentage: number) => {
        let newCurrentTime = (currentPercentage * totalDuration) / 100;
        newCurrentTime = numberToFixed(newCurrentTime, 2);

        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime: newCurrentTime },
        });

        dispatch({
            type: UPDATE_SEEKING,
            payload: true,
        });
    };

    const handleMouseMove = (pointerPercentage: number) => {
        let hoveredDuration = (pointerPercentage * totalDuration) / 100;
        hoveredDuration = numberToFixed(hoveredDuration, 2);
        dispatch({ type: UPDATE_HOVERED_DURATION, payload: hoveredDuration });
    };

    // Update CSS variables that drives the slider component
    useEffect(() => {
        if (sliderRef.current && !isSeeking) {
            const newPosPercentage = (currentTime / totalDuration) * 100;
            sliderRef.current.updateSliderFill(newPosPercentage);
        }
    }, [currentTime, isSeeking]);

    return (
        <div style={{ width: 780 }}>
            <Tooltip
                content={<FrameTooltip duration={hoveredDuration} thumbnailUrl={hoveredThumbnailUrl} />}
                movingTooltip
                tooltipStyles={tooltipStyles}
            >
                <Slider
                    $chapters={chapters}
                    $currentTime={currentTime}
                    $total={780}
                    $fillColor="#ff0000"
                    onClick={onPositionChangeByClick}
                    onDrag={onPositionChangeByDrag}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    ref={sliderRef}
                />
            </Tooltip>
        </div>
    );
};

export default Seekbar;
