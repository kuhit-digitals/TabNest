
/* ==========================================
   TABNEST WORKSPACE STORAGE
========================================== */

const WORKSPACE_KEY = "tabnest_workspaces";

async function getAllWorkspaces() {

    const data = await chrome.storage.local.get(WORKSPACE_KEY);

    return data[WORKSPACE_KEY] || {};
}


async function saveWorkspace(name, tabs) {

    name = name.trim();

    if (!name) throw new Error("Workspace name is required.");

    const workspaces = await getAllWorkspaces();

    if (workspaces[name]) {
        throw new Error("A workspace with this name already exists.");
    }

    workspaces[name] = tabs.map(tab => ({
        title: tab.title,
        url: tab.url
    }));

    await chrome.storage.local.set({
        [WORKSPACE_KEY]: workspaces
    });

}


async function getWorkspace(name) {

    const workspaces = await getAllWorkspaces();

    return workspaces[name] || null;
}


async function deleteWorkspace(name) {

    const workspaces = await getAllWorkspaces();

    if (!workspaces[name]) {
        throw new Error("Workspace not found.");
    }

    delete workspaces[name];

    await chrome.storage.local.set({
        [WORKSPACE_KEY]: workspaces
    });

}


async function renameWorkspace(oldName, newName) {

    const workspaces = await getAllWorkspaces();

    if (!workspaces[oldName]) {
        throw new Error("Original workspace not found.");
    }

    if (workspaces[newName]) {
        throw new Error("A workspace with the new name already exists.");
    }

    workspaces[newName] = workspaces[oldName];

    delete workspaces[oldName];

    await chrome.storage.local.set({
        [WORKSPACE_KEY]: workspaces
    });

}


async function updateWorkspace(name, newTabs) {

    const workspaces = await getAllWorkspaces();

    if (!workspaces[name]) {
        throw new Error("Workspace not found.");
    }

    const existing = workspaces[name];

    const urls = new Set(existing.map(tab => tab.url));

    for (const tab of newTabs) {

        if (!urls.has(tab.url)) {

            existing.push({
                title: tab.title,
                url: tab.url
            });

            urls.add(tab.url);
        }
    }

    workspaces[name] = existing;

    await chrome.storage.local.set({
        [WORKSPACE_KEY]: workspaces
    });

}
