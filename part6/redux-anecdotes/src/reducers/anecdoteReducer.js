import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createNewAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const id = action.payload;
      return state
        .map((anecdote) => {
          if (anecdote.id === id) {
            return {
              ...anecdote,
              votes: anecdote.votes + 1,
            };
          }
          return anecdote;
        })
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

//Filter reducer
export const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

export const { createNewAnecdote, addVote, appendAnecdotes, setAnecdotes } =
  anecdoteSlice.actions;
//Initialase
export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateOne({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch(addVote(anecdote.id));
  };
};

export default anecdoteSlice.reducer;
