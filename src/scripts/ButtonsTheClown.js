import { Requests } from "./Requests.js"
import { RequestForm } from "./RequestForm.js"





export const ButtonsTheClown = () => {
    return `
    <h1>Buttons and Lollipop Clown Services</h1>
    <section class="requestForm">
        ${RequestForm()}
    </section>

    <section class="userRequests">
        <h2>Requests</h2>
        ${Requests()}
    </section>
    `
}
