const dlAllRootClass = "nZSzR";
const dlAllImage = "v1Nh3 kIKUG  _bz0w";
const dlAllLoader = "By4nA";
const dlAllStopClass = "_0mzm- sqdOP yWX7d";


class DownloadAll {

    constructor() {
        this.downloadAllButton = "";
        this.modal = "";
        this.imageJSON = [];
        this.urls = [];
    }


    createComponents() {
        this.createButton();
        this.createModal();
    }


    createButton() {
        let root = document.getElementsByClassName(dlAllRootClass)[0];


        this.downloadAllButton = document.createElement("a");
        this.downloadAllButton.classList.add("ffKix");
        root.appendChild(this.downloadAllButton);

        let button = document.createElement("button");
        this.downloadAllButton.appendChild(button);
        button.classList.add("_0mzm-");
        button.classList.add("sqdOP");
        button.classList.add("L3NKy");
        button.style.marginLeft = ".2rem";
        button.innerText = "Download All";


        this.downloadAllButton.addEventListener("click", function () {
            downloadAllButton.modal.style.display = "block";
        });

    }


    createModal() {
        let body = document.body;

        this.modal = document.createElement("div");
        this.modal.classList.add("modal");
        this.modal.id = "modal";
        body.appendChild(this.modal);

        var modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        modalContent.id = "modal-content";
        this.modal.appendChild(modalContent);

        let closeModal = document.createElement("span");
        closeModal.innerHTML = "&times";
        closeModal.classList.add("close");
        closeModal.onclick = function () {
            downloadAllButton.modal.style.display = "none";
        };
        modalContent.appendChild(closeModal);

        let text = document.createElement("p");
        text.innerHTML = "Do you want to download all pictures of this account? <br> The page will automatically scroll " +
            "down until all images are loaded. <br> Don´t Interrupt the Process";
        text.classList.add("text");
        modalContent.appendChild(text);


        let cancelButton = document.createElement("button");
        cancelButton.style.cssFloat = "left";

        cancelButton.classList.add("_0mzm-");
        cancelButton.classList.add("sqdOP");
        cancelButton.classList.add("L3NKy");

        cancelButton.innerText = "Cancel";

        cancelButton.onclick = function () {
            downloadAllButton.modal.style.display = "none";
        };
        modalContent.appendChild(cancelButton);


        let agreeButton = document.createElement("button");
        agreeButton.innerText = "Start";

        agreeButton.classList.add("_0mzm-");
        agreeButton.classList.add("sqdOP");
        agreeButton.classList.add("L3NKy");

        agreeButton.style.cssFloat = "right";
        agreeButton.onclick = function () {
            downloadAllButton.modal.style.display = "none";
            sleep(10);
            downloadAllButton.start();
        };

        modalContent.appendChild(agreeButton);


        window.onclick = function (event) {
            if (event.target == document.getElementById("modal")) {
                modal.style.display = "none";
            }
        };

    }

    removeComponents() {
        try {
            this.downloadAllButton.remove();
            this.modal.remove();
        } catch (e) {
            console.log("Could not remove the download All components")
        }
    }

    async start() {
        await this.scrollDown();
        await this.requests(this.urls);

        while (this.urls.length > this.imageJSON.length) {
            await sleep(20);
        }

        let dlUrl = this.createDownloadImages();
        browser.runtime.sendMessage({"url": dlUrl, "user": "HuiBuh", "type": "bulk"});
    }


    async fillUrls() {

        let images = document.getElementsByClassName(dlAllImage);

        let part = null;
        for (var i = 0; i < images.length; ++i) {
            part = images[i].firstChild.getAttribute("href");
            if (!this.urls.includes("https://www.instagram.com" + part + "?__a=1"))
                this.urls.push("https://www.instagram.com" + part + "?__a=1");
        }
    }


    async scrollDown() {
        await sleep(10);
        while (document.getElementsByClassName(dlAllLoader).length > 0) {
            scrollBy(0, 10000);
            if (document.getElementsByClassName(dlAllStopClass).length > 0)
                return;
            await sleep(100);
            if (document.getElementsByClassName(dlAllStopClass).length > 0)
                return;
            this.fillUrls()
        }
    }

    async requests(urls) {
        let url;


        for (let i = 0; i < urls.length; ++i) {

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    let json = JSON.parse(xhttp.responseText);
                    downloadAllButton.imageJSON.push(json);
                }
            };
            url = urls[i];
            xhttp.open("GET", urls[i], true);
            xhttp.send();
        }
    }

    createDownloadImages() {

        let json;
        let downloadURLs = [];
        for (let i = 0; i < this.imageJSON.length; ++i) {
            json = this.imageJSON[i];

            if (json["graphql"]["shortcode_media"]["__typename"].includes("Video")) {
                downloadURLs.push(json["graphql"]["shortcode_media"]["video_url"]);
            } else if (json["graphql"]["shortcode_media"]["__typename"].includes("Image")) {
                downloadURLs.push(json["graphql"]["shortcode_media"]["display_resources"]["2"]["src"])
            } else if (json["graphql"]["shortcode_media"]["__typename"].includes("GraphSidecar")) {
                for (let x = 0; x < json["graphql"]["shortcode_media"]["edge_sidecar_to_children"]["edges"].length; ++x) {
                    downloadURLs.push(json["graphql"]["shortcode_media"]["edge_sidecar_to_children"]["edges"][x]["node"]["display_url"]);
                }
            }
        }

        return downloadURLs


    }
}