/* =====================================================
   BOYFRIEND DAY WEBSITE
===================================================== */


/* =====================================================
   SCREEN CONTROL
===================================================== */

function showScreen(id) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.add("active");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =====================================================
   START EXPERIENCE
===================================================== */

function startExperience() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("scoreDisplay").textContent = "❤️ 0";

    showScreen("quizScreen");
    loadQuestion();
}


/* =====================================================
   OPENING BOYFRIEND TEST
===================================================== */

const questions = [
    {
        question: "What nickname do I secretly love the most? 👀",

        answers: [
            "Maa",
            "Kanna",
            "Bangaram",
            "Bujji"
        ],

        correct: 0
    },

    {
        question: "What is my favourite thing to do? 😌",

        answers: [
            "Sleep 😴",
            "Eat 🍕",
            "Irritate you 😈",
            "Cook 👩‍🍳",
            "All of the above hehehe ❤️"
        ],

        correct: 4
    },

    {
        question: "What is my favourite hobby to do? 💕",

        answers: [
            "Harry Potter 🪄",
            "Writing ✍️",
            "Cooking 👩‍🍳",
            "K-dramas 📺"
        ],

        correct: 2
    },

    {
        question: "What is one thing I'm more scared of? 😭",

        answers: [
            "Heights 😵",
            "Lizards 🦎",
            "Cockroaches 🪳",
            "Dogs 🐶"
        ],

        correct: 0
    },

    {
        question: "What is the favourite thing of us which I secretly like? 🥹",

        answers: [
            "Our banter 😂",
            "Spending quality time together 🫶",
            "Irritating each other 😈",
            "Fighting with you 😭"
        ],

        /*
            Q5 has no single correct answer.
            Every option is accepted.
        */
        allCorrect: true,

        customReaction:
            "Everything we do together is i secretely like, you dumbo!!"
    }
];


let currentQuestion = 0;
let score = 0;


/* =====================================================
   LOAD QUESTION
===================================================== */

function loadQuestion() {

    const question = questions[currentQuestion];

    const questionText = document.getElementById("questionText");
    const answerButtons = document.getElementById("answerButtons");
    const questionNumber = document.getElementById("questionNumber");
    const progressBar = document.getElementById("progressBar");
    const reaction = document.getElementById("reactionText");

    questionText.textContent = question.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    reaction.textContent = "";

    answerButtons.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        answerButtons.appendChild(button);
    });
}


/* =====================================================
   SELECT ANSWER
===================================================== */

function selectAnswer(index) {

    const question = questions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");
    const reaction = document.getElementById("reactionText");

    buttons.forEach((button) => {
        button.disabled = true;
    });

    /*
        Question 5:
        Every option is accepted.
    */

    const isCorrect =
        question.allCorrect === true ||
        index === question.correct;

    if (isCorrect) {

        buttons[index].classList.add("correct");

        if (question.customReaction) {
            reaction.textContent = question.customReaction;
        } else {
            reaction.textContent = "Correct! ❤️";
        }

        score++;

    } else {

        buttons[index].classList.add("wrong");

        reaction.textContent = "Hmm... try again! 😂";

        /*
            Highlight the correct answer.
        */

        if (typeof question.correct === "number") {
            buttons[question.correct].classList.add("correct");
        }
    }

    document.getElementById("scoreDisplay").textContent =
        `❤️ ${score}`;

    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }

    }, 1300);
}


/* =====================================================
   FINISH QUIZ
===================================================== */

function finishQuiz() {

    createConfetti();

    setTimeout(() => {
        showScreen("passScreen");
    }, 300);
}


/* =====================================================
   LOVE LETTER
===================================================== */

function showLoveLetter() {
    showScreen("loveScreen");
}


/* =====================================================
   OUR LITTLE STORY
===================================================== */

function showStory() {
    showScreen("storyScreen");
}


/* =====================================================
   REASONS I LOVE YOU
===================================================== */

