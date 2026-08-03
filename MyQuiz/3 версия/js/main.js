const startBtn = document.getElementById("start");

startBtn.addEventListener("click", showAssistantIntroduction);

function showAssistantIntroduction() {
  let html = `
    <div class="text-center">
      <div class="assistant-card">
        <div class="assistant-avatar">
          <img src="https://s3.objstor.cloud4u.com/unti-prod-people/file/presentation/project/dnupc92fco.jpg" 
               alt="Помощник">
        </div>
        <h2 class="assistant-title">Добро пожаловать в Квиз!</h2>
        <div class="assistant-info">
          <p class="assistant-subtitle">Привет! Это увлекательный квиз с 6 раундами:</p>
          <ul class="assistant-list">
            <li>🧠 <strong>Разминка</strong> - 10 вопросов</li>
            <li>🎨 <strong>Нейро строки</strong> - угадай песню</li>
            <li>🔤 <strong>Тематика</strong> - Marvel, сериалы</li>
            <li>🏗️ <strong>Многосложение</strong> - профессии</li>
            <li>🔍 <strong>Третий лишний</strong> - логика</li>
            <li>🎨 <strong>Один цвет</strong> - загадки</li>
          </ul>
        </div>
      </div>
      <button id="startQuiz" class="btn-start-quiz">🚀 Начать квиз</button>
    </div>
  `;

  renderQuiz(html);

  const startQuizBtn = document.getElementById("startQuiz");
  startQuizBtn.onclick = showRoundSelection;
}

function showRoundSelection() {
  let html = `
    <div class="text-center">
      <h2 class="round-selection-title">🎯 Выберите раунд</h2>
      <p class="round-selection-subtitle">Доступно ${rounds.length} раундов. Можно начинать с любого!</p>
      <div class="round-cards-grid">
  `;

  const colors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  ];

  const emojis = ["🧠", "🎨", "🔤", "🏗️", "🔍", "🎨"];

  rounds.forEach((round, index) => {
    html += `
      <div class="round-card" style="background: ${colors[index]};" data-index="${index}">
        <div class="round-card-emoji">${emojis[index]}</div>
        <h3 class="round-card-title">${round.title}</h3>
        <p class="round-card-desc">${round.description}</p>
        <span class="round-card-badge">${round.totalQuestions} вопросов</span>
      </div>
    `;
  });

  html += `</div></div>`;

  renderQuiz(html);

  document.querySelectorAll(".round-card").forEach((card) => {
    card.onclick = () => {
      currentRound = parseInt(card.dataset.index);
      currentQuestion = 0;
      showingAnswer = false;
      showRoundIntro();
    };
  });
}
