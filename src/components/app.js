import React, { Component } from 'react';
import { connect } from'react-redux';
import { getLyrics } from '../reducers/lyrics'

//Component 
class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
  	this.props.getLyrics();
    this.setState({lyrics: this.props.lyrics})
  }

  assembleVerse = () => {
  	let verse = []
  	for(var i = 0; i < 6; i++) {
  		let len = Math.floor(Math.random() * 25) + 5;
  		let line = this.writeLine(len)
  		verse.push(line)
  	}
  	return verse
  }
  

  parseText = (text) => {
  	return text.toLowerCase().replace(/[^a-z\s]/ig, "").split(' ');
  }

  generateMarkov = (corpus) => {
  	let markov = {};
  	let words = this.parseText(corpus);

  	for (let i = 0; i < words.length - 1; i++) {
  	  let currentWord = words[i];
  	  let nextWord = words[i+1];
  	
  	  if (markov[currentWord]) {
  	   	markov[currentWord].push(nextWord);
  	  } else {
  	    markov[currentWord] = [nextWord];
  	  }
  	}
  	return markov;
  }

  randomlyChoose = (line) => {
  	return line[(Math.floor(Math.random() * line.length))]
  }

  writeLine = (min_length) => {
    let {lyrics} = this.props
    let corpus = lyrics
    let words = this.parseText(corpus);
    let wordpairs = this.generateMarkov(corpus);
    let word = this.randomlyChoose(words);
    let phrase = [word]; // start the phrase
    while(wordpairs[word]) {
    	let next_words = wordpairs[word];
    	word = this.randomlyChoose(next_words);
    	phrase.push(word);
    	if(phrase.length > min_length) {
    		break;
    	}
    }
  	return phrase.join(' ');
  }

  newVerse() {
  	this.setState({
  		verse: this.assembleVerse()
  	})
  }

  render() { 
    console.log('props', this.props)
   	if(!this.state){
   		return null
   	}
   	const verse = this.assembleVerse();
    return (

      <div>
      { this.props.lyrics ?
        <div>
  	      <h1 onClick={()=>{this.newVerse()}}>Click for New Verse</h1>
  	      {
  	      	verse.map((line, index) => {
  	      		return <p key={index}>{line}</p>
  	      	})
  	      }
        </div>  
        : <div>
            <h1> Generating Lyrics... </h1>
            <img src="../../img/loading-spinner.gif" alt="loading" />
          </div>
      }
	    </div>  
    );
  }
}

// Container
const mapState = ({lyrics}) => {
  return {lyrics}
}

const mapDispatch = { getLyrics }

export default connect(mapState, mapDispatch)(App);

