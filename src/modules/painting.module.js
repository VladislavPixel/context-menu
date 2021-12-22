import { Module } from "../core/module"
import configAuxiliary from "../configAuxiliary.json"

export class PaintingModule extends Module{
	#paletteColors
	#thickness
	constructor(type, text) {
		super(type, text)
		this.#paletteColors = configAuxiliary.palette
		this.#thickness = configAuxiliary.arrayNumberThickness
	}
	#createElement(type, classes) {
		const element = document.createElement(type)
		element.className = classes
		return element
	}
	trigger() {
		document.getElementById("menu").classList.add("plug")
		const header = this.#createElement("div", "header")
		const headerContainer = this.#createElement("div", "header__container")
		const headerTitle = this.#createElement("h3", "header__title")
		headerTitle.textContent = "Цветовая палитра:"
		const ulColors = this.#createElement("ul", "header__colors-row row-colors")
		this.#paletteColors.forEach((item) => {
			const li = this.#createElement("li", "row-colors__el")
			li.style.background = item
			ulColors.append(li)
		})
		const sideBar = this.#createElement("aside", "sidebar")
		const sideBarContainer = this.#createElement("div", "sidebar__container")
		const sideBarTitle = this.#createElement("h3", "sidebar__title")
		sideBarTitle.textContent = "Толщина пера"
		const sideBarList = this.#createElement("ul", "sidebar__list list-sidebar")
		const getElementSidebar = (value) => {
			const li = this.#createElement("li", "list-sidebar__el")
			const spanEl = this.#createElement("span", "list-sidebar__thickness")
			spanEl.style.width = `${value}px`
			spanEl.style.height = `${value}px`
			spanEl.style.display = "inline-block"
			li.append(spanEl)
			sideBarList.append(li)
		}
		this.#thickness.forEach((valueThickness) => {
			switch(valueThickness) {
				case 1:
					getElementSidebar(3)
				break
				case 2:
					getElementSidebar(6)
				break
				case 3:
					getElementSidebar(9)
				break
				case 4:
					getElementSidebar(12)
				break
				case 5:
					getElementSidebar(15)
				break
				case 6:
					getElementSidebar(18)
				break
				default:
					getElementSidebar(20)
				break
			}
		})
		const sideBarClose = this.#createElement("div", "sidebar__close")
		sideBarClose.textContent = "Закрыть режим"
		const canvas = this.#createElement("canvas", "canvas")
		headerContainer.append(headerTitle, ulColors)
		sideBarContainer.append(sideBarTitle, sideBarList, sideBarClose)
		sideBar.append(sideBarContainer)
		header.append(headerContainer)
		document.body.append(header, sideBar, canvas)
		setTimeout(() => {
			header.classList.add("active")
			sideBar.classList.add("active")
			canvas.classList.add("active")
		}, 50)
		const ctx = canvas.getContext("2d")

		function showCanvas(event) {
			console.log(event)
			ctx.beginPath()
			ctx.moveTo(event.clientX, event.clientY)
			ctx.lineTo(event.clientX, event.clientY)
			ctx.fill()
		}
		canvas.addEventListener("mousedown", () => {
			canvas.addEventListener("mousemove", showCanvas)
		})
		canvas.addEventListener("mouseup", () => {
			
		})

		sideBarClose.addEventListener("click", () => {
			header.remove()
			sideBar.remove()
			canvas.remove()
			document.getElementById("menu").classList.remove("plug")
		})
	}
	toHTML() {
		return super.toHTML()
	}
}