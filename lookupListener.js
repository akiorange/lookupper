// Remove the previously added listener.
// Without removing it, multiple windows will be opened at the same time.
// However, it cannot remove the listener added before the extension gets reloaded.
// Hence, an error occurs caused by a ramining listener, but I can think of any solutions.
// You can catch the error in handleDblclick function for now.
if (typeof handleDblclick === 'function') {
    document.removeEventListener('dblclick', handleDblclick);

// It seems redundant but 'let handleDblclick;' should be contained inside else block here.
// See details at: https://dmitripavlutin.com/javascript-variables-and-temporal-dead-zone/
} else {
    let handleDblclick;
}


// Define handleDblclick if it is not defined yet
handleDblclick = function (evt) {
    // If the event target is input or textarea, return
    if (['INPUT', 'TEXTAREA'].includes(evt.target.tagName)) return;

    // Store highlighted text
    selection = window.getSelection().toString();
    selection = selection.trim();

    // If the text is not empty string
    if (selection) {
        try {
                chrome.storage.local.set({'selection': selection});
                chrome.runtime.sendMessage({message: 'selection'});
        } catch (err) {
            // pass
        }
    }
}


// Add a listener for text selection by double click.
document.addEventListener('dblclick', handleDblclick);
