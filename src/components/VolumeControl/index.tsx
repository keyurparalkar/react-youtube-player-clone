import styled from 'styled-components';
import MuteButton from './MuteButton';
import VolumeSlider from './VolumeSlider';

const StyledVolumeControl = styled.div`
    display: flex;

    &:hover {
        & .control--volume-slider {
            width: 60px;
        }
    }
`;

const VolumeControl = () => {
    return (
        <StyledVolumeControl className="volume-control">
            <MuteButton />
            <VolumeSlider />
        </StyledVolumeControl>
    );
};

export default VolumeControl;
