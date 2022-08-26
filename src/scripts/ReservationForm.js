import { sendReservation } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReservation") {
        // Get what the user typed into the form fields
        const userParent = document.querySelector("input[name='reservationParent']").value
        const userChild = document.querySelector("input[name='reservationChild']").value
        const userAttending = document.querySelector("input[name='reservationAttending']").value
        const userAddress = document.querySelector("input[name='reservationAddress']").value
        const userDate = document.querySelector("input[name='reservationDate']").value
        const userDuration = document.querySelector("input[name='reservationDuration']").value

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
        sendReservation(dataToSendToAPI)
    }
})



export const ReservationForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="reservationParent">Parent Name</label>
            <input type="text" name="reservationParent" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationChild">Child Name</label>
            <input type="text" name="reservationChild" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAttending">Number of Children Attending</label>
            <input type="number" name="reservationAttending" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAddress">Address</label>
            <input type="text" name="reservationAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationDate">Date needed</label>
            <input type="date" name="reservationDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationDuration">Hours Needed</label>
            <input type="number" name="reservationDuration" class="input" />
        </div>

        <button class="button" id="submitReservation">Submit Reservation</button>
    `

    return html
}