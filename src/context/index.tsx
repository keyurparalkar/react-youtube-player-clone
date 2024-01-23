import { createContext, Dispatch, ReactElement, Reducer, useReducer } from 'react';
import { playerReducer } from './reducers';

export type Duration = number;

export type Chapter = {
    index: number;
    chapterName: string;
    percentageTime: string;
    endTime: number;
    startTime: number;
};

export type StateProps = {
    isPlaying: boolean;
    muted: boolean;
    volume: number;
    hasVideoLoaded: boolean;
    totalDuration: Duration;
    currentTime: Duration;
    hoveredDuration: Duration;
    hoveredThumbnailUrl: string;
    isSeeking: boolean;
    chapters: Array<Chapter> | [];
    shouldHaveChapters: boolean;
};

export type ActionProps = {
    type: string;
    // eslint-disable-next-line
    payload?: any;
};

type PlayerProviderProps = {
    children?: ReactElement;
};

export const initialState: StateProps = {
    isPlaying: false,
    muted: false,
    volume: 1,
    hasVideoLoaded: false,
    totalDuration: 0,
    currentTime: 0,
    hoveredDuration: 0,
    hoveredThumbnailUrl: '',
    isSeeking: false,
    chapters: [],
    shouldHaveChapters: true,
};

export const PlayerContext = createContext<StateProps>(initialState);
export const PlayerDispatchContext = createContext<Dispatch<ActionProps>>((() => undefined) as Dispatch<ActionProps>);

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
    const [state, dispatch] = useReducer<Reducer<StateProps, ActionProps>>(playerReducer, initialState);

    return (
        <PlayerContext.Provider value={state}>
            <PlayerDispatchContext.Provider value={dispatch}>{children}</PlayerDispatchContext.Provider>
        </PlayerContext.Provider>
    );
};
