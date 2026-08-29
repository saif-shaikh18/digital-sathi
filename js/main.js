/* =========================================================
   DIGITAL SAATHI 2.0 — main.js
   Site-wide logic used on every page:
   - mobile nav toggle
   - language switching (en / hi / mr)
   - font-size accessibility control
   - progress + badges rendering (homepage)
   - Ask Digital Saathi assistant (frontend demo, no API key)
   ========================================================= */

const DS_TOPICS = [
    { id: "smartphone", emoji: "📱" },
    { id: "payments", emoji: "💳" },
    { id: "online-safety", emoji: "🔐" },
    { id: "fake-news", emoji: "📰" },
    { id: "government", emoji: "🏛️" }
];

const DS_BADGES = {
    "smartphone": { en: "Smartphone Beginner", hi: "स्मार्टफोन शुरुआती", mr: "स्मार्टफोन नवशिक्या" },
    "payments": { en: "Digital Payments Learner", hi: "डिजिटल भुगतान शिक्षार्थी", mr: "डिजिटल पेमेंट शिकाऊ" },
    "online-safety": { en: "Online Safety Champion", hi: "ऑनलाइन सुरक्षा चैंपियन", mr: "ऑनलाइन सुरक्षा चॅम्पियन" },
    "fake-news": { en: "Fake News Detective", hi: "फेक न्यूज़ डिटेक्टिव", mr: "फेक न्यूज डिटेक्टिव्ह" },
    "government": { en: "Digital Services Explorer", hi: "डिजिटल सेवा एक्सप्लोरर", mr: "डिजिटल सेवा एक्सप्लोरर" }
};

const DS_TOPIC_LABELS = {
    "smartphone": { en: "Smartphone Basics", hi: "स्मार्टफोन की मूल बातें", mr: "स्मार्टफोन मूलभूत गोष्टी" },
    "payments": { en: "Digital Payments", hi: "डिजिटल भुगतान", mr: "डिजिटल पेमेंट्स" },
    "online-safety": { en: "Online Safety", hi: "ऑनलाइन सुरक्षा", mr: "ऑनलाइन सुरक्षा" },
    "fake-news": { en: "Fake News Awareness", hi: "फेक न्यूज़ जागरूकता", mr: "फेक न्यूज जागरूकता" },
    "government": { en: "Government Services", hi: "सरकारी सेवाएं", mr: "सरकारी सेवा" }
};

const translations = {
    en: {
        nav_home: "Home", nav_learn: "Learn", nav_quizzes: "Quizzes", nav_safety: "Safety", nav_about: "About",
        hero_sub: "Your friendly guide to becoming digitally confident and safe.",
        btn_start: "Start Learning", btn_quiz: "Take a Quiz",
        progress_title: "Your Digital Progress", progress_overall: "Your Digital Safety Score",
        assistant_title: "🤖 Ask Digital Saathi",
        assistant_greeting: "Hi! I'm Digital Saathi. Ask me anything about smartphones, payments, safety, fake news, or government services.",
        assistant_placeholder: "Type your question...", assistant_send: "Send",
        badge_earned: "Earned!", badge_locked: "Not yet earned",
        footer_tagline: "Learn • Practice • Stay Safe",
        nav_dashboard: "Dashboard",
        daily_tip_title: "💡 Digital Tip of the Day",
        dashboard_title: "📊 My Digital Saathi",
        dashboard_overall: "Overall Progress",
        dashboard_lessons: "Lessons Completed", dashboard_quizzes: "Quizzes Completed",
        dashboard_best: "Best Quiz Score", dashboard_scam: "Scam Challenges",
        dashboard_xp: "XP", dashboard_badges: "Badges",
        dashboard_topic_progress: "Topic Progress", dashboard_roadmap: "Learning Roadmap",
        dashboard_your_badges: "🏆 Your Badges",
        cert_eligible_msg: "🎉 You've unlocked your certificate!",
        cert_eligible_link: "View Certificate",
        cert_title: "🎓 Digital Saathi Certificate",
        cert_not_eligible: "Complete all 5 lessons and quizzes with a good average score to unlock your certificate.",
        cert_name_label: "Enter your name for the certificate:",
        cert_generate: "Generate Certificate",
        cert_print: "Print Certificate",
        cert_heading: "Certificate of Completion",
        cert_certifies: "This certifies that",
        cert_completed: "has successfully completed the",
        cert_program: "Digital Saathi Digital Literacy Program",
        cert_pillars: "Digital Literacy • Online Safety • Digital Awareness",
        cert_disclaimer: "This is a self-paced learning certificate from the Digital Saathi platform and is not an official government or accredited educational certification.",
        help_title: "🆘 What Should I Do?",
        help_lead: "Select a situation to see safe next steps.",
        scam_game_title: "🚨 Can You Spot the Scam?",
        scam_game_lead: "Read each scenario and decide what you should do.",
        scam_game_result_title: "Scams Identified",
        fnd_title: "🔎 Fake News Detective",
        fnd_lead: "Read each sample post and select the warning signs you can spot.",
        fnd_check_btn: "Check My Answer",
        fnd_result_prefix: "Warning Signs Found:",
        error_generic: "Something went wrong. Please try again.",
        quiz_result_title: "🎉 Quiz Completed!",
        quiz_back_dashboard: "Back to Dashboard"
    },
    hi: {
        nav_home: "होम", nav_learn: "सीखें", nav_quizzes: "क्विज़", nav_safety: "सुरक्षा", nav_about: "हमारे बारे में",
        hero_sub: "डिजिटल रूप से आत्मविश्वासी और सुरक्षित बनने के लिए आपका मित्र मार्गदर्शक।",
        btn_start: "सीखना शुरू करें", btn_quiz: "क्विज़ लें",
        progress_title: "आपकी डिजिटल प्रगति", progress_overall: "आपका डिजिटल सुरक्षा स्कोर",
        assistant_title: "🤖 डिजिटल साथी से पूछें",
        assistant_greeting: "नमस्ते! मैं डिजिटल साथी हूं। स्मार्टफोन, भुगतान, सुरक्षा, फेक न्यूज़ या सरकारी सेवाओं के बारे में कुछ भी पूछें।",
        assistant_placeholder: "अपना सवाल लिखें...", assistant_send: "भेजें",
        badge_earned: "अर्जित!", badge_locked: "अभी अर्जित नहीं",
        footer_tagline: "सीखें • अभ्यास करें • सुरक्षित रहें",
        nav_dashboard: "डैशबोर्ड",
        daily_tip_title: "💡 आज की डिजिटल सुरक्षा टिप",
        dashboard_title: "📊 मेरा डिजिटल साथी",
        dashboard_overall: "कुल प्रगति",
        dashboard_lessons: "पूरे किए गए पाठ", dashboard_quizzes: "पूरे किए गए क्विज़",
        dashboard_best: "सर्वश्रेष्ठ क्विज़ स्कोर", dashboard_scam: "स्कैम चैलेंज",
        dashboard_xp: "XP", dashboard_badges: "बैज",
        dashboard_topic_progress: "विषय प्रगति", dashboard_roadmap: "सीखने का रोडमैप",
        dashboard_your_badges: "🏆 आपके बैज",
        cert_eligible_msg: "🎉 आपने अपना सर्टिफिकेट अनलॉक कर लिया है!",
        cert_eligible_link: "सर्टिफिकेट देखें",
        cert_title: "🎓 डिजिटल साथी सर्टिफिकेट",
        cert_not_eligible: "अपना सर्टिफिकेट अनलॉक करने के लिए सभी 5 पाठ और क्विज़ अच्छे औसत स्कोर के साथ पूरे करें।",
        cert_name_label: "सर्टिफिकेट के लिए अपना नाम दर्ज करें:",
        cert_generate: "सर्टिफिकेट बनाएं",
        cert_print: "सर्टिफिकेट प्रिंट करें",
        cert_heading: "पूर्णता प्रमाणपत्र",
        cert_certifies: "यह प्रमाणित करता है कि",
        cert_completed: "ने सफलतापूर्वक पूरा किया है",
        cert_program: "डिजिटल साथी डिजिटल साक्षरता कार्यक्रम",
        cert_pillars: "डिजिटल साक्षरता • ऑनलाइन सुरक्षा • डिजिटल जागरूकता",
        cert_disclaimer: "यह डिजिटल साथी प्लेटफ़ॉर्म से एक स्व-गति शिक्षण प्रमाणपत्र है और यह कोई आधिकारिक सरकारी या मान्यता प्राप्त शैक्षिक प्रमाणन नहीं है।",
        help_title: "🆘 मुझे क्या करना चाहिए?",
        help_lead: "सुरक्षित अगले कदम देखने के लिए एक स्थिति चुनें।",
        scam_game_title: "🚨 क्या आप स्कैम पहचान सकते हैं?",
        scam_game_lead: "हर परिदृश्य पढ़ें और तय करें कि आपको क्या करना चाहिए।",
        scam_game_result_title: "पहचाने गए स्कैम",
        fnd_title: "🔎 फेक न्यूज़ डिटेक्टिव",
        fnd_lead: "हर सैंपल पोस्ट पढ़ें और आपको दिखने वाले चेतावनी संकेत चुनें।",
        fnd_check_btn: "मेरा उत्तर जांचें",
        fnd_result_prefix: "पाए गए चेतावनी संकेत:",
        error_generic: "कुछ गलत हो गया। कृपया फिर से कोशिश करें।",
        quiz_result_title: "🎉 क्विज़ पूरा हुआ!",
        quiz_back_dashboard: "डैशबोर्ड पर वापस जाएं"
    },
    mr: {
        nav_home: "मुख्यपृष्ठ", nav_learn: "शिका", nav_quizzes: "क्विझ", nav_safety: "सुरक्षा", nav_about: "आमच्याबद्दल",
        hero_sub: "डिजिटलदृष्ट्या आत्मविश्वासू आणि सुरक्षित होण्यासाठी तुमचा मैत्रीपूर्ण मार्गदर्शक.",
        btn_start: "शिकायला सुरुवात करा", btn_quiz: "क्विझ द्या",
        progress_title: "तुमची डिजिटल प्रगती", progress_overall: "तुमचा डिजिटल सुरक्षा स्कोअर",
        assistant_title: "🤖 डिजिटल साथीला विचारा",
        assistant_greeting: "नमस्कार! मी डिजिटल साथी आहे. स्मार्टफोन, पेमेंट्स, सुरक्षा, फेक न्यूज किंवा सरकारी सेवांबद्दल काहीही विचारा.",
        assistant_placeholder: "तुमचा प्रश्न टाइप करा...", assistant_send: "पाठवा",
        badge_earned: "मिळवले!", badge_locked: "अद्याप मिळवलेले नाही",
        footer_tagline: "शिका • सराव करा • सुरक्षित रहा",
        nav_dashboard: "डॅशबोर्ड",
        daily_tip_title: "💡 आजची डिजिटल सुरक्षा टिप",
        dashboard_title: "📊 माझा डिजिटल साथी",
        dashboard_overall: "एकूण प्रगती",
        dashboard_lessons: "पूर्ण झालेले धडे", dashboard_quizzes: "पूर्ण झालेले क्विझ",
        dashboard_best: "सर्वोत्तम क्विझ स्कोअर", dashboard_scam: "स्कॅम चॅलेंज",
        dashboard_xp: "XP", dashboard_badges: "बॅज",
        dashboard_topic_progress: "विषय प्रगती", dashboard_roadmap: "शिकण्याचा रोडमॅप",
        dashboard_your_badges: "🏆 तुमचे बॅज",
        cert_eligible_msg: "🎉 तुम्ही तुमचे प्रमाणपत्र अनलॉक केले आहे!",
        cert_eligible_link: "प्रमाणपत्र पहा",
        cert_title: "🎓 डिजिटल साथी प्रमाणपत्र",
        cert_not_eligible: "तुमचे प्रमाणपत्र अनलॉक करण्यासाठी सर्व 5 धडे आणि क्विझ चांगल्या सरासरी स्कोअरसह पूर्ण करा.",
        cert_name_label: "प्रमाणपत्रासाठी तुमचे नाव टाका:",
        cert_generate: "प्रमाणपत्र तयार करा",
        cert_print: "प्रमाणपत्र प्रिंट करा",
        cert_heading: "पूर्णत्वाचे प्रमाणपत्र",
        cert_certifies: "हे प्रमाणित करते की",
        cert_completed: "यांनी यशस्वीरित्या पूर्ण केले आहे",
        cert_program: "डिजिटल साथी डिजिटल साक्षरता कार्यक्रम",
        cert_pillars: "डिजिटल साक्षरता • ऑनलाइन सुरक्षा • डिजिटल जागृती",
        cert_disclaimer: "हे डिजिटल साथी प्लॅटफॉर्मवरील स्वयं-गती शिक्षण प्रमाणपत्र आहे आणि ते अधिकृत सरकारी किंवा मान्यताप्राप्त शैक्षणिक प्रमाणपत्र नाही.",
        help_title: "🆘 मी काय करावे?",
        help_lead: "सुरक्षित पुढील पावले पाहण्यासाठी परिस्थिती निवडा.",
        scam_game_title: "🚨 तुम्ही स्कॅम ओळखू शकता का?",
        scam_game_lead: "प्रत्येक परिस्थिती वाचा आणि तुम्ही काय करावे ते ठरवा.",
        scam_game_result_title: "ओळखलेले स्कॅम",
        fnd_title: "🔎 फेक न्यूज डिटेक्टिव्ह",
        fnd_lead: "प्रत्येक नमुना पोस्ट वाचा आणि तुम्हाला दिसणारे इशारा चिन्ह निवडा.",
        fnd_check_btn: "माझे उत्तर तपासा",
        fnd_result_prefix: "सापडलेले इशारा चिन्ह:",
        error_generic: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
        quiz_result_title: "🎉 क्विझ पूर्ण झाला!",
        quiz_back_dashboard: "डॅशबोर्डवर परत जा"
    }
};

