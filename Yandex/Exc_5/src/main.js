// Не забудьте перед отправкой изменить в module.exports = function(html, css) {


function findBySelector(node, rootTag, selector) {
	const sel = selector.split(" ")
	let result = []
	if (sel.length === 1) {
		if (node.tag === sel[0]) result.push(node)

		if (node.children && node.children.length > 0) {
			for (let i of node.children)
				result = result.concat(findBySelector(i, undefined, sel[0]))
		}
	} else {
		if (sel.length === 2) {
			let roots = findBySelector(node, undefined, sel[0])
			for (let i of roots) {
				for (let j of i.children) {
					result = result.concat(findBySelector(j, undefined, sel[1]))
				}
			}
		} else {
			switch (sel[1]) {
				case '>':
					if (rootTag === sel[0] && node.tag === sel[2]) {
						result.push(node)
					}
					if (node.children) {
						for (let i of node.children) {
							result = result.concat(findBySelector(i, node.tag, selector))
						}
					}
					break;

				case '+':
					let last = undefined
					for(let i of node.children){
						if(i.tag){
							if(last === sel[0] && i.tag===sel[2]){
								result.push(i)
								break;
							}
							else{
								last = i.tag
							}
						}
					}
					for(let i of node.children){
						if(i.tag){
							result = result.concat(findBySelector(i, undefined, selector))
						}
					}
					break;
				case '~':
					let last2 = undefined
					for(let i of node.children){
						if(i.tag){
							if(last2 === sel[0] && i.tag===sel[2]){
								result.push(i)
							}
							else{
								if(last2 === undefined){
									last2 = i.tag
								}
							}
						}
					}
					for(let i of node.children){
						if(i.tag){
							result = result.concat(findBySelector(i, undefined, selector))
						}
					}
					break;
			}
		}
	}
	return result
}

function setStyles(buffNode, styles) {

	if (buffNode.styles) {
		for (let i of Object.keys(styles)) {
			buffNode.styles[i] = styles[i]
		}
	}
	return buffNode;
}

function setStylesToChildren(buffNode, css) {
	buffNode = setStyles(buffNode, css)
	if (buffNode.children && buffNode.children.length > 0) {
		for (let i in buffNode.children) {
			buffNode.children[i] = setStylesToChildren(buffNode.children[i], css)
		}
	}
	return buffNode;
}

function setIds(node,id){
	let buffNode = JSON.parse(JSON.stringify(node))
	buffNode.id=id
	for(let i in buffNode.children){
			buffNode.children[i]=setIds(buffNode.children[i],id.toString()+Math.ceil((Math.random()*9)).toString())
	}
	return buffNode
}

function treeParser(tree, node){
	let buffNode = JSON.parse(JSON.stringify(tree))
	if(buffNode.id===node.id)
		return node

	for(let i in buffNode.children){
		buffNode.children[i]=treeParser(buffNode.children[i],node)
	}

	return buffNode
}

function main(html, css) {
	let buffHtml = JSON.parse(JSON.stringify(html))

	setStylesToChildren(buffHtml, html.styles)

	let finalStyles=[]

	for (let i of css) {
		let node = findBySelector(buffHtml, buffHtml.tag, i.selector)
		for(let j of node){
			let k = setStylesToChildren(j, i.declarations)
			finalStyles.push(k)
		}
	}


	for(let i of finalStyles){
		// buffHtml=treeParser(buffHtml,i)
	}

	return buffHtml;
}

module.exports = main