const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the color of the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        answer: "Blue"
    },
    {
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        answer: 'H2O'
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        options: ['Japan', 'China', 'South Korea', 'Thailand'],
        answer: 'Japan'
    },
    {
        question: 'What is the largest mammal?',
        options: ['Blue whale', 'Elephant', 'Giraffe', 'Hippo'],
        answer: 'Blue whale'
    },
    {
        question: 'Who painted the Mona Lisa?',
        options: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Michelangelo'],
        answer: 'Leonardo da Vinci'
    },
    {
        question: 'What is the tallest mountain in the world?',
        options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
        answer: 'Mount Everest'
    },
    {
        question: 'What is the smallest planet in the solar system?',
        options: ['Mercury', 'Mars', 'Pluto', 'Earth'],
        answer: 'Mercury'
    },
    {
        question: 'Which bird is known for its ability to mimic human speech?',
        options: ['Parrot', 'Eagle', 'Owl', 'Penguin'],
        answer: 'Parrot'
    }

];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15; // 15 seconds per question

function startQuiz() {
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const questionElement = document.getElementById('question_conatiner');
    const optionsElement = document.getElementById('option_container');
    const numberElement = document.getElementById('number');
    
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        
        optionsElement.innerHTML = '';
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option';
            button.onclick = () => selectOption(option);
            optionsElement.appendChild(button);
        });
        
        numberElement.textContent = `Question ${currentQuestionIndex + 1}`;
        document.getElementById('click').disabled = true; // Disable submit button initially
    }
}

function selectOption(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const buttons = document.querySelectorAll('#option_container .option');
    
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = '#d4f4d1'; // Green for correct answer
        } else if (button.textContent === selectedOption) {
            button.style.backgroundColor = '#f4d1d1'; // Red for wrong answer
        }
    });
    
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById('marks').textContent = score;
    }
    
    document.getElementById('click').disabled = false; // Enable submit button
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        resetTimer();
    } else {
        displayEndScreen();
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15; // Reset to 15 seconds
    startTimer();
}

function displayEndScreen() {
    document.querySelector('.container').innerHTML = `<h2>Quiz Finished!</h2><p>Your final score: ${score}</p>`;
}

document.addEventListener('DOMContentLoaded', startQuiz);
