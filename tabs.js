
/* ==========================================
   TABNEST TAB MANAGER
========================================== */

async function getCurrentTabs() {

    const tabs = await chrome.tabs.query({
        currentWindow: true
    });

    return tabs
        .filter(tab =>
            tab.id !== undefined &&
            tab.url &&
            /^https?:\/\//i.test(tab.url)
        )
        .map(tab => ({
            title: tab.title || "Untitled",
            url: tab.url
        }));
}


async function openWorkspaceTabs(workspace) {

    if (!Array.isArray(workspace) || workspace.length === 0) {
        throw new Error("This workspace has no saved tabs.");
    }

    let opened = 0;

    for (const tab of workspace) {

        if (!tab.url || !/^https?:\/\//i.test(tab.url)) {
            continue;
        }

        await chrome.tabs.create({
            url: tab.url,
            active: opened === 0
        });

        opened++;
    }

    if (opened === 0) {
        throw new Error("No valid web addresses found in this workspace.");
    }

    return opened;
}
