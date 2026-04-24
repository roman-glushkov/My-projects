const startBtn = document.getElementById("start");

startBtn.addEventListener("click", showAssistantIntroduction);

function showAssistantIntroduction() {
  let html = `
    <div style="text-align: center;">
      <div style="margin: 10px 0; padding: 20px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)); border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
        <div style="width: 120px; height: 120px; margin: 0 auto 15px; border-radius: 50%; overflow: hidden; border: 3px solid white; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
          <img src="https://s3.objstor.cloud4u.com/unti-prod-people/file/presentation/project/dnupc92fco.jpg" 
               style="width:100%;height:100%;object-fit:cover;"
               alt="Помощник">
        </div>
        <h2 style="color: white; margin-bottom: 10px; font-size: 26px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          Добро пожаловать в Квиз!
        </h2>
        <div style="background: rgba(255,255,255,0.1); padding: 12px 15px; border-radius: 12px; margin: 10px 0;">
          <p style="font-size: 15px; line-height: 1.4; color: white; margin-bottom: 8px;">
            Привет! Это увлекательный квиз с 6 раундами:
          </p>
          <ul style="text-align: left; color: rgba(255,255,255,0.9); font-size: 13px; line-height: 1.6; max-width: 450px; margin: 0 auto; padding-left: 20px;">
            <li>🧠 <strong>Разминка</strong> - 10 вопросов</li>
            <li>🎨 <strong>Нейро строки</strong> - угадай песню</li>
            <li>🔤 <strong>Тематика</strong> - Marvel, сериалы</li>
            <li>🏗️ <strong>Многосложение</strong> - профессии</li>
            <li>🔍 <strong>Третий лишний</strong> - логика</li>
            <li>🎨 <strong>Один цвет</strong> - загадки</li>
          </ul>
        </div>
      </div>
      <button id="startQuiz" style="background: linear-gradient(45deg, #FF6B00, #FF8E00); color: white; border: none; padding: 14px 35px; border-radius: 50px; font-size: 18px; font-weight: bold; cursor: pointer; box-shadow: 0 8px 25px rgba(255,107,0,0.4); transition: all 0.3s ease; margin-top: 15px;">
        🚀 Начать квиз
      </button>
    </div>
  `;

  renderQuiz(html);

  const startQuizBtn = document.getElementById("startQuiz");
  startQuizBtn.onmouseover = function () {
    this.style.transform = "translateY(-3px)";
    this.style.boxShadow = "0 12px 35px rgba(255,107,0,0.6)";
  };
  startQuizBtn.onmouseout = function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 8px 25px rgba(255,107,0,0.4)";
  };

  startQuizBtn.onclick = showRoundSelection;
}

function showRoundSelection() {
  let html = `
    <div style="text-align: center;">
      <h2 style="color: #00d4ff; margin-bottom: 10px; font-size: 28px;">🎯 Выберите раунд</h2>
      <p style="margin-bottom: 20px; color: rgba(255,255,255,0.9); font-size: 15px;">
        Доступно ${rounds.length} раундов. Можно начинать с любого!
      </p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; max-width: 1000px; margin: 0 auto;">
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
      <div class="round-card" style="background: ${colors[index]}; padding: 15px; border-radius: 16px; text-align: center; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.1);" data-index="${index}">
        <div style="font-size: 35px; margin-bottom: 8px;">${emojis[index]}</div>
        <h3 style="color: white; margin: 0 0 5px; font-size: 17px;">${round.title}</h3>
        <p style="color: rgba(255,255,255,0.8); line-height: 1.3; font-size: 12px; margin-bottom: 8px;">
          ${round.description}
        </p>
        <span style="background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 15px; color: white; font-size: 12px;">
          ${round.totalQuestions} вопросов
        </span>
      </div>
    `;
  });

  html += `</div></div>`;

  renderQuiz(html);

  document.querySelectorAll(".round-card").forEach((card) => {
    card.onmouseover = function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 12px 30px rgba(0,0,0,0.3)";
    };
    card.onmouseout = function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
    };

    card.onclick = () => {
      currentRound = parseInt(card.dataset.index);
      currentQuestion = 0;
      showingAnswer = false;
      showRoundIntro();
    };
  });
}
