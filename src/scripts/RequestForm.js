import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userParent = document.querySelector("input[name='requestParent']").value
        const userChild = document.querySelector("input[name='requestChild']").value
        const userAttending = document.querySelector("input[name='requestAttending']").value
        const userAddress = document.querySelector("input[name='requestAddress']").value
        const userDate = document.querySelector("input[name='requestDate']").value
        const userDuration = document.querySelector("input[name='requestDuration']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parent: userParent,
            child: userChild,
            attending: parseInt(userAttending),
            address: userAddress,
            date: userDate,
            duration: parseInt(userDuration)
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})



export const RequestForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="requestParent">Parent Name</label>
            <input type="text" name="requestParent" class="input" />
        </div>
        <div class="field">
            <label class="label" for="requestChild">Child Name</label>
            <input type="text" name="requestChild" class="input" />
        </div>
        <div class="field">
            <label class="label" for="requestAttending">Number of Children Attending</label>
            <input type="number" name="requestAttending" class="input" />
        </div>
        <div class="field">
            <label class="label" for="requestAddress">Address</label>
            <input type="text" name="requestAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="requestDate">Date needed</label>
            <input type="date" name="requestDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="requestDuration">Hours Needed</label>
            <input type="number" name="requestDuration" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}