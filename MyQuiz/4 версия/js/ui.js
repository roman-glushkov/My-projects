function renderQuiz(html) {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = html;
}

function renderProgress(current, total) {
  const progress = document.getElementById("progress");
  progress.style.width = `${(current / total) * 100}%`;
}
