import { SavedEvents, GetEventsInTimespan, addDays, addEvent, LoadData } from "./final-domain.js"

await LoadData();

const formRoot = document.getElementById("add-event-forms");
const eventNameInput = document.getElementById("event-name-input");
const eventStartInput = document.getElementById("event-start-input");
const eventEndInput = document.getElementById("event-end-input");
formRoot.addEventListener("submit", (event) => {
    event.preventDefault();
    addEvent(eventStartInput.value, eventEndInput.value, eventNameInput.value);
    clearSchedule();
    GenerateSchedule(inputDateToStringDate(dateTimeToSearch), dayTimeSpan);
})

const searchFormRoot = document.getElementById("schedule-search-form");
const startDateInput = document.getElementById("date-start-input");
const dateSpanInput = document.getElementById("date-span-input");

var dateTimeToSearch = new Date(Date.now());
var dayTimeSpan = 7;

const month = new Date(Date.now()).getMonth() + 1;
const date = new Date(Date.now()).getDate();
const monthDay = month < 10 ? "0" + month : month;
const dateDay = date < 10 ? "0" + date : date;

startDateInput.value = new Date(Date.now()).getFullYear() + "-" + monthDay + "-" + dateDay;
dateSpanInput.value = 7;

searchFormRoot.addEventListener("submit", (event) => {
    event.preventDefault();
    clearSchedule();
    const splitDate = startDateInput.value.split("-");
    dateTimeToSearch = splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0];
    dayTimeSpan = dateSpanInput.value;
    GenerateSchedule(inputDateToStringDate(dateTimeToSearch), dayTimeSpan);
})

const clearSchedule = () => {
    const scheduleRoot = document.getElementById("true-schedule");
    const numOfChildren = scheduleRoot.children.length;
    for (let index = 0; index < numOfChildren; index++) {
        scheduleRoot.removeChild(scheduleRoot.childNodes[0]);
    }
}

const GenerateSchedule = (startDate, spanOfDays) => {
    const eventsToRender = GetEventsInTimespan(startDate, spanOfDays);
    const scheduleRoot = document.getElementById("true-schedule");

    let eventsFound = [];

    //Add All Found Events
    for (let index = 0; index < spanOfDays; index++) {
        const columnDate = addDays(startDate, index);
        eventsToRender.filter((event) => (columnDate <= event.endTime && columnDate >= event.startTime))
            .forEach((event) => {

                if (!eventsFound.includes(event.eventName)) {
                    eventsFound.push(event.eventName);
                }
            });
    }

    for (let index = 0; index < spanOfDays; index++) {
        const newColumn = document.createElement("div");

        const columnHeader = document.createElement("header");
        const headerDate = document.createElement("h1");

        const columnDate = addDays(startDate, index);
        headerDate.textContent = (columnDate.getMonth() + 1) + " - " + columnDate.getDate();

        columnHeader.appendChild(headerDate);
        newColumn.appendChild(columnHeader);

        newColumn.classList.add("schedule-column");
        scheduleRoot.appendChild(newColumn);
        const daysUp = parseInt(spanOfDays) + 1;
        const sizeOfColumn = 100 / daysUp;
        newColumn.setAttribute("style", "width:" + sizeOfColumn + "%");

        let blockIndex = 0;


        eventsToRender
            .filter((event) => (columnDate <= event.endTime && columnDate >= event.startTime))
            .sort((a, b) => eventsFound.indexOf(a.eventName) > eventsFound.indexOf(b.eventName) ? 1 : -1)
            .forEach((event) => {

                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                const eventCardTitle = document.createElement("p");
                eventCardTitle.textContent = event.eventName;

                const eventCardDescription = document.createElement("p");

                while (blockIndex < eventsFound.indexOf(event.eventName)) 
                {
                    blockIndex++;
                    const fillerCard = document.createElement("div");;
                    fillerCard.classList.add("filler-card");
                    newColumn.appendChild(fillerCard);
                }

                eventCardDescription.textContent = event.hostingUser;

                eventCard.appendChild(eventCardTitle);
                eventCard.appendChild(eventCardDescription);
                newColumn.appendChild(eventCard);
                blockIndex++;
            });
    }
}

const inputDateToStringDate = (inputDate) => {
    const inputtedDate = new Date(inputDate);
    const month = inputtedDate.getMonth() + 1;
    return month + "/" + inputtedDate.getDate() + "/" + inputtedDate.getFullYear();
}

GenerateSchedule(inputDateToStringDate(dateTimeToSearch), dayTimeSpan);