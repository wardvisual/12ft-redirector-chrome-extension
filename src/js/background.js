import "../images/icon-128.png";
import "../images/icon-34.png";

class Background {
    default () {
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            alert("ACTIVE 1");

            if (changeInfo.status === "loading" && tab.active) {
                alert("ACTIVE 2");
                this.getBody();
            }
        });
    }

    async getBody() {
        await chrome.tabs.query({ active: true }, function(tabs) {
            await chrome.storage.sync.get("urlInput", (data) => {
                alert("getBody", data.urlInput);
                this.redirectUrl(tabs, data.urlInput);
            });
        });
    }

    redirectUrl(tabs, oldUrl) {
        chrome.tabs.update(tabs[0].id, {
            url: `https://12ft.io/${oldUrl.toString()}`,
        });
    }
}

const bg = new Background();

alert("BG RUNNING");
bg.default();