/* ---------------- Language ---------------- */
function dsGetLang() {
    return localStorage.getItem('digitalSaathi_lang') || 'en';
}
function dsSetLang(lang) {
    localStorage.setItem('digitalSaathi_lang', lang);
    dsApplyTranslations();
}
function dsT(key) {
    const lang = dsGetLang();
    return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}
function dsApplyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = dsT(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.setAttribute('placeholder', dsT(el.getAttribute('data-i18n-placeholder')));
    });
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = dsGetLang();
}

/* ---------------- Font size control ---------------- */
const FONT_SIZES = ['font-small', 'font-normal', 'font-large', 'font-xlarge'];

function dsApplyFontSize() {
    const saved = localStorage.getItem('digitalSaathi_fontSize') || 'font-normal';
    document.documentElement.classList.remove(...FONT_SIZES);
    document.documentElement.classList.add(saved);
}

function dsChangeFontSize(direction) {
    const current = localStorage.getItem('digitalSaathi_fontSize') || 'font-normal';
    let idx = FONT_SIZES.indexOf(current);
    idx = Math.min(FONT_SIZES.length - 1, Math.max(0, idx + direction));
    localStorage.setItem('digitalSaathi_fontSize', FONT_SIZES[idx]);
    dsApplyFontSize();
}

/* ---------------- Mobile nav ---------------- */
function dsInitNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
        toggle.addEventListener('click', () => links.classList.toggle('open'));
    }
    const fontDec = document.getElementById('fontDec');
    const fontReset = document.getElementById('fontReset');
    const fontInc = document.getElementById('fontInc');
    if (fontDec) fontDec.addEventListener('click', () => dsChangeFontSize(-1));
    if (fontReset) fontReset.addEventListener('click', () => {
        localStorage.setItem('digitalSaathi_fontSize', 'font-normal');
        dsApplyFontSize();
    });
    if (fontInc) fontInc.addEventListener('click', () => dsChangeFontSize(1));

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = dsGetLang();
        langSelect.addEventListener('change', () => dsSetLang(langSelect.value));
    }
}

/* ---------------- Progress + badges (homepage) ---------------- */
function dsRenderProgress() {
    const rowsEl = document.getElementById('progressRows');
    const overallEl = document.getElementById('overallScore');
    const badgesGrid = document.getElementById('badgesGrid');
    if (!rowsEl && !badgesGrid) return;

    const lang = dsGetLang();
    let totalPercent = 0;
    let completedCount = 0;

    if (rowsEl) rowsEl.innerHTML = '';
    if (badgesGrid) badgesGrid.innerHTML = '';

    DS_TOPICS.forEach(topic => {
        const best = localStorage.getItem('digitalSaathi_bestScore_' + topic.id);
        const completed = localStorage.getItem('digitalSaathi_completed_' + topic.id) === 'true';
        const percent = best !== null ? Math.round((parseInt(best, 10) / 10) * 100) : 0;
        totalPercent += percent;
        if (completed) completedCount++;

        if (rowsEl) {
            const row = document.createElement('div');
            row.className = 'progress-row';
            row.innerHTML = `
                <div class="progress-row-label">
                    <span>${topic.emoji} ${DS_TOPIC_LABELS[topic.id][lang]}</span>
                    <span>${percent}%</span>
                </div>
                <div class="progress-bar-outer">
                    <div class="progress-bar-inner" style="width:${percent}%;"></div>
                </div>
            `;
            rowsEl.appendChild(row);
        }

        if (badgesGrid) {
            const badge = document.createElement('div');
            badge.className = 'badge' + (completed ? ' earned' : '');
            badge.innerHTML = `
                <div class="badge-emoji">${topic.emoji}</div>
                <div class="badge-name">${DS_BADGES[topic.id][lang]}</div>
                <div class="badge-status">${completed ? '✅ ' + dsT('badge_earned') : '🔒 ' + dsT('badge_locked')}</div>
            `;
            badgesGrid.appendChild(badge);
        }
    });

    if (overallEl) {
        const overall = Math.round(totalPercent / DS_TOPICS.length);
        overallEl.textContent = overall + '%';
    }
}

