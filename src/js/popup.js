import "../css/popup.css";

class Popup {
    saveOptions(urlInput) {
        chrome.storage.sync.set({
                urlInput,
            },
            () => {
                alert("Are you ready?");
            }
        );
    }

    async restoreOptions() {
        const urlInput = document.querySelector("#urlInput");

        await chrome.storage.sync.get("urlInput", (data) => {
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
            return queryString;
        });
    }
}

const popup = new Popup();

document.addEventListener("DOMContentLoaded", () => {
    popup.handleForm();
    popup.restoreOptions();
});