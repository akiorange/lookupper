// Repeatedly searches for the target element according to the array of selectors
// Parameters:
//   parent: element object, represents the element a search starts
//   selectors: array of strings, represents CSS selectors in order to get the target element
function intervalForAudio(parent, selectors) {

    // Base case: If all selectors used, click the element and return
    if (selectors.length === 0) {
        parent.click();
        return;
    }

    // Store setInterval to a variable
    // so that the interval can be stopped by 'clearInterval()'
    let checkInterval = setInterval(() => {

        // If the passed time exceeded the maxSeconds, stop searching.
        if (new Date().getTime() - start.getTime() > maxSeconds) {
            clearInterval(checkInterval);

        // If the passed time didn't exceed the maxSeconds
        } else {

            let el = parent.querySelector(selectors[0]);

            // If element found
            if (el) {
                clearInterval(checkInterval);

                // Update the variables for the next search
                selectors.shift();
                parent = el;

                // Begin the next search using updated selectors and parent
                intervalForAudio(parent, selectors);
            }
        }
    }, intervalSeconds);
}

// Miliseconds the next search occurs after a search failed.
let intervalSeconds = 50;

// Maximum miliseconds the searching interval stops after.
let maxSeconds = 20000;

// Search for the audio element then click it
let start = new Date();
chrome.storage.local.get('audioSelectors', stor => {
    intervalForAudio(document, stor.audioSelectors);
});
