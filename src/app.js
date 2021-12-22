import './styles.css'
import { ContextMenu } from "./menu"

const menu = new ContextMenu(".menu")
const body = document.querySelector("body")

function showBody(event) {
	event.preventDefault()
	if (menu.arrayChilds.length > 0) {
		menu.open(event.clientX, event.clientY)
	} else {
		console.log("В контекстном меню нет функционала")
	}
}

body.addEventListener("contextmenu", showBody)

