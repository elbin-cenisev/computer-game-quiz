// Get the list of questions
let questionList = initializeQuestions();

// Tracks the current question the user is on. Increments when answerButton is clicked. Resets on start.
let questionTracker = 0;

// Tracks the amount of time left on the quiz. Mostly handled by startTimer().
let timeTracker = 0;

// Returns the hardcoded list of questions, but randomizes order
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

    return questions;
}

// Called each time the quiz starts
function randomizeQuestions(questionList) {
    // Randomize order of questions using the "Durstenfeld shuffle"
    // Source: https://bit.ly/3wPCw4W
    for (var i = questionList.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questionList[i];
        questionList[i] = questionList[j];
        questionList[j] = temp;
    }

    return questionList;
}

// Called when switching between screens 
function showScreen(screen) {
    $('#startSec').hide();
    $('#questionSec').hide();
    $('#endSec').hide();
    $('#highscoreSec').hide();

    screen.show();
}
// Called when quiz starts, but runs in parallel to entire quiz, not just at start.
function startTimer() {
    timeTracker = 30;
    timer.textContent = timeTracker;
    var timerInterval = setInterval(function() {
        timeTracker--;
        timer.textContent = timeTracker;
        // Don't go below 0
        if(timeTracker <= 0 || questionTracker === questionList.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
    // When it goes to 0, end the quiz
    // When wrong answer is picked, lose seconds
}

// Called when all questions are answered or time runs out
function endQuiz() {
    // Only show end screen
    $('header').show();
    showScreen($('#endSec'));
}

// Called each time a new question needs to be displayed on question screen.
function showQuestion(index) {
    let currentQuestion = questionList[index];

    // Display the question
    $('#questionTitle').text(currentQuestion.question);

    // Clear answer list before displaying new answers
    $('#ansList').empty();

    // For every possible answer, create a button
    currentQuestion.answers.forEach(element => {
        let $newli = $('<li><button class="answerBtn">' + element + '</button></li>');
        $('#ansList').append($newli);
    });
}

// Called when answer button is clicked. Informs whether choice is correct.
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

// Called when View Highscores button is clicked. Shows local storage list of scores.
function displayHighscores() {
    // Clear highscores (otherwise you append to existing ol)
    $('#highscoreList').empty();

    // Prebaked algorithm for taking everything out of local storage
    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

    while(i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])))
    }
    for(var i = 0; i < values.length; i++) {
        // Creates <li> for each entry in localstorage
        $('#highscoreList').append("<li class='score'>" + values[i].initials + " - " + values[i].score + "</li>")
    }
}

// Handler for Start Quiz button on the start screen
$('#startBtn').click(function(event) {
    // randomize the order of the questions
    randomizeQuestions(questionList);

    // Only show question screen
    showScreen($('#questionSec'));

    // Reset trackers
    questionTracker = 0;
    secondsTracker = 30;

    // Start the score timer
    startTimer();

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
        timeTracker -= 5;   // Penalize for wrong answer
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

// Handles Try Again button on end screen and Go Back on highscore screen. Sends user back to start.
$('.backBtn').on('click', function() {
    // Show the start screen
    $('header').show();
    showScreen($('#startSec'));
})

// Handles View Highscore list on most screens. Directs to highscoreList.
$('#viewHighscore').click(function(event) {
    // Show the highscore screen and load scores
    $('header').hide();
    showScreen($('#highscoreSec'));
    displayHighscores();
})

// Handles submit button on end screen. Saves score for highscoreList.
$('#submitBtn').click(function(event) {
    // save timeTracker as score in an object
    var user = {
        initials: initials.value,
        score: timeTracker
    };

    // put the object in localStorage, use input as key
    localStorage.setItem(JSON.stringify(initials.value), JSON.stringify(user));
})

// Handles clear button on highscore screen. Removes everything from local storage
$('#clearBtn').click(function(event) {
    $('#highscoreList').empty();
    localStorage.clear();
})
