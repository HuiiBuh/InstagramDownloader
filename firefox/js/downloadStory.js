anchorClassOne = "Igw0E _56XdI eGOV_ ybXk5 _4EzTm";
anchorClassTwo = "Igw0E _56XdI eGOV_ _4EzTm soMvl";
childAnchorTwo = "yn6BW";


storyPicturedownload = "y-yJ5";
storyVideoDownload = "y-yJ5  OFkrO";

class DownloadStory {
    
    constructor() {
        this.downloadButton = null;
    }

    /**
     * Creates the download Button to the right position
     */
    createButton() {

        let temp1 = document.getElementsByClassName(anchorClassOne);
        let temp2 = document.getElementsByClassName(anchorClassTwo)[0].getElementsByClassName(childAnchorTwo);

        let root = null;
        if (temp1.length > 0) {
            root = temp1[0];
        } else if (temp2.length > 0) {
            root = temp2[0];
        }


        this.downloadButton = document.createElement("div");
        let downloadImage = browser.runtime.getURL("icons/download_multiple.png");
        this.downloadButton.style.backgroundImage = "url(" + downloadImage + ")";
        this.downloadButton.style.backgroundSize = "75%";
        this.downloadButton.style.backgroundRepeat = "no-repeat";
        this.downloadButton.style.backgroundPosition = "center";
        this.downloadButton.style.display = "inline-block";
        this.downloadButton.id = "story-download-button";
        this.downloadButton.style.width = "1.1rem";
        this.downloadButton.style.height = "1.1rem";
        this.downloadButton.style.marginLeft = ".4rem";
        this.downloadButton.style.cursor = "pointer";

        this.downloadButton.addEventListener("click", function () {
            storyDownload.issueDownload();
        });
        root.appendChild(this.downloadButton);
    }

    /**
     * starts the download by getting the src tag of the image
     */
    issueDownload() {
        let downloadPicture = document.getElementsByClassName(storyPicturedownload);

        let downloadVideo = document.getElementsByClassName(storyVideoDownload);

        if (downloadPicture.length === 1) {
            downloadPicture = downloadPicture[0];
            let dlUrl = downloadPicture.src;
            browser.runtime.sendMessage({"url": dlUrl, "user": "HuiBuh", "type": "image"});
        } else if (downloadPicture.length === 3) {
            downloadPicture = downloadPicture[2].firstChild;
            let dlUrl = downloadPicture.src;
            browser.runtime.sendMessage({"url": dlUrl, "user": "HuiBuh", "type": "video"});
        }
        //ToDo Video download
    }

    /**
     * removes the button
     */
    removeButton() {
        try {
            this.downloadButton.remove();
        } catch (e) {
            console.log("Could not remove the story button");
        }
    }
}