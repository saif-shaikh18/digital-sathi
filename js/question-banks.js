/* =========================================================
   DIGITAL SAATHI 2.0 — question-banks.js
   20 questions per topic. quiz.js randomly selects 10 per
   attempt, shuffles order, and shuffles each question's
   option order while tracking the correct answer.
   ========================================================= */

const QUESTION_BANKS = {
    "smartphone": [
        {
            "q": "What should you check before installing a new app on your smartphone?",
            "options": [
                "That it's from a trusted source like Google Play or the App Store",
                "That it has a colorful icon",
                "That your friend also has it",
                "Nothing, just install any app"
            ],
            "correct": 0,
            "explanation": "Apps from unofficial sources can contain malware. Trusted app stores review apps before publishing them.",
            "type": "basic"
        },
        {
            "q": "What does turning on 'Airplane Mode' do?",
            "options": [
                "Makes your phone fly-mode faster",
                "Turns off calls, texts, and internet connectivity",
                "Deletes all your apps",
                "Charges your phone faster"
            ],
            "correct": 1,
            "explanation": "Airplane Mode disables wireless signals, required during flights and useful for saving battery.",
            "type": "basic"
        },
        {
            "q": "Why is it important to update your phone's software regularly?",
            "options": [
                "It makes the phone heavier",
                "It deletes your photos automatically",
                "It fixes security bugs and improves performance",
                "It is not important at all"
            ],
            "correct": 2,
            "explanation": "Updates patch security holes and often improve speed and battery life.",
            "type": "safety"
        },
        {
            "q": "What is the main purpose of setting a screen lock (PIN, pattern, or fingerprint)?",
            "options": [
                "To make the phone look nicer",
                "To prevent others from accessing your phone if it's lost or stolen",
                "To save battery",
                "To increase storage space"
            ],
            "correct": 1,
            "explanation": "A screen lock protects your personal data if your phone ends up in someone else's hands.",
            "type": "safety"
        },
        {
            "q": "What should you do with apps you no longer use?",
            "options": [
                "Keep them forever just in case",
                "Uninstall them to save space and reduce security risk",
                "Share them with strangers",
                "Turn off the phone"
            ],
            "correct": 1,
            "explanation": "Unused apps take up storage and may have outdated security.",
            "type": "practical"
        },
        {
            "q": "What does 'internal storage' on your phone mainly hold?",
            "options": [
                "Only contacts",
                "Your apps, photos, and files",
                "Only the phone's battery level",
                "Nothing, it's just for show"
            ],
            "correct": 1,
            "explanation": "Internal storage holds all your installed apps, photos, videos, and documents.",
            "type": "basic"
        },
        {
            "q": "Why should you avoid using unknown public Wi-Fi for sensitive tasks like banking?",
            "options": [
                "Public Wi-Fi is always faster",
                "Unsecured networks can expose your data to others",
                "It uses too much battery",
                "There is no real reason to avoid it"
            ],
            "correct": 1,
            "explanation": "Open Wi-Fi networks are often unencrypted, so others on the network could see your data.",
            "type": "safety"
        },
        {
            "q": "What is the best way to protect your important photos and contacts from being lost?",
            "options": [
                "Never take photos",
                "Back them up regularly using cloud storage or a memory card",
                "Keep only one copy on the phone",
                "Share them publicly online"
            ],
            "correct": 1,
            "explanation": "Regular backups protect your memories and contacts if your phone is lost or damaged.",
            "type": "practical"
        },
        {
            "q": "What is the purpose of 'Do Not Disturb' mode on a smartphone?",
            "options": [
                "It permanently deletes notifications",
                "It temporarily silences calls and notifications",
                "It turns off the phone completely",
                "It uninstalls all apps"
            ],
            "correct": 1,
            "explanation": "Do Not Disturb mode mutes interruptions temporarily without switching the phone off.",
            "type": "basic"
        },
        {
            "q": "Which of these is a good habit for keeping your phone battery healthy?",
            "options": [
                "Always let the battery drop to 0% before charging",
                "Use the phone's official charger and avoid extreme heat",
                "Charge it in direct sunlight for faster charging",
                "Leave it charging with a damaged cable"
            ],
            "correct": 1,
            "explanation": "Using the proper charger and avoiding extreme temperatures helps the battery last longer.",
            "type": "practical"
        },
        {
            "q": "What is a good reason to restart your phone occasionally?",
            "options": [
                "It clears temporary glitches and frees up memory",
                "It permanently deletes all your apps",
                "It changes your phone number",
                "It has no real benefit"
            ],
            "correct": 0,
            "explanation": "Restarting clears temporary files and can fix minor slowdowns or glitches.",
            "type": "practical"
        },
        {
            "q": "What's a safe way to free up storage space on your phone?",
            "options": [
                "Delete your operating system",
                "Delete unused photos/apps or move files to the cloud",
                "Turn off the phone permanently",
                "Buy a new phone every month"
            ],
            "correct": 1,
            "explanation": "Removing unused files and apps, or backing them up to the cloud, frees up space safely.",
            "type": "practical"
        },
        {
            "q": "What should you do before selling or giving away your old phone?",
            "options": [
                "Nothing, just hand it over",
                "Perform a factory reset to erase your personal data",
                "Only delete your photos",
                "Change your phone's color"
            ],
            "correct": 1,
            "explanation": "A factory reset wipes your personal data so it can't be accessed by the next owner.",
            "type": "scenario"
        },
        {
            "q": "Why is auto-brightness a useful smartphone feature?",
            "options": [
                "It changes your wallpaper automatically",
                "It helps save battery and reduces eye strain by adjusting to lighting",
                "It locks your phone automatically",
                "It has no real benefit"
            ],
            "correct": 1,
            "explanation": "Auto-brightness adjusts the screen to your surroundings, saving battery and being easier on your eyes.",
            "type": "basic"
        },
        {
            "q": "What does Bluetooth allow you to do?",
            "options": [
                "Browse the internet faster",
                "Connect wirelessly to nearby devices like earphones or speakers",
                "Make your phone waterproof",
                "Automatically update all apps"
            ],
            "correct": 1,
            "explanation": "Bluetooth is a short-range wireless technology for connecting nearby devices.",
            "type": "basic"
        },
        {
            "q": "Scenario: Your phone shows a 'storage almost full' warning. What should you do first?",
            "options": [
                "Ignore it completely",
                "Delete unnecessary files or back up and remove old photos",
                "Throw away the phone",
                "Turn off Wi-Fi"
            ],
            "correct": 1,
            "explanation": "Clearing unnecessary files or backing up old photos is the safest way to free up space.",
            "type": "scenario"
        },
        {
            "q": "What's a safe practice when sharing a screenshot that contains sensitive information?",
            "options": [
                "Post it publicly for everyone to see",
                "Avoid sharing it publicly, or blur/crop the sensitive parts first",
                "Send it to everyone in your contacts",
                "It's always safe to share screenshots"
            ],
            "correct": 1,
            "explanation": "Screenshots can contain personal or financial details that shouldn't be shared publicly.",
            "type": "safety"
        },
        {
            "q": "Which accessibility feature helps users with low vision use their smartphone more easily?",
            "options": [
                "Larger text and display size settings",
                "A louder ringtone",
                "A faster processor",
                "A bigger battery"
            ],
            "correct": 0,
            "explanation": "Most smartphones let you increase text and icon size to help users with low vision.",
            "type": "basic"
        },
        {
            "q": "Why should you be cautious about apps that request permissions unrelated to their function (e.g., a flashlight app asking for contacts access)?",
            "options": [
                "It's always necessary for the app to work",
                "Such permissions can be misused to access unnecessary personal data",
                "It makes the app run faster",
                "There's no real reason for caution"
            ],
            "correct": 1,
            "explanation": "Apps requesting unrelated permissions may be collecting more data than needed, which is a privacy risk.",
            "type": "safety"
        },
        {
            "q": "What's a reasonable practice when charging your phone overnight regularly?",
            "options": [
                "Never charge overnight under any circumstances",
                "It's generally fine with modern phones, but use a genuine charger and avoid extreme heat",
                "Always remove the battery first",
                "Charge it inside a sealed plastic bag"
            ],
            "correct": 1,
            "explanation": "Modern phones handle overnight charging well, but using a proper charger and avoiding heat is still good practice.",
            "type": "practical"
        }
    ],
    "payments": [
        {
            "q": "What is a UPI PIN mainly used for?",
            "options": [
                "Unlocking your phone screen",
                "Authorizing a digital payment securely",
                "Logging into social media",
                "Connecting to Wi-Fi"
            ],
            "correct": 1,
            "explanation": "The UPI PIN acts like a digital signature that confirms you approve a specific payment.",
            "type": "basic"
        },
        {
            "q": "Who should you share your UPI PIN or OTP with?",
            "options": [
                "Bank staff who call you",
                "Trusted family members only",
                "No one — never share it with anyone",
                "Anyone who says it's urgent"
            ],
            "correct": 2,
            "explanation": "Banks and legitimate services never ask for your PIN or OTP over a call, message, or email.",
            "type": "safety"
        },
        {
            "q": "Before scanning a QR code to pay someone, you should:",
            "options": [
                "Scan it quickly without looking",
                "Verify the merchant/receiver name that appears on screen",
                "Enter your OTP right after scanning, always",
                "Ignore the amount shown"
            ],
            "correct": 1,
            "explanation": "Checking the name and amount confirms the payment is going to the right person.",
            "type": "practical"
        },
        {
            "q": "Is scanning a QR code ever required to RECEIVE money?",
            "options": [
                "Yes, always scan a QR code to receive money",
                "No — scanning a QR code is only for sending/paying money, so be suspicious if asked to scan one to 'receive' money",
                "Only on weekends",
                "Only if the caller insists"
            ],
            "correct": 1,
            "explanation": "QR codes and UPI PINs are only needed to send money. Scammers trick people into 'scanning to receive', which actually deducts money.",
            "type": "scenario"
        },
        {
            "q": "What's a safe habit when making a UPI payment in a public place?",
            "options": [
                "Do it quickly while distracted",
                "Read the amount and recipient carefully and shield your PIN entry",
                "Ask a stranger to help you enter your PIN",
                "Say your PIN out loud so you don't forget it"
            ],
            "correct": 1,
            "explanation": "Double-checking details and covering your PIN entry protects you from mistakes and shoulder-surfing.",
            "type": "practical"
        },
        {
            "q": "Which of these is a genuine way to identify a real payment app?",
            "options": [
                "It was downloaded from an official app store and is well known/verified",
                "It promises free cash instantly for downloading",
                "It asks for your PIN before you even make a payment",
                "It has no reviews or developer information"
            ],
            "correct": 0,
            "explanation": "Legitimate apps come from official stores with verified developer details and genuine reviews.",
            "type": "basic"
        },
        {
            "q": "If a payment fails but money was deducted from your account, what should you do?",
            "options": [
                "Immediately share your OTP with a caller offering to 'fix' it",
                "Panic and delete the app",
                "Wait and check your transaction history — failed payments are usually auto-reversed within a few days",
                "Make the same payment 5 more times"
            ],
            "correct": 2,
            "explanation": "Failed UPI transactions are typically auto-reversed by the bank; contact your bank directly if concerned.",
            "type": "scenario"
        },
        {
            "q": "Why is it useful to keep bank SMS/transaction alerts turned on?",
            "options": [
                "They are not useful at all",
                "To track and quickly spot any unauthorized transactions",
                "To fill up your phone storage",
                "Only to see advertisements"
            ],
            "correct": 1,
            "explanation": "Instant alerts help you notice suspicious activity right away.",
            "type": "safety"
        },
        {
            "q": "Which of these is a common sign of a payment scam?",
            "options": [
                "A caller asking you to install a remote screen-sharing app to 'help' with a transaction",
                "A receipt showing your correct purchase amount",
                "An SMS confirming a payment you actually made",
                "A QR code displayed at a shop counter you're buying from"
            ],
            "correct": 0,
            "explanation": "Scammers often ask victims to install screen-sharing apps to see PINs and OTPs directly.",
            "type": "safety"
        },
        {
            "q": "What should you regularly check to stay safe with digital payments?",
            "options": [
                "Nothing, digital payments don't need checking",
                "Your bank statement and transaction history",
                "Only your phone's wallpaper",
                "Other people's payment apps"
            ],
            "correct": 1,
            "explanation": "Regularly reviewing your transaction history helps you catch unfamiliar or unauthorized payments early.",
            "type": "practical"
        },
        {
            "q": "What information should you double-check before confirming any UPI transaction?",
            "options": [
                "The receiver's name and the amount being sent",
                "The color of the app icon",
                "Your phone's battery percentage",
                "The time of day"
            ],
            "correct": 0,
            "explanation": "Confirming the receiver's name and amount prevents sending money to the wrong person.",
            "type": "practical"
        },
        {
            "q": "Scenario: You get a call saying you'll receive cashback if you share your UPI PIN. What should you do?",
            "options": [
                "Share the PIN to get the cashback",
                "Refuse — this is a scam",
                "Ask them to call back later and then share it",
                "Share only half the PIN"
            ],
            "correct": 1,
            "explanation": "No legitimate cashback offer requires you to share your PIN. This is a common scam.",
            "type": "scenario"
        },
        {
            "q": "Which of these are considered official, trustworthy UPI-enabled payment apps?",
            "options": [
                "Apps from recognized banks or NPCI-authorized providers",
                "Any app that promises free money",
                "Apps shared through unknown links in SMS",
                "Apps with no listed developer"
            ],
            "correct": 0,
            "explanation": "Stick to apps from recognized banks or officially authorized providers.",
            "type": "basic"
        },
        {
            "q": "What does 'linking a bank account' to a UPI app typically require?",
            "options": [
                "Sharing your PIN with a stranger over the phone",
                "Your debit card details and OTP verification done securely within the app itself",
                "Giving away your Aadhaar card physically",
                "Nothing at all"
            ],
            "correct": 1,
            "explanation": "Bank linking happens securely inside the app using your card and an OTP — never through a third party.",
            "type": "practical"
        },
        {
            "q": "Why should you avoid saving your card details on unfamiliar websites?",
            "options": [
                "It makes checkout slower",
                "The data could be stolen or misused if the site isn't secure",
                "It's against the law",
                "There's no real risk"
            ],
            "correct": 1,
            "explanation": "Unfamiliar or insecure websites may not protect stored card data properly, risking theft or misuse.",
            "type": "safety"
        },
        {
            "q": "Scenario: You accidentally sent money to the wrong UPI ID. What should you do first?",
            "options": [
                "Nothing, the money is gone forever",
                "Contact your bank or app support immediately to report it",
                "Post about it on social media",
                "Try sending more money to 'balance it out'"
            ],
            "correct": 1,
            "explanation": "Reporting immediately to your bank or the app's support gives the best chance of recovering the funds.",
            "type": "scenario"
        },
        {
            "q": "What's a common red flag in a fraudulent payment request message?",
            "options": [
                "A calm, detailed explanation with no urgency",
                "Urgency, an unknown sender, and requests for your PIN or OTP",
                "A message from a saved contact about a planned expense",
                "A receipt for a purchase you made"
            ],
            "correct": 1,
            "explanation": "Urgency combined with requests for sensitive information is a classic scam pattern.",
            "type": "safety"
        },
        {
            "q": "What is UPI Autopay generally used for?",
            "options": [
                "Automatically hacking other accounts",
                "Setting up recurring payments (like subscriptions) with your approval",
                "Deleting your transaction history",
                "Changing your PIN automatically"
            ],
            "correct": 1,
            "explanation": "UPI Autopay lets you authorize recurring payments, such as subscriptions, with your consent.",
            "type": "basic"
        },
        {
            "q": "Why is it risky to make UPI transactions using someone else's unfamiliar phone?",
            "options": [
                "It's not risky at all",
                "Your PIN and account details could be exposed or saved on that device",
                "It uses more data",
                "It's slower than using your own phone"
            ],
            "correct": 1,
            "explanation": "Using an unfamiliar device can expose your sensitive information to whoever controls that device.",
            "type": "safety"
        },
        {
            "q": "What should you do if you notice an unfamiliar transaction in your bank statement?",
            "options": [
                "Ignore it, it's probably nothing",
                "Report it to your bank immediately",
                "Wait a few months to see if it happens again",
                "Share your PIN to confirm your identity"
            ],
            "correct": 1,
            "explanation": "Reporting unfamiliar transactions right away helps limit potential fraud and recover funds faster.",
            "type": "scenario"
        }
    ],
    "online-safety": [
        {
            "q": "If someone calls claiming to be from your bank and asks for your OTP, you should:",
            "options": [
                "Share the OTP so they can 'verify' your account",
                "Hang up and never share your OTP with anyone",
                "Text them the OTP instead of saying it aloud",
                "Ask a family member to share it for you"
            ],
            "correct": 1,
            "explanation": "Banks never ask for your OTP over a phone call — this is a classic scam tactic.",
            "type": "safety"
        },
        {
            "q": "What makes a password strong?",
            "options": [
                "Using your name and birth year",
                "Using '123456' because it's easy to remember",
                "A unique mix of letters, numbers, and symbols for each account",
                "Using the same password everywhere"
            ],
            "correct": 2,
            "explanation": "Unique, complex passwords are much harder for attackers to guess or crack.",
            "type": "basic"
        },
        {
            "q": "What is 'phishing'?",
            "options": [
                "A type of fishing sport",
                "Fraudulent messages or emails designed to trick you into sharing personal information",
                "A setting on your phone",
                "A way to speed up the internet"
            ],
            "correct": 1,
            "explanation": "Phishing messages often look official but are designed to steal your passwords, OTPs, or bank details.",
            "type": "basic"
        },
        {
            "q": "Why does two-factor authentication (2FA) help protect your accounts?",
            "options": [
                "It slows down hackers by making the app load slower",
                "It adds an extra layer of security beyond just your password",
                "It removes the need for a password entirely",
                "It has no real security benefit"
            ],
            "correct": 1,
            "explanation": "Even if someone learns your password, 2FA requires a second step that only you can access.",
            "type": "safety"
        },
        {
            "q": "Should you click on links sent by unknown senders?",
            "options": [
                "Yes, always click to see what it is",
                "No — verify the sender first before clicking any unknown link",
                "Only if the message uses exciting words",
                "Yes, if it promises a prize"
            ],
            "correct": 1,
            "explanation": "Unknown links can lead to fake websites designed to steal your information.",
            "type": "safety"
        },
        {
            "q": "Which of these should you avoid sharing publicly on social media?",
            "options": [
                "Your favorite color",
                "Aadhaar number, bank details, or OTPs",
                "A photo of your lunch",
                "Your favorite movie"
            ],
            "correct": 1,
            "explanation": "Sensitive personal and financial details can be misused by scammers if shared publicly.",
            "type": "practical"
        },
        {
            "q": "Which of these is a sign of a fake or spoofed website?",
            "options": [
                "A misspelled URL and no secure lock icon in the address bar",
                "A clean, professional-looking homepage",
                "It loads quickly",
                "It has a phone number listed"
            ],
            "correct": 0,
            "explanation": "Fake websites often use similar-looking URLs and lack proper security certificates.",
            "type": "safety"
        },
        {
            "q": "If your account gets hacked, what's the first thing you should do?",
            "options": [
                "Wait a few weeks and see what happens",
                "Change your password immediately and inform the platform or your bank",
                "Delete your phone number",
                "Ignore it if nothing seems missing"
            ],
            "correct": 1,
            "explanation": "Acting quickly limits the damage and helps recover the account.",
            "type": "scenario"
        },
        {
            "q": "What does the padlock icon and 'https' in your browser's address bar indicate?",
            "options": [
                "The website is definitely fake",
                "The connection to the website is encrypted/secure",
                "The website is government-owned",
                "It means nothing important"
            ],
            "correct": 1,
            "explanation": "https and the padlock mean the connection is encrypted, though you should still verify the site is genuine.",
            "type": "basic"
        },
        {
            "q": "Which is a good privacy habit on social media?",
            "options": [
                "Make your entire profile public to everyone",
                "Regularly review and limit who can see your posts and personal details",
                "Accept every friend/follow request without checking",
                "Post your live location at all times"
            ],
            "correct": 1,
            "explanation": "Reviewing your privacy settings helps control who can see your personal information.",
            "type": "practical"
        },
        {
            "q": "Scenario: A pop-up says you've won a free smartphone and asks you to enter your details to claim it. What should you do?",
            "options": [
                "Enter your details immediately",
                "Close the pop-up — this is very likely a scam",
                "Share it with friends first",
                "Call the number listed in the pop-up"
            ],
            "correct": 1,
            "explanation": "Unexpected 'you've won' pop-ups asking for personal details are a very common scam.",
            "type": "scenario"
        },
        {
            "q": "What is 'social engineering' in the context of cybersecurity?",
            "options": [
                "Building social media apps",
                "Manipulating people into revealing confidential information",
                "A type of computer hardware",
                "Engineering social events"
            ],
            "correct": 1,
            "explanation": "Social engineering relies on tricking or manipulating people, rather than hacking systems directly.",
            "type": "basic"
        },
        {
            "q": "Which of these is a safe browsing habit?",
            "options": [
                "Entering sensitive information on any website",
                "Checking for 'https' before entering sensitive information",
                "Ignoring browser security warnings",
                "Downloading files from unknown pop-ups"
            ],
            "correct": 1,
            "explanation": "Checking for https (and the padlock icon) is a basic safety check before entering sensitive data.",
            "type": "practical"
        },
        {
            "q": "Why should you log out of your accounts on a shared or public computer?",
            "options": [
                "It's not necessary",
                "It prevents others from accessing your account after you leave",
                "It makes the computer faster",
                "It deletes your account permanently"
            ],
            "correct": 1,
            "explanation": "Staying logged in on a shared device lets the next user access your account.",
            "type": "safety"
        },
        {
            "q": "What is a VPN generally used for?",
            "options": [
                "Making your phone charge faster",
                "Encrypting your internet connection for more privacy",
                "Deleting viruses automatically",
                "Increasing your Wi-Fi speed"
            ],
            "correct": 1,
            "explanation": "A VPN encrypts your internet traffic, adding a layer of privacy, especially on public networks.",
            "type": "basic"
        },
        {
            "q": "Scenario: A stranger sends a friend request and immediately asks you for money. What should you do?",
            "options": [
                "Send the money since they seem friendly",
                "Be suspicious, avoid sharing money or personal info, and consider blocking them",
                "Give them your bank details to 'help'",
                "Share your OTP to verify you trust them"
            ],
            "correct": 1,
            "explanation": "Strangers asking for money soon after connecting online is a common romance/friendship scam pattern.",
            "type": "scenario"
        },
        {
            "q": "Which practice reduces your risk if one of your accounts is affected by a data breach?",
            "options": [
                "Using the same password for every account",
                "Using different, unique passwords for different accounts",
                "Writing your password on a sticky note on your monitor",
                "Sharing your password with a friend for safekeeping"
            ],
            "correct": 1,
            "explanation": "Unique passwords per account mean a breach on one site doesn't compromise your other accounts.",
            "type": "safety"
        },
        {
            "q": "What should you check before installing a browser extension?",
            "options": [
                "Nothing, all extensions are safe",
                "Its reviews, the permissions it requests, and its publisher",
                "Only its icon design",
                "Whether it's free"
            ],
            "correct": 1,
            "explanation": "Checking reviews, requested permissions, and the publisher helps avoid malicious extensions.",
            "type": "practical"
        },
        {
            "q": "Why can oversharing your daily routine on social media be risky?",
            "options": [
                "It's never risky",
                "It can reveal patterns, like when you're not home, to people with bad intentions",
                "It uses too much data",
                "It slows down your phone"
            ],
            "correct": 1,
            "explanation": "Revealing routines publicly can help bad actors know when you're away or vulnerable.",
            "type": "safety"
        },
        {
            "q": "What is the safest way to reset a forgotten password?",
            "options": [
                "Click a password reset link from an unsolicited message",
                "Use the platform's official 'forgot password' process directly on its app or website",
                "Ask a stranger online for help",
                "Share your old password with support over chat"
            ],
            "correct": 1,
            "explanation": "Always use the platform's own official reset process rather than links from unexpected messages.",
            "type": "practical"
        }
    ],
    "fake-news": [
        {
            "q": "Before forwarding a surprising news message on WhatsApp, it's best to:",
            "options": [
                "Forward it immediately to warn everyone",
                "Check if it's confirmed by a trusted news source first",
                "Assume it's true since it sounds urgent",
                "Forward it only to close friends"
            ],
            "correct": 1,
            "explanation": "Verifying with a trusted source first prevents accidentally spreading false information.",
            "type": "practical"
        },
        {
            "q": "If a message has been forwarded by many people, does that make it true?",
            "options": [
                "Yes, popularity always means it's true",
                "No — many forwards do not guarantee accuracy",
                "Yes, if it has more than 100 forwards",
                "Only if it includes a photo"
            ],
            "correct": 1,
            "explanation": "Misinformation can spread just as fast, or faster, than real news.",
            "type": "basic"
        },
        {
            "q": "What is a good way to check if a piece of news is real?",
            "options": [
                "Ask only one friend if they believe it",
                "Cross-check it with multiple reputable news sources",
                "Trust it if the font is bold",
                "Trust it if it has lots of exclamation marks"
            ],
            "correct": 1,
            "explanation": "Checking multiple credible sources helps confirm accuracy before you believe or share it.",
            "type": "practical"
        },
        {
            "q": "What does a fact-checking website do?",
            "options": [
                "Creates new news stories",
                "Verifies claims, photos, or videos for authenticity",
                "Deletes fake news from the internet automatically",
                "Only checks weather reports"
            ],
            "correct": 1,
            "explanation": "Fact-checking organizations investigate viral claims and publish evidence-based conclusions.",
            "type": "basic"
        },
        {
            "q": "What's one way to check if an image or video might be doctored or taken out of context?",
            "options": [
                "Ignore it and share anyway",
                "Look for inconsistencies or try a reverse image search",
                "Assume all images are always real",
                "Just look at how many likes it has"
            ],
            "correct": 1,
            "explanation": "A reverse image search can reveal if a photo is old, edited, or from an unrelated event.",
            "type": "practical"
        },
        {
            "q": "Sensational headlines in ALL CAPS with urgent language often indicate:",
            "options": [
                "Guaranteed factual reporting",
                "Possible misinformation or clickbait",
                "Government-verified news",
                "Nothing unusual"
            ],
            "correct": 1,
            "explanation": "Exaggerated, urgent-sounding headlines are a common tactic even when content is misleading.",
            "type": "safety"
        },
        {
            "q": "If you realize you've already shared fake news, what should you do?",
            "options": [
                "Do nothing, it's not a big deal",
                "Delete or correct the post and let others know it was inaccurate",
                "Share it again to more people",
                "Block everyone who saw it"
            ],
            "correct": 1,
            "explanation": "Correcting the mistake helps stop the spread of misinformation.",
            "type": "scenario"
        },
        {
            "q": "Which is generally a more reliable source of information?",
            "options": [
                "An established, well-known news organization",
                "A random forwarded message with no source",
                "A message that says 'forward to 10 people'",
                "A post with no author name"
            ],
            "correct": 0,
            "explanation": "Established news organizations follow editorial standards and are accountable for what they publish.",
            "type": "basic"
        },
        {
            "q": "What's a red flag when judging a news website's credibility?",
            "options": [
                "It has a clear author name and publish date",
                "It has no author name, no date, and an unusual domain name",
                "It links to its original sources",
                "It corrects past mistakes publicly"
            ],
            "correct": 1,
            "explanation": "Missing author/date info and strange domain names are common signs of low-credibility sites.",
            "type": "safety"
        },
        {
            "q": "Which action helps reduce the spread of fake news online?",
            "options": [
                "Sharing anything that seems interesting",
                "Reporting or flagging misleading content on the platform",
                "Forwarding it to as many groups as possible",
                "Ignoring whether it's true or false"
            ],
            "correct": 1,
            "explanation": "Most platforms let you report false or misleading content, limiting how far it spreads.",
            "type": "practical"
        },
        {
            "q": "Scenario: A video claims to show a recent event, but it's actually been circulating online for years. What can help verify this?",
            "options": [
                "Trusting it because it looks dramatic",
                "A reverse image or video search",
                "Counting the number of shares",
                "Assuming older videos are always fake"
            ],
            "correct": 1,
            "explanation": "Reverse search tools can reveal the true origin and date of a photo or video.",
            "type": "scenario"
        },
        {
            "q": "What is a common feature of AI-generated misinformation?",
            "options": [
                "It's always obviously fake and poorly written",
                "It can look or sound realistic while containing fabricated facts or quotes",
                "It's always labeled clearly as AI-generated",
                "It never spreads on social media"
            ],
            "correct": 1,
            "explanation": "AI-generated content can appear very convincing while still being factually false.",
            "type": "safety"
        },
        {
            "q": "Why is 'context' important when evaluating a photo or video online?",
            "options": [
                "Context doesn't matter for photos and videos",
                "The same media can be misrepresented as being from a different time, place, or event",
                "Context only matters for text articles",
                "Photos can never be taken out of context"
            ],
            "correct": 1,
            "explanation": "Real photos/videos are often reused and falsely attributed to unrelated events to mislead people.",
            "type": "basic"
        },
        {
            "q": "What does 'responsible sharing' of information include?",
            "options": [
                "Sharing anything that seems interesting immediately",
                "Checking accuracy before forwarding, and correcting mistakes if you shared something false",
                "Only sharing with people who already agree with you",
                "Never sharing any news at all"
            ],
            "correct": 1,
            "explanation": "Responsible sharing means verifying first and being willing to correct mistakes.",
            "type": "practical"
        },
        {
            "q": "Which of these is a warning sign of an unreliable news post?",
            "options": [
                "A named source and clear publish date",
                "No named source, emotional language, and urgent calls to share immediately",
                "Links to original references",
                "A calm, factual tone"
            ],
            "correct": 1,
            "explanation": "Missing sources, emotional language, and urgency to share are classic misinformation red flags.",
            "type": "safety"
        },
        {
            "q": "Scenario: A headline reads 'SHOCKING!!! You won't believe what happened next!' What should this signal to you?",
            "options": [
                "Guaranteed breaking news",
                "Possible clickbait — verify before trusting or sharing it",
                "That it must be from a reliable source",
                "Nothing unusual"
            ],
            "correct": 1,
            "explanation": "Overly dramatic, vague headlines are a common clickbait tactic used by unreliable sources.",
            "type": "scenario"
        },
        {
            "q": "Why do fact-checkers cross-reference multiple sources before confirming a claim?",
            "options": [
                "It's unnecessary extra work",
                "Because a single source can be biased, mistaken, or fabricated",
                "Because more sources always agree",
                "It's just a formality"
            ],
            "correct": 1,
            "explanation": "Cross-referencing reduces the chance of relying on one flawed or biased source.",
            "type": "basic"
        },
        {
            "q": "What is the risk of blindly trusting a screenshot of a social media post?",
            "options": [
                "There is no risk",
                "Screenshots can be easily faked, edited, or taken out of context",
                "Screenshots are always verified automatically",
                "Only videos can be faked, not screenshots"
            ],
            "correct": 1,
            "explanation": "Screenshots are simple to edit or fabricate, so they shouldn't be trusted at face value.",
            "type": "safety"
        },
        {
            "q": "What's a key difference between misinformation and disinformation?",
            "options": [
                "There is no difference",
                "Misinformation is false info shared without harmful intent; disinformation is spread deliberately to deceive",
                "Disinformation is always true",
                "Misinformation only happens on TV"
            ],
            "correct": 1,
            "explanation": "The key difference is intent — disinformation is deliberately misleading, misinformation may be an honest mistake.",
            "type": "basic"
        },
        {
            "q": "What's a responsible first step when you're unsure if a piece of news is true?",
            "options": [
                "Forward it immediately just in case it's true",
                "Pause and verify before sharing",
                "Assume it's false and ignore all news",
                "Ask only people who already believe it"
            ],
            "correct": 1,
            "explanation": "Pausing to verify prevents the accidental spread of false information.",
            "type": "practical"
        }
    ],
    "government": [
        {
            "q": "What is the safest way to access government services online?",
            "options": [
                "Through a link sent by SMS from an unknown number",
                "Using the official government website or app",
                "Through a random search result ad",
                "Through a social media post"
            ],
            "correct": 1,
            "explanation": "Official government websites and apps are the verified, secure way to access real services.",
            "type": "basic"
        },
        {
            "q": "You receive an SMS promising a government refund if you click a link. What should you do?",
            "options": [
                "Click it immediately to claim the refund",
                "Don't click it — it's likely a scam",
                "Forward it to friends first",
                "Reply with your bank details"
            ],
            "correct": 1,
            "explanation": "Government refunds are never processed by clicking random SMS links.",
            "type": "safety"
        },
        {
            "q": "Which of these is typically part of an official Indian government website address?",
            "options": [
                ".gov.in",
                ".shop",
                ".xyz",
                ".win"
            ],
            "correct": 0,
            "explanation": "Official Indian government websites usually end in .gov.in or .nic.in.",
            "type": "basic"
        },
        {
            "q": "When should you share your Aadhaar number?",
            "options": [
                "With anyone who asks over the phone",
                "Only with trusted, verified, official sources when required",
                "On any website that asks for it",
                "In public social media posts"
            ],
            "correct": 1,
            "explanation": "Aadhaar is sensitive personal ID data and should only be shared with verified, legitimate institutions.",
            "type": "safety"
        },
        {
            "q": "What is DigiLocker used for?",
            "options": [
                "Playing games online",
                "Storing and accessing official documents digitally",
                "Booking movie tickets",
                "Sending money to friends"
            ],
            "correct": 1,
            "explanation": "DigiLocker is an official government platform for securely storing documents like licenses and certificates.",
            "type": "basic"
        },
        {
            "q": "Before entering personal details on a government-looking website, you should check:",
            "options": [
                "That the URL is official and shows a secure lock icon (https)",
                "That the website has a nice background color",
                "Nothing, all websites are safe",
                "That it loads quickly"
            ],
            "correct": 0,
            "explanation": "Checking the URL and security indicators helps confirm you're on the genuine site.",
            "type": "practical"
        },
        {
            "q": "A caller claims to be a government official and asks for your OTP or Aadhaar number over the phone. What should you do?",
            "options": [
                "Share it since they said it's official",
                "Refuse and verify through official government channels instead",
                "Share only the Aadhaar number, not the OTP",
                "Ask them to call back later and then share it"
            ],
            "correct": 1,
            "explanation": "Real government officials do not ask for OTPs over the phone.",
            "type": "scenario"
        },
        {
            "q": "Which of these is an example of a legitimate government online service?",
            "options": [
                "Income tax e-filing portal",
                "A website offering free government cash for personal details",
                "A random app promising instant subsidy transfers",
                "A WhatsApp forward with a claim form"
            ],
            "correct": 0,
            "explanation": "The income tax e-filing portal is an official, verified government service.",
            "type": "basic"
        },
        {
            "q": "What's a safe way to verify if a government scheme announced in the news is real?",
            "options": [
                "Trust any WhatsApp forward about it",
                "Check the official press release or PIB fact-check page",
                "Believe it if a stranger calls to confirm it",
                "Assume it's real if it sounds good"
            ],
            "correct": 1,
            "explanation": "Official press releases and government fact-checking services confirm whether a scheme is genuine.",
            "type": "practical"
        },
        {
            "q": "What should you never do when applying online for a government scheme?",
            "options": [
                "Use the official portal",
                "Pay unofficial 'agents' extra money for a guaranteed approval",
                "Keep a copy of your application receipt",
                "Double-check the eligibility criteria"
            ],
            "correct": 1,
            "explanation": "Government schemes don't require paying middlemen for approval — this is a common scam.",
            "type": "safety"
        },
        {
            "q": "What is UMANG primarily used for?",
            "options": [
                "Playing online games",
                "Accessing multiple government services through a single official app",
                "Ordering food",
                "Watching movies"
            ],
            "correct": 1,
            "explanation": "UMANG is an official app that brings together many government services in one place.",
            "type": "basic"
        },
        {
            "q": "What is MyGov?",
            "options": [
                "A private shopping website",
                "A platform for citizen engagement with government initiatives and information",
                "A social media app for celebrities",
                "A gaming platform"
            ],
            "correct": 1,
            "explanation": "MyGov is an official platform where citizens can engage with and learn about government initiatives.",
            "type": "basic"
        },
        {
            "q": "Scenario: A website looks official but has an unusual domain (not .gov.in) and asks for your Aadhaar and bank details. What should you do?",
            "options": [
                "Enter the details since it looks official",
                "Avoid entering details and verify through the actual official government website",
                "Share only the Aadhaar number",
                "Ask a friend to enter the details for you"
            ],
            "correct": 1,
            "explanation": "An unusual domain asking for sensitive details is a red flag — always verify through the genuine official site.",
            "type": "scenario"
        },
        {
            "q": "Why shouldn't you trust a government scheme just because a relative forwarded it to you?",
            "options": [
                "Relatives are always reliable sources",
                "Forwarded messages can contain outdated, altered, or completely fake information",
                "Forwards are always verified by the government first",
                "There's no reason for caution"
            ],
            "correct": 1,
            "explanation": "Even well-meaning forwards can spread inaccurate or fake scheme information.",
            "type": "safety"
        },
        {
            "q": "Which of these is a sign that a government website might be fake?",
            "options": [
                "Spelling errors, an unusual domain, and requests for unnecessary payments",
                "A .gov.in domain with no payment requests",
                "Clear contact information and official branding",
                "It links to verified press releases"
            ],
            "correct": 0,
            "explanation": "Spelling errors, odd domains, and unnecessary payment requests are common signs of a fake government site.",
            "type": "safety"
        },
        {
            "q": "What's a legitimate reason a government portal might ask for your Aadhaar number?",
            "options": [
                "Just for casual browsing on their site",
                "To verify your identity for a specific service you're directly applying for on the official portal",
                "To send you promotional offers",
                "There's never a legitimate reason"
            ],
            "correct": 1,
            "explanation": "Official portals may need Aadhaar for identity verification when you're directly applying for a specific service.",
            "type": "practical"
        },
        {
            "q": "Why is it useful to keep application receipts or reference numbers for government services?",
            "options": [
                "It's not useful at all",
                "To track your application status and prove you applied through official channels",
                "To decorate your files",
                "Only for tax purposes"
            ],
            "correct": 1,
            "explanation": "Receipts and reference numbers help you track progress and prove legitimate application later if needed.",
            "type": "practical"
        },
        {
            "q": "What's the safest way to find a government helpline number?",
            "options": [
                "From the official government website",
                "From a random search result ad",
                "From a forwarded WhatsApp message",
                "From a stranger's social media comment"
            ],
            "correct": 0,
            "explanation": "Official websites list verified helpline numbers, unlike random search results or forwards.",
            "type": "practical"
        },
        {
            "q": "Scenario: Someone calls claiming to be from a government office, asking you to pay a 'processing fee' via a personal UPI ID to release your benefit. What should you do?",
            "options": [
                "Pay immediately to avoid losing the benefit",
                "Refuse and report it — genuine government fees are never collected via personal UPI IDs",
                "Pay half the amount to be safe",
                "Ask a friend to pay on your behalf"
            ],
            "correct": 1,
            "explanation": "Government fees are never collected through a personal UPI ID — this is a scam pattern.",
            "type": "scenario"
        },
        {
            "q": "Why is DigiLocker generally considered safer than keeping physical photocopies of your documents?",
            "options": [
                "It's not safer at all",
                "Documents are digitally verified and securely linked to your account, reducing misuse risk",
                "Physical photocopies are always safer",
                "There's no difference"
            ],
            "correct": 1,
            "explanation": "DigiLocker documents are digitally verified and tied to your account, reducing the risk of misuse from lost physical copies.",
            "type": "basic"
        }
    ]
};
