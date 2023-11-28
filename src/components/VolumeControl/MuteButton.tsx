import { motion, useAnimationControls } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { PlayerContext, PlayerDispatchContext } from '../../context';
import { ON_MUTE } from '../../context/actions';
import { StyledIconButton } from '../../utils';
import Tooltip from '../common/Tooltip';

const MuteButton = () => {
    const { muted, volume } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const controls = useAnimationControls();

    const handleMuteClick = () => {
        dispatch({
            type: ON_MUTE,
            payload: !muted,
        });

        controls.start({
            pathLength: muted ? 0 : 1,
            transition: {
                duration: 0.5,
                ease: 'linear',
            },
        });
    };

    useEffect(() => {
        controls.start({
            pathLength: volume <= 0.03 ? 1 : 0,
            transition: {
                duration: 0.5,
                ease: 'linear',
            },
        });
    }, [volume]);

    return (
        <Tooltip content={muted ? 'Unmute' : 'Mute'}>
            <StyledIconButton onClick={handleMuteClick}>
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 45 24"
                    height="24px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.path
                        className="outer-bar"
                        d="M16 21c3.527-1.547 5.999-4.909 5.999-9S19.527 4.547 16 3v2c2.387 1.386 3.999 4.047 3.999 7S18.387 17.614 16 19v2z"
                        animate={{ opacity: volume <= 0.5 ? 0 : 1 }}
                    />
                    <motion.path
                        className="inner-bar"
                        d="M16 7v10c1.225-1.1 2-3.229 2-5s-.775-3.9-2-5z"
                        animate={{ opacity: volume <= 0.3 ? 0 : 1 }}
                    />
                    <motion.path d="M4 17h2.697L14 21.868V2.132L6.697 7H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2z" />
                    <motion.path
                        d="M 1,1 L 100,100"
                        stroke-width="2"
                        initial={{ pathLength: muted ? 1 : 0 }}
                        animate={controls}
                    />
                </svg>
            </StyledIconButton>
        </Tooltip>
    );
};

export default MuteButton;
