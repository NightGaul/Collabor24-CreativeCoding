let table;

let dict = {};
let currentWord = "";

function preload() {
    table = loadTable(`../../assets/Schlagzeilen.csv`, 'ssv');

}



function setup() {

    console.log(table.rows[0])
    createCanvas(800, 800);

    print(table);

    createMarkov();
    //generateFirstWord();
    generateFirstWordWithQuotationMark();

    setInterval(() => {
        generateNextWord();
    }, 100)
}

function draw() {
    background(200);
    text("«" , 10, 30, width - 20, height - 20);
    text(markovText, 15, 30, width - 20, height - 20);
    fill(0);

}

function createMarkov() {
    let temp = [];

    table.rows.forEach(row => temp = [...temp, ...row.arr[0].split(" ")]);


    temp.forEach((word, i) => {

        if (i == temp.length) return;

        if (word in dict) {
            dict[word].push(temp[i + 1])

        } else {
            dict[word] = [temp[i + 1]];
        }
    })

    console.log(dict);
}


function generateFirstWordWithQuotationMark() {
    let wordsThatStartWithQuote = Object.keys(dict).filter(key => key.startsWith('«'))

    let randomWordsThatStartWithQuote = wordsThatStartWithQuote[getRandomInt(wordsThatStartWithQuote.length)];

    currentWord = markovText = dict[randomWordsThatStartWithQuote][getRandomInt(dict[randomWordsThatStartWithQuote].length)];
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateNextWord() {
    let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
    currentWord = nextWord;
    if (currentWord === undefined) return;
    markovText += ` ${nextWord}`;
    
}



