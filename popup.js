
/* ==================================================
   TABNEST POPUP CONTROLLER
================================================== */

const promptInput = document.getElementById("prompt");
const executeButton = document.getElementById("executeBtn");
const statusText = document.getElementById("status");

const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");

const aiEnabled = document.getElementById("aiEnabled");
const apiEndpoint = document.getElementById("apiEndpoint");
const apiModel = document.getElementById("apiModel");
const apiKey = document.getElementById("apiKey");

const saveSettingsButton = document.getElementById("saveSettings");
const testConnectionButton = document.getElementById("testConnection");


// --------------------------------------------------
// STATUS
// --------------------------------------------------

function setStatus(message, type = "normal") {

    statusText.textContent = message;

    statusText.dataset.type = type;
}


// --------------------------------------------------
// LOAD AI SETTINGS
// --------------------------------------------------

async function loadSettings() {

    const config = await TabNestAI.getConfig();

    aiEnabled.value = String(config.enabled);

    apiEndpoint.value = config.endpoint;
    apiModel.value = config.model;
    apiKey.value = config.apiKey;

}


// --------------------------------------------------
// SAVE AI SETTINGS
// --------------------------------------------------

saveSettingsButton.addEventListener("click", async () => {

    try {

        saveSettingsButton.disabled = true;

        const config = {

            enabled: aiEnabled.value === "true",

            endpoint: apiEndpoint.value.trim(),

            model: apiModel.value.trim(),

            apiKey: apiKey.value.trim()

        };


        if (config.enabled) {

            if (!config.endpoint || !config.model || !config.apiKey) {

                throw new Error(
                    "Please complete all API configuration fields."
                );
            }

            // Request permission from this explicit user action.
            await TabNestAI.requestHostPermission(config.endpoint);

        }


        await TabNestAI.saveConfig(config);

        setStatus(
            config.enabled
                ? "✅ Custom AI settings saved!"
                : "✅ Offline mode activated!",
            "success"
        );

    } catch (error) {

        setStatus("❌ " + error.message, "error");

    } finally {

        saveSettingsButton.disabled = false;

    }

});


// --------------------------------------------------
// TEST AI CONNECTION
// --------------------------------------------------

testConnectionButton.addEventListener("click", async () => {

    try {

        testConnectionButton.disabled = true;

        const config = {
            enabled: true,
            endpoint: apiEndpoint.value.trim(),
            model: apiModel.value.trim(),
            apiKey: apiKey.value.trim()
        };

        if (!config.endpoint || !config.model || !config.apiKey) {
            throw new Error("Complete all API fields first.");
        }

        // Permission is requested from this user action.
        await TabNestAI.requestHostPermission(config.endpoint);

        await TabNestAI.saveConfig(config);

        await TabNestAI.testConnection();

        setStatus("✅ AI connection successful!", "success");

    } catch (error) {

        setStatus("❌ " + error.message, "error");

    } finally {

        testConnectionButton.disabled = false;

    }

});


// --------------------------------------------------
// SETTINGS TOGGLE
// --------------------------------------------------

settingsToggle.addEventListener("click", () => {

    const isOpen = !settingsPanel.hidden;

    settingsPanel.hidden = isOpen;

    settingsToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );

});


// --------------------------------------------------
// EXECUTE COMMAND
// --------------------------------------------------

