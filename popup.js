const promptInput = document.getElementById("prompt");
const executeButton = document.getElementById("executeBtn");
const statusText = document.getElementById("status");

executeButton.addEventListener("click", async () => {

    const userCommand = promptInput.value;

    if (userCommand.trim() === "") {

        statusText.textContent = "❌ Please enter a command.";
        return;

    }
    
    const command = await askGemini(userCommand);

switch (command.action) {

  case "save":

    const tabs = await getCurrentTabs();

    await saveWorkspace(command.workspace, tabs);

    statusText.textContent =
        `✅ Workspace "${command.workspace}" saved!`;

    await loadWorkspaces();

    break;

    case "open":

        const workspace = await getWorkspace(command.workspace);

        if (!workspace) {

            statusText.textContent =
                "❌ Workspace not found.";

            return;
        }

        await openWorkspaceTabs(workspace);

        statusText.textContent =
            `🚀 Workspace "${command.workspace}" opened!`;

        break;
        case "delete":

    await deleteWorkspace(command.workspace);

    statusText.textContent =
        `🗑️ Workspace "${command.workspace}" deleted!`;

    await loadWorkspaces();

    break;

    case "rename":

    await renameWorkspace(
        command.oldName,
        command.newName
    );

    statusText.textContent =
        `✏️ Workspace renamed to "${command.newName}".`;

    await loadWorkspaces();

    break;

    case "update":

    const currentTabs = await getCurrentTabs();

    await updateWorkspace(
        command.workspace,
        currentTabs
    );

    statusText.textContent =
        `✅ Workspace "${command.workspace}" updated!`;

    await loadWorkspaces();

    break;

    default:

        statusText.textContent =
            "❌ Unknown command.";

}
console.log(command);
});
async function loadWorkspaces() {

    const workspaces = await getAllWorkspaces();

    const list = document.getElementById("workspaceList");

    list.innerHTML = "";

    for (const name in workspaces) {

        const card = document.createElement("div");

        card.className = "workspace-card";

        card.textContent = "📁 " + name;

        card.addEventListener("click", async () => {

            await openWorkspaceTabs(workspaces[name]);

        });

        list.appendChild(card);

    }

}
loadWorkspaces();
