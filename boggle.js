"use strict"
const fs = require('fs');
const words = fs.readFileSync('words.txt', 'utf8').toUpperCase().split('\n')
// const {words} = require('./data.js')

class Boggle {
  constructor(num) {
    this.dict = words;
    this.board = this.make(num);
  }

  make(number) {
    let board = [];
    let alphabeth = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < number; i++) {
      board.push([]);
      for (var j = 0; j < number; j++) {
        board[i].push(alphabeth.charAt(Math.floor(Math.random()*26)))
      }
    }
    console.log(board);
    return board;
  }

  solve() {
    let now = this.board;
    let solved = [];
    for(let i = 0; i < this.dict.length; i++) {
      let letter = this.dict[i];
      let index = this.checkFirstLetter(letter, now);
      if(index.length > 0) {
        let sliced = letter.slice(1);
        for(let i = 0; i < index.length; i++) {
          this.check(solved, sliced, letter, index[i], [index[i]], now);
        }
      }
    }
    console.log("Found words:");
    for(let i = 0; i < solved.length; i++) {
      if (solved[i].length > 3) {
        console.log(solved[i]);
      }
    }
  }

  checkFirstLetter(word, now) {
    let index = [];
    for(let i = 0; i < now.length; i++) {
      for(let j = 0; j < now.length; j++) {
        if(now[i][j] == word[0]) index.push([i, j])
      }
    }
    return index;
  }

  check(solved, sliced, word, current, recent, now) {
    if(sliced.length == 0) {
      solved.push(word);
      return solved;
    }
    let availableIdx = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]];

    for(let i = 0; i < availableIdx.length; i++) {
      let row = current[0] + availableIdx[i][0];
      let col = current[1] + availableIdx[i][1];
      if(0 <= row && row < now.length && 0 <= col && col < now.length) {
        if(this.available([row, col], recent)) {
          if(now[row][col] == sliced[0]) {
            let newCurrent = [row, col];
            let newSliced = sliced.slice(1);
            if(newSliced.length == 0) {
              solved.push(word);
              return solved;
            } else {
              recent.push(newCurrent);
              return this.check(solved, newSliced, word, newCurrent, recent, now)
            }
          }
        }
      }
    }
  }

  available(tested, recent) {
    for(let i = 0; i < recent.length; i++) {
      if(tested[0] == recent[i][0] && tested[1] == recent[i][1]) {
        return false;
      }
    }
    return true;
  }
}

let boggle = new Boggle(4);
boggle.solve();