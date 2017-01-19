import axios from 'axios';

//Actions
const RECEIVE_LYRICS = 'RECEIVE_LYRICS';


//Action Creators
const receiveLyrics = lyrics => ({
  type : RECEIVE_LYRICS,
  lyrics
})


//Dispatchers
export const getLyrics = () => dispatch => {
  let apiString = 'http://localhost:4000/';
  axios.get(apiString)
  .then(res => dispatch(receiveLyrics(res.data)));
}

//Reducers

export default function reducer (lyrics = '', action) {
  switch (action.type) {
    
    case RECEIVE_LYRICS: 
      return action.lyrics;


    default: 
      return lyrics;
  }
}

