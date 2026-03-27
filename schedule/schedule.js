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
        const embeddedHTML = event.querySelector("description").childNodes[0].data;
        const list = document.querySelector(".events");
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

        list.append(eventElement);
    })
})