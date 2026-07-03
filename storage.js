async function saveWorkspace(name, tabs) {

    const workspace = tabs.map(tab => ({
        title: tab.title,
        url: tab.url
    }));

    await chrome.storage.local.set({
        [name]: workspace
    });

}

async function getWorkspace(name) {

    const data = await chrome.storage.local.get(name);

    return data[name];

}
async function getAllWorkspaces() {

    const data = await chrome.storage.local.get(null);

    return data;

}

async function deleteWorkspace(name) {

    await chrome.storage.local.remove(name);

}
async function renameWorkspace(oldName, newName) {

    const workspace = await getWorkspace(oldName);

    if (!workspace) return;

    await chrome.storage.local.set({
        [newName]: workspace
    });

    await deleteWorkspace(oldName);

}
async function updateWorkspace(name, newTabs) {

    const workspace = await getWorkspace(name);

    if (!workspace) return;

    const existingUrls = new Set(
        workspace.map(tab => tab.url)
    );

    for (const tab of newTabs) {

        if (!existingUrls.has(tab.url)) {

            workspace.push({
                title: tab.title,
                url: tab.url
            });

        }

    }

    await chrome.storage.local.set({
        [name]: workspace
    });

}