function loadingBars(startingPoint) {
    const iframes = startingPoint.querySelectorAll("iframe");
    for (let i = 0; i < iframes.length; i++) {
        iframes[i].addEventListener("load", () => {
            iframes[i].parentElement.querySelector(".loading").remove();
            iframes[i].classList.remove("hidden");
        });
        createLoadingDiv(iframes[i]);
    }
}

function loadOne(element) {
    element.addEventListener("load", () => {
        element.parentElement.querySelector(".loading").remove();
        element.classList.remove("hidden");
    });
    createLoadingDiv(element);
}

function createLoadingDiv(element) {
    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loading");
    loadingDiv.style.width = element.offsetWidth + "px";
    loadingDiv.style.height = element.offsetHeight + "px"
    element.before(loadingDiv);
    element.classList.add("hidden");
}