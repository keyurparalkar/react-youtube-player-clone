import { motion, useAnimate } from 'framer-motion';
import styled from 'styled-components';

type SliderProps = {
    parentWidth: number;
    initial: number;
};

const StyledVideoSlider = styled(motion.div)<SliderProps>`
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
    margin-top: -5px;
    cursor: pointer;
    user-select: none;

    &::before {
        content: '';
        background-color: white;
        position: absolute;
        width: ${(props) => props?.parentWidth}px;
        height: 3px;
        left: -${(props) => props?.parentWidth}px;
        margin-top: 5px;
    }

    &::after {
        content: '';
        background-color: #877c7c;
        position: absolute;
        width: ${(props) => props?.parentWidth}px;
        height: 3px;
        margin-top: 5px;
        left: 12px;
    }
`;

const Slider = (props: SliderProps) => {
    const { initial, parentWidth } = props;

    const [sliderScope, sliderAnimate] = useAnimate();

    const onDrag = () => {
        if (sliderScope.current) {
            const transformStyle = sliderScope.current.style.transform;
            if (transformStyle !== 'none') {
                const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
                let newVolume = current / 48;
                if (newVolume <= 0.03) {
                    newVolume = 0;
                }
                if (newVolume > 1) {
                    newVolume = 1;
                }
                // if (onDragEvent) onDragEvent();
            }
        }
    };

    return (
        <StyledVideoSlider
            className="volume-slider"
            drag="x"
            initial={{
                x: initial * 800,
            }}
            dragConstraints={{ left: 0, right: 790 }} // contraint the slider not till 100% till 100% - 12px of the diameter
            dragElastic={0}
            dragMomentum={false}
            onDrag={onDrag}
            ref={sliderScope}
            parentWidth={parentWidth}
        />
    );
};

export default Slider;