/* ---------------- AI Assistant (smart, open-ended) ----------------
   Two layers:
   1. A broad local knowledge base + fuzzy keyword/intent matcher
      (works instantly, fully offline, no key needed) — covers a wide
      range of topics, phrasings, and common typos, and understands
      simple follow-up questions using the last topic discussed.
   2. An optional "real AI" layer: if the person using this site adds
      their own Anthropic API key (tap the ⚙ button next to Send),
      every question is answered by an actual Claude model with full
      natural-language understanding, so nothing is off-limits. If
      that call fails (no key set, offline, bad key), it automatically
      falls back to the local knowledge base below so the assistant
      always replies with something useful. */

const AI_MODEL = "claude-sonnet-5";
const AI_KEY_STORAGE = "digitalSaathi_aiKey";

function dsGetAiKey() {
    return localStorage.getItem(AI_KEY_STORAGE) || "";
}
function dsSetAiKey(key) {
    if (key) localStorage.setItem(AI_KEY_STORAGE, key.trim());
    else localStorage.removeItem(AI_KEY_STORAGE);
}

/* Broad local knowledge base. Each entry has keywords in all three
   site languages (matched regardless of the UI language, since a
   person may type in Hinglish or mix languages), plus a main answer
   and an optional deeper "more" answer used for natural follow-ups
   like "tell me more" / "और बताओ" / "अजून सांगा". Keywords include
   common misspellings/short forms; fuzzy matching (below) also
   tolerates typos that aren't listed explicitly. */
