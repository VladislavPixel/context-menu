import { Module } from "../core/module"

export class TimerModule extends Module{
	#timeInSeconds
	constructor(type, text) {
		super(type, text)
		this.#timeInSeconds
	}
	#createElement(type, classes) {
		const element = document.createElement(type)
		if (classes) {
			element.className = classes
		}
		return element
	}
	trigger(target) {
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
		if (this.#timeInSeconds === undefined) {
			button.classList.add("close")
		}
		function removeModal() {
			modalWrap.remove()
		}
		close.addEventListener("click", removeModal)
		input.addEventListener("input", ({ target }) => {
			if (target.value[0] !== "0") {
				this.#timeInSeconds = target.value
			}
			if (target.value[0] === "0") {
				validationMessage.classList.add("active")
			}
			if (this.#timeInSeconds === "") {
				validationMessage.classList.remove("active")
				this.#timeInSeconds = undefined
			}
			if (this.#timeInSeconds !== undefined && this.#timeInSeconds !== "") {
				button.classList.remove("close")
			} else {
				button.classList.add("close")
			}
		})
		button.addEventListener("click", (event) => {
			target.classList.add("active")
			if (this.#timeInSeconds.includes(".")) {
				this.#timeInSeconds = this.#timeInSeconds.replaceAll(".", "")
			}
			removeModal()
			modalTimer.innerHTML = `Обратный отсчет таймера сейчас начнется: <span>Позиция start ${this.#timeInSeconds}</span>`
			body.append(modalTimer)
			setTimeout(() => {
				modalTimer.classList.add("active")
			}, 1000)
			setTimeout(() => {
				this.#timeInSeconds = Number(this.#timeInSeconds) // we know that the "-" sign converts to a number, but we do explicit conversions to control
				const idInterval = setInterval(() => {
					modalTimer.innerHTML = `Обратный отсчет таймера: <span>${this.#timeInSeconds}</span>`
					this.#timeInSeconds = this.#timeInSeconds - 1
					if (this.#timeInSeconds < 0) {
						modalTimer.innerHTML = `<span>Таймер завершился!</span>`
						clearInterval(idInterval)
						setTimeout(() => {
							modalTimer.classList.remove("active")
							setTimeout(() => {
								modalTimer.remove()
								target.classList.remove("active")
							}, 1000)
						}, 3000)
					}
				}, 1000)
			}, 2500)
		})
	}
	toHTML() {
		return super.toHTML()
	}
}