// 
const quizs = [
  {question: "Question 1: 1 + 1 = ?",choices: [1, 2, 3, 4],answer: 2},
  {question: "Question 2: 1 + 2 = ?",choices: [2, 3, 4],answer: 3},
  {question: "Question 3: 1 + 3 = ?",choices: [3, 4, 5, 6],answer: 4},
  {question: "Question 4: 1 + 4 = ?",choices: [4, 5, 6, 7],answer: 5},
  {question: "Question 5: 1 + 5 = ?",choices: [5, 6, 7, 8],answer: 6},
  {question: "Question 6: 1 + 6 = ?",choices: [6, 7, 8, 9],answer: 7},
  {question: "Question 6: 1 + 7 = ?",choices: [12, 3, 8, 20],answer: 7},
  {question: "Question 6: 1 + 8 = ?",choices: [1, 7, 9, 5],answer: 7},
  {question: "Question 6: 1 + 9 = ?",choices: [4, 9, 12, 10],answer: 7},
  {question: "Question 6: 1 + 10 = ?",choices:[7, 11, 4, 9],answer: 7},
  {question: "Question 6: 2 + 1 = ?",choices: [3, 7, 4, 2],answer: 7},
  {question: "Question 6: 2 + 2 = ?",choices: [5, 7, 4, 9],answer: 7},
  {question: "Question 6: 2 + 3 = ?",choices: [12, 7, 2, 5],answer: 7},
]
let pointElement = document.querySelector('.point span');
let startElement = document.querySelector('.start__btn');
let timerElement = document.querySelector('.timer span');
let notifiElement = document.querySelector('.notifi');
let notifiBtn = document.querySelector('.notifi button');
let statusElement = document.querySelector('.status');
let questionIndex = 0;
let countScore = 0;
let countdown;
// 

//  Create new question
function renderQuizs(index) {
  let questionElement = document.querySelector('.question__title');
  questionElement.innerHTML = quizs[index].question;
  let answer = document.querySelector('.answer');
  let choices = quizs[index].choices;
  let htmls = '';
  for (let i = 0; i < choices.length; i++) {
    htmls += '<button class="btn" id="btnId' + i + '" onclick="reply__click(this.id)">' + choices[i] + '</button>'
  }
  answer.innerHTML = htmls;
}
// Time countdown 
function renderTimer() {
  countdown = setInterval(() => {
    let seconds = timerElement.textContent;
    seconds--;
    timerElement.innerHTML = seconds;
    if (seconds <= 0) {
      clearInterval(countdown);
      timeUp()
    }
  }, 1000);
}
// Handle Button 
function reply__click(reply_id) {
  if (checkOver(questionIndex)) { 
    clearInterval(countdown);
    timeUp()
    handleBtnAnswer(true)
  } else {
    let answerCorrect = document.getElementById(reply_id).textContent;
    (answerCorrect == quizs[questionIndex].answer) ? correct(): wrong()
    questionIndex++;
    renderQuizs(questionIndex);
  }
}
// Check over
function checkOver(questionIndex) {
  let lastQuestionIndex = quizs.length - 1 ;
  if (lastQuestionIndex == questionIndex) {
    return true
  } else {
    return false
  }
}

// Time up
function timeUp() {
  notifiElement.style.display = 'inline'
  startElement.disabled = true
  document.querySelector('.notifi span').innerHTML = countScore
  handleBtnAnswer(true)
}
// Reset 
function handleReset() {
  questionIndex = 0
  renderQuizs(questionIndex)
  countScore = 0
  pointElement.innerHTML = countScore
  handleBtnAnswer(true)
}

function handleBtnAnswer(bool) {
  let choices = document.querySelectorAll('.answer .btn')
  for (let i = 0; i < choices.length; i++) {
    choices[i].disabled = bool
  }
}
notifiBtn.addEventListener('click', () => {
  handleReset()
  notifiElement.style.display = 'none'
  startElement.disabled = false
  timerElement.innerHTML = '10'
})

function correct() {
  statusElement.style.display = 'inline'
  statusElement.innerHTML = ' <h1>Correct !!!</h1>'
  statusElement.style.background = 'var(--correct)'
  countScore++
  pointElement.innerHTML = countScore
  setTimeout(() => {
    statusElement.style.display = 'none'
  }, 500)
}

function wrong() {
  statusElement.style.display = 'inline'
  statusElement.innerHTML = ' <h1>Wrong!!!</h1>'
  statusElement.style.background = 'var(--wrong)'
  setTimeout(() => {
    statusElement.style.display = 'none'
  }, 500)
}
function start() {
  timerElement.innerHTML = '10'
  handleBtnAnswer(true)
  startElement.onclick = () => {
    startElement.disabled = true
    handleBtnAnswer(false)
    renderQuizs(questionIndex)
    renderTimer()
  }
}
start()