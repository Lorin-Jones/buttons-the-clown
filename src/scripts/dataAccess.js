const applicationState = {
    reservations: [],
    clowns: [],
    completions: []
}
const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchReservations = () => {
    return fetch(`${API}/Reservations`)
        .then(response => response.json())
        .then(
            (userReservations) => {
                // Store the external state in application state
                applicationState.reservations = userReservations
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


export const getReservations = () => {
    return applicationState.reservations.map(reservation =>({...reservation}))
}
export const getClowns = () => {
    return applicationState.clowns.map(clown =>({...clown}))
}
export const getCompletions = () => {
    return applicationState.completions.map(completion =>({...completion}))
}

export const sendReservation = (userReservation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userReservation)
    }


    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE"})
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