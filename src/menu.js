import { Menu } from "./core/menu"
import { correctPosition } from "./utils"
import { BackgroundModule } from "./modules/background.module"
import { CounterClicksModule } from "./modules/counterClicks.module"
import { RandomSoundModule } from "./modules/randomSound.module"
import { RandomFigureModule } from "./modules/randomFigure.module"
import { TimerModule } from "./modules/timer.module"
import { CustomMessageModule } from "./modules/customMessage.module"
import { PaintingModule } from "./modules/painting.module"

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector)
		this.status = "close"
		this.arrayChilds = []
		this.add()
		document.body.addEventListener("click", (event) => {
			this.arrayChilds.forEach((item, index) => {
				if (event.target.getAttribute("data-type") === item.type) {
					this.arrayChilds[index].trigger(event.target)
				}
			})
		})
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
		[
			new RandomFigureModule("randomFigure", "Случайная фигура"),
			new BackgroundModule("background", "Случайный фон"),
			new CounterClicksModule("counterClicks", "Считать клики (за 4 секунды)"),
			new RandomSoundModule("randomSound", "Рандомный звук"),
			new TimerModule("timer", "Таймер отсчета"),
			new CustomMessageModule("customMessage", "Кастомное сообщение"),
			new PaintingModule("modePainting", "Режим рисования")
		].forEach((customModule) => {
			this.arrayChilds.push(customModule)
			this.el.insertAdjacentHTML("afterbegin", customModule.toHTML())
		})
	}
}

