// Get the list of questions and randomize the order of questions
let questionList = initializeQuestions();

// Tracks the current question the user is on. Increments when answerButton is clicked. Resets on start.
let questionTracker;

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

function startQuiz() {
    // Hide start section
    $('#startSec').hide();

    // Display questions section
    $('questionSec').show();

    // Reset questionTracker
    questionTracker = 0;

    // Display the first question
    showQuestion(questionTracker);

    // Start the score timer
    // startTimer();
}

function showQuestion(index) {
    let currentQuestion = questionList[index];

    // Display the question
    console.log(currentQuestion.question);
    $('#questionTitle').text(currentQuestion.question);

    // For every possible answer, create a button
    currentQuestion.answers.forEach(element => {
        let $newli = $('<li><button class="answerBtn">' + element + '</button></li>');
        $('#ansList').append($newli);
    });
}

$('#startBtn').click(function(event) {
    startQuiz();
});