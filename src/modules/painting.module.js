import { Module } from "../core/module"

export class PaintingModule extends Module{
	constructor(type, text) {
		super(type, text)
	}
	trigger() {
		console.log("Создаю канвас полотно")
	}
	toHTML() {
		return super.toHTML()
	}
}