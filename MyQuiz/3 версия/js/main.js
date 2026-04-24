const startBtn = document.getElementById("start");

startBtn.addEventListener("click", showAssistantIntroduction);

function showAssistantIntroduction() {
  let html = `
    <div style="text-align: center;">
      <div style="margin: 30px 0; padding: 40px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9)); border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);">
        <div style="width: 200px; height: 200px; margin: 0 auto 30px; border-radius: 50%; overflow: hidden; border: 4px solid white; box-shadow: 0 15px 40px rgba(0,0,0,0.4); position: relative;">
          <img src="https://s3.objstor.cloud4u.com/unti-prod-people/file/presentation/project/dnupc92fco.jpg" 
               style="width:100%;height:100%;object-fit:cover;"
               alt="Помощник">
        </div>
        <h2 style="color: white; margin-bottom: 20px; font-size: 32px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
          Добро пожаловать в Квиз!
        </h2>
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 16px; margin: 20px 0;">
          <p style="font-size: 18px; line-height: 1.6; color: white; margin-bottom: 15px;">
            Привет! Это увлекательный квиз с 6 разнообразными раундами:
          </p>
          <ul style="text-align: left; color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.8; max-width: 500px; margin: 0 auto;">
            <li>🧠 <strong>Разминка</strong> - 10 вопросов на эрудицию</li>
            <li>🎨 <strong>Нейро строки</strong> - угадай песню по картинке</li>
            <li>🔤 <strong>Тематика</strong> - Marvel, сериалы, история</li>
            <li>🏗️ <strong>Многосложение</strong> - угадай профессию</li>
            <li>🔍 <strong>Третий лишний</strong> - найди лишнее</li>
            <li>🎨 <strong>Один цвет</strong> - все ответы в одном цвете</li>
          </ul>
        </div>
      </div>
      <button id="startQuiz" style="background: linear-gradient(45deg, #FF6B00, #FF8E00); color: white; border: none; padding: 18px 40px; border-radius: 50px; font-size: 20px; font-weight: bold; cursor: pointer; margin: 20px; box-shadow: 0 8px 25px rgba(255,107,0,0.4); transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 12px; margin: 0 auto;">
        <span>🚀 Начать квиз</span>
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
      <h2 style="color: #00d4ff; margin-bottom: 15px; font-size: 36px;">🎯 Выберите раунд</h2>
      <p style="margin-bottom: 40px; color: rgba(255,255,255,0.9); font-size: 18px; max-width: 600px; margin-left: auto; margin-right: auto;">
        Доступно ${rounds.length} увлекательных раундов. Можно начинать с любого!
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; max-width: 1000px; margin: 0 auto;">
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
      <div class="round-card" style="background: ${colors[index]}; padding: 25px; border-radius: 20px; text-align: left; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(0,0,0,0.2); border: 2px solid rgba(255,255,255,0.1);" data-index="${index}">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
          <div style="background: rgba(255,255,255,0.2); width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">
            ${emojis[index]}
          </div>
          <h3 style="color: white; margin: 0; font-size: 22px;">${round.title}</h3>
        </div>
        <p style="color: rgba(255,255,255,0.9); margin-bottom: 15px; line-height: 1.5; font-size: 16px;">
          ${round.description}
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
          <span style="background: rgba(255,255,255,0.2); padding: 6px 15px; border-radius: 20px; color: white; font-size: 14px;">
            ${round.totalQuestions} вопросов
          </span>
          <span style="color: white; font-weight: bold; font-size: 18px;">
            Выбрать →
          </span>
        </div>
      </div>
    `;
  });

  html += `</div></div>`;

  renderQuiz(html);

  document.querySelectorAll(".round-card").forEach((card) => {
    card.onmouseover = function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
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
