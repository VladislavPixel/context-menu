import { Module } from "../core/module"
import { random } from "../utils"

export class RandomSoundModule extends Module {
	constructor(type, text) {
		super(type, text)
	}
	trigger(target) {
		target.classList.add("active")
		const index = Math.abs(random(0, 11))
		const audio = new Audio(`./src/music/${index}.mp3`)
		function endedLogic() {
			target.classList.remove("active")
		}
		audio.play()
		.then(() => {
			console.log("Успех сигнала!")
		})
		.catch((error) => {
			throw new Error("Ошибка сигнала...")
		})
		.finally(() => {
			audio.addEventListener("ended", endedLogic)
		})
		audio.removeEventListener("ended", endedLogic)
	}
	toHTML() {
		return super.toHTML()
	}
}