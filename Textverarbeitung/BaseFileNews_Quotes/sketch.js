//.csv Tabelle
let table;

//Liste für Folgewörter
let dict = {};

let currentWord = "";

//Generierter Text
let markovText;

function preload() {
    //Dateipfad zur .csv Datei
    table = loadTable(`Schlagzeilen.csv`, 'ssv');

}

function setup() {
    createCanvas(800, 800);

    
    //Liste mit Folgewörter erstellen
    createMarkov();
    generateFirstWordWithQuotationMark();

    //Kondition, dass die Generation aufhört
    while(!currentWord.endsWith("»")) {
        generateNextWord()
    }
}

function draw() {
    background(200);
    text(markovText, 15, 30, width - 20, height - 20);
    fill(0);

}

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


function generateFirstWordWithQuotationMark() {
    let wordsThatStartWithQuote = Object.keys(dict).filter(key => key.startsWith("«"));
    print(wordsThatStartWithQuote);

    let randomWordsThatStartWithQuote = wordsThatStartWithQuote[getRandomInt(wordsThatStartWithQuote.length)];

    currentWord = markovText = randomWordsThatStartWithQuote;
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateNextWord() {
    let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
    currentWord = nextWord;
    markovText += ` ${nextWord}`;
}



