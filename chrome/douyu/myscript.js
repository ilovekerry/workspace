function changeBackgroundColor() {
    chrome.tabs.executeScript({
        file: 'main.js'
    });
};
document.addEventListener('DOMContentLoaded', () => {
changeBackgroundColor();
});