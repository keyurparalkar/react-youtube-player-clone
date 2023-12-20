import { useContext, useEffect, useRef } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { UPDATE_SEEKING, UPDATE_VIDEO_CURRENT_TIME } from '../../context/actions';
import Slider, { SliderRefProps } from '../common/Slider';
import Tooltip from '../common/Tooltip';
import FrameTooltip from './FrameTooltip';
import { computeVideoDurarionFromSliderPosition } from './utils';

const tooltipStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
};

const Seekbar = () => {
    const { currentTime, totalDuration, hoveredDuration, hoveredThumbnailUrl } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const sliderRef = useRef<SliderRefProps>(null);

    const onPositionChangeByDrag = (completedPercentage: number) => {
        // optimize this with --slider-fill;
        const currentTime = (completedPercentage * totalDuration) / 100;
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

    const onPositionChangeByClick = (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => {
        // optimize this with --slider-fill;
        const newCurrentTime = computeVideoDurarionFromSliderPosition(e.pageX, parentLeft, totalDuration, 800);
        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime: newCurrentTime },
        });

        dispatch({
            type: UPDATE_SEEKING,
            payload: true,
        });
    };

    // const onMouseMoveParent = (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => {
    //     const newCurrentTime = computeVideoDurarionFromSliderPosition(e.pageX, parentLeft, totalDuration, 800);
    //     dispatch({ type: UPDATE_HOVERED_DURATION, payload: newCurrentTime });
    // };

    // Update CSS variables that drives the slider component
    useEffect(() => {
        if (sliderRef.current) {
            const newPosPercentage = (currentTime / totalDuration) * 100;
            sliderRef.current.updateSliderPosition(newPosPercentage);
        }
    }, [currentTime]);

    return (
        <div style={{ width: 800 }}>
            <Tooltip
                content={<FrameTooltip duration={hoveredDuration} thumbnailUrl={hoveredThumbnailUrl} />}
                movingTooltip
                tooltipStyles={tooltipStyles}
            >
                <Slider
                    total={800}
                    onClick={onPositionChangeByClick}
                    onDrag={onPositionChangeByDrag}
                    onMouseUp={handleMouseUp}
                    ref={sliderRef}
                />
            </Tooltip>
        </div>
    );
};

export default Seekbar;
