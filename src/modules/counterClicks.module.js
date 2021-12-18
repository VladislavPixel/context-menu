import { Module } from "../core/module"

export class CounterClicksModule extends Module {
	constructor(type, text) {
		super(type, text)
		this.count = 0
	}
	trigger(target) {
		target.classList.add("active")
		const body = document.querySelector("body")
		const modalNode = document.createElement("div")
		modalNode.className = "click-container-message"
		const showEvent = (event) => {
			this.count += 1
		}
		body.addEventListener("click", showEvent)
		setTimeout(() => {
			body.removeEventListener("click", showEvent)
			modalNode.innerHTML = `За 4 секунды вы смогли сделать <span>${this.count}</span> нажатий`
			body.append(modalNode)
			this.count = 0
			target.classList.remove("active")
			modalNode.classList.add("active")
			setTimeout(() => {
				modalNode.classList.remove("active")
				modalNode.remove()
			}, 3500)
		}, 4000)
	}
	toHTML() {
		return super.toHTML()
	}
}