const ASSISTANT_KB = [
    {
        id: "smartphone",
        keywords: {
            en: ["phone", "smartphone", "smart phone", "app", "apps", "application", "mobile", "install",
                 "storage", "update software", "settings", "screen lock", "fingerprint", "restart phone",
                 "phne", "fone", "moble", "aplication"],
            hi: ["स्मार्टफोन", "फोन", "मोबाइल", "ऐप", "सेटिंग्स"],
            mr: ["स्मार्टफोन", "फोन", "मोबाईल", "अ‍ॅप", "सेटिंग्ज"]
        },
        answer: {
            en: "📱 Smartphone Basics:\n1. Install apps only from Google Play Store or Apple App Store.\n2. Set a screen lock (PIN/fingerprint).\n3. Keep your phone software updated.\n4. Back up photos and contacts to the cloud regularly.",
            hi: "📱 स्मार्टफोन की मूल बातें:\n1. केवल Google Play Store या Apple App Store से ऐप्स इंस्टॉल करें।\n2. स्क्रीन लॉक (PIN/फिंगरप्रिंट) सेट करें।\n3. फोन का सॉफ़्टवेयर अपडेट रखें।\n4. फ़ोटो और कॉन्टैक्ट्स को नियमित रूप से क्लाउड पर बैकअप करें।",
            mr: "📱 स्मार्टफोन मूलभूत गोष्टी:\n1. फक्त Google Play Store किंवा Apple App Store वरून अ‍ॅप्स इन्स्टॉल करा.\n2. स्क्रीन लॉक (PIN/फिंगरप्रिंट) सेट करा.\n3. फोनचे सॉफ्टवेअर अपडेट ठेवा.\n4. फोटो आणि संपर्क नियमितपणे क्लाउडवर बॅकअप करा."
        },
        more: {
            en: "A bit more: uninstall apps you no longer use, only grant an app the permissions it truly needs (a torch app doesn't need your contacts), and enable 'Find My Device' so a lost phone can be locked or wiped remotely.",
            hi: "थोड़ा और: जो ऐप्स इस्तेमाल नहीं करते उन्हें अनइंस्टॉल करें, ऐप को सिर्फ ज़रूरी परमिशन दें, और 'Find My Device' चालू रखें ताकि फोन खो जाने पर उसे लॉक या डेटा डिलीट किया जा सके।",
            mr: "अजून थोडं: न वापरलेली अ‍ॅप्स अनइन्स्टॉल करा, अ‍ॅपला फक्त गरजेच्या परवानग्या द्या, आणि 'Find My Device' चालू ठेवा जेणेकरून फोन हरवल्यास तो लॉक किंवा पुसता येईल."
        }
    },
    {
        id: "payments",
        keywords: {
            en: ["upi", "payment", "payments", "pay", "money", "bank", "qr code", "gpay", "google pay",
                 "phonepe", "paytm", "transfer", "send money", "recharge", "wallet", "payement", "monny"],
            hi: ["भुगतान", "पेमेंट", "पैसे", "बैंक", "यूपीआई", "रिचार्ज"],
            mr: ["पेमेंट", "पैसे", "बँक", "यूपीआय", "रिचार्ज"]
        },
        answer: {
            en: "💳 UPI is a way to send money instantly using your phone.\n1. Never share your UPI PIN or OTP with anyone.\n2. You only scan a QR code to SEND money, never to receive it.\n3. Always check the receiver's name before paying.\n4. If a payment fails but money is deducted, it's usually auto-reversed in a few days.",
            hi: "💳 UPI आपके फोन से तुरंत पैसे भेजने का एक तरीका है।\n1. अपना UPI PIN या OTP किसी को न बताएं।\n2. QR कोड केवल पैसे भेजने के लिए स्कैन किया जाता है, प्राप्त करने के लिए नहीं।\n3. भुगतान से पहले हमेशा प्राप्तकर्ता का नाम जांचें।\n4. यदि भुगतान विफल हो जाए पर पैसे कट जाएं, तो यह आमतौर पर कुछ दिनों में वापस आ जाता है।",
            mr: "💳 UPI म्हणजे तुमच्या फोनवरून त्वरित पैसे पाठवण्याची पद्धत.\n1. तुमचा UPI PIN किंवा OTP कोणालाही सांगू नका.\n2. QR कोड फक्त पैसे पाठवण्यासाठी स्कॅन केला जातो, मिळवण्यासाठी नाही.\n3. पैसे देण्यापूर्वी नेहमी प्राप्तकर्त्याचे नाव तपासा.\n4. पेमेंट अयशस्वी झाले पण पैसे कापले गेले, तर ते सहसा काही दिवसांत परत येतात."
        },
        more: {
            en: "Extra tip: apps like GPay, PhonePe and Paytm all use the same UPI system underneath, so it's safe to use whichever your bank supports. Set a UPI PIN only on your own device, and if you ever get a 'collect request' you didn't expect, decline it — approving it sends YOUR money out.",
            hi: "अतिरिक्त टिप: GPay, PhonePe और Paytm जैसे ऐप्स सभी एक ही UPI सिस्टम पर काम करते हैं। UPI PIN केवल अपने डिवाइस पर सेट करें, और अगर कोई अनचाहा 'कलेक्ट रिक्वेस्ट' आए तो उसे स्वीकार न करें — इसे स्वीकार करने से आपका पैसा कट जाता है, आता नहीं।",
            mr: "अतिरिक्त टीप: GPay, PhonePe आणि Paytm हे सर्व एकाच UPI प्रणालीवर चालतात. UPI PIN फक्त तुमच्याच डिव्हाइसवर सेट करा, आणि अनपेक्षित 'कलेक्ट रिक्वेस्ट' आल्यास ती स्वीकारू नका — ती स्वीकारल्याने तुमचे पैसे जातात, येत नाहीत."
        }
    },
    {
        id: "online-safety",
        keywords: {
            en: ["safety", "password", "passwrod", "otp", "hack", "hacked", "secure", "security",
                 "two-step", "two factor", "verification", "pin", "strong password"],
            hi: ["सुरक्षा", "पासवर्ड", "ओटीपी"],
            mr: ["सुरक्षा", "पासवर्ड", "ओटीपी"]
        },
        answer: {
            en: "🔐 To create a strong password: use a unique mix of letters, numbers, and symbols for each account — don't reuse the same password everywhere. Also turn on two-step verification wherever you can, and never share OTPs or passwords, even with someone claiming to be your bank.",
            hi: "🔐 मजबूत पासवर्ड बनाने के लिए: हर अकाउंट के लिए अक्षरों, नंबरों और प्रतीकों का एक अलग मिश्रण उपयोग करें — हर जगह एक ही पासवर्ड न दोहराएं। जहां भी संभव हो टू-स्टेप वेरिफिकेशन चालू करें, और OTP या पासवर्ड कभी किसी के साथ साझा न करें, भले ही वह बैंक होने का दावा करे।",
            mr: "🔐 मजबूत पासवर्ड तयार करण्यासाठी: प्रत्येक खात्यासाठी अक्षरे, संख्या आणि चिन्हांचे वेगळे मिश्रण वापरा — सगळीकडे तोच पासवर्ड वापरू नका. शक्य तिथे टू-स्टेप व्हेरिफिकेशन चालू करा, आणि OTP किंवा पासवर्ड कधीही कोणाशीही शेअर करू नका, बँक असल्याचा दावा करणाऱ्यासोबतही नाही."
        },
        more: {
            en: "More detail: a bank, police officer, or company will NEVER call and ask you for your OTP or full password — that request itself is the scam. Consider a password manager so you don't have to remember dozens of strong passwords yourself.",
            hi: "और जानकारी: कोई भी बैंक, पुलिस या कंपनी कभी फोन करके आपसे OTP या पूरा पासवर्ड नहीं मांगेगी — ऐसा मांगना ही धोखा होने का सबूत है। कई मजबूत पासवर्ड याद रखने के लिए पासवर्ड मैनेजर का उपयोग करें।",
            mr: "अधिक माहिती: कोणताही बँक, पोलीस किंवा कंपनी कधीही फोन करून OTP किंवा संपूर्ण पासवर्ड मागणार नाही — असे मागणे हीच फसवणुकीची खूण आहे. अनेक मजबूत पासवर्ड लक्षात ठेवण्यासाठी पासवर्ड मॅनेजर वापरा."
        }
    },
    {
        id: "fake-news",
        keywords: {
            en: ["news", "fake", "fake news", "misinformation", "forward", "rumor", "rumour", "viral message", "hoax"],
            hi: ["फेक", "समाचार", "अफवाह", "फेक न्यूज़"],
            mr: ["फेक", "बातमी", "अफवा", "फेक न्यूज"]
        },
        answer: {
            en: "📰 If you receive a suspicious message: don't forward it immediately. First check a trusted news source or fact-checking website. Many forwards do NOT mean something is true — misinformation spreads just as fast as real news.",
            hi: "📰 यदि आपको कोई संदिग्ध संदेश मिले: उसे तुरंत आगे न भेजें। पहले किसी भरोसेमंद न्यूज़ स्रोत या फैक्ट-चेकिंग वेबसाइट से जांच लें। बहुत से फॉरवर्ड होने का मतलब सच होना नहीं है — गलत सूचना भी उतनी ही तेजी से फैलती है।",
            mr: "📰 तुम्हाला संशयास्पद संदेश आल्यास: तो लगेच फॉरवर्ड करू नका. आधी विश्वासार्ह बातमी स्रोत किंवा फॅक्ट-चेकिंग वेबसाइटवर तपासा. जास्त फॉरवर्ड होणे म्हणजे खरे असणे असे नाही — चुकीची माहितीही तितक्याच वेगाने पसरते."
        },
        more: {
            en: "Extra check: look for the original source and date, search the claim on Google in your own words, and check if the same story appears on a well-known news website. A blurry screenshot with no source is a red flag.",
            hi: "अतिरिक्त जांच: मूल स्रोत और तारीख देखें, दावे को अपने शब्दों में Google पर खोजें, और देखें कि क्या वही खबर किसी प्रसिद्ध न्यूज़ वेबसाइट पर भी है। बिना स्रोत की धुंधली स्क्रीनशॉट एक चेतावनी संकेत है।",
            mr: "अतिरिक्त तपासणी: मूळ स्रोत आणि तारीख पहा, दावा तुमच्या शब्दांत Google वर शोधा, आणि तीच बातमी एखाद्या प्रसिद्ध बातमी वेबसाइटवर आहे का ते तपासा. स्रोत नसलेला अस्पष्ट स्क्रीनशॉट हा धोक्याचा संकेत आहे."
        }
    },
    {
        id: "government",
        keywords: {
            en: ["government", "govt", "aadhaar", "aadhar", "digilocker", "umang", "mygov", "scheme",
                 "gov.in", "pan card", "ration card"],
            hi: ["सरकार", "आधार", "योजना"],
            mr: ["सरकार", "आधार", "योजना"]
        },
        answer: {
            en: "🏛️ For government services, always use official platforms like DigiLocker, UMANG, or MyGov, or websites ending in .gov.in. Never click SMS links promising instant refunds, and never pay 'agents' extra money for guaranteed scheme approval.",
            hi: "🏛️ सरकारी सेवाओं के लिए हमेशा DigiLocker, UMANG, या MyGov जैसे आधिकारिक प्लेटफॉर्म, या .gov.in पर समाप्त होने वाली वेबसाइटों का उपयोग करें। तुरंत रिफंड का वादा करने वाले SMS लिंक पर कभी क्लिक न करें, और योजना की मंजूरी की गारंटी के लिए 'एजेंटों' को अतिरिक्त पैसे न दें।",
            mr: "🏛️ सरकारी सेवांसाठी नेहमी DigiLocker, UMANG किंवा MyGov सारखे अधिकृत प्लॅटफॉर्म, किंवा .gov.in ने संपणाऱ्या वेबसाइट्स वापरा. त्वरित परताव्याचे आश्वासन देणाऱ्या SMS लिंकवर कधीही क्लिक करू नका, आणि योजना मंजुरीच्या हमीसाठी 'एजंट'ना जास्तीचे पैसे देऊ नका."
        },
        more: {
            en: "DigiLocker lets you store official documents (Aadhaar, PAN, driving licence, marksheets) digitally and share verified copies without printouts. Your Aadhaar number itself is not secret information, but never share the OTP linked to it, and mask it when sharing photocopies.",
            hi: "DigiLocker में आप आधार, पैन, ड्राइविंग लाइसेंस जैसे आधिकारिक दस्तावेज़ डिजिटल रूप से रख सकते हैं और बिना प्रिंटआउट के सत्यापित प्रति साझा कर सकते हैं। आधार नंबर गुप्त नहीं है, लेकिन उससे जुड़ा OTP कभी साझा न करें, और फोटोकॉपी शेयर करते समय उसे मास्क करें।",
            mr: "DigiLocker मध्ये आधार, पॅन, ड्रायव्हिंग लायसन्स असे अधिकृत कागदपत्रे डिजिटली ठेवता येतात आणि प्रिंटशिवाय सत्यापित प्रत शेअर करता येते. आधार क्रमांक गुप्त नाही, पण त्याच्याशी जोडलेला OTP कधीही शेअर करू नका, आणि फोटोकॉपी शेअर करताना तो मास्क करा."
        }
    },
    {
        id: "scam",
        keywords: {
            en: ["scam", "fraud", "cheat", "cheated", "trick", "suspicious", "caller", "lottery", "prize",
                 "scamm", "fraude"],
            hi: ["स्कैम", "धोखा", "फ्रॉड"],
            mr: ["स्कॅम", "फसवणूक", "फ्रॉड"]
        },
        answer: {
            en: "🚨 Scam Awareness: Common scams include fake OTP requests, fake customer care numbers, phishing links, QR-code 'receive money' tricks, fake job offers, and fake government messages. The golden rule: never share your OTP or PIN, verify through official channels, and don't act on urgent pressure to click or pay immediately.",
            hi: "🚨 स्कैम जागरूकता: आम स्कैम में फेक OTP अनुरोध, फेक कस्टमर केयर नंबर, फिशिंग लिंक, QR-कोड 'पैसे प्राप्त करने' की चाल, फेक जॉब ऑफर, और फेक सरकारी संदेश शामिल हैं। सुनहरा नियम: अपना OTP या PIN कभी साझा न करें, आधिकारिक माध्यमों से सत्यापित करें, और तुरंत क्लिक या भुगतान करने के दबाव में न आएं।",
            mr: "🚨 स्कॅम जागृती: सामान्य स्कॅममध्ये फेक OTP विनंत्या, फेक कस्टमर केअर नंबर, फिशिंग लिंक, QR-कोड 'पैसे मिळवण्याची' युक्ती, फेक जॉब ऑफर आणि फेक सरकारी संदेश यांचा समावेश होतो. सुवर्ण नियम: तुमचा OTP किंवा PIN कधीही शेअर करू नका, अधिकृत माध्यमांतून खात्री करा, आणि लगेच क्लिक किंवा पेमेंट करण्याच्या दबावाला बळी पडू नका."
        },
        more: {
            en: "If you already shared an OTP/PIN by mistake or lost money: immediately block your card/UPI through your bank's app or helpline, and file a complaint at cybercrime.gov.in or call 1930 (India's cybercrime helpline). Acting fast in the first hour matters most.",
            hi: "अगर गलती से OTP/PIN साझा हो गया या पैसे कट गए: तुरंत अपने बैंक ऐप या हेल्पलाइन से कार्ड/UPI ब्लॉक करें, और cybercrime.gov.in पर शिकायत दर्ज करें या 1930 (भारत की साइबर क्राइम हेल्पलाइन) पर कॉल करें। पहले घंटे में तेज़ी से कार्रवाई करना सबसे ज़रूरी है।",
            mr: "चुकून OTP/PIN शेअर झाले किंवा पैसे गेले तर: लगेच बँक अ‍ॅप किंवा हेल्पलाइनद्वारे कार्ड/UPI ब्लॉक करा, आणि cybercrime.gov.in वर तक्रार नोंदवा किंवा 1930 (भारताची सायबर क्राइम हेल्पलाइन) वर कॉल करा. पहिल्या तासात लवकर कृती करणे सर्वात महत्त्वाचे आहे."
        }
    },
    {
        id: "internet-basics",
        keywords: {
            en: ["internet", "wifi", "wi-fi", "data plan", "mobile data", "browser", "website", "url", "http", "wify"],
            hi: ["इंटरनेट", "वाईफाई", "डेटा"],
            mr: ["इंटरनेट", "वायफाय", "डेटा"]
        },
        answer: {
            en: "🌐 Look for 'https://' and a padlock icon before entering personal details on a website — it means the connection is encrypted. Avoid logging into banking or email apps on public/free Wi-Fi; use your own mobile data instead for anything sensitive.",
            hi: "🌐 किसी वेबसाइट पर निजी जानकारी डालने से पहले 'https://' और पैडलॉक आइकन देखें — इसका मतलब है कनेक्शन एन्क्रिप्टेड है। सार्वजनिक/मुफ्त वाई-फाई पर बैंकिंग या ईमेल ऐप में लॉगिन करने से बचें; संवेदनशील काम के लिए अपने मोबाइल डेटा का उपयोग करें।",
            mr: "🌐 वेबसाइटवर वैयक्तिक माहिती टाकण्यापूर्वी 'https://' आणि पॅडलॉक चिन्ह पहा — याचा अर्थ कनेक्शन एन्क्रिप्टेड आहे. सार्वजनिक/मोफत वायफायवर बँकिंग किंवा ईमेल अ‍ॅपमध्ये लॉगिन करणे टाळा; संवेदनशील कामासाठी स्वतःचा मोबाइल डेटा वापरा."
        }
    },
    {
        id: "email-basics",
        keywords: {
            en: ["email", "e-mail", "gmail", "inbox", "attachment", "emial"],
            hi: ["ईमेल", "जीमेल"],
            mr: ["ईमेल", "जीमेल"]
        },
        answer: {
            en: "📧 Be cautious with emails that create urgency ('act now!'), have spelling mistakes, or ask you to click a link to 'verify your account'. Hover over links to see the real address before clicking, and never open attachments from unknown senders.",
            hi: "📧 ऐसे ईमेल से सावधान रहें जो जल्दबाज़ी बनाते हैं ('अभी करें!'), जिनमें स्पेलिंग गलतियां हों, या जो 'अकाउंट वेरिफाई करने' के लिए लिंक पर क्लिक करने को कहें। क्लिक करने से पहले लिंक का असली पता देखें, और अनजान भेजने वाले की अटैचमेंट कभी न खोलें।",
            mr: "📧 'लगेच करा!' असा तातडीचा भाव असलेल्या, स्पेलिंग चुका असलेल्या, किंवा 'अकाउंट व्हेरिफाय करा' म्हणणाऱ्या ईमेलपासून सावध रहा. क्लिक करण्यापूर्वी लिंकचा खरा पत्ता तपासा, आणि अनोळखी पाठवणाऱ्याचे अटॅचमेंट कधीही उघडू नका."
        }
    },
    {
        id: "social-media",
        keywords: {
            en: ["social media", "facebook", "instagram", "whatsapp group", "privacy settings", "profile", "insta"],
            hi: ["सोशल मीडिया", "फेसबुक", "व्हाट्सएप"],
            mr: ["सोशल मीडिया", "फेसबुक", "व्हॉट्सअ‍ॅप"]
        },
        answer: {
            en: "📲 On social media: set your profile to private, avoid sharing your live location, and be wary of strangers who message you asking for money or personal details, even if their profile picture looks trustworthy.",
            hi: "📲 सोशल मीडिया पर: अपनी प्रोफ़ाइल को प्राइवेट रखें, अपनी लाइव लोकेशन शेयर करने से बचें, और अजनबियों से सावधान रहें जो पैसे या निजी जानकारी मांगते हैं, भले ही उनकी प्रोफ़ाइल फोटो भरोसेमंद लगे।",
            mr: "📲 सोशल मीडियावर: तुमची प्रोफाइल प्रायव्हेट ठेवा, लाइव्ह लोकेशन शेअर करणे टाळा, आणि पैसे किंवा वैयक्तिक माहिती मागणाऱ्या अनोळखी व्यक्तींपासून सावध रहा, त्यांचा प्रोफाइल फोटो विश्वासार्ह वाटला तरीही."
        }
    },
    {
        id: "video-calls",
        keywords: {
            en: ["video call", "video calling", "zoom", "google meet", "whatsapp call", "camera"],
            hi: ["वीडियो कॉल", "जूम"],
            mr: ["व्हिडिओ कॉल", "झूम"]
        },
        answer: {
            en: "🎥 To make a video call, open WhatsApp, Google Meet, or Zoom, select the contact, and tap the video-camera icon. Only join meeting links from people you know, and never share a meeting link publicly — strangers could join uninvited.",
            hi: "🎥 वीडियो कॉल करने के लिए WhatsApp, Google Meet, या Zoom खोलें, संपर्क चुनें, और वीडियो-कैमरा आइकन दबाएं। केवल जान-पहचान वालों के मीटिंग लिंक पर जाएं, और मीटिंग लिंक को सार्वजनिक रूप से साझा न करें — अजनबी बिना बुलाए शामिल हो सकते हैं।",
            mr: "🎥 व्हिडिओ कॉल करण्यासाठी WhatsApp, Google Meet किंवा Zoom उघडा, संपर्क निवडा, आणि व्हिडिओ-कॅमेरा चिन्हावर टॅप करा. फक्त ओळखीच्या लोकांच्या मीटिंग लिंकवर जा, आणि मीटिंग लिंक सार्वजनिकपणे शेअर करू नका — अनोळखी लोक न बोलावता सामील होऊ शकतात."
        }
    },
    {
        id: "about-app",
        keywords: {
            en: ["what is digital saathi", "about this app", "about this website", "who made", "purpose of this", "who are you", "what are you"],
            hi: ["डिजिटल साथी क्या है", "यह ऐप क्या है", "तुम कौन हो"],
            mr: ["डिजिटल साथी म्हणजे काय", "हे अ‍ॅप काय आहे", "तू कोण आहेस"]
        },
        answer: {
            en: "I'm the Digital Saathi assistant 🤖 — part of a free, self-paced digital literacy platform. It teaches smartphone basics, digital payments, online safety, spotting fake news, and using government services — with short lessons, quizzes, badges, and a completion certificate.",
            hi: "मैं डिजिटल साथी असिस्टेंट हूं 🤖 — एक निःशुल्क, स्व-गति डिजिटल साक्षरता प्लेटफ़ॉर्म का हिस्सा। यह स्मार्टफोन, डिजिटल भुगतान, ऑनलाइन सुरक्षा, फेक न्यूज़ पहचानना और सरकारी सेवाओं का उपयोग सिखाता है — छोटे पाठ, क्विज़, बैज और प्रमाणपत्र के साथ।",
            mr: "मी डिजिटल साथी असिस्टंट आहे 🤖 — मोफत, स्वगती डिजिटल साक्षरता व्यासपीठाचा भाग. हे स्मार्टफोन, डिजिटल पेमेंट्स, ऑनलाइन सुरक्षा, फेक न्यूज ओळखणे आणि सरकारी सेवा वापरणे शिकवते — छोट्या धड्यांसह, क्विझसह, बॅजसह आणि प्रमाणपत्रासह."
        }
    },
    {
        id: "how-to-use",
        keywords: {
            en: ["how to use", "how do i start", "quiz", "dashboard", "badge", "navigate", "where do i", "how to learn"],
            hi: ["कैसे उपयोग करें", "क्विज़ कैसे", "डैशबोर्ड"],
            mr: ["कसे वापरावे", "क्विझ कशी", "डॅशबोर्ड"]
        },
        answer: {
            en: "Start from the Home page and pick a topic to read a short lesson, then take its quiz to test yourself. Your Dashboard tracks your progress and badges automatically — no sign-up needed, it's saved on this device.",
            hi: "होम पेज से शुरू करें और पढ़ने के लिए एक विषय चुनें, फिर खुद को परखने के लिए उसका क्विज़ लें। आपका डैशबोर्ड आपकी प्रगति और बैज अपने आप ट्रैक करता है — साइन-अप की ज़रूरत नहीं, यह इसी डिवाइस पर सेव होता है।",
            mr: "होम पेजपासून सुरुवात करा आणि वाचण्यासाठी एक विषय निवडा, मग स्वतःची परीक्षा घेण्यासाठी त्याची क्विझ द्या. तुमचा डॅशबोर्ड तुमची प्रगती आणि बॅज आपोआप ट्रॅक करतो — साइन-अपची गरज नाही, ते याच डिव्हाइसवर सेव्ह होते."
        }
    },
    {
        id: "certificate",
        keywords: {
            en: ["certificate", "unlock certificate", "complete all"],
            hi: ["सर्टिफिकेट", "प्रमाणपत्र"],
            mr: ["सर्टिफिकेट", "प्रमाणपत्र"]
        },
        answer: {
            en: "🎓 Complete all 5 lessons and their quizzes with a good average score to unlock your Digital Saathi certificate. You can view and print it from the Certificate page once eligible.",
            hi: "🎓 अपना डिजिटल साथी सर्टिफिकेट अनलॉक करने के लिए सभी 5 पाठ और उनके क्विज़ अच्छे औसत स्कोर के साथ पूरे करें। पात्र होने पर आप इसे सर्टिफिकेट पेज से देख और प्रिंट कर सकते हैं।",
            mr: "🎓 तुमचे डिजिटल साथी सर्टिफिकेट अनलॉक करण्यासाठी सर्व 5 धडे आणि त्यांच्या क्विझ चांगल्या सरासरी गुणांसह पूर्ण करा. पात्र झाल्यावर तुम्ही ते सर्टिफिकेट पेजवरून पाहू आणि प्रिंट करू शकता."
        }
    },
    {
        id: "small-talk-howareyou",
        keywords: {
            en: ["how are you", "how r u", "how are u", "hows it going", "how's it going", "kaise ho", "kese ho"],
            hi: ["कैसे हो", "कैसी हो", "कैसे हैं"],
            mr: ["कसा आहेस", "कशी आहेस", "कसे आहात"]
        },
        answer: {
            en: "I'm doing great, thanks for asking! 😊 I'm always ready to help — ask me about smartphones, payments, safety, fake news, government services, or anything else about using this site.",
            hi: "मैं बिल्कुल ठीक हूं, पूछने के लिए धन्यवाद! 😊 मैं हमेशा मदद के लिए तैयार हूं — स्मार्टफोन, भुगतान, सुरक्षा, फेक न्यूज़, सरकारी सेवाओं या इस साइट के बारे में कुछ भी पूछें।",
            mr: "मी अगदी छान आहे, विचारल्याबद्दल धन्यवाद! 😊 मी नेहमी मदतीसाठी तयार आहे — स्मार्टफोन, पेमेंट्स, सुरक्षा, फेक न्यूज, सरकारी सेवा किंवा या साइटबद्दल काहीही विचारा."
        }
    },
    {
        id: "small-talk-name",
        keywords: {
            en: ["your name", "what is your name", "what's your name", "naam kya hai"],
            hi: ["तुम्हारा नाम क्या है", "आपका नाम क्या है"],
            mr: ["तुझं नाव काय आहे", "तुमचं नाव काय"]
        },
        answer: {
            en: "I'm Digital Saathi — your friendly guide for digital skills! 🤖",
            hi: "मैं डिजिटल साथी हूं — आपका मित्र डिजिटल स्किल गाइड! 🤖",
            mr: "मी डिजिटल साथी आहे — तुमचा डिजिटल स्किल मित्र! 🤖"
        }
    },
    {
        id: "small-talk-joke",
        keywords: {
            en: ["joke", "make me laugh", "funny"],
            hi: ["चुटकुला", "मजाक"],
            mr: ["विनोद", "चुटकुला"]
        },
        answer: {
            en: "Why did the smartphone go to therapy? Too many unresolved notifications! 😄 Now, want to learn something useful too?",
            hi: "स्मार्टफोन थेरेपी क्यों गया? क्योंकि उसकी बहुत सारी notifications अनसुलझी थीं! 😄 अब कुछ काम की बात भी सीखनी है क्या?",
            mr: "स्मार्टफोन थेरपीला का गेला? कारण त्याच्या खूप सार्‍या notifications राहिल्या होत्या! 😄 आता काहीतरी उपयोगी शिकायचंय का?"
        }
    },
    {
        id: "small-talk-help",
        keywords: {
            en: ["help", "what can you do", "what do you do", "capabilities"],
            hi: ["मदद करो", "तुम क्या कर सकते हो"],
            mr: ["मदत करा", "तू काय करू शकतोस"]
        },
        answer: {
            en: "I can help with Smartphone Basics, Digital Payments, Online Safety, Fake News Awareness, Government Services, Scam Awareness, and general questions about using this site. Just type your question, or tap one of the quick topics above!",
            hi: "मैं स्मार्टफोन, डिजिटल भुगतान, ऑनलाइन सुरक्षा, फेक न्यूज़ जागरूकता, सरकारी सेवाओं, स्कैम जागरूकता और इस साइट के उपयोग से जुड़े सवालों में मदद कर सकता हूं। बस अपना सवाल टाइप करें, या ऊपर किसी क्विक टॉपिक पर टैप करें!",
            mr: "मी स्मार्टफोन, डिजिटल पेमेंट्स, ऑनलाइन सुरक्षा, फेक न्यूज जागृती, सरकारी सेवा, स्कॅम जागृती आणि या साइटच्या वापराबद्दलच्या प्रश्नांत मदत करू शकतो. फक्त तुमचा प्रश्न टाइप करा, किंवा वरील एखाद्या क्विक टॉपिकवर टॅप करा!"
        }
    }
];

