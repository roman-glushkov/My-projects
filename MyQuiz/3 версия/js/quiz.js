let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let showingAnswer = false;

function showRoundIntro() {
  const round = rounds[currentRound];

  // Эмодзи для каждого раунда
  const emojis = ["🧠", "🎨", "🔤", "🏗️", "🔍", "🎨"];
  const emoji = emojis[currentRound] || "🎯";

  // Цветовые схемы для каждого раунда
  const colors = [
    "linear-gradient(135deg, #667eea, #764ba2)", // Раунд 1
    "linear-gradient(135deg, #f093fb, #f5576c)", // Раунд 2
    "linear-gradient(135deg, #4facfe, #00f2fe)", // Раунд 3
    "linear-gradient(135deg, #43e97b, #38f9d7)", // Раунд 4
    "linear-gradient(135deg, #fa709a, #fee140)", // Раунд 5
    "linear-gradient(135deg, #a18cd1, #fbc2eb)", // Раунд 6
  ];
  const color = colors[currentRound] || colors[0];

  let html = `
    <div style="text-align: center; padding: 10px;">
      
      <!-- Эмодзи -->
      <div style="font-size: 80px; margin-bottom: 15px; animation: float 3s ease-in-out infinite;">
        ${emoji}
      </div>
      
      <!-- Номер раунда -->
      <div style="font-size: 20px; font-weight: 700; color: #FFD700; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 5px;">
        Раунд ${currentRound + 1}
      </div>
      
      <!-- Название раунда -->
      <h2 style="font-size: 48px; font-weight: 800; margin-bottom: 15px; background: ${color}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.2;">
        ${round.title}
      </h2>
      
      <!-- Карточка с инфой -->
      <div style="background: rgba(255,255,255,0.08); border-radius: 24px; padding: 30px 35px; margin: 25px 0; border: 1px solid rgba(255,255,255,0.15); backdrop-filter: blur(10px); display: inline-block; text-align: left;">
        
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
          <span style="font-size: 36px;">📋</span>
          <span style="font-size: 28px; font-weight: 700; color: white;">${
            round.totalQuestions
          } вопросов</span>
        </div>
        
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
          <span style="font-size: 36px;">🎯</span>
          <span style="font-size: 28px; font-weight: 700; color: white;">4 варианта ответа</span>
        </div>
        
        <div style="display: flex; align-items: center; gap: 15px;">
          <span style="font-size: 36px;">⏱️</span>
          <span style="font-size: 28px; font-weight: 700; color: white;">30 секунд обсуждения</span>
        </div>
        
      </div>
      
      <!-- Описание -->
      <p style="font-size: 22px; color: #e0d5ff; max-width: 700px; margin: 20px auto; line-height: 1.6; opacity: 0.9;">
        ${round.description}
      </p>
      
      <!-- Кнопка -->
      <button id="beginRound" style="
        background: ${color};
        color: white;
        border: none;
        padding: 20px 60px;
        border-radius: 60px;
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 10px;
        box-shadow: 0 10px 35px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        letter-spacing: 2px;
        text-transform: uppercase;
      ">Начать Раунд</button>
      
    </div>
    
    <style>
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
    </style>
  `;

  renderQuiz(html);

  const beginBtn = document.getElementById("beginRound");
  beginBtn.onmouseover = function () {
    this.style.transform = "translateY(-5px) scale(1.03)";
    this.style.boxShadow = "0 20px 45px rgba(0,0,0,0.5)";
  };
  beginBtn.onmouseout = function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.boxShadow = "0 10px 35px rgba(0,0,0,0.3)";
  };

  beginBtn.onclick = () => {
    showQuestion();
  };
}
function showQuestion() {
  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];

  let html = "";

  if (q.question) {
    html += `<h3 style="font-size: 28px; margin-bottom: 30px; line-height: 1.5;">${q.question}</h3>`;
  }

  if (q.type === "word-build") {
    if (q.prompt) {
      html += `<p style="font-size: 32px; text-align: center; margin: 30px 0;"><strong>${q.prompt.join(
        " / "
      )}</strong></p>`;
    }
    html += `<input id="userAnswer" type="text" placeholder="Введите ответ..." style="font-size:24px;">
             <br><br>
             <button id="checkAnswer" style="
               padding: 16px 40px;
               width: 250px;
               display: block;
               margin: 0 auto;
               font-size: 22px;
               text-align: center;
             ">Проверить</button>`;
  } else if (q.type === "odd-one-out") {
    html += `<p style="font-size: 28px; text-align: center; margin: 25px 0;">Слова: <strong>${q.words.join(
      ", "
    )}</strong></p>`;
    html += `<input id="userAnswer" type="text" placeholder="Какое слово лишнее?" style="font-size:24px;">
             <br><br>
             <button id="checkAnswer" style="
               padding: 16px 40px;
               width: 250px;
               display: block;
               margin: 0 auto;
               font-size: 22px;
               text-align: center;
             ">Проверить</button>`;
  } else if (q.type === "image-input") {
    if (q.images)
      q.images.forEach(
        (src) =>
          (html += `<img src="${src}" style="max-width:100%; max-height:350px; border-radius:20px; margin-bottom:20px; object-fit:cover; display:block; margin-left:auto; margin-right:auto;">`)
      );
    html += `<input id="userAnswer" type="text" placeholder="Введите название песни или исполнителя..." style="margin:20px auto; display:block; font-size:24px;">
             <br>
             <button id="checkAnswer" style="
               padding: 16px 40px;
               width: 250px;
               display: block;
               margin: 0 auto;
               font-size: 22px;
               text-align: center;
             ">Проверить</button>`;
  } else {
    // text-choice
    html += `<div class="answers">`;

    if (round.id === 3) {
      q.answers.forEach(
        (ans) =>
          (html += `<div class="answer" style="font-size: 22px; padding: 22px 20px;">${ans}</div>`)
      );
    } else {
      q.answers.forEach(
        (ans, i) =>
          (html += `<div class="answer" style="font-size: 22px; padding: 22px 20px;"><span style="color:#00d4ff; font-size: 24px; font-weight: 700; margin-right: 12px;">${String.fromCharCode(
            65 + i
          )}.</span> ${ans}</div>`)
      );
    }
    html += `</div>`;
  }

  html += createProgressBar();
  renderQuiz(html);
  renderProgress(currentQuestion + 1, rounds[currentRound].totalQuestions);
  bindAnswerEvents(q);
}

