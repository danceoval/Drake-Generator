import { combineReducers } from 'redux';

import {RECEIVE_LYRICS, receiveLyrics, getLyrics } from '../actions'

const lyricsReducer = function (state = {}, action) {

  const newState = Object.assign({}, state);
  
  switch (action.type) {

    case RECEIVE_LYRICS:
    	newState.corpus = action.lyrics;
      	break;

    default:
      return state;

  }

  return newState;

}

const rootReducer = combineReducers({
  lyrics: lyricsReducer
});

export default rootReducer;
