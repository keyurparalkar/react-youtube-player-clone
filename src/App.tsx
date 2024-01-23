import { useContext } from 'react';
import styled from 'styled-components';
import YoutubePlayer from './components/YoutubePlayer';
import { PlayerContext, PlayerDispatchContext } from './context';
import { TOGGLE_CHAPTERS, TOGGLE_STATS } from './context/actions';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 350px 2fr;
    grid-template-rows: 100vh;
`;

const StyledSideBar = styled.div`
    background-color: #0af694;
    padding: 0.5rem;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px 100px 100px;
    row-gap: 0.625rem;
`;

const StyledFieldSet = styled.fieldset`
    padding: 0.6rem;

    & button {
        margin-right: 1rem;
    }

    & div {
        margin-bottom: 0.5rem;
    }
`;
function App() {
    const { shouldHaveChapters, shouldhaveStats } = useContext(PlayerContext);
    const dispatch = useContext(PlayerDispatchContext);

    const toggleChapters = () =>
        dispatch({
            type: TOGGLE_CHAPTERS,
            payload: !shouldHaveChapters,
        });

    const toggleStats = () =>
        dispatch({
            type: TOGGLE_STATS,
            payload: !shouldhaveStats,
        });

    return (
        <StyledGrid>
            <StyledSideBar>
                <h1>Youtube Player Clone</h1>
                <StyledFieldSet className="video-sample-toggle">
                    <legend>Video Samples</legend>
                    <button>Sample 1</button>
                    <button>Sample 2</button>
                </StyledFieldSet>
                <StyledFieldSet className="video-control-toggle">
                    <legend>Toggle Video Controls</legend>

                    <div>
                        <input id="enableChapters" type="checkbox" onChange={toggleChapters} />
                        <label htmlFor="enableChapters">Enable Chapters</label>
                    </div>

                    <div>
                        <input id="enableStats" type="checkbox" onChange={toggleStats} />
                        <label htmlFor="enableStats">Enable Video Stats</label>
                    </div>
                </StyledFieldSet>
            </StyledSideBar>
            <YoutubePlayer />
        </StyledGrid>
    );
}

export default App;
