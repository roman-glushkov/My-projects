let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let currentPass = 1;
let timerInterval = null;
let timeLeft = 0;
let userAnswers = [];

const roundTimes = [30, 60, 30, 90, 60, 60];
const reviewTime = 10;

const emojis = ["🧠", "🎨", "🔤", "🏗️", "🔍", "🎨"];
const colors = [
  "linear-gradient(135deg, #667eea, #764ba2)",
  "linear-gradient(135deg, #f093fb, #f5576c)",
  "linear-gradient(135deg, #4facfe, #00f2fe)",
  "linear-gradient(135deg, #43e97b, #38f9d7)",
  "linear-gradient(135deg, #fa709a, #fee140)",
  "linear-gradient(135deg, #a18cd1, #fbc2eb)",
];

// ========== СКИП ВРЕМЕНИ (СТРЕЛКИ) ==========
document.addEventListener("keydown", (e) => {
  if (currentPass >= 3) return;

  if (e.key === "ArrowLeft") {
    timeLeft = Math.max(1, timeLeft - 5);
    updateTimerDisplay();
  } else if (e.key === "ArrowRight") {
    timeLeft = Math.min(roundTimes[currentRound] || 30, timeLeft + 5);
    updateTimerDisplay();
  } else if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    timeLeft = 1;
    updateTimerDisplay();
  }
});

// ========== ИНТРО РАУНДА ==========
function showRoundIntro() {
  const round = rounds[currentRound];
  currentPass = 1;
  userAnswers = new Array(round.totalQuestions).fill(null);

  const emoji = emojis[currentRound] || "🎯";
  const color = colors[currentRound] || colors[0];
  const timePerQuestion = roundTimes[currentRound] || 30;

  let html = `
    <div class="intro-container">
      <div class="intro-emoji">${emoji}</div>
      <div class="intro-round-number">Раунд ${currentRound + 1}</div>
      <h2 class="intro-title" style="background: ${color}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${
    round.title
  }</h2>
      <div class="intro-info-card">
        <div class="intro-info-row">
          <span class="intro-info-icon">📋</span>
          <span class="intro-info-text">${round.totalQuestions} вопросов</span>
        </div>
        <div class="intro-info-row">
          <span class="intro-info-icon">⏱️</span>
          <span class="intro-info-text">${timePerQuestion} сек на вопрос</span>
        </div>
        <div class="intro-info-row">
          <span class="intro-info-icon">🔄</span>
          <span class="intro-info-text">3 прохода</span>
        </div>
      </div>
      <p class="intro-description">${round.description}</p>
      <p class="skip-hint">← → стрелки — изменить время | Пробел — скип</p>
      <button id="beginRound" class="btn-start-round" style="background: ${color};">Начать Раунд</button>
    </div>
  `;
  renderQuiz(html);
  document.getElementById("beginRound").onclick = () => startFirstPass();
}

function showTransitionScreen(title, emoji, description, buttonText, nextFn) {
  let html = `
    <div class="intro-container">
      <div class="intro-emoji">${emoji}</div>
      <h2 class="intro-title">${title}</h2>
      <p class="intro-description">${description}</p>
      <button id="transitionBtn" class="btn-review">${buttonText}</button>
    </div>
  `;
  renderQuiz(html);
  document.getElementById("transitionBtn").onclick = nextFn;
}

function startFirstPass() {
  currentPass = 1;
  currentQuestion = 0;
  userAnswers = new Array(rounds[currentRound].totalQuestions).fill(null);
  showQuestion();
}

function startReviewPass() {
  showTransitionScreen(
    "⚡ Быстрый повтор",
    "⚡",
    "По 10 секунд на вопрос.",
    "Начать повтор",
    () => {
      currentPass = 2;
      currentQuestion = 0;
      showQuestion();
    }
  );
}

function startAnswerReview() {
  showTransitionScreen(
    "🔍 Разбор ответов",
    "🔍",
    "Смотрим правильные ответы и объяснения.",
    "Смотреть ответы",
    () => {
      currentPass = 3;
      currentQuestion = 0;
      showQuestion();
    }
  );
}

