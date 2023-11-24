import { useAnimate } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { HAS_VIDEO_SEEKED, UPDATE_VIDEO_CURRENT_TIME } from '../../context/actions';
import ProgressBar from '../common/ProgressBar';

const Seekbar = () => {
    const { currentTime, totalDuration } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const [sliderRef, sliderAnimate] = useAnimate();

    const completedTime = currentTime / totalDuration || 0;

    const onPositionChangeByDrag = (e: MouseEvent | TouchEvent | PointerEvent) => {
        const transformStyle = (e.target as HTMLDivElement)?.style.transform;
        if (transformStyle && transformStyle !== 'none') {
            const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
            const currentTime = (current * totalDuration) / 800;

            dispatch({
                type: UPDATE_VIDEO_CURRENT_TIME,
                payload: { currentTime },
            });

            dispatch({
                type: HAS_VIDEO_SEEKED,
                payload: true,
            });
        }
    };

    const onDragEnd = () => {
        dispatch({
            type: HAS_VIDEO_SEEKED,
            payload: false,
        });
    };

    const onPositionChangeByClick = (e: React.MouseEvent<HTMLDivElement>, parentLeft: number) => {
        const pos = e.pageX - parentLeft;

        const newCurrentTime = (Math.abs(pos) * totalDuration) / 800;

        dispatch({
            type: UPDATE_VIDEO_CURRENT_TIME,
            payload: { currentTime: newCurrentTime },
        });

        /**
         * We make the hasSeeked false when the click is complete
         * Click is completed when Mouse button moves down and then up.
         * Click event handlers are executed as follows:
         * onMouseDown -> onMouseUp -> onClick
         */
        dispatch({
            type: HAS_VIDEO_SEEKED,
            payload: false,
        });
    };

    const onMouseDown = () => {
        dispatch({
            type: HAS_VIDEO_SEEKED,
            payload: true,
        });
    };

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
            <ProgressBar
                initialPos={completedTime}
                onDragEnd={onDragEnd}
                onPositionChangeByDrag={onPositionChangeByDrag}
                onPositionChangeByClick={onPositionChangeByClick}
                onMouseDown={onMouseDown}
                ref={sliderRef}
            />
        </div>
    );
};

export default Seekbar;
