const startBtn = document.getElementById("start");

startBtn.addEventListener("click", showAssistantIntroduction);

function showAssistantIntroduction() {
  let html = `
        <div style="text-align: center; max-width: 600px; margin: 0 auto;">
            <div style="margin: 20px 0; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="width: 180px; height: 180px; margin: 0 auto 25px; border-radius: 50%; overflow: hidden; border: 4px solid white; box-shadow: 0 8px 25px rgba(0,0,0,0.3); position: relative;">
                    <img src="https://s3.objstor.cloud4u.com/unti-prod-people/file/presentation/project/dnupc92fco.jpg" 
                         style="width:100%;height:100%;object-fit:cover; filter: brightness(1.05) contrast(1.1);"
                         alt="Помощник">
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: 50%; background: radial-gradient(circle, transparent 60%, rgba(255,255,255,0.3) 100%); pointer-events: none;"></div>
                </div>
                <h2 style="color: white; margin-bottom: 15px; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Знакомьтесь - ваш помощник в квизе!</h2>
                <p style="font-size: 16px; line-height: 1.5; color: rgba(255,255,255,0.9); margin-bottom: 10px;">
                    Привет! Я ваш виртуальный помощник в этом увлекательном квизе. 
                </p>
                <p style="font-size: 16px; line-height: 1.5; color: rgba(255,255,255,0.9);">
                    Я буду озвучивать вопросы и помогать вам ориентироваться в игре.
                </p>
            </div>
            <button id="meetAssistant" style="background: linear-gradient(45deg, #FF6B00, #FF8E00); color: white; border: none; padding: 16px 32px; border-radius: 50px; font-size: 18px; cursor: pointer; margin: 10px; box-shadow: 0 4px 15px rgba(255,107,0,0.3); transition: all 0.3s ease;">
                🎤 Познакомиться с помощником
            </button>
            <br>
            <button id="skipIntro" style="background: transparent; color: #666; border: 2px solid #666; padding: 12px 24px; border-radius: 50px; font-size: 14px; cursor: pointer; transition: all 0.3s ease;">
                Пропустить знакомство
            </button>
        </div>
    `;

  renderQuiz(html);

  // Добавляем hover эффекты
  document.getElementById("meetAssistant").onmouseover = function () {
    this.style.transform = "translateY(-2px)";
    this.style.boxShadow = "0 6px 20px rgba(255,107,0,0.4)";
  };
  document.getElementById("meetAssistant").onmouseout = function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 4px 15px rgba(255,107,0,0.3)";
  };

  document.getElementById("meetAssistant").onclick = () => {
    speakAssistantIntroduction();
  };

  document.getElementById("skipIntro").onclick = showRoundSelection;
}

// Новая функция для последовательной озвучки
async function speakAssistantIntroduction() {
  const speechParts = [
    "Приветствую всех участников квиза! Я ваш виртуальный помощник.",
    "Меня создал Роман, чтобы сопровождать вас в этом увлекательном путешествии по миру знаний.",
    "Сегодня нас ждет 5 интересных раундов с самыми разными вопросами. Желаю всем удачи и отличного настроения!",
  ];

  for (let i = 0; i < speechParts.length; i++) {
    await speakTextAndWait(speechParts[i]);
    // Пауза между фразами
    if (i < speechParts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  // После окончания речи показываем выбор раундов
  showRoundSelection();
}

// Функция которая ждет окончания речи
function speakTextAndWait(text) {
  return new Promise((resolve) => {
    try {
      stopSpeaking();

      const encodedText = encodeURIComponent(text);
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=ru&client=tw-ob`;

      currentAudio = new Audio(audioUrl);

      currentAudio.addEventListener("ended", () => {
        currentAudio = null;
        resolve();
      });

      currentAudio.addEventListener("error", () => {
        currentAudio = null;
        resolve();
      });

      currentAudio.play().catch((error) => {
        console.error("Ошибка воспроизведения:", error);
        resolve();
      });
    } catch (error) {
      console.error("Ошибка TTS:", error);
      resolve();
    }
  });
}

function showRoundSelection() {
  let html = `
        <div style="text-align: center;">
            <h2 style="color: #333; margin-bottom: 10px;">🎯 Выберите раунд</h2>
            <p style="margin-bottom: 30px; color: #666; font-size: 16px;">Всего доступно ${rounds.length} увлекательных раундов</p>
            <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;margin:0 auto;">
    `;

  rounds.forEach((round, index) => {
    html += `<button class="selectRound" data-index="${index}" 
                     style="padding:18px;background:linear-gradient(45deg, #4CAF50, #45a049);color:white;border:none;border-radius:12px;cursor:pointer;font-size:16px;box-shadow:0 4px 15px rgba(76,175,80,0.3);transition:all 0.3s ease;">
                    ${round.title}
             </button>`;
  });

  html += `</div></div>`;

  renderQuiz(html);

  // Добавляем hover эффекты для кнопок раундов
  document.querySelectorAll(".selectRound").forEach((btn) => {
    btn.onmouseover = function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 6px 20px rgba(76,175,80,0.4)";
    };
    btn.onmouseout = function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 4px 15px rgba(76,175,80,0.3)";
    };

    btn.onclick = async () => {
      currentRound = parseInt(btn.dataset.index);
      currentQuestion = 0;
      showingAnswer = false;

      // Озвучиваем начало раунда по частям
      const round = rounds[currentRound];
      await speakTextAndWait(`Начинаем ${round.title}`);
      await speakTextAndWait(round.description);

      showRoundIntro();
    };
  });
}
