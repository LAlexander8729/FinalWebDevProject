import { CheckForExistingUser, CheckForValidSignIn, CreateNewUser, LoadData, CheckSignIn } from "./final-domain.js";

const userNameInput = document.getElementById("user-name-input");
const userPasswordInput = document.getElementById("user-password-input");
const signInButton = document.getElementById("sign-in-button");
const createAccountButton = document.getElementById("create-account-button");
const mainForm = document.getElementById("main-sign-in");

mainForm.addEventListener("submit", (event) => {
    event.preventDefault();
});

createAccountButton.addEventListener("click", (event) => {
    event.preventDefault();
    CheckForCreate(userNameInput.value, userPasswordInput.value);
});

signInButton.addEventListener("click", (event) => {
    event.preventDefault();
    CheckForSignIn(userNameInput.value, userPasswordInput.value);
});

await LoadData();

const CheckForSignIn = (userName, password) => {
    if (CheckForExistingUser(userName)) {
        let specialVal = CheckForValidSignIn(userName, password);
        console.log(specialVal);
        if (!CheckForValidSignIn(userName, password)) {
            CreateErrorMessage("The password was incorrect");
        } 
        else 
        {
            CheckSignIn(userName, password);
        }
    } else {
        CreateErrorMessage("There was no user found by the name " + userName + "!");
    }
}

const CheckForCreate = async (userName, password) => {
    if (CheckForExistingUser(userName)) {
        CreateErrorMessage("Sorry, the username " + userName + " is taken!");
    } else {
        await CreateNewUser(userName, password);
    }
}

const CreateErrorMessage = (msg) => {
    console.log(msg);
}