async function executeCommand() {

    const userCommand = promptInput.value.trim();

    if (!userCommand) {

        setStatus("❌ Please enter a command.", "error");

        return;
    }

    executeButton.disabled = true;

    try {

        setStatus("Understanding your command...");

        const command = await askTabNest(userCommand);

        console.log("TabNest command:", command);


        if (command.warning) {

            setStatus(
                "⚠️ AI unavailable. Using offline mode. " +
                command.warning,
                "warning"
            );

        }


        if (command.needsClarification) {

            setStatus(
                "💬 " + command.message,
                "warning"
            );

            return;
        }


        switch (command.action) {


            // --------------------------------------
            // SAVE
            // --------------------------------------

            case "save": {

                const tabs = await getCurrentTabs();

                if (tabs.length === 0) {
                    throw new Error("No valid web tabs found.");
                }

                await saveWorkspace(command.workspace, tabs);

                setStatus(
                    `✅ "${command.workspace}" saved with ${tabs.length} tabs!`,
                    "success"
                );

                await loadWorkspaces();

                break;
            }


            // --------------------------------------
            // OPEN
            // --------------------------------------

            case "open": {

                const workspace = await getWorkspace(command.workspace);

                if (!workspace) {

                    throw new Error(
                        `Workspace "${command.workspace}" was not found.`
                    );
                }

                const count = await openWorkspaceTabs(workspace);

                setStatus(
                    `🚀 Opened "${command.workspace}" (${count} tabs).`,
                    "success"
                );

                break;
            }


            // --------------------------------------
            // DELETE
            // --------------------------------------

            case "delete": {

                const workspace = await getWorkspace(command.workspace);

                if (!workspace) {
                    throw new Error("Workspace not found.");
                }

                const confirmed = window.confirm(
                    `Are you sure you want to delete "${command.workspace}"?`
                );

                if (!confirmed) {

                    setStatus("Deletion cancelled.");

                    return;
                }

                await deleteWorkspace(command.workspace);

                setStatus(
                    `🗑️ "${command.workspace}" deleted.`,
                    "success"
                );

                await loadWorkspaces();

                break;
            }


            // --------------------------------------
            // RENAME
            // --------------------------------------

            case "rename": {

                await renameWorkspace(
                    command.oldName,
                    command.newName
                );

                setStatus(
                    `✏️ Renamed to "${command.newName}".`,
                    "success"
                );

                await loadWorkspaces();

                break;
            }


            // --------------------------------------
            // UPDATE
            // --------------------------------------

            case "update": {

                const currentTabs = await getCurrentTabs();

                await updateWorkspace(
                    command.workspace,
                    currentTabs
                );

                setStatus(
                    `✅ "${command.workspace}" updated!`,
                    "success"
                );

                await loadWorkspaces();

                break;
            }


            default:

                setStatus(
                    "❌ Unsupported command.",
                    "error"
                );

        }

        promptInput.value = "";

    } catch (error) {

        console.error("TabNest execution error:", error);

        setStatus(
            "❌ " + error.message,
            "error"
        );

    } finally {

        executeButton.disabled = false;

    }

}


executeButton.addEventListener("click", executeCommand);


// Enter key support
promptInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {
        executeCommand();
    }

});


// --------------------------------------------------
// LOAD WORKSPACES
// --------------------------------------------------

async function loadWorkspaces() {

    const workspaces = await getAllWorkspaces();

    const list = document.getElementById("workspaceList");

    list.replaceChildren();

    const names = Object.keys(workspaces);

    if (names.length === 0) {

        const empty = document.createElement("p");

        empty.className = "empty-state";

        empty.textContent = "No workspaces saved yet.";

        list.appendChild(empty);

        return;
    }


    for (const name of names) {

        const card = document.createElement("div");

        card.className = "workspace-card";

        const title = document.createElement("span");

        title.textContent = "📁 " + name;

        const openButton = document.createElement("button");

        openButton.className = "workspace-open";

        openButton.textContent = "Open";

        openButton.addEventListener("click", async () => {

            try {

                const workspace = await getWorkspace(name);

                if (!workspace) {
                    throw new Error("Workspace not found.");
                }

                const count = await openWorkspaceTabs(workspace);

                setStatus(
                    `🚀 Opened ${name} (${count} tabs).`,
                    "success"
                );

            } catch (error) {

                setStatus("❌ " + error.message, "error");

            }

        });

        card.append(title, openButton);

        list.appendChild(card);

    }

}


// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------

async function initialize() {

    try {

        await loadSettings();

        await loadWorkspaces();

        setStatus("Ready");

    } catch (error) {

        setStatus("❌ Initialization failed: " + error.message, "error");

    }

}

initialize();
