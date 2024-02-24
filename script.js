const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true},
            { text: "London", correct: false},
            { text: "Berlin", correct: false},
            { text: "Rome", correct: false},
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            { text: "Chaucer", correct: false},
            { text: "Milton", correct: false},
            { text: "Shakespeare", correct: true},
            { text: "Dickens", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "H2O", correct: true},
            { text: "CO2", correct: false},
            { text: "NaCl", correct: false},
            { text: "O2", correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Mercury", correct: false},
        ]
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false},
            { text: "Seoul", correct: false},
            { text: "Tokyo", correct: true},
            { text: "Bangkok", correct: false},
        ]
    },
    {
        question: "Who is the author of 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true},
            { text: "Mark Twain", correct: false},
            { text: "J.K. Rowling", correct: false},
            { text: "Charles Dickens", correct: false},
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            { text: "Mount Everest", correct: true},
            { text: "K2", correct: false},
            { text: "Kangchenjunga", correct: false},
            { text: "Makalu", correct: false},
        ]
    },
    // Additional Questions
    {
        question: "Who is the author of 'The Great Gatsby'?",
        answers: [
            { text: "F. Scott Fitzgerald", correct: true},
            { text: "Ernest Hemingway", correct: false},
            { text: "John Steinbeck", correct: false},
            { text: "Virginia Woolf", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Au", correct: true},
            { text: "Ag", correct: false},
            { text: "Fe", correct: false},
            { text: "Cu", correct: false},
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
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
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
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
