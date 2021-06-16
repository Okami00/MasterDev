// Data - OK
var quiz = [
    { question: "2 x 1 = ?", choices: [1, 2, 3, 4], correctAnswer: 2 },
    { question: "2 x 2 = ?", choices: [3, 4, 5, 6], correctAnswer: 4 },
    { question: "2 x 3 = ?", choices: [6, 7, 8, 9], correctAnswer: 6 },
    { question: "2 x 4 = ?", choices: [7, 8, 9, 10], correctAnswer: 8 },
    { question: "2 x 5 = ?", choices: [8, 10, 9, 11], correctAnswer: 10 },
    { question: "2 x 6 = ?", choices: [9, 10, 6, 12], correctAnswer: 12 },
    { question: "2 x 7 = ?", choices: [14, 12, 18, 20], correctAnswer: 14 }
];
// Variable 
var onStart = document.querySelector('.start__btn');
var notification = document.querySelector(".notification");
var quesDetail = document.querySelector('.question__detail');
var time = document.getElementById("time");
var showMessage = document.querySelector('.showMessage');


var questionCount = 0;
var score = 0;
var countdown;
disButton(true);
// When click button start => time countdown
function startClick() {
    onStart.disabled = true;
    disButton(false);
    countdown = setInterval(function () {
        var seconds = time.textContent;
        seconds--;
        time.innerHTML = seconds;
        if (seconds <= 0) {
            clearInterval(countdown); // ngắt lặp lại
            notification.style.display = "inline";
            disButton(true);
        }
    }, 1000);
}
// When time runs out show Notification
function timeUp() {
    notification.style.display = "none";
    document.getElementById('noti__score').innerHTML = score;
    reset()
}
// Reset 
function reset() {
    score = 0;
    questionCount = 0;
    disButton(true);
    onStart.disabled = false;
    document.querySelector('.score span').innerHTML = "0";
    document.getElementById("time").innerHTML = "10";
    createQuestionElement(questionCount);
}
// Catch event || Show message dialog Correct and Incorrect - NOT OK
function reply_click(clicked_id) {
    if (checkEnd(questionCount)) {
        clearInterval(countdown);
        notification.style.display = "inline";
        reset();
    } else {
        var x = document.getElementById(clicked_id).textContent;
        var correctAnswer = quiz[questionCount].correctAnswer;
        if (x == correctAnswer) {
            score++;
            countScore(score);
            showMessage.innerHTML = "<h3>Correct!!!</3>";
            showMessage.style.backgroundColor = "var(--correct)";
            showMessage.style.display = "inline";
            setTimeout(function () {
                showMessage.style.display = "none";
            }, 500);
        } else {
            showMessage.innerHTML = "<h3>Incorrect!!!</3>";
            showMessage.style.backgroundColor = "var(--incorrect)";
            showMessage.style.display = "inline";
            setTimeout(function () {
                showMessage.style.display = "none";
            }, 500);
        }
        questionCount++;
        createQuestionElement(questionCount);
    }
}
// Created new question - OK
function createQuestionElement(index) {
    var question = quiz[index].question;
    var choices = quiz[index].choices;
    quesDetail.innerHTML = question;
    for (let i = 0; i < choices.length; i++) {
        var butt = document.getElementById('but' + i);
        butt.innerHTML = choices[i];
    }
}
// Display score - not ok
function countScore(score) {
    document.querySelector('.score span').innerHTML = score;
    document.getElementById('noti__score').innerHTML = score;
}
// Disabled button - OK
function disButton(bool) {
    var elems = document.getElementsByClassName("answer__btn");
    for (var i = 0; i < elems.length; i++) {
        elems[i].disabled = bool;
    }
}
// Check end when answer all of question - OK
function checkEnd(x) {
    var totalQuestion = quiz.length-1;
    if (totalQuestion == x) {
        return true;
    } else {
        return false;
    }
}
createQuestionElement(questionCount);   
