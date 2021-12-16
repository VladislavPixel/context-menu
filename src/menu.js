import { Menu } from "./core/menu"
import { correctPosition } from "./utils"

export class ContextMenu extends Menu {
	constructor() {
		super()
		this.element = document.querySelector(".menu")
		this.status = "close"
	}
	open(x, y) {
		this.element.classList.add("open")
		const { correctX, correctY } = correctPosition(x, y, this.element.clientWidth, this.element.clientHeight)
		this.element.style.left = correctX + "px"
		this.element.style.top = correctY + "px"
		this.status = "open"
	}
	close() {
		this.element.classList.remove("open")
		this.status = "close"
	}
	add() {
		
	}
}

