# Lookupper
This is a chrome extension, which adds a functionality to look up a word definitions quickly. For now, it only supports [Oxford Learner's Dictionaries](https://www.oxfordlearnersdictionaries.com/).

<img src="demo/lookupper_demo.gif" alt="Lookupper gif">
<br/>

## Features
- To look up a word:
    - Double click a word.
    - Highlight a word, right click on it, then select 'Look up ~'.
- The pronunciation automatically gets played.
- The popup window will be reused next time you look up, so you can resize and reposition however you want.

<br/>

## Installation
Although this extension is not listed on Chrome Web Store, you can install it by using Developer mode. To install:

1. Clone this repository.
2. Open the Extension Management page by navigating to `chrome://extensions `. 
    - The Extension Management page can also be opened by clicking on the Chrome menu, hovering over **More Tools** then selecting **Extensions**.
3. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
4. Click the **LOAD UNPACKED** button and select this extension repository you downloaded in step 1.

###### (_Cited and modified: https://developer.chrome.com/extensions/getstarted#manifest_)

<br/>

## Acknowledgements
- [chromeExtensionAsync](https://github.com/KeithHenry/chromeExtensionAsync): [Extension API](https://developer.chrome.com/extensions) provided by Google uses callbacks instead of Promises. To avoid callback hell, `chromeExtensionAsync` is used in the code of this extension, which makes Extension API able to handle Promises. It helped a lot to improve maintainability of the code.

- [Feather](https://github.com/feathericons/feather): A collection of beautiful icons. This extension's icon is from Feather. 
