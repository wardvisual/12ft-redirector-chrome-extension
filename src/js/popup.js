import "../css/popup.css";

class Popup {
    constructor() {}

    async saveOptions(urlInput) {
        await chrome.storage.sync.set({
                urlInput,
            },
            () => {
                window.location.reload();
            }
        );
    }

    async restoreOptions() {
        const urlInput = document.querySelector("#urlInput");

        await chrome.storage.sync.get("urlInput", function(data) {
            urlInput.value = data.urlInput;
        });
    }

    handleForm() {
        const form = document.querySelector("form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const keyValuePair = [];

            for (let i = 0; i < form.elements.length - 1; i++) {
                const formElements = form.elements[i];

                keyValuePair.push(encodeURIComponent(formElements.value));
            }

            const queryString = keyValuePair.join("");

            this.saveOptions(queryString);
        });
    }
}

const popup = new Popup();

popup.handleForm();
popup.restoreOptions();