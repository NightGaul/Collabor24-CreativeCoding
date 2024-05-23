const original = document.querySelector('.left p')
const transformed = document.querySelector('.right p')
const rhymes = document.querySelector('#rhymes')

let og_text = ''
let split_text = null
let text_loaded = false

let pos_words_left = [];
let pos_words_right = [];


function load_text(txt) {
  for (let i = 0; i < txt.length; i++) {
    const t = txt[i];
    og_text += t + ' '
  }
  text_loaded = true
  original.innerHTML = highlight_nouns(og_text);
  pos_words_left = document.querySelectorAll('div.left p.txt span.word');
  console.log(pos_words_left);
}

function highlight_nouns(txt) {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    if (RiTa.pos(word)[0] === 'nn') {
      html_txt += make_span(word, '#f0f') + ' '
    } else {
      html_txt += word + ' '
    }
  }
  return html_txt
}

// ignore this for now
rhymes.addEventListener('click', () => {
  if (text_loaded) {
    rhyme_nouns()
  }
})

let was_it_rhymed = false;

function rhyme_nouns() {
  const txt_elements = RiTa.tokenize(og_text)
  let html_txt = ''
  for (let i = 0; i < txt_elements.length; i++) {
    const word = txt_elements[i]
    if (RiTa.pos(word)[0] === 'nn') {
      let pos = RiTa.tagger.allTags(word)[0];
      const rhyme = RiTa.soundsLikeSync(word, { pos });
      if (rhyme.length > 0) {
        html_txt += make_span(random(rhyme), '#30f') + ' '
      } else {
        html_txt += make_span(word) + ' '
      }
    } else {
      html_txt += word + ' '
    }
  }
  transformed.innerHTML = html_txt;

  pos_words_right = transformed.querySelectorAll('span');
  console.log(pos_words_right);
  was_it_rhymed = true;
}

function get_random(arr) {
  return random(arr)
}

function make_span(word, color) { //color  = hex value
  return `<span class="word" style="color:${color}">${word}</span>`
}



function setup() {
  let canvas = createCanvas(innerWidth, innerHeight);
  canvas.parent('#p5');
  //noCanvas()
  loadStrings('0_assets/txt/shelley.txt', load_text)
}

function draw() {
  background(255);

  for (let i = 0; i < pos_words_left.length; i++) {
    let x = pos_words_left[i].getBoundingClientRect().x;
    let y = pos_words_left[i].getBoundingClientRect().y;
    let w = pos_words_left[i].getBoundingClientRect().width;
    let h = pos_words_left[i].getBoundingClientRect().height;
    fill(255,0,0,100);
    noStroke();
    rect(x,y,w,h)

    let span_left = pos_words_left[i];

    let left_x = span_left.getBoundingClientRect().x;
    let left_y = span_left.getBoundingClientRect().y;

    // 

    if (was_it_rhymed) {
      let span_right = pos_words_right[i];

      let right_x = span_right.getBoundingClientRect().x;
      let right_y = span_right.getBoundingClientRect().y;
      // console.log(left_x, left_y,right_x, right_y);

      strokeWeight(3);
      stroke(0, 0, 255);
      line(left_x, left_y, right_x, right_y);


    }
  }
}
