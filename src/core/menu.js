export class Menu {
	constructor(selector) {
		this.el = document.querySelector(selector)

		document.body.addEventListener("click", (event) => {
			this.arrayChilds.forEach((item, index) => {
				if (event.target.getAttribute("data-type") === item.type) {
					this.arrayChilds[index].trigger(event.target)
				}
			})
			if (event.target.offsetParent !== this.el) {
				this.close()
			}
		})
	}

	open() {
		throw new Error(`"open" method should be implemented in Menu"`)
	}

	close() {
		throw new Error(`"close" method should be implemented in Menu"`)
	}

	add() {
		throw new Error(`"add" method should be implemented in Menu"`)
	}
}