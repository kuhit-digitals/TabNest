async function getCurrentTabs() {

    const tabs = await chrome.tabs.query({});
    return tabs;

}


async function closeCurrentTabs() {

    const tabs = await chrome.tabs.query({});
    const ids = tabs.map(tab => tab.id);

    await chrome.tabs.remove(ids);

}


async function openWorkspaceTabs(workspace) {

    for (const tab of workspace) {

        await chrome.tabs.create({
            url: tab.url
        });

    }

}