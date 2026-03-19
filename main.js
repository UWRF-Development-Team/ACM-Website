function loadingBars(startingPoint) {
    const iframes = startingPoint.querySelectorAll("iframe");
    for (let i = 0; i < iframes.length; i++) {
        iframes[i].addEventListener("load", () => {
            iframes[i].parentElement.querySelector(".loading").remove();
            iframes[i].classList.remove("hidden");
        });
        const loadingDiv = document.createElement("div");
        loadingDiv.classList.add("loading");
        loadingDiv.style.width = iframes[i].offsetWidth + "px";
        loadingDiv.style.height = iframes[i].offsetHeight + "px"
        iframes[i].before(loadingDiv);
        iframes[i].classList.add("hidden");
    }
}