/* =========================================================
   DIGITAL SAATHI 2.0 — gamification.js
   Safe localStorage wrappers + XP/levels/badges + daily tip
   + "What Should I Do?" data + certificate eligibility.
   Include AFTER main.js on every page that needs these.
   ========================================================= */

/* ---------------- Safe localStorage wrappers ----------------
   Never let a missing/corrupt localStorage value crash the page. */
function dsStorageGet(key, fallback) {
    try {
        const val = localStorage.getItem(key);
        if (val === null) return fallback;
        return val;
    } catch (e) {
        return fallback;
    }
}
function dsStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) { /* storage unavailable — fail silently, feature just won't persist */ }
}
function dsStorageGetNum(key, fallback) {
    const raw = dsStorageGet(key, null);
    const num = parseInt(raw, 10);
    return isNaN(num) ? fallback : num;
}
function dsStorageGetJSON(key, fallback) {
    const raw = dsStorageGet(key, null);
    if (!raw) return fallback;
    try {
        const parsed = JSON.parse(raw);
        return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (e) {
        return fallback;
    }
}
function dsStorageSetJSON(key, obj) {
    try {
        dsStorageSet(key, JSON.stringify(obj));
    } catch (e) { /* ignore */ }
}

/* ---------------- XP + Levels ---------------- */
const XP_KEY = 'digitalSaathi_xp';
const LEVELS = [
    { min: 0, en: "Digital Beginner", hi: "डिजिटल शुरुआती", mr: "डिजिटल नवशिक्या" },
    { min: 100, en: "Digital Learner", hi: "डिजिटल शिक्षार्थी", mr: "डिजिटल शिकाऊ" },
    { min: 250, en: "Digital Explorer", hi: "डिजिटल एक्सप्लोरर", mr: "डिजिटल एक्सप्लोरर" },
    { min: 450, en: "Digital Smart User", hi: "डिजिटल स्मार्ट यूजर", mr: "डिजिटल स्मार्ट युजर" },
    { min: 700, en: "Digital Safety Champion", hi: "डिजिटल सुरक्षा चैंपियन", mr: "डिजिटल सुरक्षा चॅम्पियन" }
];

function dsGetXP() {
    return dsStorageGetNum(XP_KEY, 0);
}
function dsAddXP(amount) {
    const current = dsGetXP();
    const updated = Math.max(0, current + amount);
    dsStorageSet(XP_KEY, String(updated));
    dsCheckBadges();
    return updated;
}
function dsGetLevel() {
    const xp = dsGetXP();
    let level = LEVELS[0];
    let levelIndex = 0;
    LEVELS.forEach((l, i) => {
        if (xp >= l.min) { level = l; levelIndex = i; }
    });
    const next = LEVELS[levelIndex + 1] || null;
    return { index: levelIndex + 1, name: level, next, xp };
}

/* ---------------- Badges ---------------- */
const BADGE_DEFS = {
    first_lesson: { emoji: "🏅", en: "First Lesson", hi: "पहला पाठ", mr: "पहिला धडा" },
    quiz_master: { emoji: "🧠", en: "Quiz Master", hi: "क्विज़ मास्टर", mr: "क्विझ मास्टर" },
    safety_champion: { emoji: "🛡️", en: "Safety Champion", hi: "सुरक्षा चैंपियन", mr: "सुरक्षा चॅम्पियन" },
    payment_pro: { emoji: "💳", en: "Payment Pro", hi: "पेमेंट प्रो", mr: "पेमेंट प्रो" },
    fake_news_detective: { emoji: "📰", en: "Fake News Detective", hi: "फेक न्यूज़ डिटेक्टिव", mr: "फेक न्यूज डिटेक्टिव्ह" },
    saathi_champion: { emoji: "🏆", en: "Digital Saathi Champion", hi: "डिजिटल साथी चैंपियन", mr: "डिजिटल साथी चॅम्पियन" }
};

function dsGetEarnedBadges() {
    return dsStorageGetJSON('digitalSaathi_badges', []);
}
function dsAwardBadge(id) {
    const earned = dsGetEarnedBadges();
    if (!earned.includes(id)) {
        earned.push(id);
        dsStorageSetJSON('digitalSaathi_badges', earned);
    }
}
function dsCheckBadges() {
    const completedLessons = DS_TOPICS.filter(t => dsStorageGet('digitalSaathi_lesson_' + t.id, null) === 'true').length;
    const completedQuizzes = DS_TOPICS.filter(t => dsStorageGet('digitalSaathi_completed_' + t.id, null) === 'true').length;

    if (completedLessons >= 1) dsAwardBadge('first_lesson');

    let has90 = false;
    DS_TOPICS.forEach(t => {
        const best = dsStorageGetNum('digitalSaathi_bestScore_' + t.id, null);
        if (best !== null && best >= 9) has90 = true;
    });
    if (has90) dsAwardBadge('quiz_master');

    const safetyBest = dsStorageGetNum('digitalSaathi_bestScore_online-safety', null);
    if (safetyBest !== null && safetyBest >= 8) dsAwardBadge('safety_champion');

    const paymentsBest = dsStorageGetNum('digitalSaathi_bestScore_payments', null);
    if (paymentsBest !== null && paymentsBest >= 8) dsAwardBadge('payment_pro');

    const fakeNewsBest = dsStorageGetNum('digitalSaathi_bestScore_fake-news', null);
    if (fakeNewsBest !== null && fakeNewsBest >= 8) dsAwardBadge('fake_news_detective');

    if (completedQuizzes >= DS_TOPICS.length) dsAwardBadge('saathi_champion');
}

/* ---------------- Lesson / Quiz / Scam-challenge tracking ---------------- */
function dsMarkLessonComplete(topicId) {
    dsStorageSet('digitalSaathi_lesson_' + topicId, 'true');
    dsAddXP(20);
}
function dsIsLessonComplete(topicId) {
    return dsStorageGet('digitalSaathi_lesson_' + topicId, null) === 'true';
}
function dsRecordScamChallenge(scoreCount) {
    const total = dsStorageGetNum('digitalSaathi_scamChallenges', 0);
    dsStorageSet('digitalSaathi_scamChallenges', String(total + 1));
    dsAddXP(20);
}
function dsGetScamChallengeCount() {
    return dsStorageGetNum('digitalSaathi_scamChallenges', 0);
}

/* ---------------- Dashboard stats aggregation ---------------- */
function dsGetDashboardStats() {
    let lessonsCompleted = 0;
    let quizzesCompleted = 0;
    let bestPercentSum = 0;
    let bestPercentCount = 0;
    let overallBestPercent = 0;

    const topicProgress = DS_TOPICS.map(topic => {
        const lessonDone = dsIsLessonComplete(topic.id);
        if (lessonDone) lessonsCompleted++;
        const quizDone = dsStorageGet('digitalSaathi_completed_' + topic.id, null) === 'true';
        if (quizDone) quizzesCompleted++;
        const best = dsStorageGetNum('digitalSaathi_bestScore_' + topic.id, null);
        const percent = best !== null ? Math.round((best / 10) * 100) : 0;
        if (best !== null) {
            bestPercentSum += percent;
            bestPercentCount++;
            if (percent > overallBestPercent) overallBestPercent = percent;
        }
        // topic completion = average of lesson-done + quiz percent
        const topicPercent = Math.round(((lessonDone ? 50 : 0) + (percent / 2)));
        return { id: topic.id, emoji: topic.emoji, percent: topicPercent };
    });

    const overallProgress = Math.round(
        topicProgress.reduce((sum, t) => sum + t.percent, 0) / DS_TOPICS.length
    );

    return {
        overallProgress,
        lessonsCompleted,
        totalLessons: DS_TOPICS.length,
        quizzesCompleted,
        bestQuizPercent: bestPercentCount > 0 ? Math.round(bestPercentSum / bestPercentCount) : 0,
        scamChallenges: dsGetScamChallengeCount(),
        xp: dsGetXP(),
        badgesCount: dsGetEarnedBadges().length,
        topicProgress
    };
}

/* ---------------- Certificate eligibility ---------------- */
function dsIsCertificateEligible() {
    const allLessonsDone = DS_TOPICS.every(t => dsIsLessonComplete(t.id));
    const allQuizzesDone = DS_TOPICS.every(t => dsStorageGet('digitalSaathi_completed_' + t.id, null) === 'true');
    let avgOk = true;
    let count = 0, sum = 0;
    DS_TOPICS.forEach(t => {
        const best = dsStorageGetNum('digitalSaathi_bestScore_' + t.id, null);
        if (best !== null) { sum += best; count++; }
    });
    const avgScore = count > 0 ? sum / count : 0;
    avgOk = avgScore >= 6; // 60% average across attempted quizzes
    return allLessonsDone && allQuizzesDone && avgOk;
}

/* ---------------- Daily Tip ---------------- */
const DAILY_TIPS = {
    en: [
        "Never share your OTP with anyone, even someone claiming to be your bank.",
        "Never share your UPI PIN — it's only needed to send money, not receive it.",
        "Always verify links before clicking, especially in urgent-sounding messages.",
        "Use a strong, unique password for each of your important accounts.",
        "Enable two-step verification wherever it's available.",
        "Check the source before sharing news or messages that seem surprising.",
        "Download apps only from trusted sources like Google Play or the App Store.",
        "Government refunds are never claimed by clicking a random SMS link.",
        "A screen lock protects your phone's data if it's ever lost or stolen.",
        "Back up your important photos and contacts to the cloud regularly."
    ],
    hi: [
        "अपना OTP किसी के साथ साझा न करें, भले ही वह बैंक होने का दावा करे।",
        "अपना UPI PIN साझा न करें — यह केवल पैसे भेजने के लिए है, प्राप्त करने के लिए नहीं।",
        "क्लिक करने से पहले हमेशा लिंक की जांच करें, खासकर तत्काल जैसे संदेशों में।",
        "अपने हर महत्वपूर्ण अकाउंट के लिए एक मजबूत, अलग पासवर्ड उपयोग करें।",
        "जहां भी उपलब्ध हो, टू-स्टेप वेरिफिकेशन चालू करें।",
        "चौंकाने वाली खबर या संदेश साझा करने से पहले स्रोत की जांच करें।",
        "ऐप्स केवल Google Play या App Store जैसे भरोसेमंद स्रोतों से डाउनलोड करें।",
        "सरकारी रिफंड कभी भी किसी SMS लिंक पर क्लिक करने से नहीं मिलता।",
        "स्क्रीन लॉक आपके फोन के खो जाने या चोरी हो जाने पर डेटा की रक्षा करता है।",
        "अपनी महत्वपूर्ण फ़ोटो और कॉन्टैक्ट्स को नियमित रूप से क्लाउड पर बैकअप करें।"
    ],
    mr: [
        "तुमचा OTP कोणाशीही शेअर करू नका, बँक असल्याचा दावा करणाऱ्यासोबतही नाही.",
        "तुमचा UPI PIN शेअर करू नका — तो फक्त पैसे पाठवण्यासाठी आहे, मिळवण्यासाठी नाही.",
        "क्लिक करण्यापूर्वी नेहमी लिंक तपासा, विशेषतः तातडीच्या संदेशांमध्ये.",
        "तुमच्या प्रत्येक महत्त्वाच्या खात्यासाठी मजबूत, वेगळा पासवर्ड वापरा.",
        "शक्य तिथे टू-स्टेप व्हेरिफिकेशन चालू करा.",
        "आश्चर्यकारक वाटणारी बातमी किंवा संदेश शेअर करण्यापूर्वी स्रोत तपासा.",
        "अ‍ॅप्स फक्त Google Play किंवा App Store सारख्या विश्वासार्ह स्रोतांवरूनच डाउनलोड करा.",
        "सरकारी परतावा कधीही यादृच्छिक SMS लिंकवर क्लिक करून मिळत नाही.",
        "स्क्रीन लॉक तुमचा फोन हरवला किंवा चोरीला गेला तर डेटाचे संरक्षण करतो.",
        "तुमचे महत्त्वाचे फोटो आणि संपर्क नियमितपणे क्लाउडवर बॅकअप करा."
    ]
};

function dsGetDailyTip(lang) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const tips = DAILY_TIPS[lang] || DAILY_TIPS.en;
    return tips[dayOfYear % tips.length];
}

