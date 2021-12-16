import './styles.css'
import { ContextMenu } from "./menu"

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
})