import { createContext, Dispatch, ReactElement, Reducer, useReducer } from 'react';
import { HAS_VIDEO_LOADED, ON_MUTE, PLAY_PAUSE, VOLUME_CHANGE } from './actions';

type StateProps = {
    isPlaying: boolean;
    muted: boolean;
    volume: number;
    hasVideoLoaded: boolean;
};

type ActionProps = {
    type: string;
    // eslint-disable-next-line
    payload?: any;
};

type PlayerProviderProps = {
    children?: ReactElement;
};

export const initialState = {
    isPlaying: false,
    muted: false,
    volume: 1,
    hasVideoLoaded: false,
};

export const PlayerContext = createContext<StateProps>(initialState);
export const PlayerDispatchContext = createContext<Dispatch<ActionProps>>((() => undefined) as Dispatch<ActionProps>);

export const playerReducer = (state: StateProps, action: ActionProps) => {
    switch (action.type) {
        case PLAY_PAUSE: {
            return {
                ...state,
                isPlaying: action.payload,
            };
        }

        case ON_MUTE: {
            return {
                ...state,
                muted: action.payload,
            };
        }

        case VOLUME_CHANGE: {
            return {
                ...state,
                volume: action.payload,
            };
        }

        case HAS_VIDEO_LOADED: {
            return {
                ...state,
                hasVideoLoaded: action.payload,
            };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
    const [state, dispatch] = useReducer<Reducer<StateProps, ActionProps>>(playerReducer, initialState);

    return (
        <PlayerContext.Provider value={state}>
            <PlayerDispatchContext.Provider value={dispatch}>{children}</PlayerDispatchContext.Provider>
        </PlayerContext.Provider>
    );
};
