import { GetAccount, SavedUsers, addEvent } from "./final-domain.js";
import { GetAllUsers } from "./final-service.js";

const messageRoot = document.getElementById("main-sign-in");
let listOfGuests = [];

const errorMessage = document.getElementById("error-message");
errorMessage.style.setProperty("display", "none");

const CreateScheduleForm = async () => {

    const createEventHeader = document.createElement("h1");
    createEventHeader.textContent = "New Event";

    const hostedByText = document.createElement("h3");
    hostedByText.textContent = "Hosted by " + (await GetAccount()).userName;

    const formRoot = document.createElement("form");
    formRoot.classList.add("add-event-forms");

    const eventNameInput = document.createElement("input");
    eventNameInput.setAttribute("type", "text");
    eventNameInput.classList.add("event-name-input");

    const eventStartInput = document.createElement("input");
    eventStartInput.setAttribute("type", "date");
    eventStartInput.classList.add("event-start-input");

    const eventEndInput = document.createElement("input");
    eventEndInput.setAttribute("type", "date");
    eventEndInput.classList.add("event-end-input");

    const whosInvited = document.createElement("h3");
    whosInvited.textContent = "Who's Invited?";

    const rsvpList = document.createElement("div");
    rsvpList.classList.add("rsvp-list");

    (await GetAllUsers()).forEach(async (user) => {
        if (user.userName !== (await GetAccount()).userName) {
            const newRsvpDivider = document.createElement("div");
            newRsvpDivider.classList.add("rsvp-option")

            const newRsvpOption = document.createElement("input");
            newRsvpOption.setAttribute("type", "checkbox");
            newRsvpOption.checked = true;
            const newRsvpLabel = document.createElement("p");
            newRsvpLabel.textContent = user.userName;

            listOfGuests.push({ input: newRsvpOption, user: user.userName });

            newRsvpDivider.appendChild(newRsvpOption);
            newRsvpDivider.appendChild(newRsvpLabel);

            rsvpList.appendChild(newRsvpDivider);
        }
    });

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Create Event")

    const resetButton = document.createElement("input");
    resetButton.setAttribute("type", "reset");
    resetButton.setAttribute("value", "Clear")

    formRoot.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (eventStartInput.value === "") {
            CreateErrorMessage("All fields must be filled in!");
        } else if (eventEndInput.value === "") {
            CreateErrorMessage("All fields must be filled in!");
        } else if (eventNameInput.value === "") {
            CreateErrorMessage("All fields must be filled in!");
        } else if (new Date(eventStartInput.value) > new Date(eventEndInput.value)) {
            CreateErrorMessage("The event cannot end before it begins!");
        } else {
            let guestsInvited = [];
            guestsInvited.push((await GetAccount()).userName);
            listOfGuests.forEach((option) => {
                if (option.input.checked) {
                    guestsInvited.push(option.user);
                }
            })
            addEvent(eventStartInput.value, eventEndInput.value, eventNameInput.value, (await GetAccount()).userName, guestsInvited);
        }

    })


    messageRoot.appendChild(formRoot);
    formRoot.appendChild(createEventHeader);
    formRoot.append(hostedByText);
    formRoot.appendChild(eventNameInput);
    formRoot.appendChild(eventStartInput);
    formRoot.appendChild(eventEndInput);
    formRoot.appendChild(whosInvited);
    formRoot.appendChild(rsvpList);
    formRoot.appendChild(submitButton);
    formRoot.appendChild(resetButton);
}

const CreateSignInMessage = () => {
    const newErrorBlock = document.createElement("div");
    newErrorBlock.classList.add("need-sign-in-que");
    const newSignInText = document.createElement("h1");
    newSignInText.textContent = "You must be signed in to schedule events!";
    const newSignInLink = document.createElement("a");
    newSignInLink.textContent = "Sign In";
    newSignInLink.setAttribute("href", "sign-in.html");

    newErrorBlock.appendChild(newSignInText);
    newErrorBlock.appendChild(newSignInLink);
    messageRoot.appendChild(newErrorBlock);
}

const signinlink = document.getElementById("account-link");
const accountImage = document.createElement("span");
accountImage.classList.add("material-symbols-outlined")
accountImage.textContent = "person";

signinlink.appendChild(accountImage);

const signInText = document.createElement("p");

console.log(await GetAccount());
if ((await GetAccount()) !== null) {
    console.log(await GetAccount());
    signInText.textContent = (await GetAccount()).userName;
} else {
    signInText.textContent = "Sign In"
}


const CreateErrorMessage = (msg) => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.setProperty("display", "block");
    document.getElementById("error-para").textContent = msg;
}

signinlink.appendChild(signInText);

if ((await GetAccount()) !== null) {
    await CreateScheduleForm();
} else {
    CreateSignInMessage();
}