import styled from 'styled-components';
import VolumeSlider from './VolumeSlider';

export type VolumePanelProps = {
    isHovered: boolean;
};

const StyledPanelContainer = styled.div`
    position: relative;
    width: 60px;
    height: 10px;
    overflow: hidden;
    padding-top: 5px;
`;

const VolumePanel = ({ isHovered }: VolumePanelProps) => {
    return (
        <StyledPanelContainer>
            <VolumeSlider isHovered={isHovered} />
        </StyledPanelContainer>
    );
};

export default VolumePanel;
