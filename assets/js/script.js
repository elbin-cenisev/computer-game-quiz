// Get the list of questions and randomize the order of questions
let questionList = initializeQuestions();

// Tracks the current question the user is on. Increments when answerButton is clicked. Resets on start.
let questionTracker = 0;

// Tracks the amount of time left on the quiz. Mostly handled by startTimer().
let timeTracker = 0;

// Called when switching between screens 
function showScreen(screen) {
    $('#startSec').hide();
    $('#questionSec').hide();
    $('#endSec').hide();

    screen.show();
}

function initializeQuestions() {
    // create the question list
    let questions = [
        {
            question: "Richard Garriot released which landmark RPG title in June 1981?",
            answers: [
                "Final Fantasy",
                "Donkey Kong",
                "Ultima",
                "Akalabeth"
            ],
            correct: "Ultima"
        },
        {
            question: "Which computer game developer created the Thief series?",
            answers: [
                "Looking Glass Studios",
                "Ubisoft",
                "Konami",
                "Westwood Studios"
            ],
            correct: "Looking Glass Studios"
        },
        {
            question: "Which of these games was designed by Chris Sawyer?",
            answers: [
                "The Sims",
                "Microsoft Flight Simulator",
                "System Shock",
                "RollerCoaster Tycoon"
            ],
            correct: "RollerCoaster Tycoon"
        },
        {
            question: "Which adventure game was considered the bestselling PC title before The Sims was released?",
            answers: [
                "Myst",
                "Civilization",
                "Tetris",
                "Super Mario Bros."
            ],
            correct: "Myst"
        },
        {
            question: "Which of these critically acclaimed console games has never been ported to the PC?",
            answers: [
                "Final Fantasy VI",
                "Rayman",
                "Castlevania: Symphony of the Night",
                "Chex Quest"
            ],
            correct: "Castlevania: Symphony of the Night"
        },
    ];

    // Randomize order of questions using the "Durstenfeld shuffle"
    // Source: https://bit.ly/3wPCw4W
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }

    return questions;
}

// Called when all questions are answered or time runs out
function endQuiz() {
    // Only show end screen
    showScreen($('#endSec'));
}

function showQuestion(index) {
    let currentQuestion = questionList[index];

    // Display the question
    console.log(currentQuestion.question);
    $('#questionTitle').text(currentQuestion.question);

    // Clear answer list before displaying new answers
    $('#ansList').empty();

    // For every possible answer, create a button
    currentQuestion.answers.forEach(element => {
        let $newli = $('<li><button class="answerBtn">' + element + '</button></li>');
        $('#ansList').append($newli);
    });
}

function updateIndicator(correct) {
    let message;
    if(correct) {
        message = 'Correct'
    }
    else {
        message = 'Incorrect'
    }
    $('#indicator').text(message);
}

// Handler for Start Quiz button on the start screen
$('#startBtn').click(function(event) {
    // Only show question screen
    showScreen($('#questionSec'));

    // Reset trackers
    questionTracker = 0;
    secondsTracker = 75;

    // Start the score timer
    // startTimer();

    // Display the first question
    showQuestion(questionTracker);
});

// Handler for all answer buttons in the question screen
// Note: answer buttons are dynamically created in showQuestion() based on number of answers
$('#ansList').on('click', 'li', function() {

    // Check if the correct answer was selected
    if($(this).text() === questionList[questionTracker].correct) {
        updateIndicator(true);
    }
    else{
        updateIndicator(false);
        secondsTracker -= 15;   // Penalize for wrong answer
    }

    // Move to the next question
    questionTracker++;

    if(questionTracker === questionList.length) {
        endQuiz();
    }
    else {
        showQuestion(questionTracker);
    }
})