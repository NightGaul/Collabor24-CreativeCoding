//.csv Tabelle
let table;

//Liste für Folgewörter
let dict = {};

let currentWord = "";

//Generierter Text
let markovText;
let voice = new p5.Speech();
let xAxis = 1;
function preload() {
    //Dateipfad zur .csv Datei
    table = loadTable(`Fragen_Schlagzeilen.csv`, 'ssv');

}

function setup() {
    createCanvas(1250, 100);
    
    
    //Liste mit Folgewörter erstellen
    createMarkov();
    generateFirstWordWithUppercase();

    //Kondition, dass die Generation aufhört
    while (!currentWord.includes("?")) {
        generateNextWord()
    }
    
    voice.setVoice(2);
    textSize(40);
    voice.speak(markovText);
    console.log(markovText);
    
}


function draw() {
    background(255,0,0);
    
    text(markovText, xAxis % width , 30, width - 20, height - 20);
     //stroke(255, 255, 255);
    fill(255);
    textStyle(BOLD);
    
    
    if (xAxis % width < 1){
        generateFirstWordWithUppercase();
        while (!currentWord.includes("?")) {
            generateNextWord()
        }
        
        voice.speak(markovText);
        console.log(markovText);
        
    }
    xAxis += 1;

}

// function mousePressed() {
//     if (currentWord.includes("?")) generateFirstWordWithUppercase();
//     while (!currentWord.includes("?")) {
//         generateNextWord()
//     }
//     voice.speak(markovText);
// }

//Möglichkeit Kommas ebenfalls abzutrennen, aber ist momentan nicht so nötig und nur kompliziert
function createMarkov() {
    let temp = [];
    table.rows.forEach(row => temp = [...temp, ...row.arr[0].split(" ")]);
    temp.forEach((word, i) => {

        if (i === temp.length) return;

        if (word in dict) {
            dict[word].push(temp[i + 1])

        } else {
            dict[word] = [temp[i + 1]];
        }
    })
}


function generateFirstWordWithUppercase() {
    let wordThatStartsWithUppercase = Object.keys(dict).filter(checkIfUpperCase);
    let randomWordThatStartsWithUppercase = wordThatStartsWithUppercase[getRandomInt(wordThatStartsWithUppercase.length)];
    currentWord = markovText = randomWordThatStartsWithUppercase;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function checkIfUpperCase(value) {
    return value.charAt(0) !== value.charAt(0).toLowerCase();
}

function generateNextWord() {
    let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
    currentWord = nextWord;
    markovText += ` ${nextWord}`;
}



