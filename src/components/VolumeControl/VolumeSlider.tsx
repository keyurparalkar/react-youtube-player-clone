import { motion, useAnimate } from 'framer-motion';
import { Ref, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { VOLUME_CHANGE } from '../../context/actions';
import Seekbar from '../common/Seekbar';

export type VolumeSliderProps = {
    isHovered: boolean;
};

const VolumeSlider = ({ isHovered }: VolumeSliderProps) => {
    const [scope, animate] = useAnimate();
    // const [sliderScope, sliderAnimate] = useAnimate();
    const dispatch = useContext(PlayerDispatchContext);
    const sliderKnobRef = useRef<HTMLDivElement>(null);
    const { volume, muted } = useContext(PlayerContext);

    const onPositionChange = (sliderRef: Ref<HTMLDivElement>) => {
        if (sliderRef?.current) {
            const transformStyle = sliderRef.current.style.transform;
            if (transformStyle !== 'none') {
                const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
                let newVolume = current / 48;
                if (newVolume <= 0.03) {
                    newVolume = 0;
                }
                if (newVolume > 1) {
                    newVolume = 1;
                }
                dispatch({
                    type: VOLUME_CHANGE,
                    payload: newVolume,
                });
            }
        }
    };

    useEffect(() => {
        if (isHovered) {
            animate(
                scope.current,
                {
                    width: 60,
                },
                { ease: 'easeIn', duration: 0.2 },
            );
        } else {
            animate(
                scope.current,
                {
                    width: 0,
                },
                {
                    ease: 'linear',
                    duration: 0.2,
                },
            );
        }
    }, [isHovered, animate, scope]);

    useEffect(() => {
        if (sliderKnobRef.current) {
            const { sliderScope, sliderAnimate } = sliderKnobRef.current;
            sliderAnimate(
                sliderScope.current,
                {
                    x: muted ? 0 : volume * 48,
                },
                {
                    ease: 'linear',
                    duration: 0.1,
                },
            );
        }
    }, [muted]);

    return (
        <div ref={scope} style={{ width: 64 }}>
            <Seekbar initialPos={volume} onPositionChange={onPositionChange} ref={sliderKnobRef} />
        </div>
    );
};

export default VolumeSlider;
