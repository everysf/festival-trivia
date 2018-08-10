// Game state manager
var game = {
    started: false,
    questionsStarted: false,
    questionNumber: 1,
    totalQuestions: 10,
    name: "",
    stage: 0,
    counterCorrect: 0,
    counterIncorrect: 0,
    answerValue: true,
}

// Timer logic
var timeRemaining = 15;
var timer;

function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (timeRemaining <= 0) {
        game.counterIncorrect++;
        $(".answerResult").html("Answer faster!")
        clearTimer()
        loadAnswerScreen()
        game.questionNumber++;
    }
    timeRemaining--;
    $(".timer").text(timeRemaining + " seconds")
}

function clearTimer() {
    clearInterval(timer);
}

// Load question screen
function loadQuestion() {
    clearTimer()
    timeRemaining = 15;
    startTimer()
    $(".festPhoto").attr("src", questionBank[game.questionNumber].image)
    $(".questionHead").text(questionBank[game.questionNumber].question)
    $(".statusNumber").text(game.questionNumber)
    $(".answer1").text(questionBank[game.questionNumber].answer[0])
    $(".answer2").text(questionBank[game.questionNumber].answer[1])
    $(".answer3").text(questionBank[game.questionNumber].answer[2])
    $(".answer4").text(questionBank[game.questionNumber].answer[3])
    console.log("Question #" + game.questionNumber + " correct answer: " + questionBank[game.questionNumber].correctAnswer)
}

// Load answer screen
function loadAnswerScreen() {
    $(".questionSection").hide();
    $(".answerSection").show();
}

// Evaluate answer
// Load answer screen
$(".answerOption").on("click", function clickAnswer() {
    clearTimer();

    // Correct or Incorrect
    if (game.questionNumber <= 10) {
        console.log(questionBank[game.questionNumber].correctAnswer)
        if ($(this).text() == questionBank[game.questionNumber].correctAnswer) {
            game.counterCorrect++;
            $(".answerResult").text("Question " + (game.questionNumber) + ": You got it!")
        } else {
            game.counterIncorrect++;
            $(".answerResult").html("Question " + (game.questionNumber) + ": Wrong city.")
        }
    }

    // Increment
    game.questionNumber++;

    // Load answer screen
    loadAnswerScreen()

    // No more questions
    if (game.questionNumber > 10) {
        $(".answerSection").hide();
        $(".resetSection").show();
        function updateCounter() {
            $(".correctDisplay").text(game.counterCorrect);
            $(".incorrectDisplay").text(game.counterIncorrect);
        }
        updateCounter()
        console.log("You answered " + game.counterCorrect + " correctly.")
        if (game.counterCorrect === 10) {
            $(".resultHeader").text("You're a festival vet.")
        } else if (game.counterCorrect >= 5) {
            $(".resultHeader").text("Damn, you know your music.")
        } else if (game.counterCorrect >= 3) {
            $(".resultHeader").text("Have you even been to a festival?")
        } else {
            $(".resultHeader").text("You need to listen to some more music!")
        }
            }
    });

// Next question
$(".nextQuestionBtn").on("click",function nextQuestion() {
    $(".answerSection").hide();
    $(".questionSection").show();
    loadQuestion();
});

// Start Game
$(".landingWrap").on("click", function() {
    $(".landingWrap").hide();
    $(".questionSection").show();
    game.started = true;
    game.questionsStarted = true;
    loadQuestion();
});

// Reset Button
$(".resetButton").on("click", function() {
    $(".resetSection").hide()
    game = {
        started: false,
        questionsStarted: false,
        questionNumber: 1,
        totalQuestions: 10,
        name: "",
        stage: 0,
        counterCorrect: 0,
        counterIncorrect: 0,
        answerValue: true,
    }
    $(".landingWrap").show();
});