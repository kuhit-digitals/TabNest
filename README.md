<p align="center">
  <img src="assets/banner.png" alt="TabNest Banner" width="100%">
</p>
<div align="center">

# 🪺 TabNest

### 🚀 AI-Powered Browser Workspace Manager

#### Save • Organize • Restore Browser Workspaces Using Natural Language

<p>
  <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white">
  <img src="https://img.shields.io/badge/Manifest-V3-34A853?style=for-the-badge">
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google">
  <img src="https://img.shields.io/badge/Hackathon-NYC_CodeQuest_2026-EA4335?style=for-the-badge">
</p>

### 🌟 Built with AI to make browser workspace management effortless.

</div>

---

# 📚 Table of Contents

- [📖 About](#-about)
- [💡 Why TabNest?](#-why-tabnest)
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [⚙️ How It Works](#️-how-it-works)
- [📸 Screenshots](#-screenshots)
- [🎥 Demo](#-demo)
- [📂 Project Structure](#-project-structure)
- [🚀 Installation](#-installation)
- [💬 Example Commands](#-example-commands)
- [🗺 Future Roadmap](#-future-roadmap)
- [🙏 Acknowledgements](#-acknowledgements)
- [📄 License](#-license)

---
## 🚀 What's New in TabNest v2.0

TabNest just got a major upgrade! Version 2 introduces more flexibility, smarter command handling, and the ability to connect your own AI provider.

### ✨ New Features & Improvements

- **🔌 Bring Your Own AI API:** Connect your own AI provider using an API key, endpoint, and model name.
- **🤖 Custom AI Integration:** Use supported OpenAI-compatible APIs instead of being restricted to one built-in provider.
- **⚡ Offline Command Processing:** TabNest includes a built-in command parser, so basic workspace operations can work without an external AI API.
- **🧠 Smarter Command Understanding:** Improved natural-language recognition for saving, opening, renaming, updating, and deleting workspaces.
- **🔄 Automatic Offline Fallback:** If your custom AI request fails, TabNest can fall back to its local command parser.
- **⚙️ AI Configuration Panel:** Switch between offline and custom AI modes, configure your endpoint, choose a model, and test your connection.
- **🗂️ Improved Workspace Management:** Better handling of saved workspaces and browser tabs.
- **🔐 Permission-Based API Access:** Request access to the API host when connecting a custom provider.

### 🆚 Version 1 vs Version 2

| Feature | v1.0 | v2.0 |
|---|---|---|
| AI integration | Built-in Gemini integration | Configurable AI provider |
| API configuration | Fixed | Custom endpoint, key & model |
| Offline commands | No | Yes |
| AI failure fallback | No | Yes |
| Command recognition | Basic | Improved |
| AI settings panel | No | Yes |

### 💡 Why This Upgrade?

TabNest v2 is designed to give users more control over how they interact with their browser workspaces. Instead of depending on a single AI provider, users can choose a supported provider or use the built-in offline command parser.

**Your browser. Your workspaces. Your choice of AI.**

---

*TabNest v2.0 — Smarter workspace management, with more freedom.*

---
# 📖 About

TabNest is an **AI-powered Chrome Extension** that allows users to save, organize, update, and restore browser workspaces using simple natural language commands.

Instead of manually creating bookmarks or remembering dozens of tabs, simply type commands like:

```text
Save current tabs as Study

Open Study

Rename Study to Semester 1

Delete Shopping

Add current tabs to Study
```

TabNest understands the user's intent using **Google Gemini AI** and performs the requested action automatically.

---

# 💡 Why TabNest?

Managing browser tabs becomes difficult when working on multiple projects, studying different subjects, or researching online.

Closing Chrome or restarting a laptop often results in losing an entire workflow.

Traditional bookmarks save only individual websites—not complete workspaces.

**TabNest solves this by allowing users to save and restore complete browser sessions using natural language.**

---

# ✨ Features

| 🚀 Feature | Description |
|------------|-------------|
| 🤖 AI Natural Language Commands | Understands commands using Google Gemini |
| 💾 Save Workspace | Save all currently opened tabs |
| 🚀 Restore Workspace | Instantly reopen saved workspaces |
| ✏️ Rename Workspace | Rename saved workspaces anytime |
| 🗑 Delete Workspace | Remove unnecessary workspaces |
| ➕ Update Workspace | Add current tabs to existing workspaces |
| 📋 Workspace Manager | View all saved workspaces |
| 🚫 Duplicate Prevention | Avoid duplicate tabs while updating |

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | HTML5 • CSS3 • Vanilla JavaScript |
| Browser APIs | Chrome Tabs API • Chrome Storage API |
| Extension | Chrome Extension Manifest V3 |
| Artificial Intelligence | Google Gemini API |

---

# ⚙️ How It Works

```text
          👤 User

             │

             ▼

   Natural Language Command

             │

             ▼

      Google Gemini AI

             │

             ▼

      Structured JSON Output

             │

             ▼

      Command Processing

             │

             ▼

 Chrome Tabs API + Storage API

             │

             ▼

 Workspace Saved / Opened
```

---

# 📸 Screenshots

<div align="center">

| Home | AI Command |
|:----:|:----------:|
| <img src="assets/home.png" width="420"> | <img src="assets/command.png" width="420"> |

| Output |
|:------:|
| <img src="assets/output.png" width="420"> |

</div>

# 🎥 Demo

<div align="center">

## 📺 Watch TabNest in Action

[![🎬 Full Demo](https://img.shields.io/badge/▶️_Full_Project_Demo-Watch_Here-red?style=for-the-badge)](https://www.youtube.com/watch?v=PlbmFMz2Avk)

[![⚡ Short Demo](https://img.shields.io/badge/⚡_60_Second_Demo-Watch_Here-blue?style=for-the-badge)](https://youtube.com/shorts/wQXzRMaGhj4?si=PklpaEVo1nc-OB8n)

</div>

> 🚧 Demo videos are available

---

# 📂 Project Structure

```text
TabNest/
│
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── tabs.js
├── storage.js
├── ai.js
│
├── icons/
│
├── README.md
│
└── assets/
```

---

# 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/kuhit-digitals/TabNest.git
```

### 2️⃣ Open Chrome

```
chrome://extensions
```

### 3️⃣ Enable **Developer Mode**

### 4️⃣ Click **Load unpacked**

### 5️⃣ Select the project folder

### 6️⃣ Add your Google Gemini API Key inside

```
ai.js
```

### 7️⃣ Start using TabNest 🚀

---

# 💬 Example Commands

```text
Save current tabs as Study

Open Study

Rename Study to Semester 1

Delete Semester 1

Add current tabs to Study

Save current tabs as Web Development

Open Web Development
```

---

# 🗺 Future Roadmap

- ☁️ Cloud Synchronization
- 📤 Import / Export Workspaces
- 🔍 Workspace Search
- 🤖 AI Workspace Suggestions
- 🎤 Voice Commands
- ⌨️ Keyboard Shortcuts
- 👥 Workspace Sharing
- 🌐 Cross-Browser Support

---

# 🙏 Acknowledgements

This project was developed for **NYC CodeQuest 2026**.

Special thanks to:

- 💙 Google Gemini API
- 🌐 Chrome Extension APIs
- 🚀 NYC CodeQuest Organizers

for providing the opportunity to build innovative solutions.

---

# 📄 License

This project was created for educational and hackathon purposes as part of **NYC CodeQuest 2026**.

---

<div align="center">

## ⭐ If you enjoyed this project, consider giving it a Star!

### Made with ❤️ by **Phoenix Forge**

*"Forging Ideas Into Reality."*

🚀 NYC CodeQuest 2026

</div>