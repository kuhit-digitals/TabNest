# 🪺 TabNest

TabNest is an AI-powered Chrome Extension that helps users save, organize, and restore browser workspaces using natural language.

Instead of manually creating bookmarks or remembering which tabs were open, users can simply type commands like:

- Save current tabs as Study
- Open Study
- Rename Study to Semester 1
- Delete Shopping
- Add current tabs to Study

TabNest understands the user's intent using Google's Gemini API and performs the requested action automatically.

---

## 📌 Why I Built This

While studying or working on multiple projects, I often end up with dozens of browser tabs open. Closing Chrome or restarting my laptop means losing my workflow, and finding everything again takes time.

Bookmarks are useful for saving individual websites, but they don't preserve an entire working session.

TabNest was built to make workspace management simple by allowing users to interact with their browser using natural language.

---

## ✨ Features

- 🤖 AI-powered natural language commands
- 💾 Save current tabs as a workspace
- 🚀 Open saved workspaces instantly
- ✏️ Rename existing workspaces
- 🗑️ Delete workspaces
- ➕ Update existing workspaces with current tabs
- 📋 View all saved workspaces inside the extension
- 🚫 Prevent duplicate tabs while updating

---

## 🛠️ Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Chrome Extension (Manifest V3)
- Chrome Tabs API
- Chrome Storage API
- Google Gemini API

---

## ⚙️ How It Works

1. The user enters a command in natural language.
2. The command is sent to the Gemini API.
3. Gemini converts the sentence into structured JSON.
4. The extension performs the required action using Chrome APIs.
5. Workspace data is stored locally using Chrome Storage.

---

## 📂 Project Structure

```
TabNest/
│
├── manifest.json
├── popup.html
├── popup.css
├── popup.js
├── tabs.js
├── storage.js
├── ai.js
```

---

## 🚀 Installation

1. Clone this repository.

```
git clone https://github.com/YOUR_USERNAME/TabNest.git
```

2. Open Chrome and go to:

```
chrome://extensions/
```

3. Enable **Developer Mode**.

4. Click **Load unpacked**.

5. Select the project folder.

6. Add your own Google Gemini API key inside `ai.js`.

7. The extension is ready to use.

---

## 💬 Example Commands

```
Save current tabs as Study

Open Study

Rename Study to Semester 1

Delete Semester 1

Add current tabs to Study
```

---

## 📸 Demo

A demo video and screenshots will be added soon.

---

## 🔮 Future Improvements

- Export and import workspaces
- Cloud synchronization
- Workspace search
- Keyboard shortcuts
- Automatic workspace suggestions
- Workspace sharing

---

## 📄 License

This project was developed for the NYC CodeQuest 2026 Hackathon.
