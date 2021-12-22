import { Module } from "../core/module"
import configAuxiliary from "../configAuxiliary.json"
import { random } from "../utils"

export class BackgroundModule extends Module {
	#element
	#colors
	constructor(type, text) {
		super(type, text)
		this.#element = document.querySelector("body")
		this.#colors = configAuxiliary.arrayHexBackground
	}
	trigger() {
		const randomIndex = random(0, this.#colors.length)
		this.#element.style.background = this.#colors[randomIndex]
	}
	toHTML() {
		return super.toHTML()
	}
}