/* Small talk regexes the KB doesn't need keywords for. */
const DS_GREETING_RE = /^\s*(hi|hello|hey|namaste|namaskar)\b|नमस्ते|नमस्कार|हाय\b|हॅलो/i;
const DS_THANKS_RE = /\bthank|shukriya|dhanyavad|धन्यवाद|शुक्रिया|आभारी/i;
const DS_BYE_RE = /\bbye\b|goodbye|see you|अलविदा|बाय/i;
const DS_FOLLOWUP_RE = /^(more|tell me more|why|how|explain more|what else|and\?*)$|अधिक बताओ|और बताओ|अजून सांगा|^और$|^अजून$/i;

/* ---- Fuzzy matching helpers ----
   Tolerates typos ("phne" -> "phone") and partial word matches, so the
   assistant isn't limited to exact keyword spellings. */
function dsLevenshtein(a, b) {
    if (a === b) return 0;
    const al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    let prev = new Array(bl + 1);
    for (let j = 0; j <= bl; j++) prev[j] = j;
    for (let i = 1; i <= al; i++) {
        const curr = [i];
        for (let j = 1; j <= bl; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
        }
        prev = curr;
    }
    return prev[bl];
}

function dsTokenize(text) {
    return text.toLowerCase().match(/[a-zA-Z\u0900-\u097F]+/g) || [];
}

