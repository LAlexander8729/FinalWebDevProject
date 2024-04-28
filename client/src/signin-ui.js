import { CheckForExistingUser, CheckForValidSignIn, CreateNewUser, LoadData, CheckSignIn, GetAccount } from "./final-domain.js";
import { SignOut } from "./final-service.js";

const errorMessage = document.getElementById("error-message");
errorMessage.style.setProperty("display", "none");

const mainForm = document.getElementById("main-sign-in");
if ((await GetAccount()) === null) {
    const signInImage = document.createElement("img");
    signInImage.setAttribute("src", "./images/userImage.png");

    const userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("id", "username-input");

    const usernameLabel = document.createElement("label");
    usernameLabel.textContent = "Username:";
    usernameLabel.setAttribute("for", "username-input");

    const userPasswordInput = document.createElement("input");
    userPasswordInput.setAttribute("type", "password");
    userPasswordInput.setAttribute("id", "password-input");

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Password:";
    passwordLabel.setAttribute("for", "password-input");

    const signInButton = document.createElement("input");
    signInButton.setAttribute("type", "button");
    signInButton.value = "Sign-In";

    const createAccountButton = document.createElement("input");
    createAccountButton.setAttribute("type", "button");
    createAccountButton.value = "Create Account";

    mainForm.appendChild(signInImage);
    mainForm.appendChild(usernameLabel);
    mainForm.appendChild(userNameInput);
    mainForm.appendChild(passwordLabel);
    mainForm.appendChild(userPasswordInput);
    mainForm.appendChild(signInButton);
    mainForm.appendChild(createAccountButton);

    createAccountButton.addEventListener("click", (event) => {
        event.preventDefault();
        CheckForCreate(userNameInput.value, userPasswordInput.value);
    });

    signInButton.addEventListener("click", (event) => {
        event.preventDefault();
        CheckForSignIn(userNameInput.value, userPasswordInput.value);
    });

} else {
    const signInImage = document.createElement("img");
    signInImage.setAttribute("src", "./images/userImage.png");

    const signInText = document.createElement("h1");
    signInText.textContent = "You are signed in as " + (await GetAccount()).userName + "!";

    const logOutButton = document.createElement("input");
    logOutButton.setAttribute("type", "button");
    logOutButton.value = "Log Out";

    logOutButton.addEventListener("click", (event) => {
        event.preventDefault();
        StartLogOut();
    });
    mainForm.appendChild(signInImage);
    mainForm.appendChild(signInText);
    mainForm.appendChild(logOutButton);
}

// const userNameInput = document.getElementById("user-name-input");
// const userPasswordInput = document.getElementById("user-password-input");
// const signInButton = document.getElementById("sign-in-button");
// const createAccountButton = document.getElementById("create-account-button");
// const mainForm = document.getElementById("main-sign-in");

const signinlink = document.getElementById("account-link");
const accountImage = document.createElement("span");
accountImage.classList.add("material-symbols-outlined")
accountImage.textContent = "person";

signinlink.appendChild(accountImage);

const signInText = document.createElement("p");

if ((await GetAccount()) !== null) {
    console.log(await GetAccount());
    signInText.textContent = (await GetAccount()).userName;
} else {
    signInText.textContent = "Sign In"
}

signinlink.appendChild(signInText);

mainForm.addEventListener("submit", (event) => {
    event.preventDefault();
    LogOut();
    location.reload();
});

await LoadData();

const CheckForSignIn = (userName, password) => {
    if(userName != "")
    {
        if (CheckForExistingUser(userName)) {
            let specialVal = CheckForValidSignIn(userName, password);
            console.log(specialVal);
            if (!CheckForValidSignIn(userName, password)) {
                CreateErrorMessage("The password was incorrect");
            }
            else {
                CheckSignIn(userName, password);
            }
        } else {
            CreateErrorMessage("There was no user found by the name " + userName + "!");
        }
    } else {
        CreateErrorMessage("The username cannot be blank!");
    }

}

const CheckForCreate = async (userName, password) => {
    if (CheckForExistingUser(userName)) {
        CreateErrorMessage("Sorry, the username " + userName + " is taken!");
    } else {
        if(password != "" && userName != "")
        {
            await CreateNewUser(userName, password);
            await CheckSignIn(userName, password);
        }
        else{
            CreateErrorMessage("You must fill in both fields!");
        }
    }
}

const StartLogOut = async () => {
    await SignOut(null);
    location.reload();
}

const CreateErrorMessage = (msg) => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.setProperty("display", "block");
    document.getElementById("error-para").textContent = msg;
}