import { useAnimate } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { HAS_VIDEO_SEEKED, UPDATE_VIDEO_CURRENT_TIME } from '../../context/actions';
import ProgressBar from '../common/ProgressBar';

const Seekbar = () => {
    const { currentTime, totalDuration } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);
    const [sliderRef, sliderAnimate] = useAnimate();

    const onPositionChangeByDrag = (e: MouseEvent | TouchEvent | PointerEvent) => {
        /**
         * When I am dragging I need the current left position and need to way to update the currentTime of the video
         *
         */

        const transformStyle = (e.target as HTMLDivElement)?.style.transform;
        if (transformStyle && transformStyle !== 'none') {
            const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
            const currentTime = (current * totalDuration) / 800;
            console.log('Current Time on drag = ', { currentTime });

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

    const completedTime = currentTime / totalDuration || 0;

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
                ref={sliderRef}
            />
        </div>
    );
};

export default Seekbar;
