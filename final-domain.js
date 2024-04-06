const SavedEvents = [
    {
        "eventName": "Group BBQ",
        "startTime": "25/04/2022, 13:08:15",
        "endTime": "25/04/2022, 13:08:15"
    },
    {
        "eventName": "Group BBQ",
        "startTime": "25/04/2022, 13:08:15",
        "endTime": "25/04/2022, 13:08:15"
    },];

const GetEventsInTimespan = (startDate, numberOfDays) => {
    let sortedEvents = SavedEvents;
    sortedEvents = sortedEvents.filter((event) => event.startTime <= startDate + numberOfDays);
    return sortedEvents;
}

export {SavedEvents, GetEventsInTimespan};