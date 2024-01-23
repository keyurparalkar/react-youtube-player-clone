import styled from 'styled-components';
import YoutubePlayer from './components/YoutubePlayer';
import { PlayerProvider } from './context';

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
                        <label htmlFor="enableChapters">Enable Chapters</label>
                        <input id="enableChapters" type="checkbox" />
                    </div>

                    <div>
                        <label htmlFor="enableStats">Enable Video Stats</label>
                        <input id="enableStats" type="checkbox" />
                    </div>
                </StyledFieldSet>
            </StyledSideBar>
            <PlayerProvider>
                <YoutubePlayer />
            </PlayerProvider>
        </StyledGrid>
    );
}

export default App;
