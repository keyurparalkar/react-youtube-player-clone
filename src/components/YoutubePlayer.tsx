import { useContext } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../context';
import BezelIcon from './BezelIcon';
import ControlToolbar from './ControlToolbar';
import Video from './Video';

const StyledVideoContainer = styled.div`
    position: relative;
    width: fit-content;

    .video-controls {
        opacity: 0;
    }

    &:hover .video-controls {
        opacity: 1;
    }
`;

const YoutubePlayer = () => {
    const { hasVideoLoaded } = useContext(PlayerContext);
    return (
        <StyledVideoContainer>
            <Video />
            {hasVideoLoaded && (
                <>
                    <BezelIcon />
                    <ControlToolbar />
                </>
            )}
        </StyledVideoContainer>
    );
};

export default YoutubePlayer;
