let txt;

let dict = {};
let markovText = "";
let currentWord = "";
function preload() {
    txt = loadTable(`../../assets/Schlagzeilen.csv`, 'ssv');
    
}

function setup() {

    
    createCanvas(800, 800);
    
    print(txt);

    // createMarkov();
    // generateFirstWord();
    //
    // setInterval(() => {
    //     generateNextWord();
    // }, 100)
}

function draw() {
    background(200);
    
    text(markovText, 10, 30, width - 20, height - 20);
    fill(0);
    
}

function createMarkov() {
    let temp = [];

    txt.forEach(line => temp = [...temp, ...line.split(" ")]);




    temp.forEach((word, i) => {

        if (i == temp.length) return;

        if (word in dict) {
            dict[word].push(temp[i + 1])

        } else {
            dict[word] = [temp[i + 1]];
        }
    })

    //console.log(dict);
}

function generateFirstWord() {



    let wordsThatEndWithDOT = Object.keys(dict).filter(key => key.endsWith("."))



    let randomWordThatEndWithDot = wordsThatEndWithDOT[getRandomInt(wordsThatEndWithDOT.length)];

    currentWord = markovText = dict[randomWordThatEndWithDot][getRandomInt(dict[randomWordThatEndWithDot].length)];

    console.log(markovText);

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateNextWord() {
    let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
    currentWord = nextWord;
    markovText += ` ${nextWord}`;
}



