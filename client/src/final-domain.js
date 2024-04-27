import { GetAllUserEvents, AddUserEvent, GetAllUsers, AddUser, GetSignIn, SignIn } from "./final-service.js";

let SavedEvents = [];

let SavedUsers = [];

const LoadData = async () => {
    SavedEvents = await GetAllUserEvents();
    SavedUsers = await GetAllUsers();
}

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

const addEvent = async (startDate, endDate, nameOfEvent) => 
{
    const newEvent = {
        "eventName": nameOfEvent,
        "startTime": new Date(new Date(startDate).toUTCString()),
        "endTime": new Date(new Date(endDate).toUTCString()),
        "hostingUser": "Bilbo Baggins",
        "invitedUsers": ["all"],
        "usersRSVP": ["off"],
    }
    await AddUserEvent(newEvent);
    SavedEvents = await GetAllUserEvents();
}

const CreateNewUser = async(username, password) => 
{
    const newUser = {
        "userName": username,
        "password": password,
    }
    await AddUser(newUser);
    SavedUsers = await GetAllUsers();
}

const CheckForExistingUser = (username) =>
{
    console.log(SavedUsers);
    return SavedUsers.map((user) => user.userName).includes(username);
}

const CheckForValidSignIn = (username, password) => {
    let retval = false;
    SavedUsers.filter((user) => user.userName === username).forEach((user) => {
        retval = user.password === password;
    });
    return retval;
}

export const CheckSignIn = async (username, password) => {
    let userToSignIn = {
        userName: username,
        password: password,
    };
    console.log(userToSignIn);
    await SignIn(userToSignIn);
    SavedUsers = await GetAllUsers();
    console.log(await GetSignIn());
}

export {SavedEvents, GetEventsInTimespan, 
    addDays, addEvent, LoadData, 
    CheckForExistingUser, CreateNewUser,
    CheckForValidSignIn};