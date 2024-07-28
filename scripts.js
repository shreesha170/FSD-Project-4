const questions = [
    {
        question: 'What is the main purpose of ReactJS?',
        options: ['To build UI components', 'To manage databases', 'To create backend services', 'To design user interfaces'],
        answer: 'To build UI components'
    },
    {
        question: 'Which method is used to update the state in a React component?',
        options: ['setState', 'getState', 'updateState', 'changeState'],
        answer: 'setState'
    },
    {
        question: 'What is JSX in React?',
        options: ['A JavaScript syntax extension', 'A type of CSS', 'A database query language', 'A server-side scripting language'],
        answer: 'A JavaScript syntax extension'
    },
    {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: ['<a>', '<link>', '<href>', '<url>'],
        answer: '<a>'
    },
    {
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets', 'Computer Style Sheets'],
        answer: 'Cascading Style Sheets'
    },
    {
        question: 'Which property is used to change the background color in CSS?',
        options: ['background-color', 'color', 'bg-color', 'background'],
        answer: 'background-color'
    },
    {
        question: 'In HTML, which attribute is used to define inline styles?',
        options: ['style', 'class', 'id', 'styles'],
        answer: 'style'
    },
    {
        question: 'What is the use of the \'className\' attribute in React?',
        options: ['To apply CSS classes to elements', 'To define JavaScript functions', 'To create HTML elements', 'To specify the component name'],
        answer: 'To apply CSS classes to elements'
    },
    {
        question: 'Which HTML element is used to define the title of a document?',
        options: ['<title>', '<head>', '<meta>', '<header>'],
        answer: '<title>'
    },
    {
        question: 'How do you include external CSS in an HTML document?',
        options: ['<link rel="stylesheet" href="style.css">', '<style src="style.css">', '<css link="style.css">', '<stylesheet href="style.css">'],
        answer: '<link rel="stylesheet" href="style.css">'
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function loadQuestion() {
    const questionElement = document.getElementById('question_container');
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
            alert('Your time for this question is out!');
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

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('marks').textContent = score;
    loadQuestion();
    startTimer();
}

document.addEventListener('DOMContentLoaded', startQuiz);
