//.csv Tabelle
let table;

//Liste für Folgewörter
let dict = {};

let currentWord = "";

//Generierter Text
let markovText;
let voice = new p5.Speech();
let yAxis = 1;

function preload() {
    //Dateipfad zur .csv Datei
    table = loadTable(`Schlagzeilen.csv`, 'ssv');

}

function setup() {
    createCanvas(800, 400);

    
    //Liste mit Folgewörter erstellen
    createMarkov();
    generateFirstWordWithQuotationMark();
    

    //Kondition, dass die Generation aufhört
    while(!currentWord.endsWith("»")) {
        generateNextWord()
    }

    voice.setVoice(2);
    textSize(40);
    
    voice.speak(markovText);
    
}

function draw() {
    background(255,0,0);

    

    text(markovText,10 ,  yAxis % height, width - 20, height - 20);
    //stroke(255, 255, 255);
    fill(255);
    textStyle(BOLD);


    if (yAxis % height === 0){
        generateFirstWordWithQuotationMark()
        while (!currentWord.includes("»")) {
            generateNextWord()
        }

        voice.speak(markovText);
        

    }

    yAxis += 1;

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

function checkIfUpperCase(value){

    return value.charAt(0) !== value.charAt(0).toLowerCase();
}
function generateNextWord() {
    let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
    currentWord = nextWord;
    markovText += ` ${nextWord}`;
}



