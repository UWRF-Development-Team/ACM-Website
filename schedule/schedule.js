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
    console.log(events);
    events.forEach(event => {
        const outlink = event.querySelector("link").childNodes[0].textContent;
        const embeddedHTML = event.querySelector("description").childNodes[0].textContent;
        const events = document.querySelector(".events");
        const eventElement = document.createElement("div");
        eventElement.innerHTML = embeddedHTML;
        const titleElement = eventElement.querySelector(".summary");
        titleElement.innerHTML = `<h3>${titleElement.innerHTML}</h3>`;
        const timeDiv = eventElement.querySelector("div:has( > p > time)");
        timeDiv.classList.add("timeLocation");

        timeDiv.querySelectorAll("time").forEach(element => {
            const date = new Date(element.dateTime);
            element.innerHTML = `${date.toLocaleString('default', {month: 'long'})} ${date.getDay()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        })

        const anchor = document.createElement("a");
        const outlinkIcon = document.createElement("img");
        outlinkIcon.src = "../media/external-link.svg"; // There's probably a better way to do this
        outlinkIcon.alt = "A icon representing an external link.";
        anchor.append(outlinkIcon);
        anchor.href = outlink;
        anchor.target = "_blank";
        anchor.classList.add("externalLink");
        timeDiv.append(anchor);

        events.append(eventElement);
    })
})