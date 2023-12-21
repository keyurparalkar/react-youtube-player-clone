import { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PlayerDispatchContext } from '../../context';
import { VOLUME_CHANGE } from '../../context/actions';
import Slider, { SliderRefProps } from '../common/Slider';
import Tooltip from '../common/Tooltip';

const StyledContainer = styled.div`
    width: 0px;
    transition: width 0.2s ease;
`;

const VolumeSlider = () => {
    const sliderRef = useRef<SliderRefProps>(null);
    const dispatch = useContext(PlayerDispatchContext);

    const onPositionChangeByDrag = (currentPercentage: number) => {
        let newVolume = currentPercentage / 100;
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
    };

    const onPositionChangeByClick = (currentPercentage: number) => {
        const newVolume = currentPercentage / 100;

        dispatch({
            type: VOLUME_CHANGE,
            payload: newVolume,
        });
    };

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.updateSliderFill(100);
        }
    }, []);

    return (
        <Tooltip content="Volume">
            <StyledContainer className="control--volume-slider">
                <Slider total={60} onClick={onPositionChangeByClick} onDrag={onPositionChangeByDrag} ref={sliderRef} />
            </StyledContainer>
        </Tooltip>
    );
};

export default VolumeSlider;
