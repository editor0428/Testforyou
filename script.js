/* ==========================================
   BOYFRIEND TEST
========================================== */


/*
    You can edit these questions!

    Each question contains:

    question
    emoji
    answers
    reaction
*/

const questions = [

    {
        question: "Who loves whom more? 💕",

        emoji: "🥰",

        answers: [
            "Me, obviously 😌",
            "You do 🥺",
            "It's a tie ❤️",
            "We both know it's me 😏"
        ],

        reaction:
            "Hmm... suspicious answers. But I'll accept all of them. 😌💕"
    },


    {
        question: "Who is more dramatic? 🎭",

        emoji: "👀",

        answers: [
            "Definitely you",
            "Me? Never 😇",
            "We're both dramatic 😂",
            "I refuse to answer"
        ],

        reaction:
            "Okayyy... I'll let you keep your answer. For now. 😂"
    },


    {
        question: "Who says 'I miss you' first? 🥺",

        emoji: "💌",

        answers: [
            "Me",
            "You",
            "Whoever misses the other more",
            "We both pretend we don't miss each other"
        ],

        reaction:
            "Aww. Either way, we're both hopeless. 🫶"
    },


    {
        question: "What is my favorite thing about you? 💗",

        emoji: "🫶",

        answers: [
            "Your smile",
            "The way you make me laugh",
            "Your hugs",
            "Everything about you"
        ],

        reaction:
            "Trick question! The answer is EVERYTHING. 💕"
    },


    {
        question: "Who is the cutest couple? 👀",

        emoji: "💑",

        answers: [
            "Us, obviously",
            "Still us",
            "Do I even need to answer?",
            "The answer better be us 😤"
        ],

        reaction:
            "Correct. There was never another option. 😌❤️"
    }

];


// Current question

let currentQuestion = 0;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const homeScreen =
    document.getElementById("homeScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultScreen =
    document.getElementById("resultScreen");

const finalScreen =
    document.getElementById("finalScreen");

const questionNumber =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");

const questionText =
    document.getElementById("question");

const questionEmoji =
    document.getElementById("questionEmoji");

const answersContainer =
    document.getElementById("answers");

const reaction =
    document.getElementById("reaction");


// ==========================================
// SHOW SCREEN
// ==========================================

function showScreen(screen) {

    homeScreen.classList.remove("active");

    quizScreen.classList.remove("active");

    resultScreen.classList.remove("active");

    finalScreen.classList.remove("active");

    screen.classList.add("active");

}


// ==========================================
// START QUIZ
// ==========================================

function startQuiz() {

    currentQuestion = 0;

    showScreen(quizScreen);

    loadQuestion();

}


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    const current =
        questions[currentQuestion];


    // Question number

    questionNumber.textContent =
        `${currentQuestion + 1} / ${questions.length}`;


    // Progress

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;


    // Question

    questionText.textContent =
        current.question;


    // Emoji

    questionEmoji.textContent =
        current.emoji;


    // Clear previous answers

    answersContainer.innerHTML = "";

    reaction.textContent = "";


    // Create answer buttons

    current.answers.forEach(
        function(answer, index) {

            const button =
                document.createElement("button");

            button.className =
                "answer-button";

            button.textContent =
                answer;

            button.type =
                "button";


            button.addEventListener(
                "click",
                function() {

                    selectAnswer(
                        button,
                        current
                    );

                }
            );


            answersContainer.appendChild(
                button
            );

        }
    );

}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(
    selectedButton,
    current
) {

    // Disable all buttons

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );

    buttons.forEach(
        function(button) {

            button.disabled = true;

        }
    );


    // Highlight selected answer

    selectedButton.classList.add(
        "selected"
    );


    // Show reaction

    reaction.textContent =
        current.reaction;


    // Wait before next question

    setTimeout(
        function() {

            currentQuestion++;

            if (
                currentQuestion <
                questions.length
            ) {

                loadQuestion();

            } else {

                showResult();

            }

        },
        1200
    );

}


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    showScreen(resultScreen);

}


// ==========================================
// FINAL MESSAGE
// ==========================================

function showFinalMessage() {

    showScreen(finalScreen);

}


// ==========================================
// RESTART QUIZ
// ==========================================

function restartQuiz() {

    currentQuestion = 0;

    showScreen(homeScreen);

}