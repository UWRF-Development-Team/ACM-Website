window.addEventListener("load", () => {
    const elements = document.querySelectorAll("body *");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.rotate = Math.random() * 10 * (Math.random() < 0.5 ? 1 : -1) + "deg";
    }
    const body = document.querySelector("body");
     body.style.backgroundImage = `repeating-radial-gradient(red, orange, yellow, green, blue, purple ${Math.random() * 50}%)`;
});

function openTabs() {
    for (let i = 0; i < Math.random() * 50; i++) {
        window.open("https://acm.org", "_blank");
    }
}