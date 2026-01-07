let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let showingAnswer = false;
let currentAudio = null;

// УБРАНЫ ВСЕ ФУНКЦИИ ОЗВУЧКИ

function showRoundIntro() {
  const round = rounds[currentRound];
  renderQuiz(`
    <div style="text-align: center;">
      <h2>${round.title}</h2>
      <p>${round.description}</p>
      <p>Всего вопросов: ${round.totalQuestions}</p>
      <button id="beginRound" style="background:linear-gradient(45deg, #4CAF50, #45a049);color:white;border:none;padding:14px 32px;border-radius:12px;font-size:17px;cursor:pointer;box-shadow:0 4px 15px rgba(76,175,80,0.3);transition:all 0.3s ease;">
        Начать Раунд
      </button>
    </div>
  `);

  const beginBtn = document.getElementById("beginRound");
  beginBtn.onmouseover = function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 6px 25px rgba(76,175,80,0.5)";
  };
  beginBtn.onmouseout = function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(76,175,80,0.3)";
  };

  beginBtn.onclick = showQuestion;
}

function showQuestion() {
  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];
  let html = `<h3>${q.question}</h3>`;

  // Показываем изображения для любого типа вопроса, если есть
  if (q.images && q.images.length > 0) {
    html += `<div class="images-container" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">`;
    q.images.forEach(
      (src) =>
        (html += `<img src="${src}" style="max-width: 400px; max-height: 300px; border-radius: 16px; object-fit: cover; border: 3px solid rgba(255,255,255,0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.3);">`)
    );
    html += `</div>`;
  }

  if (q.type === "input") {
    html += `
      <input id="userAnswer" type="text" placeholder="Введите ответ..." 
             style="margin:20px 0;padding:16px 20px;width:100%;border-radius:12px;border:2px solid rgba(0,212,255,0.3);background:rgba(255,255,255,0.1);color:white;font-size:16px;">
      <br>
      <button id="checkAnswer" style="background:linear-gradient(45deg, #FF9800, #FF5722);color:white;border:none;padding:14px 32px;border-radius:12px;cursor:pointer;font-size:17px;font-weight:600;box-shadow:0 4px 15px rgba(255,152,0,0.3);transition:all 0.3s ease;">
        Проверить ответ
      </button>
    `;
  } else if (q.type === "image-only") {
    html += `<div class="answers">`;
    q.answers.forEach(
      (src) =>
        (html += `<div class="answer"><img src="${src}" class="answer-img"></div>`)
    );
    html += `</div>`;
  } else {
    html += `<div class="answers">`;
    q.answers.forEach(
      (ans, index) =>
        (html += `<div class="answer"><span style="color:#00d4ff;margin-right:8px;">${String.fromCharCode(
          65 + index
        )}.</span>${ans}</div>`)
    );
    html += `</div>`;
  }

  html += `
    <div id="progress-container"><div id="progress"></div></div>
    <div class="score">Вопрос ${currentQuestion + 1} из ${
    round.totalQuestions
  } | Баллы: ${score}</div>
  `;

  renderQuiz(html);
  renderProgress(currentQuestion + 1, round.totalQuestions);

  if (q.type === "input") {
    const checkBtn = document.getElementById("checkAnswer");
    checkBtn.onmouseover = function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 6px 25px rgba(255,152,0,0.5)";
    };
    checkBtn.onmouseout = function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(255,152,0,0.3)";
    };
    checkBtn.onclick = () => handleInputAnswer(q);

    // Фокус на поле ввода
    document.getElementById("userAnswer").focus();
  } else {
    document.querySelectorAll(".answer").forEach((a, i) => {
      a.onclick = () => handleChoiceAnswer(i, q);
    });
  }
}

function handleChoiceAnswer(index, q) {
  if (showingAnswer) return;
  showingAnswer = true;
  const answers = document.querySelectorAll(".answer");
  answers.forEach((a, i) => {
    if (i + 1 === q.correct) a.classList.add("correct");
    else if (i === index) a.classList.add("wrong");
  });
  if (index + 1 === q.correct) score += q.points;
  addNextButton();
}

function handleInputAnswer(q) {
  if (showingAnswer) return;
  const input = document.getElementById("userAnswer");
  const userText = input.value.trim().toLowerCase();
  const correctText = q.correctText.trim().toLowerCase();
  showingAnswer = true;

  if (userText === correctText) {
    score += q.points;
    input.style.background = "rgba(76, 175, 80, 0.15)";
    input.style.borderColor = "#4CAF50";
  } else {
    input.style.background = "rgba(244, 67, 54, 0.15)";
    input.style.borderColor = "#F44336";
    input.value = `Правильный ответ: ${q.correctText}`;
  }

  addNextButton();
}

function addNextButton() {
  const nextBtn = document.createElement("button");
  const round = rounds[currentRound];
  nextBtn.textContent =
    currentQuestion + 1 < round.totalQuestions
      ? "Следующий вопрос →"
      : "Завершить раунд";

  nextBtn.onclick = () => {
    currentQuestion++;
    showingAnswer = false;
    if (currentQuestion < round.totalQuestions) showQuestion();
    else showEndRound();
  };

  nextBtn.onmouseover = function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 6px 25px rgba(0,120,255,0.5)";
  };
  nextBtn.onmouseout = function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(0,120,255,0.3)";
  };

  document.getElementById("quiz").appendChild(nextBtn);
}

function showEndRound() {
  const round = rounds[currentRound];
  renderQuiz(`
    <div style="text-align: center;">
      <h2>${round.title} завершён!</h2>
      <div style="font-size: 48px; color: #00d4ff; margin: 20px 0;">🎉</div>
      <p style="font-size: 24px; margin: 20px 0;">Ваш счёт: <span style="color: #00d4ff; font-weight: bold;">${score}</span> баллов</p>
      <button id="nextRound" style="background:linear-gradient(45deg, #9C27B0, #673AB7);color:white;border:none;padding:14px 32px;border-radius:12px;font-size:17px;cursor:pointer;box-shadow:0 4px 15px rgba(156,39,176,0.3);transition:all 0.3s ease;">
        ${
          currentRound + 1 < rounds.length
            ? "Следующий раунд →"
            : "Завершить игру"
        }
      </button>
    </div>
  `);

  const nextBtn = document.getElementById("nextRound");
  nextBtn.onmouseover = function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 6px 25px rgba(156,39,176,0.5)";
  };
  nextBtn.onmouseout = function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(156,39,176,0.3)";
  };

  nextBtn.onclick = () => {
    const hasNext = currentRound + 1 < rounds.length;
    if (hasNext) {
      currentRound++;
      currentQuestion = 0;
      showRoundIntro();
    } else {
      showFinalScreen();
    }
  };
}

function showFinalScreen() {
  renderQuiz(`
    <div style="text-align: center;">
      <h2>Квиз завершён!</h2>
      <div style="font-size: 72px; color: #FFD700; margin: 20px 0;">🏆</div>
      <p style="font-size: 28px; margin: 20px 0; color: #00d4ff; font-weight: bold;">
        Итоговый счёт: ${score} баллов
      </p>
      <p style="margin: 20px 0; font-size: 18px; opacity: 0.8;">
        Спасибо за участие! Надеемся, вам понравилось!
      </p>
      <button onclick="location.reload()" style="background:linear-gradient(45deg, #FF9800, #FF5722);color:white;border:none;padding:16px 40px;border-radius:12px;font-size:18px;cursor:pointer;box-shadow:0 4px 15px rgba(255,152,0,0.3);transition:all 0.3s ease;">
        Пройти снова
      </button>
    </div>
  `);
}