function showReasons() {
    showScreen("reasonsScreen");
}


/* =====================================================
   ONE LAST QUESTION
===================================================== */

function showLastQuestion() {

    showScreen("lastQuestionScreen");

    /*
        Reset the NO button whenever the screen opens.
    */

    const noButton = document.getElementById("noButton");

    noButton.classList.remove("moving");

    noButton.style.left = "";
    noButton.style.top = "";

    document.getElementById("noReaction").textContent = "";
}


/* =====================================================
   YES BUTTON
===================================================== */

function chooseYes() {

    createConfetti();

    setTimeout(() => {
        showScreen("futureScreen");
    }, 450);
}


/* =====================================================
   NO BUTTON
===================================================== */

let noClickCount = 0;

function chooseNo() {

    const noButton = document.getElementById("noButton");
    const reaction = document.getElementById("noReaction");

    noClickCount++;

    const funnyMessages = [
        "Nice try. 😂",
        "NOPE. Try again! 😈",
        "You really thought I'd let you click that? 👀",
        "Wrong answer, boyfriend. 😂❤️",
        "The button said NO to your NO. 😭",
        "Just click YES already! 🥹❤️"
    ];

    reaction.textContent =
        funnyMessages[
            Math.min(noClickCount - 1, funnyMessages.length - 1)
        ];

    moveNoButton(noButton);
}


/* =====================================================
   MOVE NO BUTTON
===================================================== */

function moveNoButton(button) {

    button.classList.add("moving");

    const padding = 20;

    const maxX =
        window.innerWidth -
        button.offsetWidth -
        padding;

    const maxY =
        window.innerHeight -
        button.offsetHeight -
        padding;

    const minX = padding;
    const minY = padding;

    const randomX =
        Math.floor(
            Math.random() * Math.max(maxX - minX, 1)
        ) + minX;

    const randomY =
        Math.floor(
            Math.random() * Math.max(maxY - minY, 1)
        ) + minY;

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
}


/* =====================================================
   FINAL UNLOCK
===================================================== */

function showFinalLock() {
    showScreen("finalLockScreen");
}


function unlockFinal() {

    const lockIcon = document.getElementById("lockIcon");

    lockIcon.textContent = "🔓";

    createConfetti();

    setTimeout(() => {
        showScreen("finalScreen");
        createConfetti();
    }, 700);
}


/* =====================================================
   RESTART EXPERIENCE
===================================================== */

function restartExperience() {

    currentQuestion = 0;
    score = 0;
    noClickCount = 0;

    const noButton = document.getElementById("noButton");

    if (noButton) {
        noButton.classList.remove("moving");
        noButton.style.left = "";
        noButton.style.top = "";
    }

    document.getElementById("scoreDisplay").textContent = "❤️ 0";

    showScreen("homeScreen");
}


/* =====================================================
   FLOATING HEART EFFECT
===================================================== */

function createHeart() {

    const heart = document.createElement("div");

    heart.textContent = "❤️";
    heart.style.position = "fixed";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = "-30px";
    heart.style.fontSize = `${14 + Math.random() * 20}px`;
    heart.style.opacity = "0.8";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "1000";

    heart.style.transition =
        "transform 4s ease-out, opacity 4s ease-out";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {

        heart.style.transform =
            `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 180 - 90}deg)`;

        heart.style.opacity = "0";
    });

    setTimeout(() => {
        heart.remove();
    }, 4200);
}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const container =
        document.getElementById("confettiContainer");

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "✨",
        "🥹",
        "🫶",
        "💘"
    ];

    for (let i = 0; i < 45; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti";

        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left =
            `${Math.random() * 100}%`;

        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;

        piece.style.fontSize =
            `${12 + Math.random() * 15}px`;

        container.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 4000);
    }
}


/* =====================================================
   CONTINUOUS HEARTS
===================================================== */

setInterval(() => {

    if (Math.random() > 0.35) {
        createHeart();
    }

}, 1800);