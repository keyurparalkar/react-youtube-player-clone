import { motion } from 'framer-motion';
import { useContext } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../context';
import PlayButton from './PlayButton';
import VolumeControl from './VolumeControl';
import Seekbar from './Seekbar';

const StyledContainer = styled(motion.div)<{ isPlaying?: boolean }>`
    background: #ffffff00;
    background: linear-gradient(180deg, #ffffff00, #010101);
    ${(props) => (!props.isPlaying ? 'opacity: 1 !important' : '')};

    position: absolute;
    color: #eee;
    bottom: 0.2rem;
`;
const StyledVideoControl = styled.div`
    margin-left: 10px;
    margin-right: 10px;
`;

const StyledInteractionGroup1 = styled.div`
    display: flex;
    height: 40px;
`;

const ControlToolbar = () => {
    const { isPlaying } = useContext(PlayerContext);

    return (
        <StyledContainer className="video-controls-container" isPlaying={isPlaying}>
            <StyledVideoControl>
                <Seekbar />
                <StyledInteractionGroup1 className="interaction-group-1">
                    <PlayButton />
                    <VolumeControl />
                </StyledInteractionGroup1>
            </StyledVideoControl>
        </StyledContainer>
    );
};

export default ControlToolbar;