/* Returns true if `keyword` (possibly multi-word) is present in the
   message either as a direct substring, or — for single words of 4+
   letters — as a close typo (allowing a small edit distance that
   scales with word length). */
function dsKeywordMatches(lowerText, tokens, keyword) {
    const kw = keyword.toLowerCase();
    if (lowerText.indexOf(kw) !== -1) return true;
    if (kw.indexOf(' ') !== -1) return false; // multi-word phrases: substring match only
    if (kw.length < 4) return false; // too short to fuzzy-match safely
    const maxDist = kw.length <= 5 ? 1 : 2;
    for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (Math.abs(t.length - kw.length) > maxDist) continue;
        if (dsLevenshtein(t, kw) <= maxDist) return true;
    }
    return false;
}

function dsScoreEntry(lowerText, tokens, entry) {
    let score = 0;
    [].concat(entry.keywords.en, entry.keywords.hi, entry.keywords.mr).forEach(function (w) {
        if (dsKeywordMatches(lowerText, tokens, w)) score++;
    });
    return score;
}

function dsFindBestEntry(text) {
    const lower = text.toLowerCase();
    const tokens = dsTokenize(text);
    let best = null, bestScore = 0;
    ASSISTANT_KB.forEach(function (entry) {
        const s = dsScoreEntry(lower, tokens, entry);
        if (s > bestScore) { bestScore = s; best = entry; }
    });
    return best;
}

