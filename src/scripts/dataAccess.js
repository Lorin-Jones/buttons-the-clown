const applicationState = {
    requests: [],
    clowns: [],
    completions: []
}
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (userRequests) => {
                // Store the external state in application state
                applicationState.requests = userRequests
            }
        )
}
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (sent) => {
                applicationState.completions = sent
            }
        )
}


export const getRequests = () => {
    return applicationState.requests.map(request =>({...request}))
}
export const getClowns = () => {
    return applicationState.clowns.map(clown =>({...clown}))
}
export const getCompletions = () => {
    return applicationState.completions.map(completion =>({...completion}))
}

export const sendRequest = (userRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE"})
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const saveCompletion = (userCompletion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userCompletion)
    }
    return fetch(`${API}/completions/`, fetchOptions)
        .then(response => response.json())
        .then(() => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}