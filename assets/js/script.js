let startSection = document.querySelector('#startSec');         // This is where you start the quiz
let startButton = document.querySelector('#startBtn');          // This button starts the quiz
let questionSection = document.querySelector('#questionSec');   // This is where questions are displayed

function startQuiz() {
    // Hide start section
    startSection.style.display = 'none';

    // Display questions section
    questionSection.style.display = 'block';

    // Start the score timer
    startTimer()

}

function startTimer() {
    
}

startButton.addEventListener("click", function(event) {
    startQuiz();
});