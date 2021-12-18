import { Module } from "../core/module"

export class TimerModule extends Module{
	constructor(type, text) {
		super(type, text)
	}
	#createElement(type, classes) {
		const element = document.createElement(type)
		if (classes) {
			element.className = classes
		}
		return element
	}
	trigger() {
		const body = document.querySelector("body")
		const modalWrap = this.#createElement("div", "timer-modal")
		const modalContainer = this.#createElement("div", "timer-modal__container")
		const close = this.#createElement("div", "timer-modal__close")
		const form = this.#createElement("div", "timer-modal__form")
		const title = this.#createElement("h3", "timer-modal__title")
		const input = this.#createElement("input", "timer-modal__input")
		const button = this.#createElement("button", "timer-modal__button")
		title.textContent = "Установка таймера"
		input.type = "number"
		input.placeholder = "Введите время таймера в минутах"
		button.type = "button"
		button.textContent = "Подтвердить"
		form.append( title, input, button)
		modalContainer.append(close, form)
		modalWrap.append(modalContainer)
		body.append(modalWrap)
		close.addEventListener("click", (event) => {
			console.log('Клик');
		})
	}
	toHTML() {
		return super.toHTML()
	}
}