/* ---------------- "What Should I Do?" data ---------------- */
const HELP_SITUATIONS = {
    clicked_link: {
        en: { title: "I clicked a suspicious link", steps: [
            "Don't enter any personal details or passwords on the page it opened.",
            "Close the browser tab or app immediately.",
            "Run a security/antivirus scan on your device if available.",
            "Change passwords for important accounts, especially if you entered any details.",
            "Watch your bank statements closely for a few days."
        ]},
        hi: { title: "मैंने एक संदिग्ध लिंक पर क्लिक किया", steps: [
            "खुले हुए पेज पर कोई व्यक्तिगत जानकारी या पासवर्ड न डालें।",
            "ब्राउज़र टैब या ऐप को तुरंत बंद करें।",
            "यदि उपलब्ध हो तो अपने डिवाइस पर सुरक्षा/एंटीवायरस स्कैन चलाएं।",
            "महत्वपूर्ण अकाउंट्स के पासवर्ड बदलें, खासकर यदि आपने कोई जानकारी दर्ज की हो।",
            "कुछ दिनों तक अपने बैंक स्टेटमेंट पर बारीकी से नज़र रखें।"
        ]},
        mr: { title: "मी एका संशयास्पद लिंकवर क्लिक केले", steps: [
            "उघडलेल्या पानावर कोणतीही वैयक्तिक माहिती किंवा पासवर्ड टाकू नका.",
            "ब्राउझर टॅब किंवा अ‍ॅप लगेच बंद करा.",
            "शक्य असल्यास तुमच्या डिव्हाइसवर सुरक्षा/अँटीव्हायरस स्कॅन चालवा.",
            "महत्त्वाच्या खात्यांचे पासवर्ड बदला, विशेषतः जर तुम्ही काही माहिती टाकली असेल.",
            "काही दिवस तुमच्या बँक स्टेटमेंटवर बारकाईने लक्ष ठेवा."
        ]}
    },
    account_access: {
        en: { title: "I think someone has access to my account", steps: [
            "Change your password immediately from a trusted device.",
            "Log out of all active sessions/devices from the account's security settings.",
            "Turn on two-step verification if it isn't already on.",
            "Check for any changes you didn't make (email, phone number, linked accounts).",
            "Contact the platform's official support if you can't regain access."
        ]},
        hi: { title: "मुझे लगता है कि किसी और के पास मेरे अकाउंट का एक्सेस है", steps: [
            "किसी भरोसेमंद डिवाइस से तुरंत अपना पासवर्ड बदलें।",
            "अकाउंट की सुरक्षा सेटिंग्स से सभी सक्रिय सेशन/डिवाइस से लॉग आउट करें।",
            "यदि पहले से चालू नहीं है तो टू-स्टेप वेरिफिकेशन चालू करें।",
            "जांचें कि क्या कोई ऐसा बदलाव हुआ है जो आपने नहीं किया (ईमेल, फोन नंबर, लिंक किए गए अकाउंट)।",
            "यदि आप एक्सेस वापस नहीं पा सकते तो प्लेटफ़ॉर्म के आधिकारिक सपोर्ट से संपर्क करें।"
        ]},
        mr: { title: "मला वाटते कोणाकडे तरी माझ्या खात्याचा अ‍ॅक्सेस आहे", steps: [
            "विश्वासार्ह डिव्हाइसवरून तुमचा पासवर्ड लगेच बदला.",
            "खात्याच्या सुरक्षा सेटिंग्जमधून सर्व सक्रिय सेशन/डिव्हाइसमधून लॉग आउट करा.",
            "आधीच चालू नसेल तर टू-स्टेप व्हेरिफिकेशन चालू करा.",
            "तुम्ही न केलेला कोणताही बदल तपासा (ईमेल, फोन नंबर, लिंक केलेली खाती).",
            "अ‍ॅक्सेस परत मिळत नसेल तर प्लॅटफॉर्मच्या अधिकृत सपोर्टशी संपर्क साधा."
        ]}
    },
    wrong_transfer: {
        en: { title: "I sent money to the wrong person", steps: [
            "Do not panic — act quickly but calmly.",
            "Immediately report the transaction to your bank or payment app's official support.",
            "Note the transaction ID, date, time, and amount for reference.",
            "Do NOT try to 'fix it' by sending more money or sharing your PIN with anyone.",
            "Follow up with your bank on the recovery process if applicable."
        ]},
        hi: { title: "मैंने गलत व्यक्ति को पैसे भेज दिए", steps: [
            "घबराएं नहीं — जल्दी लेकिन शांति से कार्य करें।",
            "तुरंत अपने बैंक या भुगतान ऐप के आधिकारिक सपोर्ट को लेन-देन की सूचना दें।",
            "संदर्भ के लिए लेन-देन आईडी, तारीख, समय और राशि नोट करें।",
            "अधिक पैसे भेजकर या किसी के साथ अपना PIN साझा करके 'ठीक करने' की कोशिश न करें।",
            "यदि लागू हो तो रिकवरी प्रक्रिया पर अपने बैंक से फॉलो-अप करें।"
        ]},
        mr: { title: "मी चुकीच्या व्यक्तीला पैसे पाठवले", steps: [
            "घाबरू नका — त्वरित पण शांतपणे कृती करा.",
            "व्यवहाराची त्वरित तुमच्या बँकेला किंवा पेमेंट अ‍ॅपच्या अधिकृत सपोर्टला माहिती द्या.",
            "संदर्भासाठी व्यवहार आयडी, तारीख, वेळ आणि रक्कम नोंदवा.",
            "आणखी पैसे पाठवून किंवा कोणाशीही तुमचा PIN शेअर करून 'दुरुस्त' करण्याचा प्रयत्न करू नका.",
            "लागू असल्यास रिकव्हरी प्रक्रियेबाबत तुमच्या बँकेकडे पाठपुरावा करा."
        ]}
    },
    suspicious_otp: {
        en: { title: "I received a suspicious OTP message", steps: [
            "Do not share this OTP with anyone, even if they call claiming to be your bank.",
            "If you didn't request this OTP, it may mean someone is trying to access your account.",
            "Check if any of your accounts show unexpected login attempts.",
            "Consider changing your password as a precaution.",
            "Contact your bank/platform's official support if you're concerned."
        ]},
        hi: { title: "मुझे एक संदिग्ध OTP संदेश मिला", steps: [
            "यह OTP किसी के साथ साझा न करें, भले ही वे बैंक होने का दावा करके कॉल करें।",
            "यदि आपने यह OTP नहीं मांगा था, तो हो सकता है कि कोई आपके अकाउंट तक पहुंचने की कोशिश कर रहा हो।",
            "जांचें कि क्या आपके किसी अकाउंट में अप्रत्याशित लॉगिन प्रयास दिख रहे हैं।",
            "सावधानी के तौर पर अपना पासवर्ड बदलने पर विचार करें।",
            "यदि आपको चिंता हो तो अपने बैंक/प्लेटफ़ॉर्म के आधिकारिक सपोर्ट से संपर्क करें।"
        ]},
        mr: { title: "मला एक संशयास्पद OTP संदेश आला", steps: [
            "हा OTP कोणाशीही शेअर करू नका, बँक असल्याचा दावा करून कॉल केला तरीही नाही.",
            "जर तुम्ही हा OTP मागितला नसेल, तर याचा अर्थ कोणीतरी तुमच्या खात्यात प्रवेश करण्याचा प्रयत्न करत असेल.",
            "तुमच्या कोणत्याही खात्यात अनपेक्षित लॉगिन प्रयत्न दिसतात का ते तपासा.",
            "खबरदारी म्हणून तुमचा पासवर्ड बदलण्याचा विचार करा.",
            "काळजी वाटत असल्यास तुमच्या बँक/प्लॅटफॉर्मच्या अधिकृत सपोर्टशी संपर्क साधा."
        ]}
    },
    fake_message: {
        en: { title: "I think a message is fake", steps: [
            "Don't forward it until you've verified it.",
            "Check a trusted news source or official fact-checking website.",
            "Look for warning signs: no source, urgent language, spelling errors, requests to forward.",
            "If you already shared it, let the people you sent it to know it may be false.",
            "Consider reporting it on the platform if it's clearly misleading."
        ]},
        hi: { title: "मुझे लगता है कि एक संदेश नकली है", steps: [
            "इसे सत्यापित करने तक आगे न भेजें।",
            "किसी भरोसेमंद न्यूज़ स्रोत या आधिकारिक फैक्ट-चेकिंग वेबसाइट की जांच करें।",
            "चेतावनी के संकेत देखें: कोई स्रोत नहीं, तत्काल भाषा, वर्तनी की गलतियां, आगे भेजने का अनुरोध।",
            "यदि आपने इसे पहले ही साझा कर दिया है, तो जिन लोगों को भेजा है उन्हें बताएं कि यह गलत हो सकता है।",
            "यदि यह स्पष्ट रूप से भ्रामक है तो इसे प्लेटफ़ॉर्म पर रिपोर्ट करने पर विचार करें।"
        ]},
        mr: { title: "मला वाटते एक संदेश खोटा आहे", steps: [
            "खात्री होईपर्यंत तो पुढे पाठवू नका.",
            "विश्वासार्ह बातमी स्रोत किंवा अधिकृत फॅक्ट-चेकिंग वेबसाइट तपासा.",
            "इशारे शोधा: कोणताही स्रोत नाही, तातडीची भाषा, स्पेलिंग चुका, पुढे पाठवण्याची विनंती.",
            "जर तुम्ही तो आधीच शेअर केला असेल, तर ज्यांना पाठवला त्यांना तो खोटा असू शकतो हे कळवा.",
            "स्पष्टपणे दिशाभूल करणारा असल्यास प्लॅटफॉर्मवर रिपोर्ट करण्याचा विचार करा."
        ]}
    },
    suspicious_website: {
        en: { title: "I found a suspicious website", steps: [
            "Don't enter any personal, financial, or login details on the site.",
            "Check the URL carefully for misspellings or an unusual domain.",
            "Look for 'https' and a padlock icon, though this alone doesn't guarantee safety.",
            "Close the site and avoid clicking anything else on it.",
            "If it impersonates a real company or bank, consider reporting it to that organization."
        ]},
        hi: { title: "मुझे एक संदिग्ध वेबसाइट मिली", steps: [
            "साइट पर कोई व्यक्तिगत, वित्तीय, या लॉगिन जानकारी न डालें।",
            "गलत वर्तनी या असामान्य डोमेन के लिए URL को ध्यान से जांचें।",
            "'https' और पैडलॉक आइकन देखें, हालांकि यह अकेले सुरक्षा की गारंटी नहीं देता।",
            "साइट बंद करें और उस पर कुछ और क्लिक करने से बचें।",
            "यदि यह किसी वास्तविक कंपनी या बैंक का रूप धारण करती है, तो उस संगठन को रिपोर्ट करने पर विचार करें।"
        ]},
        mr: { title: "मला एक संशयास्पद वेबसाइट सापडली", steps: [
            "साइटवर कोणतीही वैयक्तिक, आर्थिक किंवा लॉगिन माहिती टाकू नका.",
            "चुकीचे स्पेलिंग किंवा असामान्य डोमेनसाठी URL काळजीपूर्वक तपासा.",
            "'https' आणि पॅडलॉक आयकॉन शोधा, जरी हे एकटे सुरक्षिततेची हमी देत नाही.",
            "साइट बंद करा आणि त्यावर आणखी काही क्लिक करणे टाळा.",
            "जर ती खऱ्या कंपनी किंवा बँकेची नक्कल करत असेल, तर त्या संस्थेला रिपोर्ट करण्याचा विचार करा."
        ]}
    }
};
