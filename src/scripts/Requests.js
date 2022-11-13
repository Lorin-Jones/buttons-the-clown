import { getRequests, saveCompletion, getCompletions } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
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
export const Requests = () => {
    const requests = getRequests()
    const clowns = getClowns()
    const completions = getCompletions()
    const sortedDesc = requests.sort(
        (objA, objB) => (objA.date > objB.date) ? 1 : ((objB.date > objA.date) ? -1 : 0)
    )
    let html = ""
    
    const listItems = sortedDesc.map(
                    (request) => {
                        completions.map(
                            (completion) => {
                                if (request.id === completion.requestId) {

                                } else {
                                    return `<ul>
                                        <li id="request">${request.parentName}
                                        <select class="clowns" id="clowns">
                                        <option value="">Choose</option>
                                        ${
                                            clowns.map(
                                                (clown) => {
                                                    return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
                                                }
                                            ).join("")
                                        }
                                        </select>
                                        <button class="request__delete"
                                                id="request--${request.id}">
                                            Delete
                                        </button>
                                        </li>
                                        <li id="request">${request.childName}</li>
                                        <li id="request">${request.numberOfChildren}</li>
                                        <li id="request">${request.address}</li>
                                        <li id="request">${request.reservationDate}</li>
                                        <li id="request">${request.reservationHours}</li>
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
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
        
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. clownId
                   3. date_created
            */
            const completion = { requestId: parseInt(requestId), clownId: parseInt(clownId), date_created: Date.now() }
            saveCompletion(completion)
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

        }
    }
)