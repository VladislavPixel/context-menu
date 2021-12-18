export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function correctPosition(x, y, elWidth, elHeight) {
	const correctX = (x + elWidth) > window.innerWidth ? (x - elWidth) : x
	const correctY = (y + elHeight) > window.innerHeight ? (y - elHeight) : y
	return {
		correctX: correctX,
		correctY: correctY
	}
}
