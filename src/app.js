import './styles.css'
import { ContextMenu } from "./menu"
import { random } from "./utils"


const menu = new ContextMenu()
const body = document.querySelector("body")

body.addEventListener("contextmenu", (event) => {
	event.preventDefault()
	menu.open(event.clientX, event.clientY)
})

body.addEventListener("click", (event) => {
	console.log(menu.element === event.target)
	console.log(event)
	if (menu.status === "open" && event.target !== menu.element) {
		menu.close()
	}
	console.log(random(0, 9))
})