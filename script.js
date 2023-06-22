// Author: Roeland L.C. Kemp

const input_ids = ["bin_text", "dec_text", "hex_text"];
const bin_text = document.getElementById("bin_text");
const dec_text = document.getElementById("dec_text");
const hex_text = document.getElementById("hex_text");
const score_text = document.getElementById("score_text");
const mistakes_text = document.getElementById("mistakes_text");

bin_text.onkeypress = function(e) {
    return checkBinInput(e);
};

dec_text.onkeypress = function(e) {
    return checkDecInput(e);
};

hex_text.onkeypress = function(e) {
    return checkHexInput(e);
};

function checkBinInput(e) {
    if (e.which == 13) {
        checkAnswer();
    }
    let chr = String.fromCharCode(e.which);
    return ("01".indexOf(chr) >= 0);
}


function checkDecInput(e) {
    if (e.which == 13) {
        checkAnswer();
    }
    let chr = String.fromCharCode(e.which);
    return ("0123456789".indexOf(chr) >= 0);
}


function checkHexInput(e) {
    if (e.which == 13) {
        checkAnswer();
    }
    let chr = String.fromCharCode(e.which);
    return ("01234567890ABCDEF".indexOf(chr) >= 0);
}

let fieldIndex;
let bin;
let dec;
let hex;

let score = 0;
let mistakes = 0;
let answerArray = [];

function newQuestion() {
    if (answerArray.length <= 0) {
        fillAnswerArray();
    }

    fieldIndex = Math.floor(Math.random() * 3);
    
    dec = answerArray.pop();
    bin = ("0000000" + dec.toString(2)).substr(-8);
    hex = ("0" + dec.toString(16).toUpperCase()).substr(-2);

    resetFields();

    let givenField = document.getElementById(input_ids[fieldIndex]);
    switch (fieldIndex) {
    case 0: givenField.value = bin; break; 
    case 1: givenField.value = dec; break;
    case 2: givenField.value = hex; break;
    }
    givenField.disabled = true;
    givenField.setAttribute("style", "background: #1D1D1D");
}

function resetFields() {
    for (let i = 0; i < input_ids.length; i++) {
        let currentField = document.getElementById(input_ids[i]);
        currentField.value = '';
        currentField.disabled = false;
        currentField.setAttribute("style", "background: #111");
    }
}

function checkAnswer() {
    if (dec === parseInt(bin_text.value, 2) 
        && dec === parseInt(dec_text.value, 10)
        && dec === parseInt(hex_text.value, 16)) {
        score++;
        score_text.textContent = score;
        newQuestion();
    } else {
        score--;
        score_text.textContent = score;
        mistakes++;
        mistakes_text.textContent = mistakes;
    }
}

function range(start, end) {
  return Array.apply(0, Array(end - start + 1))
    .map((element, index) => index + start);
}

function fillAnswerArray() {
    answerArray = range(2, 254).map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

newQuestion();