function dsFallbackReply(userText, lang, contextEntry) {
    const text = (userText || "").trim();

    if (DS_GREETING_RE.test(text)) {
        return { entry: null, text: {
            en: "Hello! 😊 Ask me about smartphones, payments, online safety, fake news, government services, or anything else about using Digital Saathi.",
            hi: "नमस्ते! 😊 मुझसे स्मार्टफोन, भुगतान, ऑनलाइन सुरक्षा, फेक न्यूज़, सरकारी सेवाओं या डिजिटल साथी के उपयोग के बारे में कुछ भी पूछें।",
            mr: "नमस्कार! 😊 मला स्मार्टफोन, पेमेंट्स, ऑनलाइन सुरक्षा, फेक न्यूज, सरकारी सेवा किंवा डिजिटल साथी वापराबद्दल काहीही विचारा."
        }[lang] };
    }
    if (DS_THANKS_RE.test(text)) {
        return { entry: null, text: {
            en: "You're welcome! Feel free to ask me anything else. 🙂",
            hi: "आपका स्वागत है! बेझिझक और कुछ भी पूछें। 🙂",
            mr: "आपले स्वागत आहे! खुशाल आणखी काही विचारा. 🙂"
        }[lang] };
    }
    if (DS_BYE_RE.test(text)) {
        return { entry: null, text: {
            en: "Goodbye! Stay safe online, and come back anytime you have a question. 👋",
            hi: "अलविदा! ऑनलाइन सुरक्षित रहें, और जब भी सवाल हो वापस आएं। 👋",
            mr: "बाय! ऑनलाइन सुरक्षित रहा, आणि प्रश्न असेल तेव्हा परत या. 👋"
        }[lang] };
    }

    // Follow-up questions ("tell me more", "why", "और बताओ") reuse the last topic.
    if (contextEntry && DS_FOLLOWUP_RE.test(text) && contextEntry.more) {
        return { entry: contextEntry, text: contextEntry.more[lang] || contextEntry.more.en };
    }

    // A real keyword/topic match always wins over vague-text heuristics below,
    // so a short-but-specific word like "UPI" or "OTP" still gets its own answer.
    const best = dsFindBestEntry(text);
    if (best) {
        return { entry: best, text: best.answer[lang] || best.answer.en };
    }

    // Very short vague replies ("ok", "hmm", "?") that matched nothing above
    // continue the last topic by repeating its deeper info, instead of a
    // generic "I don't understand" miss.
    if (contextEntry && contextEntry.more && text.length <= 4) {
        return { entry: contextEntry, text: contextEntry.more[lang] || contextEntry.more.en };
    }

    // Nothing matched: friendly, honest fallback that still points somewhere useful.
    const fallback = {
        en: "I'm not fully sure about that one yet. I can help with Smartphone Basics, Digital Payments, Online Safety, Fake News, Government Services, Scam Awareness, and general questions about using this site. Try rephrasing, or tap ⚙ to enable full AI answers with your own API key.",
        hi: "मुझे इसके बारे में पूरा यकीन नहीं है। मैं स्मार्टफोन, डिजिटल भुगतान, ऑनलाइन सुरक्षा, फेक न्यूज़, सरकारी सेवाओं, स्कैम जागरूकता और इस साइट के उपयोग से जुड़े सवालों में मदद कर सकता हूं। दोबारा पूछें, या अपनी API key से पूर्ण AI जवाब चालू करने के लिए ⚙ दबाएं।",
        mr: "याबद्दल मला पूर्ण खात्री नाही. मी स्मार्टफोन, डिजिटल पेमेंट्स, ऑनलाइन सुरक्षा, फेक न्यूज, सरकारी सेवा, स्कॅम जागृती आणि या साइटच्या वापराबद्दलच्या प्रश्नांत मदत करू शकतो. पुन्हा विचारून पहा, किंवा तुमच्या स्वतःच्या API key ने पूर्ण AI उत्तरे चालू करण्यासाठी ⚙ दाबा."
    };
    return { entry: null, text: fallback[lang] || fallback.en };
}

/* Optional real-AI layer. Uses the person's own Anthropic API key
   (never shipped with this project, entered locally via the ⚙
   button and stored only in this browser's localStorage). Falls
   back to the local knowledge base above on any failure. */
async function dsCallRealAI(history, lang) {
    const key = dsGetAiKey();
    if (!key) return null;

    const langNames = { en: "English", hi: "Hindi (हिंदी)", mr: "Marathi (मराठी)" };
    const system = "You are 'Digital Saathi', a warm, patient digital-literacy assistant for first-time " +
        "internet and smartphone users in India, many of whom are older adults or new learners. " +
        "Answer ANY question the person asks — smartphones, apps, UPI/digital payments, online safety, " +
        "passwords/OTP, spotting fake news and scams, government digital services (DigiLocker, UMANG, " +
        "Aadhaar), and general questions too. Use simple, short sentences and step-by-step lists where " +
        "helpful. Reply in " + (langNames[lang] || "English") + ". Never ask for or store OTPs, PINs, " +
        "passwords, or card numbers, and warn the user if they share any by mistake.";

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": key,
                "anthropic-version": "2023-06-01",
                "anthropic-dangerous-direct-browser-access": "true"
            },
            body: JSON.stringify({
                model: AI_MODEL,
                max_tokens: 700,
                system: system,
                messages: history
            })
        });
        if (!response.ok) return null;
        const data = await response.json();
        const textBlock = (data.content || []).find(function (b) { return b.type === "text"; });
        return textBlock ? textBlock.text : null;
    } catch (err) {
        return null;
    }
}

function dsInitAssistant() {
    const messagesEl = document.getElementById('assistantMessages');
    const inputEl = document.getElementById('assistantInput');
    const sendBtn = document.getElementById('assistantSendBtn');
    if (!messagesEl) return;

    let lastEntry = null;              // for local-KB follow-up questions
    let aiHistory = [];                 // for real-AI multi-turn context

    function addMsg(text, who) {
        const div = document.createElement('div');
        div.className = 'chat-msg ' + who;
        div.textContent = text;
        messagesEl.appendChild(div);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return div;
    }

    addMsg(dsT('assistant_greeting'), 'bot');

    // Small ⚙ button, styled automatically by the existing
    // .assistant-input-row button CSS rule (no markup/CSS changes needed).
    if (sendBtn && sendBtn.parentNode) {
        const gearBtn = document.createElement('button');
        gearBtn.type = 'button';
        gearBtn.id = 'assistantAiToggle';
        gearBtn.title = dsGetAiKey() ? 'AI mode: on' : 'AI mode: off';
        gearBtn.textContent = '⚙';
        gearBtn.addEventListener('click', function () {
            const current = dsGetAiKey();
            const promptText = current
                ? "Full AI mode is ON.\n\nPaste a new Anthropic API key to replace it, or leave blank and press OK to turn AI mode OFF."
                : "Paste your own Anthropic API key to turn on full AI answers (optional).\nLeave blank to keep using the built-in offline assistant.";
            const entered = window.prompt(promptText, "");
            if (entered === null) return; // cancelled
            dsSetAiKey(entered.trim());
            gearBtn.title = dsGetAiKey() ? 'AI mode: on' : 'AI mode: off';
            addMsg(dsGetAiKey()
                ? { en: "✅ Full AI mode is now on — ask me anything.", hi: "✅ अब फुल AI मोड चालू है — मुझसे कुछ भी पूछें।", mr: "✅ आता फुल AI मोड सुरू आहे — मला काहीही विचारा." }[dsGetLang()]
                : { en: "AI mode is off. I'll keep using the built-in offline assistant.", hi: "AI मोड बंद है। मैं बिल्ट-इन ऑफ़लाइन असिस्टेंट का उपयोग करता रहूंगा।", mr: "AI मोड बंद आहे. मी बिल्ट-इन ऑफलाइन असिस्टंट वापरत राहीन." }[dsGetLang()],
                'bot');
        });
        sendBtn.parentNode.insertBefore(gearBtn, sendBtn);
    }

    async function respondTo(text) {
        const lang = dsGetLang();
        aiHistory.push({ role: 'user', content: text });

        if (dsGetAiKey()) {
            const thinkingMsg = addMsg('…', 'bot');
            const aiReply = await dsCallRealAI(aiHistory.slice(-12), lang);
            if (aiReply) {
                thinkingMsg.textContent = aiReply;
                messagesEl.scrollTop = messagesEl.scrollHeight;
                aiHistory.push({ role: 'assistant', content: aiReply });
                return;
            }
            thinkingMsg.remove();
            // fall through to local knowledge base if the AI call failed
        }

        const result = dsFallbackReply(text, lang, lastEntry);
        if (result.entry) lastEntry = result.entry;
        addMsg(result.text, 'bot');
        aiHistory.push({ role: 'assistant', content: result.text });
    }

    document.querySelectorAll('.assistant-quick [data-topic]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            addMsg(btn.textContent, 'user');
            const topicId = btn.getAttribute('data-topic');
            const entry = ASSISTANT_KB.find(function (e) { return e.id === topicId; });
            if (entry) {
                lastEntry = entry;
                addMsg(entry.answer[dsGetLang()] || entry.answer.en, 'bot');
                aiHistory.push({ role: 'user', content: btn.textContent });
                aiHistory.push({ role: 'assistant', content: entry.answer[dsGetLang()] || entry.answer.en });
            } else {
                respondTo(btn.textContent);
            }
        });
    });

    function handleSend() {
        const text = inputEl.value.trim();
        if (!text) return;
        addMsg(text, 'user');
        inputEl.value = '';
        respondTo(text);
    }

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (inputEl) inputEl.addEventListener('keypress', function (e) { if (e.key === 'Enter') handleSend(); });
}