function bindAnswerEvents(q) {
  if (
    q.type === "word-build" ||
    q.type === "odd-one-out" ||
    q.type === "image-input"
  ) {
    const checkBtn = document.getElementById("checkAnswer");
    if (checkBtn) {
      checkBtn.onclick = () => {
        if (showingAnswer) return;

        const userAnswer = document
          .getElementById("userAnswer")
          .value.trim()
          .toLowerCase();

        if (userAnswer === "") {
          alert("Введите ответ!");
          return;
        }

        const acceptAnswers = q.acceptAnswers || [q.correctText.toLowerCase()];
        const isCorrect = acceptAnswers.some(
          (ans) => userAnswer.includes(ans) || ans.includes(userAnswer)
        );

        if (isCorrect) {
          score += q.points;
          document.getElementById("userAnswer").style.borderColor = "#2ed573";
          document.getElementById("userAnswer").style.boxShadow =
            "0 0 20px rgba(46, 213, 115, 0.3)";
          showExplanation(`Правильно! ${q.explanation || ""}`, true);
        } else {
          document.getElementById("userAnswer").style.borderColor = "#ff4757";
          document.getElementById("userAnswer").style.boxShadow =
            "0 0 20px rgba(255, 71, 87, 0.3)";
          showExplanation(
            `Неверно. Правильный ответ: ${q.correctText}. ${
              q.explanation || ""
            }`,
            false
          );
        }
      };
    }
  } else {
    document.querySelectorAll(".answer").forEach((a, i) => {
      a.onclick = () => {
        if (showingAnswer) return;
        showingAnswer = true;
        const isCorrect = i + 1 === q.correct;
        if (isCorrect) {
          a.classList.add("correct");
          score += q.points;
        } else {
          a.classList.add("wrong");
          document
            .querySelectorAll(".answer")
            [q.correct - 1].classList.add("correct");
        }
        showExplanation(q.explanation, isCorrect);
      };
    });
  }
}

function showExplanation(text, isCorrect, callback) {
  const existing = document.querySelector(".explanation-box");
  if (existing) existing.remove();

  const box = document.createElement("div");
  box.className = "explanation-box";
  box.innerHTML = `<p style="font-size:20px;"><strong>${
    isCorrect === true ? "✅ Верно!" : isCorrect === false ? "❌ Ошибка!" : "📌"
  }</strong> ${text}</p>
                   <button id="nextBtn" style="margin-top:10px; font-size:20px;">${
                     currentQuestion + 1 < rounds[currentRound].totalQuestions
                       ? "Далее"
                       : "Закончить раунд"
                   }</button>`;
  document.getElementById("quiz").appendChild(box);

  document.getElementById("nextBtn").onclick = () => {
    box.remove();
    showingAnswer = false;
    if (callback) callback();
    else {
      currentQuestion++;
      if (currentQuestion < rounds[currentRound].totalQuestions) showQuestion();
      else showEndRound();
    }
  };
}

function createProgressBar() {
  return `
      <div id="progress-container"><div id="progress"></div></div>
      <div class="score" style="font-size: 22px;">Вопрос ${
        currentQuestion + 1
      } из ${rounds[currentRound].totalQuestions} | Баллы: ${score}</div>
  `;
}

function showEndRound() {
  const round = rounds[currentRound];
  let html = `
      <div style="text-align: center;">
          <h2>${round.title} завершён!</h2>
          <div style="font-size: 56px; margin: 20px 0;">🎉</div>
          <p style="font-size: 30px;">Ваш счёт: <strong>${score}</strong> баллов</p>
          <button id="nextRound" style="font-size:22px;">${
            currentRound + 1 < rounds.length
              ? "Следующий раунд"
              : "Завершить игру"
          }</button>
      </div>
  `;
  renderQuiz(html);
  document.getElementById("nextRound").onclick = () => {
    currentRound++;
    currentQuestion = 0;
    if (currentRound < rounds.length) showRoundIntro();
    else showFinalScreen();
  };
}

function showFinalScreen() {
  renderQuiz(`
      <div style="text-align: center;">
          <h2>Квиз завершён!</h2>
          <div style="font-size: 80px; margin: 20px 0;">🏆</div>
          <p style="font-size: 34px; margin-bottom: 20px;">Итоговый счёт: ${score} баллов</p>
          <p style="font-size: 24px; margin-bottom: 20px;">Спасибо за участие!</p>
          <button onclick="location.reload()" style="font-size:22px;">Пройти снова</button>
      </div>
  `);
}
