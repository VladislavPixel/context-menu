import { Module } from "../core/module"
import configAuxiliary from "../configAuxiliary.json"
import { random } from "../utils"

export class CustomMessageModule extends Module{
	constructor(type, text) {
		super(type, text)
		this.messages = configAuxiliary.arrayCustomMessages
		this.arrayCallStack = []
	}
	#createMessage(type, classes) {
		const element = document.createElement(type)
		element.className = classes
		return element
	}
	trigger() {
		const index = random(0, (this.messages.length - 1))
		const quoteObject = this.messages[index]
		const messageWrap = this.#createMessage("div", "custom-message")
		const messageQuote = this.#createMessage("p", "custom-message__quote")
		const messageAuthor = this.#createMessage("div", "custom-message__author")
		messageAuthor.textContent = quoteObject.author
		messageQuote.textContent = quoteObject.message
		messageWrap.append(messageQuote, messageAuthor)
		const value = Date.now()
		messageWrap.setAttribute("id", value)
		if (this.arrayCallStack.length === 3) {
			this.arrayCallStack[2].remove()
			this.arrayCallStack.pop()
		}
		document.body.append(messageWrap)
		this.arrayCallStack.unshift(messageWrap)
		const bottomSecond = `${40 + messageWrap.clientHeight}px`
		const bottomThird = `${24 + (messageWrap.clientHeight * 2.5)}px`
		this.arrayCallStack.forEach((el, index) => {
			if (index === 0) {
				el.classList.add("first")
			}
			if (index === 1) {
				el.style.bottom =  bottomSecond
				el.classList.add("second")
			}
			if (index === 2) {
				el.style.bottom = bottomThird
				el.classList.add("third")
			}
		})
		const idIntervalEl = setInterval(() => {
			const getAttributeId = element => Number(element.getAttribute("id"))
			const indexElement = this.arrayCallStack.findIndex((item) => (getAttributeId(item) === value))
			let valueStep
			if (this.arrayCallStack[indexElement]) {
				valueStep = this.arrayCallStack[indexElement].getAttribute("data-step")
			} else {
				clearInterval(idIntervalEl)
			}
			const doStep = (oldClass, newClass, bottomMargin, valueAttrib) => {
				messageWrap.classList.remove(oldClass)
				messageWrap.classList.add(newClass)
				messageWrap.style.bottom = bottomMargin
				messageWrap.setAttribute("data-step", valueAttrib)
			}
			if (indexElement === 0 || valueStep === null) {
				doStep("first", "second", bottomSecond, 1)
			}
			if (indexElement === 1 || valueStep === "1") {
				doStep("second", "third", bottomThird, 2)
			}
			if (indexElement === 2 || valueStep === "2") {
				messageWrap.remove()
				clearInterval(idIntervalEl)
				const newArray = this.arrayCallStack.filter((item) => (value !== getAttributeId(item)))
				this.arrayCallStack = newArray
			}
		}, 2000)
	}
	toHTML() {
		return super.toHTML()
	}
}