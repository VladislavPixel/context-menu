import './styles.css'
import { ContextMenu } from "./menu"

const menu = new ContextMenu(".menu")
const body = document.querySelector("body")

body.addEventListener("contextmenu", (event) => {
	event.preventDefault()
	menu.open(event.clientX, event.clientY)
})
