import { ActionProps, StateProps } from '.';
import {
    HAS_VIDEO_LOADED,
    HAS_VIDEO_SEEKED,
    ON_MUTE,
    PLAY_PAUSE,
    UPDATE_VIDEO_CURRENT_TIME,
    VOLUME_CHANGE,
} from './actions';

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
                totalDuration: action.payload.totalDuration,
            };
        }

        case UPDATE_VIDEO_CURRENT_TIME: {
            return {
                ...state,
                currentTime: action.payload.currentTime,
            };
        }

        case HAS_VIDEO_SEEKED: {
            return {
                ...state,
                hasSeeked: action.payload,
            };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
};
