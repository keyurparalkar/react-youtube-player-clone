import { useContext } from 'react';
import styled from 'styled-components';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { ON_MUTE } from '../../context/actions';
import { StyledIconButton } from '../../utils';
import Tooltip from '../common/Tooltip';

type VolumeProps = {
    volume: number;
    muted?: boolean;
};

const StyledOuterBar = styled.path<VolumeProps>`
    opacity: ${(props) => (props.volume <= 0.5 ? 0 : 1)};
    transition: opacity 0.4s ease;
`;

const StyledInnerBar = styled.path<VolumeProps>`
    opacity: ${(props) => (props.volume <= 0.3 ? 0 : 1)};
    transition: opacity 0.4s ease;
`;

const StyledMutePath = styled.path<VolumeProps>`
    opacity: ${(props) => (props.volume < 0.09 || props?.muted ? 1 : 0)};
    d: ${(props) => (props.volume < 0.09 || props?.muted ? "path('M 1,1 L 45,50')" : "path('M 1,1 L 0,0')")};
    transition:
        d 0.4s ease,
        opacity 0.4s ease;
`;

const MuteButton = () => {
    const { muted, volume } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const handleMuteClick = () => {
        dispatch({
            type: ON_MUTE,
            payload: !muted,
        });
    };

    return (
        <Tooltip content={muted ? 'Unmute' : 'Mute'}>
            <StyledIconButton onClick={handleMuteClick} className="control--mute-button">
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 45 24"
                    height="24px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <StyledOuterBar
                        className="outer-bar"
                        d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"
                        volume={volume}
                    />
                    <StyledInnerBar
                        className="inner-bar"
                        d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5z"
                        volume={volume}
                    />
                    <path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z" />
                    <StyledMutePath stroke-width="2" volume={volume} muted={muted} />
                </svg>
            </StyledIconButton>
        </Tooltip>
    );
};

export default MuteButton;
