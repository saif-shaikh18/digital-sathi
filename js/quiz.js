/* =========================================================
   DIGITAL SAATHI 2.0 — quiz.js (v3, randomized)
   Each quiz page defines, before loading this file:
     const quizId = "smartphone" | "payments" | "online-safety"
                    | "fake-news" | "government"
     const nextTopicUrl = "relative/path.html" or null
     const nextTopicLabel = "Next topic name" or null
   Question data comes from QUESTION_BANKS[quizId] (question-banks.js).
   Each attempt: picks 10 random questions, shuffles their order,
   and shuffles each question's option order (tracking the correct
   answer through the shuffle).
   ========================================================= */

let current = 0;
let score = 0;
let answered = false;
let userAnswers = [];
let quizSet = []; // the 10 randomized questions for this attempt

const progressText = document.getElementById('progressText');
const progressBarInner = document.getElementById('progressBarInner');
const questionArea = document.getElementById('questionArea');
const nextBtn = document.getElementById('nextBtn');
const resultArea = document.getElementById('resultArea');
const resultScoreEl = document.getElementById('resultScore');
const resultPercentEl = document.getElementById('resultPercent');
const resultCorrectEl = document.getElementById('resultCorrect');
const resultIncorrectEl = document.getElementById('resultIncorrect');
const resultBestEl = document.getElementById('resultBest');
const reviewList = document.getElementById('reviewList');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const nextTopicBtn = document.getElementById('nextTopicBtn');

const storageKey = 'digitalSaathi_bestScore_' + (typeof quizId !== 'undefined' ? quizId : 'quiz');
const QUIZ_LENGTH = 10;

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function buildRandomQuizSet() {
    const bank = (typeof QUESTION_BANKS !== 'undefined' && QUESTION_BANKS[quizId]) ? QUESTION_BANKS[quizId] : [];
    const picked = shuffleArray(bank).slice(0, Math.min(QUIZ_LENGTH, bank.length));
    return picked.map(item => {
        const optionObjs = item.options.map((text, idx) => ({ text, isCorrect: idx === item.correct }));
        const shuffledOptions = shuffleArray(optionObjs);
        const newCorrectIndex = shuffledOptions.findIndex(o => o.isCorrect);
        return {
            q: item.q,
            options: shuffledOptions.map(o => o.text),
            correct: newCorrectIndex,
            explanation: item.explanation
        };
    });
}

function getBestScore() {
    return dsStorageGetNum(storageKey, null);
}

function saveBestScoreIfHigher(newScore) {
    const best = getBestScore();
    if (best === null || newScore > best) {
        dsStorageSet(storageKey, String(newScore));
        return newScore;
    }
    return best;
}

function updateProgressBar() {
    const pct = Math.round((current / quizSet.length) * 100);
    if (progressBarInner) progressBarInner.style.width = pct + '%';
    if (progressText) progressText.textContent = `Question ${current + 1} of ${quizSet.length}`;
}

function renderQuestion() {
    answered = false;
    nextBtn.disabled = true;
    nextBtn.textContent = (current === quizSet.length - 1) ? 'Submit' : 'Next';
    updateProgressBar();

    const item = quizSet[current];
    const card = document.createElement('div');
    card.className = 'question-card';

    const h3 = document.createElement('h3');
    h3.textContent = item.q;
    card.appendChild(h3);

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'options';

    item.options.forEach((optText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = optText;
        btn.addEventListener('click', () => selectAnswer(idx, btn, optionsWrap));
        optionsWrap.appendChild(btn);
    });

    card.appendChild(optionsWrap);

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.id = 'feedback';
    card.appendChild(feedback);

    const explanation = document.createElement('div');
    explanation.className = 'explanation hidden';
    explanation.id = 'explanation';
    card.appendChild(explanation);

    questionArea.innerHTML = '';
    questionArea.appendChild(card);
}

function selectAnswer(idx, btnEl, optionsWrap) {
    if (answered) return;
    answered = true;
    const item = quizSet[current];
    userAnswers[current] = idx;

    const buttons = optionsWrap.querySelectorAll('.option-btn');
    buttons.forEach((b, i) => {
        b.disabled = true;
        if (i === item.correct) b.classList.add('correct');
    });

    const feedback = document.getElementById('feedback');
    if (idx === item.correct) {
        score++;
        feedback.textContent = "✅ Correct!";
    } else {
        btnEl.classList.add('incorrect');
        feedback.textContent = "❌ Not quite — the correct answer is highlighted above.";
    }

    if (item.explanation) {
        const explanation = document.getElementById('explanation');
        explanation.textContent = "💡 " + item.explanation;
        explanation.classList.remove('hidden');
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    current++;
    if (current < quizSet.length) {
        renderQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    if (progressText) progressText.textContent = '';
    if (progressBarInner) progressBarInner.style.width = '100%';
    questionArea.innerHTML = '';
    nextBtn.classList.add('hidden');
    resultArea.classList.remove('hidden');

    const total = quizSet.length;
    const incorrect = total - score;
    const percent = Math.round((score / total) * 100);

    resultScoreEl.textContent = `${score} / ${total}`;
    resultPercentEl.textContent = `${percent}%`;
    if (resultCorrectEl) resultCorrectEl.textContent = `Correct: ${score}`;
    if (resultIncorrectEl) resultIncorrectEl.textContent = `Incorrect: ${incorrect}`;

    const best = saveBestScoreIfHigher(score);
    resultBestEl.textContent = `🏆 Best score: ${best} / ${total}`;

    if (typeof quizId !== 'undefined') {
        dsStorageSet('digitalSaathi_completed_' + quizId, 'true');
        dsAddXP(30);
        if (percent >= 90) dsAddXP(50);
    }

    if (nextTopicBtn) {
        if (typeof nextTopicUrl !== 'undefined' && nextTopicUrl) {
            nextTopicBtn.href = nextTopicUrl;
            nextTopicBtn.textContent = 'Next Topic: ' + (typeof nextTopicLabel !== 'undefined' ? nextTopicLabel : 'Continue');
            nextTopicBtn.classList.remove('hidden');
        } else {
            nextTopicBtn.classList.add('hidden');
        }
    }
}

if (reviewBtn) {
    reviewBtn.addEventListener('click', () => {
        reviewList.classList.toggle('hidden');
        if (reviewList.classList.contains('hidden')) return;
        reviewList.innerHTML = '';
        quizSet.forEach((item, i) => {
            const chosen = userAnswers[i];
            const isRight = chosen === item.correct;
            const div = document.createElement('div');
            div.className = 'review-item ' + (isRight ? 'right' : 'wrong');
            const chosenText = (chosen !== undefined && chosen !== -1) ? item.options[chosen] : '(skipped)';
            div.innerHTML = `<strong>Q${i + 1}: ${item.q}</strong><br>
                Your answer: ${chosenText} ${isRight ? '✅' : '❌'}<br>
                ${!isRight ? 'Correct answer: ' + item.options[item.correct] + '<br>' : ''}
                <em>${item.explanation || ''}</em>`;
            reviewList.appendChild(div);
        });
    });
}

restartBtn.addEventListener('click', () => {
    startNewAttempt();
});

function startNewAttempt() {
    quizSet = buildRandomQuizSet();
    current = 0;
    score = 0;
    userAnswers = [];
    resultArea.classList.add('hidden');
    if (reviewList) { reviewList.classList.add('hidden'); reviewList.innerHTML = ''; }
    nextBtn.classList.remove('hidden');
    renderQuestion();
}

startNewAttempt();
