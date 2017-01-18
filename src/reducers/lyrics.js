import axios from 'axios';

//Actions
const RECEIVE_LYRICS = 'RECEIVE_LYRICS';


//Action Creators
const receiveLyrics = lyrics => ({
  type : RECEIVE_LYRICS,
  lyrics
})


//Dispatchers
export const getLyrics = lyricId => dispatch => {
  let apiString = '/';
  axios.get(apiString)
  .then(response => {
    dispatch(receiveLyrics(response.data));
  });
}

//Reducers

export default function reducer (corpus = '', action) {
  switch (action.type) {
    
    case RECEIVE_LYRICS: 
      return action.corpus;


    default: 
      return corpus;
  }


const rootReducer = combineReducers({
  lyrics: lyricsReducer
});

export default rootReducer;
