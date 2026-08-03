const startBtn = document.getElementById("start");

let gameMode = "team"; // "team", "individual", "tournament"

startBtn.addEventListener("click", showModeSelection);

// ========== ВЫБОР РЕЖИМА ИГРЫ ==========
function showModeSelection() {
  let html = `
    <div class="text-center">
      <div class="mode-selection-container">
        <h2 class="mode-selection-title">🎮 Выберите режим игры</h2>
        <p class="mode-selection-subtitle">Как вы хотите играть?</p>
        
        <div class="mode-cards">
          <div class="mode-card" data-mode="team">
            <div class="mode-card-icon">👥</div>
            <h3 class="mode-card-title">Командный режим</h3>
            <ul class="mode-card-features">
              <li>⏱️ Таймер на каждый вопрос</li>
              <li>🔄 3 прохода (вопрос → повтор → разбор)</li>
              <li>📊 Подсчёт баллов команд</li>
            </ul>
            <div class="mode-card-badge">Сложный</div>
          </div>
          
          <div class="mode-card" data-mode="individual">
            <div class="mode-card-icon">👤</div>
            <h3 class="mode-card-title">Индивидуальный режим</h3>
            <ul class="mode-card-features">
              <li>🎯 Ответ в любое время</li>
              <li>⚡ Без таймера и повторов</li>
              <li>📖 Сразу видно правильный ответ</li>
            </ul>
            <div class="mode-card-badge">Простой</div>
          </div>

          <div class="mode-card" data-mode="tournament">
            <div class="mode-card-icon">🏆</div>
            <h3 class="mode-card-title">Командный зачёт</h3>
            <ul class="mode-card-features">
              <li>👥 Ведущий отмечает ответы</li>
              <li>✅ Клик по галочке/крестику</li>
              <li>📊 Турнирная таблица</li>
            </ul>
            <div class="mode-card-badge">Для ведущего</div>
          </div>
        </div>
        
        <p class="mode-hint">Нажмите на карточку для выбора режима</p>
      </div>
    </div>
  `;

  renderQuiz(html);

  document.querySelectorAll(".mode-card").forEach((card) => {
    card.onclick = () => {
      document
        .querySelectorAll(".mode-card")
        .forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      gameMode = card.dataset.mode;

      const oldBtn = document.getElementById("continueBtn");
      if (oldBtn) oldBtn.remove();

      let modeName =
        {
          team: "👥 Командном",
          individual: "👤 Индивидуальном",
          tournament: "🏆 Турнирном",
        }[gameMode] || gameMode;

      let btnHtml = `
        <button id="continueBtn" class="btn-start-quiz" style="margin-top: 20px;">
          🚀 Продолжить в режиме ${modeName}
        </button>
      `;
      document
        .querySelector(".mode-selection-container")
        .insertAdjacentHTML("beforeend", btnHtml);

      if (gameMode === "tournament") {
        document.getElementById("continueBtn").onclick = showTournamentSetup;
      } else {
        document.getElementById("continueBtn").onclick =
          showAssistantIntroduction;
      }
    };
  });
}

// ========== НАСТРОЙКА ТУРНИРА ==========
let tournamentPlayers = [];

