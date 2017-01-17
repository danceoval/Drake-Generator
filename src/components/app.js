import React, { Component } from 'react';

export default class App extends Component {
  
  componentDidMount(){
  	this.setState({
  		corpus : this.getCorpus(),
  		verse: null
  	})
  }

  getCorpus = () => {
  	return "I do not like them in a house. I do not like them  with a mouse. I do not like them here or there. I do not like them anywhere. I do not like green eggs and ham. I do not like them, Sam-I-am."
  }

  assembleVerse = () => {
  	let verse = []
  	for(var i = 0; i < 6; i++) {
  		let len = Math.floor(Math.random() * 10) + 1;
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
	   	markov[currentWord].push(nextWord);  // We've seen this word before
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
  	let {corpus} = this.state
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
 	if(!this.state){
 		return null
 	}
 	const verse = this.assembleVerse();
 	console.log('***', verse)
    return (
    	<div>
	      <h1 onClick={()=>{this.newVerse()}}>New Verse</h1>
	      {
	      	verse.map((line, index) => {
	      		return <p key={index}>{line}</p>
	      	})
	      }
	    </div>  
    );
  }
}
