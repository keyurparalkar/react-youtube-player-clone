import { useAnimate } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { UPDATE_VIDEO_CURRENT_TIME } from '../../context/actions';
// import ProgressBar from '../common/ProgressBar';
import Slider from '../common/Slider';
import Tooltip from '../common/Tooltip';
import FrameTooltip from './FrameTooltip';
import { computeVideoDurarionFromSliderPosition } from './utils';

const tooltipStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
};

const Seekbar = () => {
    const { currentTime, totalDuration, hoveredDuration, hoveredThumbnailUrl } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const [sliderRef, sliderAnimate] = useAnimate();

    const completedTime = currentTime / totalDuration || 0;

    const onPositionChangeByDrag = (completedPercentage: number) => {
        // optimize this with --slider-fill;
        // const transformStyle = e.currentTarget?.style.transform;
        // if (transformStyle && transformStyle !== 'none') {
        //     const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
        //     const currentTime = (current * totalDuration) / 800;

        // }
        const currentTime = (completedPercentage * totalDuration) / 100;
        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime },
        });
    };

    const onPositionChangeByClick = (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => {
        // optimize this with --slider-fill;
        const newCurrentTime = computeVideoDurarionFromSliderPosition(e.pageX, parentLeft, totalDuration, 800);
        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime: newCurrentTime },
        });
    };

    // const onMouseMoveParent = (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => {
    //     const newCurrentTime = computeVideoDurarionFromSliderPosition(e.pageX, parentLeft, totalDuration, 800);
    //     dispatch({ type: UPDATE_HOVERED_DURATION, payload: newCurrentTime });
    // };

    useEffect(() => {
        if (sliderRef.current) {
            sliderAnimate(
                sliderRef.current,
                {
                    x: completedTime * 800,
                },
                {
                    ease: 'linear',
                    duration: 0.1,
                },
            );
        }
    }, [completedTime]);

    return (
        <div style={{ width: 800 }}>
            <Tooltip
                content={<FrameTooltip duration={hoveredDuration} thumbnailUrl={hoveredThumbnailUrl} />}
                movingTooltip
                tooltipStyles={tooltipStyles}
            >
                {/* <ProgressBar
                    initialPos={completedTime}
                    onDragEnd={onDragEnd}
                    onPositionChangeByDrag={onPositionChangeByDrag}
                    onPositionChangeByClick={onPositionChangeByClick}
                    onMouseDown={onMouseDown}
                    onMouseMoveParent={onMouseMoveParent}
                    ref={sliderRef}
                /> */}
                <Slider total={800} onClick={onPositionChangeByClick} onDrag={onPositionChangeByDrag} />
            </Tooltip>
        </div>
    );
};

export default Seekbar;
