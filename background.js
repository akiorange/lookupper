////// Initialization
// Initialize storage values
chrome.storage.local.set({'lastWindowId': null});
chrome.storage.local.set({'audioPlayed': false});
chrome.storage.local.set({'audioSelectors': ['#entryContent', '.phons_n_am', '.sound']});

// Assign window properties to variables
// The chrome.storage could be used when the user customization feature will be added.

customWidth = Math.round(screen.availWidth * 2 / 5);
customHeight = screen.availHeight;
customLeft = Math.round(screen.availWidth - customWidth);
// the variable name 'top' used by chrome? that's why custom... used as variable names here
// and the top property seems like doesn't change popup window's position, I don't know why
customTop = null;




// Create context menu
let contextProperties = {
    "id": "lookup",
    "title": 'Look up "%s"',
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextProperties);


// Add listener for context menu
chrome.contextMenus.onClicked.addListener(evt => {
    if (evt.menuItemId === 'lookup') {
        // .trim() is not needed since automatically done by context menu.
        selection = evt.selectionText;
        if (selection) {
            console.log('After selection');
            chrome.storage.local.set({'selection': selection});
            onSelection();
        }
    }
});


// When a tab gets activated, inject script to add listener for double click event.
// This is for mainly when this extensions is loaded after some tabs opened.
// Without this onActivated listener, the listener for double click won't be added to the previously opened tabs
// until the user reload the tabs. (i.e. until onUpdated gets called on the tabs)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    let tab = await chrome.tabs.get(activeInfo.tabId);

    // Return tab's url is not set yet or is invalid.
    if (!tab.url || !isValidURL(tab.url)) return;

    // Inject script to add event listenr for selection
    chrome.tabs.executeScript(tab.id, {file: './lookupListener.js'}, () => {console.log("listener.js injected by onActivated.")});
});


// onUpdated:
// - Play audio when the tab, which opened by this extension, gets updated.
// - Add listener for double click event if the tab, which is not opened by this extension, gets updated.
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (!isValidURL(tab.url)) return;

    // store id of the last tab to the variable 'lastTabId'
    // If lastWindowId is null, lastTabId left as null
    let lastTabId = null
    let stor = await chrome.storage.local.get('lastWindowId');
    let lastWindowId = stor.lastWindowId;
    if (lastWindowId) {
        let tabs = await chrome.tabs.query({windowId: lastWindowId});
        lastTabId = tabs[0].id
    }

    // If updated tab is the last tab, play audio
    if (lastTabId === tabId && changeInfo.status === "loading") {
        playAudio();

    // If url is valid and the updated tab is not the last tab,
    // after status becomes complete,
    // add listener for double click
    } else if (changeInfo.status === "complete") {
        chrome.tabs.executeScript(tabId, {file: './lookupListener.js'}, () => {console.log("listener injected.")});
    }
});


// onMeessage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // When text selected, search for the text in the window of type 'popup'
    if (request.message === 'selection') {
        onSelection();
    }
});


// Create new window if the opened window doesn't exist
// Update the opend winow otherwise
async function onSelection () {
    let stor = await chrome.storage.local.get('lastWindowId');
    let lastWindowId = stor.lastWindowId;

    // if the last window not alive
    if (lastWindowId === null) {
        await createNewWindow();
    // if the last window alive
    } else {
        await updateLastWindow();
    }

    chrome.storage.local.set({'audioPlayed': false});
}


// Add a listener which sets storage of 'lastWindow' to null when the window opened by this extension is closed
async function addOnRemoved (windowId) {
    try{
        chrome.windows.onRemoved.addListener(async (windowId) => {
            let stor = await chrome.storage.local.get('lastWindowId');
            if (windowId === stor.lastWindowId) {
                chrome.storage.local.set({'lastWindowId': null});
            }
        });
    } catch (err) {
        console.log('AddOnRemoved failed.');
        console.log(err);
    }
}


// Create new window
async function createNewWindow () {
    try {
        let stor = await chrome.storage.local.get('selection');
        let selection = stor.selection;
        let createdWindow = await chrome.windows.create({
            url: urlCreater(selection),
            left: customLeft,
            top: customTop,
            width: customWidth,
            height: customHeight,
            type: "popup"
        });
        addOnRemoved(createdWindow.id);
        return await chrome.storage.local.set({'lastWindowId': createdWindow.id});
    } catch (err) {
        console.log('createNewWindow failed.');
        console.log(err);
    }
}


// Update the url in the window opened by this exetension
async function updateLastWindow () {
    try {
        let stor = await chrome.storage.local.get('lastWindowId');
        let lastWindowId = stor.lastWindowId;
        let tabs = await chrome.tabs.query({windowId: lastWindowId});
        stor = await chrome.storage.local.get('selection');
        let selection = stor.selection;
        chrome.windows.update(lastWindowId, {focused: true});
        return await chrome.tabs.update(tabs[0].id, {url: urlCreater(selection)});
    } catch (err) {
        console.log('updateLastWindow failed.');
        console.log(err);
    }
}


// Play audio
async function playAudio () {
    // If audio have already been played, return
    let stor = await chrome.storage.local.get('audioPlayed');
    let audioPlayed = stor.audioPlayed;
    if (audioPlayed) return;
    stor = await chrome.storage.local.get('lastWindowId');
    let lastWindowId = stor.lastWindowId;
    let tabs =  await chrome.tabs.query({windowId: lastWindowId});
    await chrome.storage.local.set({'audioPlayed': true});
    chrome.tabs.executeScript(tabs[0].id, {file: './playAudio.js'}, () => {
        console.log("playaudio injected.")
    });
}


// Returns true if url is valid, else returns false
function isValidURL (url) {
    if ((/^chrome:\/\//).test(url)) {
        return false;
    }
    if ((/^chrome-extension:\/\//).test(url)) {
        return false;
    }
    if ((/^https?:\/\/chrome.google.com/).test(url)) {
        return false;
    }
    return true;
}


// Returns the url for lookup with the passed word
function urlCreater (selectedWord) {
    return 'https://www.oxfordlearnersdictionaries.com/search/english/direct/?q=' + selectedWord.toLowerCase();
}
