import { fetchRequests } from "./dataAccess.js"
import { ButtonsTheClown } from "./ButtonsTheClown.js"
import { fetchClowns } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchClowns())
        .then(
            () => {
                mainContainer.innerHTML = ButtonsTheClown()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)