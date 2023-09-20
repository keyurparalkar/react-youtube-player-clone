import { createContext, Dispatch, Reducer, useReducer } from "react";
import { ON_MUTE, PLAY_PAUSE, VOLUME_CHANGE } from "./actions";

type StateProps = {
  isPlaying: boolean;
  muted: boolean;
  volume: number;
};

type ActionProps = {
  type: string;
  payload?: any;
};

export const initialState = {
  isPlaying: false,
  muted: false,
  volume: 1,
};

export const PlayerContext = createContext<StateProps>(initialState);
export const PlayerDispatchContext = createContext<Dispatch<ActionProps>>(
  (() => undefined) as Dispatch<ActionProps>
);

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

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const PlayerProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer<Reducer<StateProps, ActionProps>>(
    playerReducer,
    initialState
  );

  return (
    <PlayerContext.Provider value={state}>
      <PlayerDispatchContext.Provider value={dispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
};
