import { Module } from "../core/module"
import { random, correctPosition } from "../utils"
import configAuxiliary from "../configAuxiliary.json"

export class RandomFigureModule extends Module {
	#colors
	constructor(type, text){
		super(type, text)
		this.#colors = configAuxiliary.arrayColorsFigure
	}
	trigger(){
		const body = document.querySelector("body")
		const figure = document.createElement("div")
		figure.style.position = "fixed"
		const width = random(50, 100)
		const height = random(30, 120)
		const top = random(0, window.innerHeight - 10)
		const left = random(0, window.innerWidth - 10)
		const positionEl = correctPosition(left, top, width, height)
		figure.style.left = positionEl.correctX + "px"
		figure.style.top = positionEl.correctY + "px"
		const colorIndex = random(0, this.#colors.length - 1)
		const shadowIndex = random(0, this.#colors.length - 1)
		figure.style.background = this.#colors[colorIndex]
		figure.style.boxShadow = `0px 0px 5px ${this.#colors[shadowIndex]}`
		figure.style.width = width + "px"
		figure.style.height = height + "px"
		figure.style.borderRadius = `${random(0, 100)}% ${random(0, 100)}% ${random(0, 100)}% ${random(0, 100)}%`
		body.append(figure)
		setTimeout(() => {
			figure.remove()
		}, 10000)
	}
	toHTML(){
		return super.toHTML()
	}
}