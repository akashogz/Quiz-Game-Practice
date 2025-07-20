const quizQuestions = [
    {
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Germany", "Brazil", "Argentina", "Italy"],
        correctAnswer: 1
    },
    {
        question: "Who won the Ballon d'Or in 2023?",
        options: ["Cristiano Ronaldo", "Lionel Messi", "Erling Haaland", "Kylian Mbappé"],
        correctAnswer: 1
    },
    {
        question: "Which club did Erling Haaland play for before joining Manchester City?",
        options: ["RB Leipzig", "Borussia Dortmund", "Ajax", "Atalanta"],
        correctAnswer: 1
    },
    {
        question: "In what year did France win their first FIFA World Cup?",
        options: ["1998", "2006", "1982", "2018"],
        correctAnswer: 0
    },
    {
        question: "Which English club has the most Premier League titles?",
        options: ["Manchester City", "Arsenal", "Manchester United", "Liverpool"],
        correctAnswer: 2
    },
    {
        question: "Who scored the 'Hand of God' goal?",
        options: ["Pelé", "Zinedine Zidane", "Maradona", "Ronaldinho"],
        correctAnswer: 2
    },
    {
        question: "Which country hosted the 2014 FIFA World Cup?",
        options: ["Germany", "Brazil", "Russia", "South Africa"],
        correctAnswer: 1
    },
    {
        question: "Which club has won the most UEFA Champions League titles?",
        options: ["AC Milan", "Barcelona", "Liverpool", "Real Madrid"],
        correctAnswer: 3
    },
    {
        question: "Who is the all-time top scorer in international football?",
        options: ["Cristiano Ronaldo", "Ali Daei", "Lionel Messi", "Sunil Chhetri"],
        correctAnswer: 0
    },
    {
        question: "What position does Kevin De Bruyne usually play?",
        options: ["Striker", "Left Back", "Center Midfielder", "Goalkeeper"],
        correctAnswer: 2
    }
];

let highScore = localStorage.getItem('highScore') || 0;
let quesIndex = 0;
let gameScore = 0;

function dispQuestion(quesIndex) {
    const cur = quizQuestions[quesIndex];
    document.querySelector('.quesDisp').innerHTML = `
    <div class="high-score">High Score: ${highScore}</div>
    ${quesIndex + 1}. ${cur.question}
    <div class="options"><button onclick="checkAns(0, ${cur.correctAnswer}, this)">${cur.options[0]}</button>
    <button onclick="checkAns(1, ${cur.correctAnswer}, this)">${cur.options[1]}</button>
    <button onclick="checkAns(2, ${cur.correctAnswer}, this)">${cur.options[2]}</button>
    <button onclick="checkAns(3, ${cur.correctAnswer}, this)">${cur.options[3]}</button></div>
    <button class="next" onclick="dispQuestion(quesIndex)">Next</button>`;
}

function checkAns(selOption, correctAns, button) {
    const allButtons = button.parentElement.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.disabled = true;
    });

    if (quesIndex < 10) {
        if (selOption == correctAns) {
            gameScore += 1;
            button.classList.add('correct');
        }
        else {
            button.classList.add('wrong', 'shake');
        }
        quesIndex++;

        if (quesIndex == 10) {
            if (gameScore > highScore) {
                highScore = gameScore;
                localStorage.setItem('highScore', highScore);
            }
            document.querySelector('.quesDisp').innerHTML = `
            <div class="final-screen">
                <p>🎉 Final Score: <strong>${gameScore}</strong></p>
                <p>🏆 High Score: <strong>${highScore}</strong></p>
                <button class="restart-btn" onclick="restartQuiz()">Play Again</button>
            </div>`;

        }
    }
}

function restartQuiz() {
    quesIndex = 0;
    gameScore = 0;
    dispQuestion(quesIndex);
}

dispQuestion(quesIndex);