function groupAnagrams(list) {
	// your code here

	let result = []
	let newList = {}

	list.forEach((e)=>{
		let newWord = e.split("").sort((k,m)=>{
			if(k>m) {return 1}
			else {return -1}
		}).join("")

		console.log(Object.keys(newList).indexOf(newWord))
		if(Object.keys(newList).indexOf(newWord) === -1){
			console.log("f")
			newList[newWord]=[]
		}
		newList[newWord].push(e)
	})

	for(let i of Object.keys(newList)){
		result.push(newList[i])
	}

	return result
}

console.log(groupAnagrams(['сон', 'нос', 'сорт', 'трос', 'торт', 'рост']))