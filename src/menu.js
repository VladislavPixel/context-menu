import { Menu } from "./core/menu"
import { correctPosition } from "./utils"
import { BackgroundModule } from "./modules/background.module"

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector)
		this.status = "close"
		this.arrayChilds = []
		this.add()
	}
	open(x, y) {
		this.el.classList.add("open")
		const { correctX, correctY } = correctPosition(x, y, this.el.clientWidth, this.el.clientHeight)
		this.el.style.left = correctX + "px"
		this.el.style.top = correctY + "px"
		this.status = "open"
	}
	close() {
		this.el.classList.remove("open")
		this.status = "close"
	}
	add() {
		const backgroundModule = new BackgroundModule("background", "Случайный фон")
		this.el.insertAdjacentHTML("afterbegin", backgroundModule.toHTML())
		this.arrayChilds.push(backgroundModule)
	}
}

