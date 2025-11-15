let currentRound = 0;
let currentQuestion = 0;
let score = 0;
let showingAnswer = false;
let currentAudio = null;

// Тексты для озвучки по раундам и вопросам
const voicePrompts = {
  0: {
    // Раунд 1 — Разминка
    0: "Первый вопрос на разминку. Какой напиток изначально использовался как лекарство от головной боли? Варианты ответов: Кока-кола, Джин, Чай или Кофе?",
    1: "Переходим ко второму вопросу. Смотрите на изображения и скажите — какое из этих зданий находится в Лондоне? У вас есть четыре варианта на выбор.",
    2: "Третий вопрос из области химии. Какой элемент периодической таблицы назван в честь планеты? Выбирайте из: Плутоний, Уран, Нептуний или Все перечисленные?",
    3: "Четвертый вопрос о кино. Посмотрите на фотографии режиссёров и скажите — кто из них снял «Криминальное чтиво»?",
    4: "Пятый вопрос комбинированный. Что изображено на фото? Варианты ответов: Телефон, Граммофон, Радио или Фонограф?",
    5: "Шестой вопрос философский. Кто из великих мыслителей сказал: «Я мыслю, следовательно, я существую»? Выбирайте: Сократ, Декарт, Кант или Ницше?",
    6: "Седьмой вопрос визуальный. Среди этих четырёх портретов найдите фотографию Винсента Ван Гога.",
    7: "Восьмой вопрос для автолюбителей. Что за автомобиль изображён на фото? Варианты: Porsche 911, Ferrari Testarossa, Chevrolet Corvette или Jaguar E-Type?",
    8: "Девятый вопрос исторический. В каком году развалился СССР? 1990, 1991, 1992 или 1993 год?",
    9: "Завершающий вопрос раунда. Какой фильм показан на этом кадре? Варианты: Бойцовский клуб, Матрица, Начало или Джон Уик?",
  },
  1: {
    // Раунд 2 — Школа — наше всё!
    0: "Первый вопрос второго раунда по математике. Сколько будет (два в третьей степени) в квадрате, разделить на четыре? Вам нужно написать ответ самостоятельно.",
    1: "Второй вопрос из физики. Тело падает без начальной скорости с высоты 20 метров. Через сколько секунд оно достигнет земли? Ускорение свободного падения равно 10 метров в секунду в квадрате.",
    2: "Третий вопрос по химии. Какое вещество обозначается формулой H2O2? Подсказка: это не просто вода. Напишите название вещества самостоятельно.",
    3: "Четвертый вопрос по географии. Какая страна не имеет выхода к морю? Вам нужно написать название страны.",
    4: "Пятый вопрос исторический. Кто был первым Президентом СССР? Вспомните этого политического деятеля и напишите его фамилию.",
    5: "Шестой вопрос литературный. Какое произведение заканчивается знаменитой строкой: «И я там был, мёд, пиво пил…»? Напишите название сказки самостоятельно.",
    6: "Завершающий вопрос раунда по биологии. Как называется процесс образования глюкозы из неорганических веществ под действием света? Напишите название",
  },
  2: {
    // Раунд 3 — Фильмы и кино
    0: "Первый вопрос третьего раунда. Упорядочите фильмы Квентина Тарантино по дате выхода. Варианты ответа слишком долго читать, читайте сами",
    1: "Второй вопрос. Какой актёр сыграл главного героя в классической трилогии про Индиану Джонса: «В поисках утраченного ковчега», «Храм судьбы» и «Последний крестовый поход»?",
    2: "Третий вопрос о фэнтези. Кто озвучивал дракона Смауга в фильме «Хоббит: Пустошь Смауга»? Варианты: Иэн Маккеллен, Мартин Фриман, Бенедикт Камбербэтч или Ли Пейс?",
    3: "Четвертый вопрос о культовом кино. Что на самом деле представляет собой легендарный зелёный код из «Матрицы»? Какой ответ? Рецепт суши, рецепт пельменей, рецепт жаркого или рецепт Пад Тая?",
    4: "Пятый вопрос о съёмочных секретах. Кто на самом деле рисовал портрет Розы в фильме «Титаник»? Варианты: Леонардо ДиКаприо, Билли Зейн, Джеймс Кэмерон или Кэти Бейтс?",
    5: "Шестой вопрос о Форресте Гампе. В какую страну отправился Форрест Гамп в составе сборной США по настольному теннису? Во Вьетнам, в Китай, в Швецию или во Францию?",
    6: "Седьмой вопрос о детских фильмах. Какого ребёнка НЕ было в поездке на фабрику Вонки в оригинальном фильме? Билли Варпа, Веруки Солт, Майка Тиви или Чарли Баккета?",
    7: "Восьмой вопрос о хоррорах. Какого цвета знаменитый полосатый свитер Фредди Крюгера? Красно-синего, оранжево-зелёного, красно-зелёного или оранжево-коричневого?",
    8: "Девятый вопрос о кинематографической вселенной Marvel. Какой фильм нужно смотреть первым, если включать по хронологии событий? Железный человек, Первый мститель, Доктор Стрэндж или Капитан Марвел?",
    9: "Десятый вопрос о звуковых эффектах. Звуки спаривания каких животных использовались как «речь» велоцирапторов в «Парке Юрского периода»? Черепах, лягушек, ящериц или крокодилов?",
    10: "Одиннадцатый вопрос о голливудских сценариях. Какие фильмы были сняты по одному сценарию? Опять слишком большие ответы",
    11: "Завершающий вопрос раунда о кинематографических вселенных. Какие персонажи из «Звёздных войн» появляются в «Индиане Джонсе»? Такие старые фильмы я никогда не смотрела",
  },
  3: {
    // Раунд 4 — Загадки
    0: "Первый вопрос четвёртого раунда — загадка на сообразительность. Что принадлежит тебе, но другие используют это чаще, чем ты сам? Ответ должен быть коротким, всего 1-3 слова!",
    1: "Вторая загадка. Чем больше ты берёшь, тем больше оставляешь после себя? Что это может быть? Не забывайте — ответ краткий, 1-3 слова.",
    2: "Третья загадка. Иду вверх, иду вниз, но всегда остаюсь на месте. Что это?",
    3: "Четвертая загадка. Что можно разбить, просто назвав это?",
    4: "Пятая загадка. Что имеет города, но нет домов; имеет реки, но нет воды; имеет леса, но нет деревьев?",
    5: "Шестая загадка. Что становится мокрым при сушке? И маленькая подсказка: если вы еще не догадались, то ответы на все загадки были в названиях сериалов, изображенных на фото к вопросам!",
  },
  4: {
    // Раунд 5 — Угадай песню по эмодзи
    0: "Первый вопрос музыкального раунда! Посмотрите на комбинацию эмодзи и угадайте, какую известную русскую песню они зашифровали?",
    1: "Вторая музыкальная загадка. Какая песня скрывается за этими символами?",
    2: "Третий вопрос на знание хитов. Какая популярная песня зашифрована этими эмодзи?",
    3: "Четвертая музыкальная головоломка. Угадайте песню по комбинации смайликов!",
    4: "Пятый вопрос — какие слова этой песни спрятаны в эмодзи?",
    5: "Шестая загадка. Сможете узнать хит по этим символам?",
    6: "Седьмой вопрос. О какой известной песне говорят эти эмодзи?",
    7: "Восьмая загадка. Какая композиция закодирована смайликами?",
    8: "Финальный вопрос музыкального раунда! Последний шанс блеснуть эрудицией — угадайте песню по эмодзи!",
  },
};

