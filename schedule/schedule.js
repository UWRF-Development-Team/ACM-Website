let calendarData;


async function getCalendarRSS() {
    const response = await fetch("https://falconsconnect.uwrf.edu/organization/association-for-computing-machinery/events.rss");
    calendarData = await response.text();
    return calendarData;
}

getCalendarRSS().then(xml => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const events = doc.querySelectorAll("item");
    events.forEach(event => {
        const outlink = event.querySelector("link").childNodes[0].textContent;
        const embeddedHTML = event.querySelector("description").childNodes[0].textContent;
        const events = document.querySelector(".events");
        const eventContainer = document.createElement("div");
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.addEventListener("scroll", () => addShadows(eventElement));
        eventElement.innerHTML = embeddedHTML;
        const titleElement = eventElement.querySelector(".summary");
        titleElement.innerHTML = `<h2>${titleElement.innerHTML}</h2>`;

        const timeHeader = document.createElement("header");
        timeHeader.innerHTML = `<p>${extractDateLocation(eventElement)}</p>`

        try {
            const imageLink = event.querySelector("enclosure").attributes.url.textContent;
            titleElement.append(createImage(imageLink));
        } catch {}
        eventElement.append(createOutlinkButton(outlink));

        
        eventContainer.append(eventElement);
        titleElement.after(timeHeader);
        events.append(eventContainer);
        addShadows(eventElement); // Initial shadows on load

        if (events.childElementCount === 0)
            events.append(document.createElement("p").innerText = "Oh no! There's no events! :(");
    })
})

function extractDateLocation(element) {
    let output;
    const timeDiv = element.querySelector("div:has( > p > time)");
    const locationString = timeDiv.querySelector(".location").textContent;

    const startDate = new Date(timeDiv.querySelector(".dtstart").dateTime);
    output = dateToString(startDate);

    output += " to ";

    const endDate = new Date(timeDiv.querySelector(".dtend").dateTime);
    output += dateToString(endDate);

    output += " in " + locationString;

    timeDiv.remove();
    return output;
}

function dateToString(date) {
    return `${date.toLocaleString('default', {month: 'long'})} 
        ${date.getDate()}, ${date.getFullYear()} at 
        ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function createImage(imageLink) {
    const imageElement = document.createElement("img");
    imageElement.src = imageLink;
    imageElement.alt = "A title image for an event";
    return imageElement;
}

function createOutlinkButton(outlink) {
    const anchor = document.createElement("a");
    const outlinkIcon = document.createElement("img");
    outlinkIcon.src = "../media/external-link.svg"; // There's probably a better way to do this
    outlinkIcon.alt = "A icon representing an external link.";
    anchor.append(outlinkIcon);
    anchor.href = outlink;
    anchor.target = "_blank";
    anchor.classList.add("externalLink");
    return anchor;
}

function addShadows(element) {
    if (element.clientHeight + element.scrollTop >= element.scrollHeight - 1) {
        element.classList.remove("bothShadow");
        element.classList.remove("bottomShadow");
        element.classList.add("topShadow");
    } else if (element.scrollTop < 1) {
        element.classList.remove("bothShadow");
        element.classList.remove("topShadow");
        element.classList.add("bottomShadow");
    } else {
        element.classList.add("bothShadow");
        element.classList.remove("topShadow");
        element.classList.remove("bottomShadow");
    }
}