// ========== ПОКАЗ ВОПРОСА ==========
function showQuestion() {
  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];

  if (currentPass === 1) {
    timeLeft = roundTimes[currentRound] || 30;
  } else if (currentPass === 2) {
    timeLeft = reviewTime;
  } else {
    timeLeft = 0;
  }

  let html = "";

  // Заголовок прохода
  if (currentPass === 2) {
    html += `<div class="pass-label">⚡ Быстрый повтор (10 сек)</div>`;
  } else if (currentPass === 3) {
    html += `<div class="pass-label">🔍 Разбор ответов</div>`;
  }

  // Таймер
  if (currentPass < 3) {
    html += `<div id="timer" class="timer timer-normal"></div>`;
    html += `<p class="skip-hint">← → мотать время | Пробел — скип</p>`;
  }

  // Вопрос
  if (q.question) {
    html += `<h3 class="question-text">${q.question}</h3>`;
  }

  // --- word-build ---
  if (q.type === "word-build") {
    if (q.prompt) {
      // Разбиваем prompt на строки через <br> вместо " / "
      html += `<p class="word-build-prompt"><strong>${q.prompt.join(
        "<br>"
      )}</strong></p>`;
    }
    if (currentPass === 3) {
      html += `
        <div class="review-correct-block">
          <p class="review-correct-label">✅ Правильный ответ:</p>
          <p class="review-correct-answer">${q.correctText}</p>
          <p class="review-explanation">${q.explanation || ""}</p>
        </div>`;
    }
  }

  // --- image-input ---
  else if (q.type === "image-input") {
    if (q.images) {
      q.images.forEach((src) => {
        html += `<img src="${src}" class="image-input-img">`;
      });
    }
    if (currentPass === 3) {
      html += `
        <div class="review-correct-block">
          <p class="review-correct-label">✅ Правильный ответ:</p>
          <p class="review-correct-answer">${q.correctText}</p>
          <p class="review-explanation">${q.explanation || ""}</p>
        </div>`;
    }
  }

  // --- text-choice ---
  else {
    html += `<div class="answers">`;
    q.answers.forEach((ans, i) => {
      let answerClass = "answer answer-text";

      if (currentPass === 3) {
        if (i + 1 === q.correct) {
          answerClass += " correct";
        }
      }

      if (round.id === 3) {
        html += `<div class="${answerClass}">${ans}</div>`;
      } else {
        html += `<div class="${answerClass}"><span class="answer-letter">${String.fromCharCode(
          65 + i
        )}.</span> ${ans}</div>`;
      }
    });
    html += `</div>`;

    // Объяснение в разборе
    if (currentPass === 3) {
      html += `
        <div class="review-explanation-block">
          <p>${q.explanation || ""}</p>
        </div>`;
    }
  }

  html += createProgressBar();
  renderQuiz(html);
  renderProgress(currentQuestion + 1, round.totalQuestions);

  // Кнопка "Далее" в разборе
  if (currentPass === 3) {
    html += `<button id="nextReviewBtn" class="btn-check mt-10">
      ${
        currentQuestion + 1 < round.totalQuestions ? "Далее" : "Закончить раунд"
      }
    </button>`;
    renderQuiz(html);
    document.getElementById("nextReviewBtn").onclick = () => {
      currentQuestion++;
      if (currentQuestion < round.totalQuestions) {
        showQuestion();
      } else {
        showEndRound();
      }
    };
    return;
  }

  startTimer();
}

// ========== ТАЙМЕР ==========
function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      autoAdvance();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById("timer");
  if (timerEl) {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerEl.textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
    if (timeLeft <= 10) {
      timerEl.classList.add("timer-warning");
      timerEl.classList.remove("timer-normal");
    } else {
      timerEl.classList.add("timer-normal");
      timerEl.classList.remove("timer-warning");
    }
  }
}

function autoAdvance() {
  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < rounds[currentRound].totalQuestions) {
      showQuestion();
    } else {
      if (currentPass === 1) {
        startReviewPass();
      } else if (currentPass === 2) {
        startAnswerReview();
      } else {
        showEndRound();
      }
    }
  }, 300);
}

// ========== ПРОГРЕСС-БАР ==========
function createProgressBar() {
  return `
    <div id="progress-container"><div id="progress"></div></div>
    <div class="score score-text">Вопрос ${currentQuestion + 1} из ${
    rounds[currentRound].totalQuestions
  } | Баллы: ${score}</div>
  `;
}

// ========== КОНЕЦ РАУНДА / ИГРЫ ==========
function showEndRound() {
  clearInterval(timerInterval);
  const round = rounds[currentRound];
  let html = `
    <div class="text-center">
      <h2>${round.title} завершён!</h2>
      <div class="end-round-emoji">🎉</div>
      <p class="end-round-score">Ваш счёт: <strong>${score}</strong> баллов</p>
      <button id="nextRound" class="btn-review">
        ${
          currentRound + 1 < rounds.length
            ? "Следующий раунд"
            : "Завершить игру"
        }
      </button>
    </div>
  `;
  renderQuiz(html);
  document.getElementById("nextRound").onclick = () => {
    currentRound++;
    currentQuestion = 0;
    if (currentRound < rounds.length) {
      showRoundIntro();
    } else {
      showFinalScreen();
    }
  };
}

function showFinalScreen() {
  clearInterval(timerInterval);
  renderQuiz(`
    <div class="text-center">
      <h2>Квиз завершён!</h2>
      <div class="final-emoji">🏆</div>
      <p class="final-score">Итоговый счёт: ${score} баллов</p>
      <p class="final-thanks">Спасибо за участие!</p>
      <button onclick="location.reload()" class="btn-review">Пройти снова</button>
    </div>
  `);
}
