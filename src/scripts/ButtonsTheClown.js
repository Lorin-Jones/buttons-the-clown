import { Reservations } from "./Reservations.js"
import { ReservationForm } from "./ReservationForm.js"





export const ButtonsTheClown = () => {
    return `
    <h1>Buttons and Lollipop Clown Services</h1>
    <section class="reservationForm">
        ${ReservationForm()}
    </section>

    <section class="userReservations">
        <h2>Reservations</h2>
        ${Reservations()}
    </section>
    `
}
