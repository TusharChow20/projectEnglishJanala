📘 Vocabulary Learning App

This is an API-based vocabulary learning project where users can explore different levels of lessons, learn words with meanings, examples, and pronunciations. The project uses Programming Hero OpenAPI to fetch levels, words, and word details dynamically.

🔗 API Endpoints Used

Get All Levels: https://openapi.programming-hero.com/api/levels/all

Get Words by Levels: https://openapi.programming-hero.com/api/level/{id}

Get Word Details: https://openapi.programming-hero.com/api/word/{id}

Get All Words: https://openapi.programming-hero.com/api/words/all

🎯 Features Implemented

📌 Show All Levels → Levels are fetched and displayed as interactive buttons.

📌 Word Cards by Level → Clicking a level loads words with meaning, pronunciation, and action buttons.

📌 Active Lesson Highlight → The selected level button is highlighted for better UX.

📌 Vocabulary Details Modal → Shows extra details like synonyms & example sentences.

📌 Error Handling → Prevents undefined/null values from showing in the UI.

📌 Loading Spinner → Indicates data fetching process.

📌 Search Functionality → Search words dynamically with instant results.

📌 Save Word (❤️) → Save favorite words in a separate "Saved Words" section.

📌 Voice Pronunciation 🔊 → Users can hear the pronunciation of words using SpeechSynthesis API.