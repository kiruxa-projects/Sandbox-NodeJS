function calculate(n, width, height) {

	const COLUMN_COUNT = Math.ceil(Math.sqrt(n))
	const ROW_COUNT = Math.ceil((n / COLUMN_COUNT))
	const koeff = height / width

	const ELEM_WIDTH = Math.round(width / COLUMN_COUNT)
	const ELEM_HEIGHT = Math.round(ELEM_WIDTH * koeff)

	const TOP_BORDER = Math.round(height / 2 - ELEM_HEIGHT * ROW_COUNT / 2)

	let result = []

	const DIFF = n-(Math.floor(n / COLUMN_COUNT)) * COLUMN_COUNT

		for (let i = 0; i < (Math.floor(n / COLUMN_COUNT)) * COLUMN_COUNT; i++) {
			const X = (ELEM_WIDTH) * (i % COLUMN_COUNT)
			const Y = Math.round(TOP_BORDER + ELEM_HEIGHT * (Math.floor(i / COLUMN_COUNT) + Math.ceil(DIFF / COLUMN_COUNT)))
			result.push({width: ELEM_WIDTH, height: ELEM_HEIGHT, x: X, y: Y})
		}
		let result2=[]
		for(let i =0;i<DIFF;i++){
				const x = Math.round(width / 2 - (ELEM_WIDTH*DIFF)/2) + ELEM_WIDTH*i
			result2.push({width: ELEM_WIDTH, height: ELEM_HEIGHT, x: x, y: TOP_BORDER})
		}

	return result2.concat(result)

}

function main(n, width, height) {
	return calculate(n, width, height)
}


// module.exports=main
console.log(main(5, 10, 10))



