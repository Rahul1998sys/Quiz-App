const questions = [
    {
        question: "What is the correct syntax to print something in the console?",
        answers: [
            {text: "console.print('hello')" , correct: "false"},
            {text: "print('hello')" , correct: "false"},
            {text: "console.log('hello')" , correct: "true"},
            {text: "log.console('hello')" , correct: "false"},
        ]
    },

    {
        question: "How do you create a function in JavaScript?",
        answers: [
            {text: "function = myFunc()", correct: "false"},
            {text: "function:myFunc()", correct: "false"},
            {text: "function myFunc() {}", correct: "true"},
            {text: "create function myFunc()", correct: "false"},
        ]
    },

    {
        question: "Which data type is not primitive in JavaScript?",
        answers: [
            {text: "String" , correct: "false"},
            {text: "Number" , correct: "false"},
            {text: "Object" , correct: "true"},
            {text: "Boolean", correct: "false"},
        ]
    },

    {
        question: "Which operator is used to assign a value?",
        answers: [
            {text: "==", correct: "false"},
            {text: "=", correct: "true"},
            {text: "===", correct: "false"},
            {text: "!=", correct: "false"},
        ]
    },

    {
        question: "What will typeof null return?",
        answers: [
            {text: "null", correct: "false"},
            {text: "object", correct: "true"},
            {text: "undefined", correct: "false"},
            {text: "boolean", correct: "false"},
        ]
    },

    {
        question:  "Which method converts JSON to JavaScript object?",
        answers: [
            {text: "JSON.convert()", correct: "false"},
            {text: "JSON.toObject()", correct: "false"},
            {text: "JSON.stringify()", correct: "false"},
            {text: "JSON.parse()", correct: "true"},
            
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo+ " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();