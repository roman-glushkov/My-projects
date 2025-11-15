const rounds = [
  {
    title: "Раунд 1 — Разминка",
    description: "Интересные вопросы для разогрева ума.",
    totalQuestions: 10,
    questions: [
      {
        type: "text-only",
        question:
          "Какой напиток изначально использовался как лекарство от головной боли?",
        answers: ["Кока-кола", "Джин", "Чай", "Кофе"],
        correct: 1,
        points: 10,
      },
      {
        type: "image-only",
        question: "Какое из этих зданий находится в Лондоне?",
        answers: [
          "https://img.freepik.com/free-photo/eiffel-tower-distant-landscape-view_1101-2289.jpg?semt=ais_hybrid&w=740&q=80",
          "https://avatars.mds.yandex.net/i?id=d9eb310834b6ef7b2becf2d41af08599_l-5229540-images-thumbs&n=13",
          "https://avatars.mds.yandex.net/i?id=39197eb4fa1f11c4efc0d5e2004b529add196d17-10355097-images-thumbs&n=13",
          "https://www.deutschland.de/sites/default/files/styles/image_carousel_mobile/public/media/image/Hotspot-für-Europa-Städtereisende-das-Brandenburger-Tor-in-Berlin.jpg?itok=HosAMEoQ",
        ],
        correct: 3,
        points: 15,
      },
      {
        type: "text-only",
        question: "Какой элемент периодической таблицы назван в честь планеты?",
        answers: ["Плутоний", "Уран", "Нептуний", "Все перечисленные"],
        correct: 4,
        points: 10,
      },
      {
        type: "image-only",
        question: "Кто из этих режиссёров снял «Криминальное чтиво»?",
        answers: [
          "https://www.indiewire.com/wp-content/uploads/2018/04/steven-spielberg.jpg?resize=35",
          "https://mixnews.lv/wp-content/uploads/2024/05/3/350c4a5237a1bf44b39ae0f46239ee0b.jpeg",
          "https://kinotv.ru/upload/setka-editor/12f/4chgk2pt9bpsiqi3y47zqmpf1rjidn2m.jpg",
          "https://s.yimg.com/ny/api/res/1.2/QYpHAm86W63Z5.Kzmoewbg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD04Mjg7Y2Y9d2VicA--/https://media.zenfs.com/en/ap.org/e2d76d9d4fd20a5997d0e6890edd38d4",
        ],
        correct: 2,
        points: 20,
      },
      {
        type: "text-image",
        question: "Что изображено на фото?",
        images: [
          "https://avatars.mds.yandex.net/get-marketpic/5467672/picce7d3dfec93ab24235332a2dfe9d4f35/orig",
        ],
        answers: ["Телефон", "Граммофон", "Радио", "Фонограф"],
        correct: 2,
        points: 15,
      },
      {
        type: "text-only",
        question: "Кто сказал: «Я мыслю, следовательно, я существую»?",
        answers: ["Сократ", "Декарт", "Кант", "Ницше"],
        correct: 2,
        points: 10,
      },
      {
        type: "image-only",
        question: "На какой фотографии изображён Ван Гог?",
        answers: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Vincent_van_Gogh_-_s0273V1962_-_Van_Gogh_Museum.jpg/960px-Vincent_van_Gogh_-_s0273V1962_-_Van_Gogh_Museum.jpg",
          "https://avatars.mds.yandex.net/i?id=270534e646913cf587ecfc3497dc29713c011449-12622473-images-thumbs&n=13",
          "https://avatars.mds.yandex.net/i?id=9bb0b920fce27fc845b0e37263542b0ce96b52f2-12900328-images-thumbs&n=13",
          "https://avatars.mds.yandex.net/i?id=4c86bec465a8f110ed238d5fae5f2c3c_l-5618265-images-thumbs&n=13",
        ],
        correct: 1,
        points: 20,
      },
      {
        type: "text-image",
        question: "Что за автомобиль изображён на фото?",
        images: [
          "https://kolesa-uploads.ru/-/e3c4ae08-01e8-4502-b18a-ae5deb963dc3/0-0.jpg",
        ],
        answers: [
          "Porsche 911",
          "Ferrari Testarossa",
          "Chevrolet Corvette",
          "Jaguar E-Type",
        ],
        correct: 4,
        points: 15,
      },
      {
        type: "text-only",
        question: "В каком году развалился СССР?",
        answers: ["1990", "1991", "1992", "1993"],
        correct: 2,
        points: 10,
      },
      {
        type: "text-image",
        question: "Какой фильм показан на фото?",
        images: [
          "https://api.kinoart.ru/storage/post/928/regular_detail_picture-cfbef417cfdd8f654f3628267381a491.jpg",
        ],
        answers: ["Бойцовский клуб", "Матрица", "Начало", "Джон Уик"],
        correct: 1,
        points: 15,
      },
    ],
  },
  {
    title: "Раунд 2 — Школа — наше всё!",
    description: "Ответьте на вопросы, написав ответ самостоятельно.",
    totalQuestions: 7,
    questions: [
      {
        type: "input",
        question: "Сколько будет (2^3)^2 ÷ 4?",
        images: [
          "https://avatars.mds.yandex.net/i?id=8ab663b70b1367f5bcfbc75db19a460c6174572e-12759831-images-thumbs&n=13",
        ],
        correctText: "16",
        points: 20,
      },
      {
        type: "input",
        question:
          "Тело падает без начальной скорости с высоты 20 м. Через сколько секунд оно достигнет земли? (g = 10 м/с²)",
        images: [
          "https://avatars.mds.yandex.net/i?id=357a0949d3c34b0c088a33ab5cede8a730101b59-5286188-images-thumbs&n=13",
        ],
        correctText: "2",
        points: 25,
      },
      {
        type: "input",
        question: "Какое вещество обозначается формулой H2O2?",
        images: [
          "https://avatars.mds.yandex.net/i?id=2e0c9a42605305f088d22cd6cb350fd5e7ed7ca7-9042386-images-thumbs&n=13",
        ],
        correctText: "перекись водорода",
        points: 20,
      },
      {
        type: "input",
        question: "Какая страна не имеет выхода к морю?",
        images: [
          "https://avatars.mds.yandex.net/i?id=0b1417ea16c5cb017870c9dd55d2b74a9c54c56e-4937827-images-thumbs&n=13",
        ],
        correctText: "боливия",
        points: 20,
      },
      {
        type: "input",
        question: "Кто был первым Президентом СССР?",
        images: [
          "https://cdn.culture.ru/images/9c3899d5-e194-5650-816a-9eb996034130",
        ],
        correctText: "михаил горбачёв",
        points: 25,
      },
      {
        type: "input",
        question:
          "Какое произведение заканчивается строкой: «И я там был, мёд, пиво пил…»?",
        images: [
          "https://cs10.pikabu.ru/post_img/2018/05/29/8/og_og_1527595737245078323.jpg",
        ],
        correctText: "сказка о царе салтане",
        points: 20,
      },
      {
        type: "input",
        question:
          "Как называется процесс образования глюкозы из неорганических веществ под действием света?",
        images: [
          "https://avatars.mds.yandex.net/i?id=64acf9c481d89ae7a72ee61fa438398c_l-9851898-images-thumbs&n=13",
        ],
        correctText: "фотосинтез",
        points: 25,
      },
    ],
  },
  {
    title: "Раунд 3 — Фильмы и кино",
    description: "Вопросы о кино и поп-культуре.",
    totalQuestions: 12,
    questions: [
      {
        type: "text-only",
        question: "Упорядочите фильмы Тарантино по дате выхода.",
        images: [
          "https://avatars.mds.yandex.net/i?id=06d8874ee29e0854053667f3832bf217_l-12522553-images-thumbs&n=13",
          "https://avatars.mds.yandex.net/i?id=8365852e7f8af487f2b260ef4d4e385a_l-5245094-images-thumbs&n=13",
          "https://i.pinimg.com/736x/ad/f1/da/adf1daa9afae455488077e0149e7b62e.jpg",
        ],
        answers: [
          "Криминальное чтиво → Бешеные псы → Омерзительная восьмерка",
          "Бешеные псы → Криминальное чтиво → Омерзительная восьмерка",
          "Криминальное чтиво → Омерзительная восьмерка → Бешеные псы",
          "Омерзительная восьмерка → Криминальное чтиво → Бешеные псы",
        ],
        correct: 2,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "Какой актёр сыграл главного героя в фильмах про Индиану Джонса: «В поисках утраченного ковчега», «Храм судьбы», «Последний крестовый поход»?",
        images: [
          "https://static1.srcdn.com/wordpress/wp-content/uploads/2023/12/harrison-ford-indiana-jones-han-solo-played-42-years.jpg",
        ],
        answers: ["Том Хэнкс", "Харрисон Форд", "Роберт Рэфорд", "Крис Пратт"],
        correct: 2,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "Кто озвучивал дракона Смауга в фильме «Хоббит: Пустошь Смауга»?",
        answers: [
          "Иэн Маккеллен",
          "Мартин Фриман",
          "Бенедикт Камбербэтч",
          "Ли Пейс",
        ],
        correct: 3,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "Что на самом деле представляет собой легендарный зелёный код из «Матрицы»?",
        answers: [
          "Рецепт суши",
          "Рецепт пельменей",
          "Рецепт жаркого",
          "Рецепт Пад Тая",
        ],
        correct: 1,
        points: 10,
      },
      {
        type: "text-only",
        question: "Кто на самом деле рисовал Розу в фильме «Титаник»?",
        answers: [
          "Леонардо ДиКаприо",
          "Билли Зейн",
          "Джеймс Кэмерон",
          "Кэти Бейтс",
        ],
        correct: 3,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "В какую страну отправился Форрест Гамп в составе сборной США по настольному теннису?",
        images: [
          "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/11/Forrest-Gump-sitting-on-a-bench.jpg",
        ],
        answers: ["Во Вьетнам", "В Китай", "В Швецию", "Во Францию"],
        correct: 2,
        points: 10,
      },
      {
        type: "text-only",
        question: "Какого ребёнка НЕ было в поездке на фабрику Вонки?",
        images: [
          "https://cdn.lifehacker.ru/wp-content/uploads/2020/10/CharlieChocolateFactory_1603009569.jpg",
        ],
        answers: ["Билли Варпа", "Веруки Солт", "Майка Тиви", "Чарли Баккета"],
        correct: 1,
        points: 10,
      },
      {
        type: "text-only",
        question: "Какого цвета полосатый свитер Фредди Крюгера?",
        images: [
          "https://avatars.mds.yandex.net/i?id=0ad9bf228f30faa63ced7a63e4caf69c_l-4936012-images-thumbs&n=13",
        ],
        answers: [
          "Красно-синего",
          "Оранжево-зелёного",
          "Красно-зелёного",
          "Оранжево-коричневого",
        ],
        correct: 3,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "Какой фильм Marvel нужно смотреть первым, если включать по хронологии?",
        images: [
          "https://avatars.mds.yandex.net/i?id=5afe043582297c9116af9d12d55925c8_l-9229617-images-thumbs&n=13",
        ],
        answers: [
          "Железный человек",
          "Первый мститель",
          "Доктор Стрэндж",
          "Капитан Марвел",
        ],
        correct: 2,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "Звуки спаривания каких животных использовались как «речь» велоцирапторов в «Парке Юрского периода»?",
        images: ["https://video.kinoafisha.info/news/8340446_364437253477.jpg"],
        answers: ["Черепах", "Лягушек", "Ящериц", "Крокодилов"],
        correct: 1,
        points: 10,
      },
      {
        type: "text-only",
        question: "Какие фильмы сняты по одному сценарию?",
        answers: [
          "«Звёздные войны» и «Близкие контакты третьей степени»",
          "«Инопланетянин» и «Полтергейст»",
          "«Балбесы» и «Индиана Джонс»",
          "«Парк Юрского периода» и «Земля до начала времён»",
        ],
        correct: 2,
        points: 10,
      },
      {
        type: "text-only",
        question:
          "Какие персонажи из «Звёздных войн» появляются в «Индиане Джонсе»?",
        images: [
          "https://imgix.ranker.com/user_node_img/50086/1001719799/original/-and-_39_star-wars-and-_39_-hieroglyphs-appear-in-and-_39_raiders-of-the-lost-ark-and-_39_-photo-u2?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&w=650",
        ],
        answers: [
          "R2-D2 и C-3PO",
          "Люк Скайуокер и принцесса Лея",
          "Йода и Оби-Ван Кеноби",
          "Хан Соло и Чубакка",
        ],
        correct: 1,
        points: 10,
      },
    ],
  },
  {
    title: "Раунд 4 — Загадки",
    description:
      "Короткие загадки, требующие нестандартного мышления. Ответы всего 1-3 слова!",
    totalQuestions: 6,
    questions: [
      {
        type: "input",
        question: "Что принадлежит тебе, но другие используют это чаще тебя?",
        images: [
          "https://avatars.mds.yandex.net/i?id=cae9aa2f16c5849bf6193285fc39d9b8_l-5109092-images-thumbs&n=13",
        ],
        correctText: "имя",
        points: 10,
      },
      {
        type: "input",
        question: "Чем больше ты берёшь, тем больше оставляешь behind?",
        images: [
          "https://s00.yaplakal.com/pics/pics_original/5/1/9/19556915.png",
        ],
        correctText: "следы",
        points: 10,
      },
      {
        type: "input",
        question: "Иду вверх, иду вниз, но всегда остаюсь на месте.",
        images: [
          "https://static.kinoafisha.info/k/series_shots/1920x1080/upload/series/frames/3/1/3/5313/bb61745eb6ca72c0f8f58d9130641706.jpg",
        ],
        correctText: "лестница",
        points: 10,
      },
      {
        type: "input",
        question: "Что можно разбить, просто назвав это?",
        images: [
          "https://pic.uma.media/cwebp/pic/cardimage/9d/0f/9d0f0d6f26febbd33eebf270d0132b40.jpg?size=1920&quality=90",
        ],
        correctText: "молчание",
        points: 10,
      },
      {
        type: "input",
        question:
          "Что имеет города, но нет домов; имеет реки, но нет воды; имеет леса, но нет деревьев?",
        images: [
          "https://m.media-amazon.com/images/M/MV5BMjg2MDc1OGMtMTllYy00YTQ3LWEwMWEtODM2ODhmYmM3YWMyXkEyXkFqcGc@._V1_QL75_UX1000_CR0",
        ],
        correctText: "карта",
        points: 10,
      },
      {
        type: "input",
        question: "Что становится мокрым при сушке?",
        images: ["photo_2025-11-14_23-15-08.jpg"],
        correctText: "полотенце",
        points: 10,
      },
    ],
  },
  {
    title: "Раунд 5 — Угадай песню по эмодзи",
    description:
      "Посмотри на комбинацию эмодзи и угадай, какую русскую песню они обозначают!",
    totalQuestions: 9,
    questions: [
      {
        type: "input",
        question: "Угадай песню",
        correctText: "аргентина ямайка 5 0",
        images: [
          "https://n1s1.hsmedia.ru/25/4c/12/254c12c374606a8ea6c66816912bb5f5/396x347_0xac120003_170442271585828629.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "зеленоглазое такси",
        images: [
          "https://n1s1.hsmedia.ru/b4/5f/47/b45f47816f0dffb29362540751a01d39/635x555_0xac120003_9602786031586362769.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "невеста",
        images: [
          "https://n1s1.hsmedia.ru/a3/1a/87/a31a87d0904b14e7352cd832c8098112/553x484_0xac120003_19671877781587649521.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "позвони мне, позвони",
        images: [
          "https://n1s1.hsmedia.ru/aa/40/76/aa407684575fa65721bb7db6a8845173/367x321_0xac120003_19995697771586961876.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "экспонат",
        images: [
          "https://n1s1.hsmedia.ru/47/f2/b4/47f2b47274c1c409686ad3130401b658/233x204_0xac120003_20589221741587649928.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "мы разошлись как в море корабли",
        images: [
          "https://n1s1.hsmedia.ru/0a/ad/c8/0aadc849b30ac2ecbd0baaa82e505a25/209x183_0xac120003_4866886751587650676.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "боже какой мужчина",
        images: [
          "https://n1s1.hsmedia.ru/32/81/4d/32814d638049f177f881f3c4475e668e/449x392_0xac120003_18416425141587652040.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "осень",
        images: [
          "https://n1s1.hsmedia.ru/0f/a2/4b/0fa24bf5bbbcad20d1248fdd161dfb43/395x345_0xac120003_1251982751587652180.webp",
        ],
        points: 10,
      },
      {
        type: "input",
        question: "Угадай песню",
        correctText: "выхода нет",
        images: [
          "https://n1s1.hsmedia.ru/e0/b1/61/e0b161b85f0a3a18a907836c31a79f8e/251x220_0xac120003_18937447761587652327.webp",
        ],
        points: 10,
      },
    ],
  },
];
