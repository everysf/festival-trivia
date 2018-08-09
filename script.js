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
    answerValue: true
}

// Start Game
$(".landingWrap").on("click", function() {
    $(".landingWrap").hide();
    $(".questionSection").show();
    game.started = true;
    game.questionsStarted = true;
    loadQuestion();
    if (!game.questionNumber === 0) {
        game.questionNumber++;
    }
});

// Load question screen
function loadQuestion() {
    $(".festPhoto").attr("src", questionBank[game.questionNumber].image)
    $(".questionHead").text(questionBank[game.questionNumber].question)
    $(".statusNumber").text(game.questionNumber)
    $(".answer1").text(questionBank[game.questionNumber].answer[0])
    $(".answer2").text(questionBank[game.questionNumber].answer[1])
    $(".answer3").text(questionBank[game.questionNumber].answer[2])
    $(".answer4").text(questionBank[game.questionNumber].answer[3])
    console.log("Question #" + game.questionNumber + " correct answer: " + questionBank[game.questionNumber].correctAnswer)
}

// Evaluate answer
// Load answer screen
$(".answerOption").on("click", function() {
    game.questionNumber++;
    loadAnswerScreen()
    if (game.questionNumber < 10) {
        if ($(".answerOption").text() == questionBank[game.questionNumber-1].correctAnswer) {
            game.answerValue === true;
            console.log("Question " + (game.questionNumber-1) + ": You got it!")
        } else {
            game.answerValue === false;
            $(".answerResult").html("Question " + (game.questionNumber-1) + ": Wrong city...")
        }
    }
    if (game.questionNumber > 10) {
        $(".answerSection").hide();
        $(".resetSection").show();
        console.log(game.counterCorrect)
        if (game.counterCorrect === 10) {
            $(".resultHeader").text("You're a festival vet.")
        } else if (game.counterCorrect >= 7) {
            $(".resultHeader").text("Damn, you know your music.")
        } else if (game.counterCorrect >= 4) {
            $(".resultHeader").text("Have you even been to a festival?.")
        } else {
            $(".resultHeader").text("You need to listen to some more music!")
        }}
    }
);

// Load answer screen
function loadAnswerScreen() {
    $(".questionSection").hide();
    $(".answerSection").show();
}

// Next question
$(".nextQuestionBtn").on("click",function nextQuestion() {
    $(".answerSection").hide();
    $(".questionSection").show();
    loadQuestion();
});

// AnswerValue

