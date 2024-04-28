const APIUrl = "http://localhost:5154"

export const GetAllUserEvents = async () => {
    const response = await fetch(APIUrl + "/events");
    let results = await response.json();
    results.forEach((event) => {
        event.startTime = new Date(event.startTime);
        event.endTime = new Date(event.endTime);
    });
    return results;
}

export const AddUserEvent = async (msg) => {
    console.log(msg);
    const response = await fetch(APIUrl + "/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msg)
    })
}

export const GetAllUsers = async () => {
    const response = await fetch(APIUrl + "/users");
    let results = await response.json();
    return results;
}

export const AddUser = async (msg) => {
    console.log(msg);
    const response = await fetch(APIUrl + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msg)
    })
}

export const GetSignIn = async () => {
    const response = await fetch(APIUrl + "/currentUser");
    let results = await response.json();
    return results;
}

export const SignIn = async(account) => {
    const response = await fetch(APIUrl + "/currentUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account)
    });
}

export const SignOut = async() => {
    const response = await fetch(APIUrl + "/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify("yes")
    });
}
