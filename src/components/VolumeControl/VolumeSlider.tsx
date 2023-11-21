import { useAnimate } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { VOLUME_CHANGE } from '../../context/actions';
import ProgressBar from '../common/ProgressBar';

export type VolumeSliderProps = {
    isHovered: boolean;
};

const VolumeSlider = ({ isHovered }: VolumeSliderProps) => {
    const [scope, animate] = useAnimate();
    const [sliderRef, sliderAnimate] = useAnimate();
    const dispatch = useContext(PlayerDispatchContext);
    const { volume, muted } = useContext(PlayerContext);

    const onPositionChangeByDrag = (e: MouseEvent | TouchEvent | PointerEvent) => {
        const transformStyle = (e.target as HTMLDivElement)?.style.transform;
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
    };

    const onPositionChangeByClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (sliderRef?.current) {
            const target = e.target as HTMLDivElement;
            const rect = target.getBoundingClientRect();
            const pos = e.pageX - rect.left;

            const newVolume = 1 - Math.abs(pos) / 64;
            console.log('onClick Happened = ', { pos, newVolume, pageX: e.pageX, rect: rect.left });
            dispatch({
                type: VOLUME_CHANGE,
                payload: newVolume,
            });
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
        if (sliderRef.current) {
            sliderAnimate(
                sliderRef.current,
                {
                    x: muted ? 0 : volume * 48,
                },
                {
                    ease: 'linear',
                    duration: 0.1,
                },
            );
        }
    }, [muted, volume]);

    return (
        <div ref={scope} style={{ width: 64 }}>
            <ProgressBar
                initialPos={volume}
                onPositionChangeByDrag={onPositionChangeByDrag}
                onPositionChangeByClick={onPositionChangeByClick}
                ref={sliderRef}
            />
        </div>
    );
};

export default VolumeSlider;
