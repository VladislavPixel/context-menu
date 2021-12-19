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

	}
	trigger() {
		
	}
	toHTML() {
		return super.toHTML()
	}
}