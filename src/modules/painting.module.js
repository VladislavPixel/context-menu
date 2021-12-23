import { Module } from "../core/module"
import configAuxiliary from "../configAuxiliary.json"

export class PaintingModule extends Module{
	#paletteColors
	#thickness
	#currentColor
	#currentThickness
	constructor(type, text) {
		super(type, text)
		this.#paletteColors = configAuxiliary.palette
		this.#thickness = configAuxiliary.arrayNumberThickness
		this.#currentColor = null
		this.#currentThickness = null
	}
	#createElement(type, classes) {
		const element = document.createElement(type)
		element.className = classes
		return element
	}
	trigger() {
		document.getElementById("menu").classList.add("plug")
		const header = this.#createElement("header", "header")
		const headerContainer = this.#createElement("div", "header__container")
		const headerTitle = this.#createElement("h3", "header__title")
		const headerClear = this.#createElement("div", "header__clear")
		const headerColorStok = this.#createElement("div", "header__color-stok")
		headerColorStok.textContent = "Сбросить цвет"
		headerClear.textContent = "Очистить полотно"
		headerTitle.textContent = "Цветовая палитра:"
		const ulColors = this.#createElement("ul", "header__colors-row row-colors")
		this.#paletteColors.forEach((item) => {
			const blobImg = this.#createElement("img", "row-colors__blob")
			blobImg.setAttribute("src", "./src/blob.svg")
			blobImg.setAttribute("alt", "blob")
			const li = this.#createElement("li", "row-colors__el")
			li.setAttribute("data-color", item)
			li.style.background = item
			li.append(blobImg)
			ulColors.append(li)
		})
		const sideBar = this.#createElement("aside", "sidebar")
		const sideBarContainer = this.#createElement("div", "sidebar__container")
		const sideBarTitle = this.#createElement("h3", "sidebar__title")
		sideBarTitle.textContent = "Толщина пера:"
		const sideBarList = this.#createElement("ul", "sidebar__list list-sidebar")
		const buttonResetFeather = this.#createElement("button", "sidebar__reset")
		buttonResetFeather.textContent = "Сброс пера"
		const getElementSidebar = (value) => {
			const li = this.#createElement("li", "list-sidebar__el")
			const spanEl = this.#createElement("span", "list-sidebar__thickness")
			spanEl.style.width = `${value}px`
			spanEl.style.height = `${value}px`
			spanEl.style.display = "inline-block"
			li.setAttribute("data-thickness", value)
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
		const widthCanvas = document.body.clientWidth * 80 / 100
		const heightCanvas = document.body.clientHeight - 150
		const canvas = this.#createElement("canvas", "canvas")
		canvas.setAttribute("width", widthCanvas)
		canvas.setAttribute("height", heightCanvas)
		headerContainer.append(headerTitle, ulColors, headerColorStok, headerClear)
		sideBarContainer.append(sideBarTitle, buttonResetFeather, sideBarList, sideBarClose)
		sideBar.append(sideBarContainer)
		header.append(headerContainer)
		document.body.append(header, sideBar, canvas)
		setTimeout(() => {
			header.classList.add("active")
			sideBar.classList.add("active")
			canvas.classList.add("active")
		}, 50)
		const listLiColors = document.querySelectorAll(".row-colors__el")
		listLiColors.forEach((element, index, arr) => {
			element.addEventListener("click", ({ target }) => {
				arr.forEach((item) => {
					item.style.opacity = 0.7
				})
				let isLi = target.className === "row-colors__el"
				let color
				if (isLi) {
					color = target.getAttribute("data-color")
					target.style.opacity = 1
					this.#currentColor = color
				} else {
					color = target.parentElement.getAttribute("data-color")
					target.parentElement.style.opacity = 1
					this.#currentColor = color
				}
			})
		})
		const listLiThickness = document.querySelectorAll(".list-sidebar__el")
		listLiThickness.forEach((el, i, array) => {
			el.addEventListener("click", ({ target }) => {
				array.forEach((item) => {
					item.style.opacity = 0.7
				})
				let isLi = target.className === "list-sidebar__el"
				let thickness
				if (isLi) {
					thickness = target.getAttribute("data-thickness")
					target.style.opacity = 1
					this.#currentThickness = thickness
				} else {
					thickness = target.parentElement.getAttribute("data-thickness")
					target.parentElement.style.opacity = 1
					this.#currentThickness = thickness
				}
			})
		})
		const ctx = canvas.getContext("2d")
		let oldX = null
		let oldY = null
		let flag = false
		canvas.addEventListener("mousedown", (eventDown) => {
			flag = true
			oldX = eventDown.clientX - (document.body.clientWidth * 20 / 100)
			oldY = eventDown.clientY - 150
			ctx.beginPath()
			ctx.lineWidth = (this.#currentThickness === null ? 1 : this.#currentThickness)
			ctx.strokeStyle = (this.#currentColor === null ? "#000" : this.#currentColor)
		})
		canvas.addEventListener("mousemove", (event) => {
			if (flag) {
				let x = event.clientX - (document.body.clientWidth * 20 / 100)
				let y = event.clientY - 150
				ctx.moveTo(oldX, oldY)
				ctx.lineTo(x, y)
				ctx.closePath()
				ctx.stroke()
				oldX = x
				oldY = y
			}
		})
		canvas.addEventListener("mouseup", () => {
			flag = false
			oldX = null
			oldY = null
		})
		headerClear.addEventListener("click", () => {
			ctx.clearRect(0, 0, widthCanvas, heightCanvas)
		})
		sideBarClose.addEventListener("click", () => {
			header.remove()
			sideBar.remove()
			canvas.remove()
			document.getElementById("menu").classList.remove("plug")
		})
		headerColorStok.addEventListener("click", () => {
			this.#currentColor = null
			listLiColors.forEach((el) => {
				el.style.opacity = 1
			})
		})
		buttonResetFeather.addEventListener("click", () => {
			this.#currentThickness = null
			listLiThickness.forEach((item) => {
				item.style.opacity = 1
			})
		})
	}
	toHTML() {
		return super.toHTML()
	}
}