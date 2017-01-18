import axios from 'axios'; 

export const RECEIVE_LYRICS = 'RECEIVE_LYRICS';

export const receiveLyrics = lyrics => {
	type : RECEIVE_LYRICS,
	lyrics
}

export const getLyrics = lyricId => {
	let apiString = '/';
	return dispatch => {
	    axios.get(apiString)
	      .then(response => {
	        dispatch(receiveLyrics(response.data));
	      });
	  };
}