// Функция озвучки
function speakQuestion() {
  const customPrompt = voicePrompts[currentRound]?.[currentQuestion];
  if (customPrompt) {
    speakText(customPrompt);
  }
}

// Базовая функция озвучки
function speakText(text) {
  try {
    stopSpeaking();

    const encodedText = encodeURIComponent(text.substring(0, 200));
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=ru&client=tw-ob`;

    currentAudio = new Audio(audioUrl);
    currentAudio.play();
  } catch (error) {
    console.error("Ошибка TTS:", error);
  }
}

function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
}

function showRoundIntro() {
  const round = rounds[currentRound];
  renderQuiz(`
        <h2>${round.title}</h2>
        <p>${round.description}</p>
        <p>Всего вопросов: ${round.totalQuestions}</p>
        <button id="beginRound">Начать Раунд</button>
    `);
  document.getElementById("beginRound").onclick = showQuestion;
}

function showQuestion() {
  const round = rounds[currentRound];
  const q = round.questions[currentQuestion];
  let html = `<h3>${q.question}</h3>`;

  // Показываем изображения для любого типа вопроса, если есть
  if (q.images && q.images.length > 0) {
    html += `<div class="images-container" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin: 15px 0;">`;
    q.images.forEach(
      (src) =>
        (html += `<img src="${src}" style="max-width: 400px; max-height: 300px; border-radius: 12px; object-fit: cover;">`)
    );
    html += `</div>`;
  }

  if (q.type === "input") {
    html += `
            <input id="userAnswer" type="text" placeholder="Введите ответ..." 
                   style="margin-top:15px;padding:10px;width:80%;border-radius:8px;border:none;font-size:16px;">
            <br>
            <button id="checkAnswer" style="margin-top:15px;">Ответить</button>
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
    q.answers.forEach((ans) => (html += `<div class="answer">${ans}</div>`));
    html += `</div>`;
  }

  html += `
        <div id="progress-container"><div id="progress"></div></div>
        <div class="score">Вопрос ${currentQuestion + 1} из ${
    round.totalQuestions
  } | Баллы: ${score}</div>
        <button onclick="speakQuestion()" style="margin-top: 15px; background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
            🔊 Произнести вопрос
        </button>
    `;

  renderQuiz(html);
  renderProgress(currentQuestion + 1, round.totalQuestions);

  if (q.type === "input") {
    document.getElementById("checkAnswer").onclick = () => handleInputAnswer(q);
  } else {
    document.querySelectorAll(".answer").forEach((a, i) => {
      a.onclick = () => handleChoiceAnswer(i, q);
    });
  }

  // Автоматически запускаем озвучку через 1 секунду
  setTimeout(() => {
    speakQuestion();
  }, 1000);
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
    input.style.background = "rgba(76, 175, 80, 0.3)";
  } else {
    input.style.background = "rgba(244, 67, 54, 0.3)";
  }

  addNextButton();
}

function addNextButton() {
  const nextBtn = document.createElement("button");
  const round = rounds[currentRound];
  nextBtn.textContent =
    currentQuestion + 1 < round.totalQuestions ? "Далее" : "Раунд завершён";
  nextBtn.onclick = () => {
    stopSpeaking();
    currentQuestion++;
    showingAnswer = false;
    if (currentQuestion < round.totalQuestions) showQuestion();
    else showEndRound();
  };
  document.getElementById("quiz").appendChild(nextBtn);
}

function showEndRound() {
  const round = rounds[currentRound];
  renderQuiz(`
        <h2>${round.title} завершён!</h2>
        <p>Ваш счёт: ${score} баллов</p>
        <button id="nextRound">Продолжить</button>
    `);
  const hasNext = currentRound + 1 < rounds.length;
  document.getElementById("nextRound").textContent = hasNext
    ? "Следующий раунд"
    : "Завершить игру";
  document.getElementById("nextRound").onclick = () => {
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
        <h2>Квиз завершён!</h2>
        <p>Ваш итоговый счёт: ${score} баллов</p>
        <button onclick="location.reload()">Пройти снова</button>
    `);
}

function showRoundIntro() {
  const round = rounds[currentRound];
  renderQuiz(`
        <div style="text-align: center;">
            <h2>${round.title}</h2>
            <p>${round.description}</p>
            <p>Всего вопросов: ${round.totalQuestions}</p>
            <button id="beginRound" style="background:#4CAF50;color:white;border:none;padding:12px 24px;border-radius:8px;font-size:16px;cursor:pointer;">
                Начать Раунд
            </button>
        </div>
    `);
  document.getElementById("beginRound").onclick = showQuestion;
}
