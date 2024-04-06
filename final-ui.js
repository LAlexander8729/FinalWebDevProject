import { SavedEvents, GetEventsInTimespan } from "./final-domain.js"

const GenerateSchedule = (startDate, spanOfDays) => {
    const eventsToRender = GetEventsInTimespan(startDate, spanOfDays);
    
}