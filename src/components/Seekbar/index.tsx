import { useAnimate } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { PlayerContext } from '../../context';
import ProgressBar from '../common/ProgressBar';

const Seekbar = () => {
    const { currentTime, totalDuration } = useContext(PlayerContext);
    const [sliderRef, sliderAnimate] = useAnimate();
    const onPositionChange = () => {
        console.log('Dragging ProgressBar');
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
            <ProgressBar initialPos={completedTime} onPositionChangeByDrag={onPositionChange} ref={sliderRef} />
        </div>
    );
};

export default Seekbar;
