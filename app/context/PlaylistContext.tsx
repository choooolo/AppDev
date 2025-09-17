import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useReducer } from "react";

// Playlist type
export type Playlist = {
  id: string;
  title: string;
  cover: string;
  songs: string[];
};

// Reducer with undo/redo
type State = {
  past: Playlist[][];
  present: Playlist[];
  future: Playlist[][];
};

type Action =
  | { type: "ADD_PLAYLIST"; payload: Playlist }
  | { type: "REMOVE_PLAYLIST"; payload: string }
  | { type: "ADD_SONG"; payload: { playlistId: string; song: string } }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "LOAD"; payload: Playlist[] };

const initialState: State = { past: [], present: [], future: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD":
      return { ...state, present: action.payload };

    case "ADD_PLAYLIST": {
      const newPresent = [...state.present, action.payload];
      return { past: [...state.past, state.present], present: newPresent, future: [] };
    }

    case "REMOVE_PLAYLIST": {
      const newPresent = state.present.filter(p => p.id !== action.payload);
      return { past: [...state.past, state.present], present: newPresent, future: [] };
    }

    case "ADD_SONG": {
      const newPresent = state.present.map(p =>
        p.id === action.payload.playlistId
          ? { ...p, songs: [...p.songs, action.payload.song] }
          : p
      );
      return { past: [...state.past, state.present], present: newPresent, future: [] };
    }

    case "UNDO": {
      if (!state.past.length) return state;
      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);
      return { past: newPast, present: previous, future: [state.present, ...state.future] };
    }

    case "REDO": {
      if (!state.future.length) return state;
      const next = state.future[0];
      const newFuture = state.future.slice(1);
      return { past: [...state.past, state.present], present: next, future: newFuture };
    }

    default:
      return state;
  }
}

const PlaylistContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const PlaylistProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("playlists");
      if (saved) {
        dispatch({ type: "LOAD", payload: JSON.parse(saved) });
      }
    })();
  }, []);

  // Save to storage
  useEffect(() => {
    AsyncStorage.setItem("playlists", JSON.stringify(state.present));
  }, [state.present]);

  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => useContext(PlaylistContext);
