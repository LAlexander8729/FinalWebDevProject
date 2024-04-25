const SavedEvents = [
    {
        "eventName": "Group BBQ",
        "startTime": new Date(new Date("4/25/24").toUTCString()),
        "endTime": new Date(new Date("4/26/24").toUTCString()),
    },
    {
        "eventName": "Bowling Tournament",
        "startTime": new Date(new Date("4/26/24").toUTCString()),
        "endTime": new Date(new Date("4/26/24").toUTCString()),
    },
    {
        "eventName": "Rain Festival",
        "startTime": new Date(new Date("4/26/24").toUTCString()),
        "endTime": new Date(new Date("4/29/24").toUTCString()),
    }];

const GetEventsInTimespan = (startDate, numberOfDays) => {
    let sortedEvents = SavedEvents;
    startDate = new Date(startDate);
    sortedEvents = sortedEvents.filter((event) => ((
        event.startTime >= startDate && event.startTime <= addDays(startDate, numberOfDays)) || 
        (event.startTime <= addDays(startDate, numberOfDays) && event.endTime >= startDate
        )));
    return sortedEvents;
}

const addDays = (date, addDays) => {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + addDays);
    return newDate;
}

const addEvent = (startDate, endDate, nameOfEvent) => 
{
    const newEvent = {
        "eventName": nameOfEvent,
        "startTime": new Date(new Date(startDate).toUTCString()),
        "endTime": new Date(new Date(endDate).toUTCString()),
    }
    console.log(newEvent);
    SavedEvents.push(newEvent);
    console.log(SavedEvents);
}

export {SavedEvents, GetEventsInTimespan, addDays, addEvent};