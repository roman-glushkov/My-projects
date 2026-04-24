let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let showingAnswer = false;

function showRoundIntro() {
  const round = rounds[currentRound];

  // Специальное интро для второго раунда с примером
  if (round.id === 2) {
    let html = `
            <div style="text-align: center;">
                <h2>${round.title}</h2>
                <p>${round.description}</p>
                <p>Всего вопросов: ${round.totalQuestions}</p>
                
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 16px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.2);">
                    <p style="color: #FFD700; font-size: 18px; margin-bottom: 15px;">📌 Пример:</p>
                    <img src="images/малиновый закат.jfif" style="max-width:100%; max-height:300px; border-radius:16px; margin-bottom:15px; object-fit:cover; border: 2px solid rgba(255,255,255,0.2);">
                    <p style="color: #2ed573;">✅ Правильный ответ: <strong>Малиновый закат</strong></p>
                    <p style="color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 10px;">
                        Вам будут показаны нейро-картинки. Ваша задача — <strong>написать название песни или исполнителя</strong>.
                    </p>
                </div>
                
                <button id="beginRound" style="background:linear-gradient(45deg, #f093fb, #f5576c); color:white; border:none; padding:14px 32px; border-radius:12px; font-size:17px; cursor:pointer; box-shadow:0 4px 15px rgba(240,147,251,0.3); transition:all 0.3s ease; margin-top: 20px;">
                    Начать Раунд
                </button>
            </div>
        `;
    renderQuiz(html);
    document.getElementById("beginRound").onclick = showQuestion;
    return;
  }

  // Стандартное интро для остальных раундов
  let html = `
        <div style="text-align: center;">
            <h2>${round.title}</h2>
            <p>${round.description}</p>
            <p>Всего вопросов: ${round.totalQuestions}</p>
            <button id="beginRound">Начать Раунд</button>
        </div>
    `;
  renderQuiz(html);
  document.getElementById("beginRound").onclick = showQuestion;
}

function showQuestion() {
  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];

  let html = "";

  if (q.question) {
    html += `<h3>${q.question}</h3>`;
  }

  if (q.type === "word-build") {
    if (q.prompt) {
      html += `<p style="font-size: 20px; text-align: center; margin: 20px 0;"><strong>${q.prompt.join(
        " / "
      )}</strong></p>`;
    }
    html += `<input id="userAnswer" type="text" placeholder="Введите ответ...">
             <br><br>
             <button id="checkAnswer">Проверить</button>`;
  } else if (q.type === "odd-one-out") {
    html += `<p style="font-size: 18px; text-align: center; margin: 15px 0;">Слова: <strong>${q.words.join(
      ", "
    )}</strong></p>`;
    html += `<input id="userAnswer" type="text" placeholder="Какое слово лишнее?">
             <br><br>
             <button id="checkAnswer">Проверить</button>`;
  } else if (q.type === "image-input") {
    if (q.images)
      q.images.forEach(
        (src) =>
          (html += `<img src="${src}" style="max-width:100%; max-height:300px; border-radius:16px; margin-bottom:20px; object-fit:cover; display:block; margin-left:auto; margin-right:auto;">`)
      );
    html += `<input id="userAnswer" type="text" placeholder="Введите название песни или исполнителя..." style="margin:20px auto; display:block;">
             <br>
             <button id="checkAnswer">Проверить</button>`;
  } else {
    // text-choice
    html += `<div class="answers">`;

    if (round.id === 3) {
      q.answers.forEach((ans) => (html += `<div class="answer">${ans}</div>`));
    } else {
      q.answers.forEach(
        (ans, i) =>
          (html += `<div class="answer"><span>${String.fromCharCode(
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
  box.innerHTML = `<p><strong>${
    isCorrect === true ? "✅ Верно!" : isCorrect === false ? "❌ Ошибка!" : "📌"
  }</strong> ${text}</p>
                   <button id="nextBtn" style="margin-top:10px;">${
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
      <div class="score">Вопрос ${currentQuestion + 1} из ${
    rounds[currentRound].totalQuestions
  } | Баллы: ${score}</div>
  `;
}

function showEndRound() {
  const round = rounds[currentRound];
  let html = `
      <div style="text-align: center;">
          <h2>${round.title} завершён!</h2>
          <div style="font-size: 48px; margin: 20px 0;">🎉</div>
          <p style="font-size: 24px;">Ваш счёт: <strong>${score}</strong> баллов</p>
          <button id="nextRound">${
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
          <div style="font-size: 72px; margin: 20px 0;">🏆</div>
          <p style="font-size: 28px; margin-bottom: 20px;">Итоговый счёт: ${score} баллов</p>
          <p style="margin-bottom: 20px;">Спасибо за участие!</p>
          <button onclick="location.reload()">Пройти снова</button>
      </div>
  `);
}
