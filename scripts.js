// Questions array
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
let loadingBar = document.getElementById('loadingBar');
let loadingText = document.getElementById('loadingText');
let loadingPercentage = 0;

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
            button.classList.add('correct'); // Add correct class
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect'); // Add incorrect class
        }
    });
    
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById('marks').textContent = score;
        updateLoadingBar(10); // Increase by 10% for correct answer
    } else {
        updateLoadingBar(-5); // Decrease by 5% for incorrect answer
    }
    
    document.getElementById('click').disabled = false; // Enable submit button
}

function updateLoadingBar(amount) {
    loadingPercentage = Math.max(0, Math.min(100, loadingPercentage + amount));
    loadingBar.style.width = loadingPercentage + '%';
    loadingText.textContent = loadingPercentage + '%';
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
            alert('Time for this question is over!');
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
    document.querySelector('.container').style.display = 'none';
    const endScreen = document.querySelector('.end-screen');
    document.getElementById('finalScore').textContent = score;
    endScreen.style.display = 'block'; // Show the end screen
}

function restartQuiz() {
    document.querySelector('.end-screen').style.display = 'none'; // Hide end screen
    document.querySelector('.welcome-container').style.display = 'none'; // Hide welcome screen
    document.querySelector('.container').style.display = 'block'; // Show quiz container
    currentQuestionIndex = 0;
    score = 0;
    loadingPercentage = 0; // Reset loading bar
    loadingBar.style.width = '0%'; // Ensure loading bar starts at 0%
    document.getElementById('marks').textContent = score;
    loadQuestion();
    resetTimer();
}

function startQuiz() {
    document.querySelector('.welcome-container').style.display = 'none'; // Hide welcome screen
    document.querySelector('.container').style.display = 'block'; // Show quiz container
    currentQuestionIndex = 0;
    score = 0;
    loadingPercentage = 0; // Reset loading bar
    loadingBar.style.width = '0%'; // Ensure loading bar starts at 0%
    document.getElementById('marks').textContent = score;
    loadQuestion();
    resetTimer();
}

// Add event listener for the Play Again button
document.getElementById('playAgain').addEventListener('click', restartQuiz);

// Add event listener for the Start Quiz button
document.querySelector('.start-button').addEventListener('click', startQuiz);