/* ---------------- Daily Tip card (homepage) ---------------- */
function dsRenderDailyTip() {
    const el = document.getElementById('dailyTipText');
    if (!el) return;
    el.textContent = (typeof dsGetDailyTip === 'function') ? dsGetDailyTip(dsGetLang()) : '';
}

/* ---------------- Dashboard page ---------------- */
function dsRenderDashboardPage() {
    const el = document.getElementById('dashOverallPercent');
    if (!el || typeof dsGetDashboardStats !== 'function') return;
    const lang = dsGetLang();
    const stats = dsGetDashboardStats();
    const level = dsGetLevel();

    document.getElementById('dashOverallPercent').textContent = stats.overallProgress + '%';
    document.getElementById('dashOverallBarInner').style.width = stats.overallProgress + '%';
    document.getElementById('dashLessons').textContent = `${stats.lessonsCompleted} / ${stats.totalLessons}`;
    document.getElementById('dashQuizzes').textContent = stats.quizzesCompleted;
    document.getElementById('dashBestScore').textContent = stats.bestQuizPercent + '%';
    document.getElementById('dashScamChallenges').textContent = stats.scamChallenges;
    document.getElementById('dashXP').textContent = stats.xp;
    document.getElementById('dashBadgesCount').textContent = stats.badgesCount;
    document.getElementById('dashLevelName').textContent = `Level ${level.index} — ${level.name[lang]}`;

    const rowsEl = document.getElementById('dashTopicRows');
    if (rowsEl) {
        rowsEl.innerHTML = '';
        stats.topicProgress.forEach(t => {
            const row = document.createElement('div');
            row.className = 'progress-row';
            row.innerHTML = `
                <div class="progress-row-label">
                    <span>${t.emoji} ${DS_TOPIC_LABELS[t.id][lang]}</span>
                    <span>${t.percent}%</span>
                </div>
                <div class="progress-bar-outer">
                    <div class="progress-bar-inner" style="width:${t.percent}%;"></div>
                </div>
            `;
            rowsEl.appendChild(row);
        });
    }

    const badgesGrid = document.getElementById('dashBadgesGrid');
    if (badgesGrid) {
        badgesGrid.innerHTML = '';
        const earned = dsGetEarnedBadges();
        Object.keys(BADGE_DEFS).forEach(id => {
            const def = BADGE_DEFS[id];
            const isEarned = earned.includes(id);
            const badge = document.createElement('div');
            badge.className = 'badge' + (isEarned ? ' earned' : '');
            badge.innerHTML = `
                <div class="badge-emoji">${def.emoji}</div>
                <div class="badge-name">${def[lang]}</div>
                <div class="badge-status">${isEarned ? '✅ ' + dsT('badge_earned') : '🔒 ' + dsT('badge_locked')}</div>
            `;
            badgesGrid.appendChild(badge);
        });
    }

    const roadmapEl = document.getElementById('roadmap');
    if (roadmapEl) {
        roadmapEl.innerHTML = '';
        let currentSet = false;
        DS_TOPICS.forEach(t => {
            const done = dsStorageGet('digitalSaathi_completed_' + t.id, null) === 'true';
            const step = document.createElement('div');
            step.className = 'roadmap-step' + (done ? ' done' : (!currentSet ? ' current' : ''));
            if (!done && !currentSet) currentSet = true;
            step.innerHTML = `<span class="roadmap-icon">${done ? '✅' : t.emoji}</span><span>${DS_TOPIC_LABELS[t.id][lang]}</span>`;
            roadmapEl.appendChild(step);
        });
        const finalStep = document.createElement('div');
        const allDone = DS_TOPICS.every(t => dsStorageGet('digitalSaathi_completed_' + t.id, null) === 'true');
        finalStep.className = 'roadmap-step' + (allDone ? ' done' : '');
        finalStep.innerHTML = `<span class="roadmap-icon">🏆</span><span>Digital Saathi Champion</span>`;
        roadmapEl.appendChild(finalStep);
    }

    const certBanner = document.getElementById('certEligibleBanner');
    if (certBanner) {
        if (typeof dsIsCertificateEligible === 'function' && dsIsCertificateEligible()) {
            certBanner.classList.remove('hidden');
        } else {
            certBanner.classList.add('hidden');
        }
    }
}

/* ---------------- Certificate page ---------------- */
function dsRenderCertificate() {
    const nameInput = document.getElementById('certNameInput');
    const generateBtn = document.getElementById('certGenerateBtn');
    const certBlock = document.getElementById('certificateBlock');
    const notEligibleBlock = document.getElementById('certNotEligible');
    const certNameEl = document.getElementById('certName');
    const certDateEl = document.getElementById('certDate');
    if (!generateBtn) return;

    const eligible = typeof dsIsCertificateEligible === 'function' && dsIsCertificateEligible();
    if (!eligible) {
        if (notEligibleBlock) notEligibleBlock.classList.remove('hidden');
        if (certBlock) certBlock.classList.add('hidden');
        document.getElementById('certForm').classList.add('hidden');
        return;
    }

    const savedName = dsStorageGet('digitalSaathi_certName', '');
    if (savedName && nameInput) nameInput.value = savedName;

    generateBtn.addEventListener('click', () => {
        const name = (nameInput.value || 'Learner').trim() || 'Learner';
        dsStorageSet('digitalSaathi_certName', name);
        certNameEl.textContent = name;
        certDateEl.textContent = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        certBlock.classList.remove('hidden');
    });
}

/* ---------------- "What Should I Do?" help section ---------------- */
function dsRenderHelp() {
    const grid = document.getElementById('helpSituationsGrid');
    if (!grid || typeof HELP_SITUATIONS === 'undefined') return;
    const lang = dsGetLang();
    const detailBox = document.getElementById('helpDetail');

    grid.innerHTML = '';
    Object.keys(HELP_SITUATIONS).forEach(key => {
        const situation = HELP_SITUATIONS[key];
        const btn = document.createElement('button');
        btn.className = 'help-situation-btn';
        btn.textContent = situation[lang].title;
        btn.addEventListener('click', () => {
            detailBox.innerHTML = `<h3>${situation[lang].title}</h3><ul class="tips-list">${situation[lang].steps.map(s => `<li>${s}</li>`).join('')}</ul>`;
            detailBox.classList.remove('hidden');
            detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        grid.appendChild(btn);
    });
}

/* ---------------- Reduced motion support ---------------- */
function dsApplyReducedMotion() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduced-motion');
    }
}

/* ---------------- Init on every page ---------------- */
document.addEventListener('DOMContentLoaded', () => {
    dsApplyFontSize();
    dsApplyReducedMotion();
    dsApplyTranslations();
    dsInitNav();
    dsRenderProgress();
    dsInitAssistant();
    dsRenderDailyTip();
    dsRenderDashboardPage();
    dsRenderCertificate();
    dsRenderHelp();
    if (typeof dsCheckBadges === 'function') dsCheckBadges();
});
