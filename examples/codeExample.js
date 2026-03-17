window.addEventListener("load", () => {
    const codeBlocks = document.querySelectorAll("code img");
    for (let i = 0; i < codeBlocks.length; i++) {
        codeBlocks[i].addEventListener("click", () => {
            codeBlocks[i].classList.remove("bouncy");
            navigator.clipboard.writeText(codeBlocks[i].parentElement.innerText);
            codeBlocks[i].addEventListener("animationend", () => {
               codeBlocks[i].classList.remove("bouncy");
               }, {once: true});
            codeBlocks[i].classList.add("bouncy");
        });
    }
});