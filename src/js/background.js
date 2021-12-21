import "../images/icon-128.png";
import "../images/icon-34.png";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "loading" && tab.active) {
        loadBody();
    }
});

const redirectUrl = (tabs, oldUrl) => {
    chrome.tabs.update(tabs[0].id, {
        url: `https://12ft.io/proxy?q=${oldUrl.toString()}`,
    });
};

const loadBody = () => {
    chrome.tabs.query({ active: true }, (tabs) => {
        chrome.storage.sync.get("urlInput", (data) => {
            redirectUrl(tabs, data.urlInput);
        });
    });
};