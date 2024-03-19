let siteLocation = 0;
let pageIsLoaded = false;

window.addEventListener("wheel", (event) => {

    const container = document.getElementById("container");

    const marginLeft = container.getBoundingClientRect().left;

    if (marginLeft < 0) {
        document.querySelector("body").style.overflowY = 'unset';
        if (!pageIsLoaded) {
            const iframe = document.createElement("iframe");
            iframe.src = "components/page1.html";
            document.querySelector("body").appendChild(iframe);
            pageIsLoaded = true;
        }
    }
    else {
        document.querySelector("body").style.overflowY = 'hidden';

        if (pageIsLoaded) {
            document.querySelector("body").removeChild(document.querySelector("iframe"));
            pageIsLoaded = false;
        }

    }

    const fullSite = document.getElementById("full-site");

    let scrollLocation = event.deltaY;
    scrollLocation > 0 ? (marginLeft > 0 ? siteLocation += 50 : null) : siteLocation -= 50;

    if (siteLocation > 0) {
        fullSite.style.transform = `translateX(-${siteLocation}px)`;
    }
    else {
        siteLocation = 0;
    }

    /*

    if (marginLeft < 0) {
        itemSize += 1;
    }
    container.style.transform = `scale(${itemSize})`;
     */
});