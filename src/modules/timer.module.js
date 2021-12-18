import { Module } from "../core/module"

export class TimerModule extends Module{
	constructor(type, text) {
		super(type, text)
		this.timeInMinutes
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
		const validationMessage = this.#createElement("div", "timer-modal__validate")
		const modalTimer = this.#createElement("div", "timer")
		validationMessage.textContent = `Время не может начинаться с "0"`
		title.textContent = "Установка таймера"
		input.type = "number"
		input.name = "time"
		input.placeholder = "Введите время таймера в секундах"
		button.type = "button"
		button.textContent = "Подтвердить"
		form.append( title, input, validationMessage, button)
		modalContainer.append(close, form)
		modalWrap.append(modalContainer)
		body.append(modalWrap)
		if (this.timeInMinutes === undefined) {
			button.classList.add("close")
		}
		function removeModal() {
			modalWrap.remove()
		}
		close.addEventListener("click", removeModal)
		input.addEventListener("input", ({ target }) => {
			if (target.value[0] !== "0") {
				this.timeInMinutes = target.value
			}
			if (target.value[0] === "0") {
				validationMessage.classList.add("active")
			}
			console.log(this.timeInMinutes, "timeInMinutes")
			if (this.timeInMinutes === "") {
				validationMessage.classList.remove("active")
				this.timeInMinutes = undefined
			}
			if (this.timeInMinutes !== undefined && this.timeInMinutes !== "") {
				button.classList.remove("close")
			} else {
				button.classList.add("close")
			}
		})
		button.addEventListener("click", (event) => {
			removeModal()
		})
	}
	toHTML() {
		return super.toHTML()
	}
}