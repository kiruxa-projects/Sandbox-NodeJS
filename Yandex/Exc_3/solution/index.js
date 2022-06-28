const TEXT_STYLES_MAPPER = {
	fontSize: (value) => `font-size: ${value}px;`,
	fontWeight: (value) => `font-weight: ${value};`,
	textAlignHorizontal: (value) => `text-align: ${value.toLowerCase()};`,
	// layoutAlign:(value,type)=>{
	// 	if(type==="FRAME"){
	// 		return `align-self: ${value};`
	// 	}
	// },
	// blendMode:(value)=>`background-blend-mode: ${value.toLowerCase().replace("_","-")};`,
	layoutMode: (value) => {
		if (value === "HORIZONTAL") {
			return "display: flex; flex-direction: row;";
		} else {
			return "display: flex; flex-direction: column;"
		}
	},
	absoluteBoundingBox:(value,type)=>{
		if(type!=="INSTANCE" && type!=="FRAME"){
			return `width: ${value.width}px; height: ${value.height}px;`
		}else{
			if(type!=="FRAME" && type!=="INSTANCE"){
				return `width: fit-content; height: fit-content;`
			}
		}
		return ''
	},
	primaryAxisAlignItems: (value) => {
		return `justify-content: ${value.toLowerCase().replace("_", "-")};`
	},
	backgroundColor: (value, type) => {
		return `background: rgba(${value.r * 255},${value.g * 255},${value.b * 255},${value.a});`
	},
	itemSpacing: (value) => `gap: ${value}px;`,
	paddingTop: (value) => `padding-top: ${value}px;`,
	paddingBottom: (value) => `padding-bottom: ${value}px;`,
	paddingLeft: (value) => `padding-left: ${value}px;`,
	paddingRight: (value) => `padding-right: ${value}px;`,
	counterAxisAlignItems: (value) => `align-items: ${value};`,
	fontFamily: (v) => `font-family: ${v}; font-style: normal;`,
	lineHeightPx: (v) => `line-height: ${v}px;`,
	textAlignHorizontal: (v) => `text-align: ${v};`,

	fills: (value,type) => {
		if(value.length>0){
			if(type==="RECTANGLE"){
				return `background-blend-mode: ${value[0].blendMode.toLowerCase().replace("_", "-")}; background: rgba(${value[0].color.r*255},${value[0].color.g*255},${value[0].color.b*255},${value[0].color.a});`
			}
			return `background-blend-mode: ${value[0].blendMode.toLowerCase().replace("_", "-")}; color: rgba(${value[0].color.r*255},${value[0].color.g*255},${value[0].color.b*255},${value[0].color.a});`
		}
	},
	strokes:(value,type,node)=>{
		let color = {a:1,r:1,b:1,g:1}
		if(node.strokes.length>0){
			color=node.strokes[0].color;
			return `border: ${node.strokeWeight}px rgba(${color.r*255},${color.g*255},${color.b*255},${color.a}) ${value[0].type};`
		}
	},
	effects:(value)=>{
		let arr = []
		for(let i of value){
			switch (i.type){
				case "DROP_SHADOW":
					return `box-shadow: ${i.offset.x}px ${i.offset.y}px ${i.radius}px rgba(${i.color.r*255},${i.color.g*255},${i.color.b*255},${i.color.a});`
					break;
			}
		}
	}
}

const buildBlock = ({type, content, className, style, id, name}) => {
	return `<${type} class="${className}" id="${id}" name="${name}" style="${style}">${content || ""}</${type}>`;
};

const getTextStyles = (node) => {
	const styleArr = [];
	if (node.style) {
		for (let [key, value] of Object.entries(node.style)) {
			if (TEXT_STYLES_MAPPER[key]) {
				styleArr.push(TEXT_STYLES_MAPPER[key](value, node.type));
			}
		}
	}
	for (let [key, value] of Object.entries(node)) {
		if (TEXT_STYLES_MAPPER[key]) {
			styleArr.push(TEXT_STYLES_MAPPER[key](value, node.type,node));
		}
	}
	return styleArr.join(' ');
}

const PRIMITIVES = {
	COMPONENT: (node) => {
		return buildBlock({
			type: 'div',
			content: node.children,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		})
	},
	COMPONENT_SET: (node) => {
		return buildBlock({
			type: 'div',
			content: node.children,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		})
	},
	DOCUMENT: (node) => {
		return buildBlock({
			type: 'main',
			content: node.children,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		})
	},
	TEXT: (node) => {
		return buildBlock({
			type: 'span',
			content: node.characters,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		});
	},
	CANVAS: (node) => {
		return buildBlock({
			type: 'div',
			content: node.children,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		})
	},
	FRAME: (node) => {
		return buildBlock({
			type: 'section',
			content: node.children,
			className: node.type,
			style: getTextStyles(node, node.type),
			id: node.id,
			name: node.name
		})
	},
	INSTANCE: (node) => {
		return buildBlock({
			type: 'div',
			content: node.children,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		})
	},
	RECTANGLE: (node) => {
		return buildBlock({
			type: 'div',
			content: node.children,
			className: node.type,
			style: getTextStyles(node),
			id: node.id,
			name: node.name
		})
	},
};

const parse = (entry) => {
	return traverse(entry.children[0]);
};

const traverse = (node) => {
	let newNode = {...node}

	if (node.children) {
		newNode.children = []
		for (let i of node.children) {
			newNode.children += traverse(i)
		}
	}
	return PRIMITIVES[node.type](newNode);
};

module.exports = function (json) {
	const entry = json.document.children[0];

	return parse(entry);
};
