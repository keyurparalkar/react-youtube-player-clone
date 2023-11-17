import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Slider from './Slider';

export type SeekbarProps = {
    initialPos?: number;
    onDragEvent?: () => void;
};

const StyledPanelContainer = styled.div`
    position: relative;
    width: 100%;
    height: 10px;
    overflow: hidden;
    padding-top: 5px;
`;

const Seekbar = (props: SeekbarProps) => {
    const { initialPos = 0 } = props;
    // const [scope, animate] = useAnimate();
    const scope = useRef<HTMLDivElement | null>(null);
    const [parentWidth, setParentWidth] = useState(0);

    // const onDrag = () => {
    //     if (sliderScope.current) {
    //         const transformStyle = sliderScope.current.style.transform;
    //         if (transformStyle !== 'none') {
    //             const current = parseFloat(transformStyle.replace(/[^\d.]/g, ''));
    //             let newVolume = current / 48;
    //             if (newVolume <= 0.03) {
    //                 newVolume = 0;
    //             }
    //             if (newVolume > 1) {
    //                 newVolume = 1;
    //             }
    //             if (onDragEvent) onDragEvent();
    //         }
    //     }
    // };

    //   useEffect(() => {
    //     if (isHovered) {
    //       animate(
    //         scope.current,
    //         {
    //           width: 60,
    //         },
    //         { ease: "easeIn", duration: 0.2 }
    //       );
    //     } else {
    //       animate(
    //         scope.current,
    //         {
    //           width: 0,
    //         },
    //         {
    //           ease: "linear",
    //           duration: 0.2,
    //         }
    //       );
    //     }
    //   }, [isHovered, animate, scope]);

    //   useEffect(() => {
    //     sliderAnimate(
    //       sliderScope.current,
    //       {
    //         x: muted ? 0 : volume * 48,
    //       },
    //       {
    //         ease: "linear",
    //         duration: 0.1,
    //       }
    //     );
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [muted, sliderAnimate, sliderScope]);

    useEffect(() => {
        if (scope.current) {
            setParentWidth(scope.current.clientWidth);
        }
    }, []);

    return (
        <StyledPanelContainer ref={scope}>
            <Slider initialPos={initialPos} parentWidth={parentWidth} />
        </StyledPanelContainer>
    );
};

export default Seekbar;
