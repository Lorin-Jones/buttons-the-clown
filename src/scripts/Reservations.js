import { getReservations, saveCompletion, getCompletions } from "./dataAccess.js"
import { deleteReservation } from "./dataAccess.js"
import { getClowns } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")


// const convertRequests = (request) => {
//     let html = ""
//     html += `
//         <li id="request">${request.description}</li>
//         <li id="request">${request.address}</li>
//         <li id="request">${request.budget}</li>
//         <li id="request">${request.neededBy}</li>
//         `
//     return html
// }
export const Reservations = () => {
    const reservations = getReservations()
    const clowns = getClowns()
    const completions = getCompletions()
    const sortedDesc = reservations.sort(
        (objA, objB) => (objA.date > objB.date) ? 1 : ((objB.date > objA.date) ? -1 : 0)
    )
    let html = ""
    
    const listItems = sortedDesc.map(
                    (reservation) => {
                        completions.map(
                            (completion) => {
                                if (reservation.id === completion.reservationId) {

                                } else {
                                    return `<ul>
                                        <li id="reservation">${reservation.parent}
                                        <select class="clowns" id="clowns">
                                        <option value="">Choose</option>
                                        ${
                                            clowns.map(
                                                (clown) => {
                                                    return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
                                                }
                                            ).join("")
                                        }
                                        </select>
                                        <button class="reservation__delete"
                                                id="reservation--${reservation.id}">
                                            Delete
                                        </button>
                                        </li>
                                        <li id="reservation">${reservation.child}</li>
                                        <li id="reservation">${reservation.attending}</li>
                                        <li id="reservation">${reservation.address}</li>
                                        <li id="reservation">${reservation.date}</li>
                                        <li id="reservation">${reservation.duration}</li>
                                    </ul>`

                                
                            
                        
                        
                                }
                            }
                        )
                    }
                )
    html += listItems.join("")
    return html
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [,reservationId] = click.target.id.split("--")
        deleteReservation(parseInt(reservationId))
        
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [reservationId, clownId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. clownId
                   3. date_created
            */
            const completion = { reservationId: parseInt(reservationId), clownId: parseInt(clownId), date_created: Date.now() }
            saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)