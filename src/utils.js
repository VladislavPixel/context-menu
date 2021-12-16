export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function correctPosition(x, y, menuWidth, menuHeight) {
	const correctX = (x + menuWidth) > window.innerWidth ? (x - menuWidth) : x
	const correctY = (y + menuHeight) > window.innerHeight ? (y - menuHeight) : y
	return {
		correctX: correctX,
		correctY: correctY
	}
}
