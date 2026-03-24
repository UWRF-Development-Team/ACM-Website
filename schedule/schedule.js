let calendarData ="wow";


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
        const embeddedHTML = event.querySelector("description").childNodes[0].data;
        const list = document.querySelector("#content ul");
        const listElement = document.createElement("li");
        listElement.innerHTML = embeddedHTML;
        list.append(listElement);
    })
})

