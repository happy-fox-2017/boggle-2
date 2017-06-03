const ALPHABET =
  [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z',
  ];

const random = (min, max) => Math.floor(Math.random() * (max - (min + 1))) + min;

const getRandomFont = () => ALPHABET[random(0, 27)];

const shake = (cellCount) => {
  const result = new Array(cellCount);
  for (let i = 0; i < cellCount; i += 1) {
    result[i] = new Array(cellCount);
    for (let j = 0; j < cellCount; j += 1) {
      result[i][j] = getRandomFont();
    }
  }
  return result;
};

const firstLetterLocation = (letter, matrix) => {
  const result = [];
  const cellCount = matrix.length;
  for (let i = 0; i < cellCount; i += 1) {
    for (let j = 0; j < cellCount; j += 1) {
      if (letter === matrix[i][j]) result.push({ letter: matrix[i][j], i, j });
    }
  }
  return result;
};

const searchLetterAround = (letter, location, matrix) => {
  const cellCount = matrix.length;
  const result = [];

  let i = location.i;
  let j = location.j - 1;
  if (j >= 0 && j < cellCount && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i - 1;
  j = location.j - 1;
  if ((j >= 0 && j < cellCount) && (i >= 0 && i < cellCount) && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i - 1;
  j = location.j;
  if (i >= 0 && i < cellCount && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i - 1;
  j = location.j + 1;
  if ((j >= 0 && j < cellCount) && (i >= 0 && i < cellCount) && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i;
  j = location.j + 1;
  if (j >= 0 && j < cellCount && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i + 1;
  j = location.j + 1;
  if ((j >= 0 && j < cellCount) && (i >= 0 && i < cellCount) && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i + 1;
  j = location.j;
  if (i >= 0 && i < cellCount && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  i = location.i + 1;
  j = location.j - 1;
  if ((j >= 0 && j < cellCount) && (i >= 0 && i < cellCount) && letter === matrix[i][j]) {
    result.push({ letter: matrix[i][j], i, j });
  }

  return result;
};

const solveResult = [];

const solveLetterAround = (initLocation, letter, word, matrix) => {
  if (word.length === 0) return;

  const lettersAround = searchLetterAround(word.charAt(0), initLocation, matrix);
  for (let i = 0; i < lettersAround.length; i += 1) {
    solveResult.push(lettersAround[i]);
    solveLetterAround(lettersAround[i], word.charAt(1), word.substring(1), matrix);
  }
};

const solveWord = (word, matrix) => {
  const result = [];
  const firstLetter = word.charAt(0);
  const firstLetterLocations = firstLetterLocation(firstLetter, matrix);
  for (let i = 0; i < firstLetterLocations.length; i += 1) {
    solveResult.push(firstLetterLocations[i]);
    solveLetterAround(firstLetterLocations[i], firstLetter, word.substring(1), matrix);
  }
  return result;
};

const matrix = shake(4);
matrix[0] = ['D', 'G', 'H', 'I'];
matrix[1] = ['K', 'L', 'P', 'S'];
matrix[2] = ['Y', 'E', 'U', 'T'];
matrix[3] = ['E', 'O', 'R', 'N'];
console.log(matrix);

// console.log(firstLetterLocation('N', matrix));

solveWord('SUPER', matrix);
console.log(solveResult);
