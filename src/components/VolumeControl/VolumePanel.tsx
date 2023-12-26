import styled from 'styled-components';
import VolumeSlider from './VolumeSlider';

const StyledPanelContainer = styled.div`
    position: relative;
    width: 60px;
    height: 10px;
    overflow: hidden;
    padding-top: 5px;
`;

const VolumePanel = () => {
    return (
        <StyledPanelContainer>
            <VolumeSlider />
        </StyledPanelContainer>
    );
};

export default VolumePanel;
