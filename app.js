const quizForm = document.querySelector("#quizForm");
const resetButton = document.querySelector("#resetButton");
const errorText = document.querySelector("#errorText");
const resultCard = document.querySelector("#resultCard");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");

const resultFields = {
  bossName: document.querySelector("#bossName"),
  bossSummary: document.querySelector("#bossSummary"),
  specialMove: document.querySelector("#specialMove"),
  weakness: document.querySelector("#weakness"),
  castle: document.querySelector("#castle"),
  minion: document.querySelector("#minion"),
};

const bosses = {
  shadow: {
    name: "未読を従える静かなラスボス",
    summary:
      "気配だけで会議室の空気を変えるタイプ。今日は無理に派手に動かなくても、ひとつ選ぶだけで場が進みます。",
    specialMove: "通知を無音で支配する",
    weakness: "やさしい一言と、あたたかい飲み物",
    castle: "充電器の近くにある静かな玉座",
    minion: "あとで読むつもりのタブたち",
  },
  sleep: {
    name: "五分延長を司るまどろみの魔王",
    summary:
      "急がば眠れ、を地で行くタイプ。今日は回復を味方につけるほど、あとでじわっと強くなります。",
    specialMove: "世界を一時停止して毛布を召喚する",
    weakness: "朝日と、やたら元気な通知音",
    castle: "枕の沈み込みが完璧な要塞",
    minion: "低気圧の日だけ忠実な眠気",
  },
  spark: {
    name: "締切前に覚醒する突撃ラスボス",
    summary:
      "ぎりぎりになるほど目が光るタイプ。今日は勢いが武器ですが、休憩をはさむと火力が長持ちします。",
    specialMove: "謎の集中力で三十分だけ未来を追い抜く",
    weakness: "空腹と、開きっぱなしの買い物サイト",
    castle: "付箋だらけの作戦机",
    minion: "急に降ってくるアイデア三兄弟",
  },
};

function selectedAnswers() {
  return Array.from(new FormData(quizForm).values());
}

function updateProgress() {
  const count = selectedAnswers().length;
  progressText.textContent = `${count} / 5`;
  progressFill.style.width = `${(count / 5) * 100}%`;
}

function decideBoss(answers) {
  const scores = { shadow: 0, sleep: 0, spark: 0 };

  answers.forEach((answer) => {
    scores[answer] += 1;
  });

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

function showResult(boss) {
  resultFields.bossName.textContent = boss.name;
  resultFields.bossSummary.textContent = boss.summary;
  resultFields.specialMove.textContent = boss.specialMove;
  resultFields.weakness.textContent = boss.weakness;
  resultFields.castle.textContent = boss.castle;
  resultFields.minion.textContent = boss.minion;
  resultCard.classList.remove("is-hidden");
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

quizForm.addEventListener("change", () => {
  errorText.textContent = "";
  updateProgress();
});

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = selectedAnswers();

  if (answers.length < 5) {
    errorText.textContent = "まだ選んでいない質問があります。5つ全部選んでください。";
    return;
  }

  const bossKey = decideBoss(answers);
  showResult(bosses[bossKey]);
});

resetButton.addEventListener("click", () => {
  quizForm.reset();
  errorText.textContent = "";
  resultCard.classList.add("is-hidden");
  updateProgress();
});

updateProgress();