function showTournamentSetup() {
  let html = `
    <div class="text-center">
      <div class="tournament-setup-container">
        <h2 class="tournament-setup-title">🏆 Настройка турнира</h2>
        <p class="tournament-setup-subtitle">Добавьте участников и настройте их</p>
        
        <div class="tournament-players-list" id="playersList">
          <!-- Список игроков будет здесь -->
        </div>
        
        <div class="tournament-add-player">
          <input type="text" id="playerNameInput" placeholder="Имя участника" class="tournament-input">
          <select id="playerEmojiSelect" class="tournament-select">
            <option value="😀">😀</option>
            <option value="😎">😎</option>
            <option value="🤓">🤓</option>
            <option value="🧠">🧠</option>
            <option value="🔥">🔥</option>
            <option value="⭐">⭐</option>
            <option value="🎯">🎯</option>
            <option value="💪">💪</option>
            <option value="🦊">🦊</option>
            <option value="🐱">🐱</option>
            <option value="🐉">🐉</option>
            <option value="🚀">🚀</option>
          </select>
          <input type="color" id="playerColorInput" value="#f5576c" class="tournament-color">
          <button id="addPlayerBtn" class="btn-add-player">➕ Добавить</button>
        </div>
        
        <div class="tournament-actions">
          <button id="startTournamentBtn" class="btn-start-quiz">🚀 Начать турнир</button>
          <button id="resetTournamentBtn" class="btn-reset-tournament">🔄 Сбросить всех</button>
        </div>
      </div>
    </div>
  `;

  renderQuiz(html);

  tournamentPlayers = [];
  renderPlayersList();

  document.getElementById("addPlayerBtn").onclick = () => {
    const nameInput = document.getElementById("playerNameInput");
    const emojiSelect = document.getElementById("playerEmojiSelect");
    const colorInput = document.getElementById("playerColorInput");

    const name = nameInput.value.trim();
    if (!name) {
      alert("Введите имя участника!");
      return;
    }

    tournamentPlayers.push({
      id: Date.now(),
      name: name,
      emoji: emojiSelect.value,
      color: colorInput.value,
      score: 0,
      correct: 0,
      wrong: 0,
    });

    nameInput.value = "";
    renderPlayersList();
  };

  document.getElementById("startTournamentBtn").onclick = () => {
    if (tournamentPlayers.length < 2) {
      alert("Добавьте хотя бы 2 участника!");
      return;
    }
    startTournament();
  };

  document.getElementById("resetTournamentBtn").onclick = () => {
    tournamentPlayers = [];
    renderPlayersList();
  };
}

function renderPlayersList() {
  const list = document.getElementById("playersList");
  if (!list) return;

  if (tournamentPlayers.length === 0) {
    list.innerHTML = `<p class="tournament-empty">Пока нет участников. Добавьте первого!</p>`;
    return;
  }

  let html = `<div class="tournament-players-grid">`;
  tournamentPlayers.forEach((player, index) => {
    html += `
      <div class="tournament-player-card" style="border-left: 4px solid ${player.color};">
        <span class="tournament-player-emoji">${player.emoji}</span>
        <span class="tournament-player-name" style="color: ${player.color};">${player.name}</span>
        <button class="tournament-player-remove" data-index="${index}">✕</button>
      </div>
    `;
  });
  html += `</div>`;
  list.innerHTML = html;

  document.querySelectorAll(".tournament-player-remove").forEach((btn) => {
    btn.onclick = () => {
      const index = parseInt(btn.dataset.index);
      tournamentPlayers.splice(index, 1);
      renderPlayersList();
    };
  });
}

function startTournament() {
  tournamentPlayers.forEach((p) => {
    p.score = 0;
    p.correct = 0;
    p.wrong = 0;
  });
  currentRound = 0;
  currentQuestion = 0;
  showRoundIntro();
}

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
            <li>🧠 <strong>Школьное время</strong> — проверь знания из школы</li>
            <li>🎣 <strong>Рыбалка</strong> — эрудиция о рыбах и рыбалке</li>
            <li>🍳 <strong>Кулинария</strong> — продукты, рецепты и факты</li>
            <li>🎭 <strong>Искусство и музыка</strong> — живопись, архитектура, музыка</li>
            <li>🎬 <strong>Фильмы и сериалы</strong> — кино и ТВ</li>
            <li>🎨 <strong>Один цвет</strong> — загадки, объединённые цветом</li>
          </ul>
          <div class="mode-indicator">
            Режим: ${
              gameMode === "team"
                ? "👥 Командный"
                : gameMode === "individual"
                ? "👤 Индивидуальный"
                : "🏆 Турнирный"
            }
          </div>
        </div>
      </div>
      <button id="startQuiz" class="btn-start-quiz">🚀 Начать квиз</button>
    </div>
  `;

  renderQuiz(html);
  document.getElementById("startQuiz").onclick = showRoundSelection;
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

  const emojis = ["🧠", "🎣", "🍳", "🎭", "🎬", "🎨"];

  const titles = [
    "Школьное время",
    "Рыбалка",
    "Кулинария",
    "Искусство и музыка",
    "Фильмы и сериалы",
    "Один цвет",
  ];

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
