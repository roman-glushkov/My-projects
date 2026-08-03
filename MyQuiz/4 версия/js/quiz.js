let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let currentPass = 1;
let timerInterval = null;
let timeLeft = 0;
let userAnswers = [];
let isAnswered = false;
let tournamentRevealed = false;

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

// ========== СКИП ВРЕМЕНИ (СТРЕЛКИ) - ТОЛЬКО ДЛЯ КОМАНДНОГО РЕЖИМА ==========
document.addEventListener("keydown", (e) => {
  if (gameMode === "individual" || gameMode === "tournament") return;
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
  isAnswered = false;
  tournamentRevealed = false;

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
        </div>`;

  if (gameMode === "team") {
    html += `
        <div class="intro-info-row">
          <span class="intro-info-icon">⏱️</span>
          <span class="intro-info-text">${timePerQuestion} сек на вопрос</span>
        </div>
        <div class="intro-info-row">
          <span class="intro-info-icon">🔄</span>
          <span class="intro-info-text">3 прохода</span>
        </div>`;
  } else if (gameMode === "individual") {
    html += `
        <div class="intro-info-row">
          <span class="intro-info-icon">⚡</span>
          <span class="intro-info-text">Без таймера</span>
        </div>
        <div class="intro-info-row">
          <span class="intro-info-icon">👆</span>
          <span class="intro-info-text">Выбери ответ → узнай результат</span>
        </div>`;
  } else {
    html += `
        <div class="intro-info-row">
          <span class="intro-info-icon">🏆</span>
          <span class="intro-info-text">Турнирная таблица</span>
        </div>
        <div class="intro-info-row">
          <span class="intro-info-icon">👆</span>
          <span class="intro-info-text">Ведущий отмечает ответы</span>
        </div>`;
  }

  html += `
      </div>
      <p class="intro-description">${round.description}</p>`;

  if (gameMode === "team") {
    html += `<p class="skip-hint">← → стрелки — изменить время | Пробел — скип</p>`;
  }

  html += `
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
  isAnswered = false;
  tournamentRevealed = false;
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
      isAnswered = false;
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
      isAnswered = false;
      showQuestion();
    }
  );
}

