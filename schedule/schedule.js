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
    const embeddedHTML = events[0].querySelector("description").childNodes[0].data;
    document.querySelector("#content div").innerHTML = embeddedHTML;
})