// ========== ПОКАЗ ВОПРОСА ==========
function showQuestion() {
  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];
  isAnswered = false;
  tournamentRevealed = false;

  if (gameMode === "individual") {
    showIndividualQuestion(q);
    return;
  }

  if (gameMode === "tournament") {
    showTournamentQuestion(q);
    return;
  }

  // Командный режим
  if (currentPass === 1) {
    timeLeft = roundTimes[currentRound] || 30;
  } else if (currentPass === 2) {
    timeLeft = reviewTime;
  } else {
    timeLeft = 0;
  }

  let html = "";

  if (currentPass === 2) {
    html += `<div class="pass-label">⚡ Быстрый повтор (10 сек)</div>`;
  } else if (currentPass === 3) {
    html += `<div class="pass-label">🔍 Разбор ответов</div>`;
  }

  if (currentPass < 3) {
    html += `<div id="timer" class="timer timer-normal"></div>`;
    html += `<p class="skip-hint">← → мотать время | Пробел — скип</p>`;
  }

  if (q.question) {
    html += `<h3 class="question-text">${q.question}</h3>`;
  }

  if (q.type === "word-build") {
    if (q.prompt) {
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
  } else if (q.type === "image-input") {
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
  } else {
    html += `<div class="answers" id="answersContainer">`;
    q.answers.forEach((ans, i) => {
      let answerClass = "answer answer-text";
      if (currentPass === 3 && i + 1 === q.correct) {
        answerClass += " correct";
      }
      html += `<div class="${answerClass}" data-index="${
        i + 1
      }"><span class="answer-letter">${String.fromCharCode(
        65 + i
      )}.</span> ${ans}</div>`;
    });
    html += `</div>`;
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

// ========== ИНДИВИДУАЛЬНЫЙ РЕЖИМ ==========
function showIndividualQuestion(q) {
  const round = rounds[currentRound];
  let html = `
    <div class="pass-label">👤 Индивидуальный режим</div>
  `;

  if (q.question) {
    html += `<h3 class="question-text">${q.question}</h3>`;
  }

  if (q.type === "word-build") {
    if (q.prompt) {
      html += `<p class="word-build-prompt"><strong>${q.prompt.join(
        "<br>"
      )}</strong></p>`;
    }
    html += `
      <div class="review-correct-block">
        <p class="review-correct-label">✅ Правильный ответ:</p>
        <p class="review-correct-answer">${q.correctText}</p>
        <p class="review-explanation">${q.explanation || ""}</p>
      </div>`;
    html += createProgressBar();
    html += `
      <button id="nextIndividualBtn" class="btn-check mt-10">
        ${
          currentQuestion + 1 < round.totalQuestions
            ? "Далее"
            : "Закончить раунд"
        }
      </button>
    `;
    renderQuiz(html);
    renderProgress(currentQuestion + 1, round.totalQuestions);
    document.getElementById("nextIndividualBtn").onclick = () => {
      currentQuestion++;
      if (currentQuestion < round.totalQuestions) {
        showQuestion();
      } else {
        showEndRound();
      }
    };
    return;
  }

  if (q.type === "image-input" && q.images) {
    q.images.forEach((src) => {
      html += `<img src="${src}" class="image-input-img">`;
    });
  }

  html += `<div class="answers" id="answersContainer">`;
  const answerList = q.answers || [];
  if (answerList.length === 0) {
    html += `<p style="color:red;">Ошибка: нет вариантов ответов</p>`;
  } else {
    answerList.forEach((ans, i) => {
      html += `<div class="answer answer-text" data-index="${
        i + 1
      }" onclick="selectIndividualAnswer(${i + 1})">
        <span class="answer-letter">${String.fromCharCode(
          65 + i
        )}.</span> ${ans}
      </div>`;
    });
  }
  html += `</div>`;
  html += `<div id="individualResult"></div>`;
  html += createProgressBar();
  renderQuiz(html);
  renderProgress(currentQuestion + 1, round.totalQuestions);
}

// ========== ОБРАБОТЧИК ВЫБОРА ОТВЕТА В ИНДИВИДУАЛЬНОМ РЕЖИМЕ ==========
function selectIndividualAnswer(selectedIndex) {
  if (isAnswered) return;
  isAnswered = true;

  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];
  const allAnswers = document.querySelectorAll("#answersContainer .answer");

  if (selectedIndex === q.correct) {
    score += q.points || 10;
  }

  allAnswers.forEach((el) => {
    el.classList.remove("selected");
  });

  const selectedEl = document.querySelector(
    `#answersContainer .answer[data-index="${selectedIndex}"]`
  );
  if (selectedEl) {
    selectedEl.classList.add("selected");
  }

  let resultHtml = `<div class="individual-result-block">`;

  allAnswers.forEach((el) => {
    const idx = parseInt(el.dataset.index);
    if (idx === q.correct) {
      el.classList.add("correct");
    } else if (idx === selectedIndex && idx !== q.correct) {
      el.classList.add("wrong");
    }
  });

  if (selectedIndex === q.correct) {
    resultHtml += `<div class="result-icon correct-icon">✅ Правильно! +${
      q.points || 10
    } баллов</div>`;
  } else {
    resultHtml += `<div class="result-icon wrong-icon">❌ Неправильно</div>`;
  }

  let correctAnswerText = "";
  if (q.answers && q.answers.length > 0) {
    correctAnswerText = q.answers[q.correct - 1];
  } else {
    correctAnswerText = q.correctText || "Не указан";
  }

  resultHtml += `
    <div class="review-explanation-block">
      <p><strong>Правильный ответ:</strong> ${correctAnswerText}</p>
      <p>${q.explanation || ""}</p>
    </div>
    <button id="nextIndividualBtn" class="btn-check mt-10">
      ${
        currentQuestion + 1 < round.totalQuestions
          ? "Далее ➜"
          : "🏁 Закончить раунд"
      }
    </button>
  </div>`;

  document.getElementById("individualResult").innerHTML = resultHtml;

  const scoreEl = document.querySelector(".score-text");
  if (scoreEl) {
    scoreEl.textContent = `Вопрос ${currentQuestion + 1} из ${
      round.totalQuestions
    } | Баллы: ${score}`;
  }

  document.getElementById("nextIndividualBtn").onclick = () => {
    currentQuestion++;
    if (currentQuestion < round.totalQuestions) {
      showQuestion();
    } else {
      showEndRound();
    }
  };
}

// ========== ТУРНИРНЫЙ РЕЖИМ ==========
function showTournamentQuestion(q) {
  const round = rounds[currentRound];
  tournamentRevealed = false;

  let html = `
    <div class="pass-label">🏆 Турнирный режим — ведущий отмечает ответы</div>
  `;

  // Турнирная таблица
  html += `<div class="tournament-table">`;
  html += `<div class="tournament-table-header">
    <span>Участник</span>
    <span>✅</span>
    <span>❌</span>
    <span>Баллы</span>
    <span>Действие</span>
  </div>`;

  // Сортируем по баллам
  const sortedPlayers = [...tournamentPlayers].sort(
    (a, b) => b.score - a.score
  );

  sortedPlayers.forEach((player, index) => {
    html += `
      <div class="tournament-table-row" style="border-left: 4px solid ${
        player.color
      };">
        <span class="tournament-player-info">
          <span class="tournament-player-emoji">${player.emoji}</span>
          <span class="tournament-player-name" style="color: ${
            player.color
          };">${player.name}</span>
          ${index === 0 && player.score > 0 ? "👑" : ""}
        </span>
        <span class="tournament-player-correct">${player.correct}</span>
        <span class="tournament-player-wrong">${player.wrong}</span>
        <span class="tournament-player-score" style="color: ${
          player.color
        }; font-weight: 700;">${player.score}</span>
        <span class="tournament-player-actions">
          <button class="tournament-btn-correct" onclick="markTournamentAnswer(${
            player.id
          }, true)">✅</button>
          <button class="tournament-btn-wrong" onclick="markTournamentAnswer(${
            player.id
          }, false)">❌</button>
        </span>
      </div>
    `;
  });
  html += `</div>`;

  // Вопрос (без подсветки ответов)
  if (q.question) {
    html += `<h3 class="question-text">${q.question}</h3>`;
  }

  if (q.type === "word-build") {
    if (q.prompt) {
      html += `<p class="word-build-prompt"><strong>${q.prompt.join(
        "<br>"
      )}</strong></p>`;
    }
    html += `
      <div class="review-correct-block" id="tournamentAnswerBlock">
        <p class="review-correct-label">📝 Впишите ответ:</p>
        <input type="text" id="tournamentInput" class="input-answer" placeholder="Введите ответ...">
        <button id="tournamentCheckBtn" class="btn-check" style="margin-top: 10px;">✅ Проверить</button>
        <div id="tournamentInputResult"></div>
      </div>
    `;
  } else if (q.type === "image-input" && q.images) {
    q.images.forEach((src) => {
      html += `<img src="${src}" class="image-input-img">`;
    });
    // Показываем варианты ответов
    html += `<div class="answers" id="tournamentAnswers">`;
    const answerList = q.answers || [];
    answerList.forEach((ans, i) => {
      html += `<div class="answer answer-text" data-index="${i + 1}">
        <span class="answer-letter">${String.fromCharCode(
          65 + i
        )}.</span> ${ans}
      </div>`;
    });
    html += `</div>`;
  } else {
    // Показываем варианты ответов БЕЗ подсветки
    html += `<div class="answers" id="tournamentAnswers">`;
    const answerList = q.answers || [];
    answerList.forEach((ans, i) => {
      html += `<div class="answer answer-text" data-index="${i + 1}">
        <span class="answer-letter">${String.fromCharCode(
          65 + i
        )}.</span> ${ans}
      </div>`;
    });
    html += `</div>`;
  }

  // Блок объяснения (скрыт до показа ответа)
  html += `
    <div id="tournamentExplanation" style="display: none;" class="tournament-explanation">
      <p><strong>✅ Правильный ответ:</strong> <span id="tournamentCorrectAnswer"></span></p>
      <p id="tournamentExplanationText">${q.explanation || ""}</p>
    </div>
  `;

  // Кнопки управления
  html += `
    <div class="tournament-controls">
      <button id="tournamentRevealBtn" class="btn-reveal">📢 Показать ответ</button>
      <button id="tournamentNextBtn" class="btn-next-tournament" disabled>
        ${
          currentQuestion + 1 < round.totalQuestions
            ? "Далее ➜"
            : "🏁 Закончить раунд"
        }
      </button>
    </div>
  `;

  html += createProgressBar();
  renderQuiz(html);
  renderProgress(currentQuestion + 1, round.totalQuestions);

  // ===== ОБРАБОТЧИКИ =====

  // Кнопка "Показать ответ"
  document.getElementById("tournamentRevealBtn").onclick = () => {
    if (tournamentRevealed) return;
    tournamentRevealed = true;

    // Подсвечиваем правильный ответ
    const answers = document.querySelectorAll("#tournamentAnswers .answer");
    const q2 = rounds[currentRound].questions[currentQuestion];
    answers.forEach((el) => {
      const idx = parseInt(el.dataset.index);
      if (idx === q2.correct) {
        el.classList.add("reveal-correct");
      } else {
        el.classList.add("reveal-wrong");
      }
    });

    // Показываем объяснение
    let correctAnswerText = "";
    if (q2.answers && q2.answers.length > 0) {
      correctAnswerText = q2.answers[q2.correct - 1];
    } else {
      correctAnswerText = q2.correctText || "Не указан";
    }
    document.getElementById("tournamentCorrectAnswer").textContent =
      correctAnswerText;
    document.getElementById("tournamentExplanation").style.display = "block";

    // Включаем кнопку "Далее"
    document.getElementById("tournamentNextBtn").disabled = false;
    document.getElementById("tournamentRevealBtn").disabled = true;
    document.getElementById("tournamentRevealBtn").style.opacity = "0.5";
  };

  // Кнопка "Далее"
  document.getElementById("tournamentNextBtn").onclick = () => {
    if (!tournamentRevealed) return;
    currentQuestion++;
    if (currentQuestion < round.totalQuestions) {
      showQuestion();
    } else {
      showEndRound();
    }
  };
}

// ========== ОТМЕТКА ОТВЕТА В ТУРНИРЕ ==========
function markTournamentAnswer(playerId, isCorrect) {
  const player = tournamentPlayers.find((p) => p.id === playerId);
  if (!player) return;

  if (isCorrect) {
    player.correct += 1;
    player.score += 10;
  } else {
    player.wrong += 1;
  }

  // Обновляем таблицу (перерисовываем только таблицу)
  updateTournamentTableOnly();
}

function updateTournamentTableOnly() {
  const table = document.querySelector(".tournament-table");
  if (!table) return;

  const sortedPlayers = [...tournamentPlayers].sort(
    (a, b) => b.score - a.score
  );

  let html = `<div class="tournament-table-header">
    <span>Участник</span>
    <span>✅</span>
    <span>❌</span>
    <span>Баллы</span>
    <span>Действие</span>
  </div>`;

  sortedPlayers.forEach((player, index) => {
    html += `
      <div class="tournament-table-row" style="border-left: 4px solid ${
        player.color
      };">
        <span class="tournament-player-info">
          <span class="tournament-player-emoji">${player.emoji}</span>
          <span class="tournament-player-name" style="color: ${
            player.color
          };">${player.name}</span>
          ${index === 0 && player.score > 0 ? "👑" : ""}
        </span>
        <span class="tournament-player-correct">${player.correct}</span>
        <span class="tournament-player-wrong">${player.wrong}</span>
        <span class="tournament-player-score" style="color: ${
          player.color
        }; font-weight: 700;">${player.score}</span>
        <span class="tournament-player-actions">
          <button class="tournament-btn-correct" onclick="markTournamentAnswer(${
            player.id
          }, true)">✅</button>
          <button class="tournament-btn-wrong" onclick="markTournamentAnswer(${
            player.id
          }, false)">❌</button>
        </span>
      </div>
    `;
  });

  table.innerHTML = html;
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
      <p class="end-round-score">Ваш счёт: <strong>${score}</strong> баллов</p>`;

  if (gameMode === "tournament") {
    const sorted = [...tournamentPlayers].sort((a, b) => b.score - a.score);
    html += `<div class="tournament-final-table">`;
    html += `<h3>🏆 Итоговая таблица</h3>`;
    sorted.forEach((p, i) => {
      const medal =
        i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
      html += `
        <div class="tournament-final-row" style="border-left: 4px solid ${p.color};">
          <span>${medal} ${p.emoji} <span style="color: ${p.color};">${p.name}</span></span>
          <span style="font-weight: 700; color: ${p.color};">${p.score} баллов</span>
          <span style="font-size: 0.8rem; color: #888;">✅ ${p.correct} | ❌ ${p.wrong}</span>
        </div>
      `;
    });
    html += `</div>`;
  }

  html += `
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

  let html = `
    <div class="text-center">
      <h2>Квиз завершён!</h2>
      <div class="final-emoji">🏆</div>
      <p class="final-score">Итоговый счёт: ${score} баллов</p>
      <p class="final-thanks">Спасибо за участие!</p>`;

  if (gameMode === "tournament") {
    const sorted = [...tournamentPlayers].sort((a, b) => b.score - a.score);
    html += `<div class="tournament-final-table">`;
    html += `<h3>🏆 Финальная таблица</h3>`;
    sorted.forEach((p, i) => {
      const medal =
        i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`;
      html += `
        <div class="tournament-final-row" style="border-left: 4px solid ${p.color};">
          <span>${medal} ${p.emoji} <span style="color: ${p.color};">${p.name}</span></span>
          <span style="font-weight: 700; color: ${p.color};">${p.score} баллов</span>
          <span style="font-size: 0.8rem; color: #888;">✅ ${p.correct} | ❌ ${p.wrong}</span>
        </div>
      `;
    });
    html += `</div>`;
  }

  html += `
      <button onclick="location.reload()" class="btn-review">Пройти снова</button>
    </div>
  `;

  renderQuiz(html);
}
