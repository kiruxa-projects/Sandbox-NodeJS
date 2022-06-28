

var active=0
var max=99

function WorkerFunc(){
 if(Math.random()*5>4){
	throw "ff"
 }
}

WorkerFunc.prototype.constructor=()=>{

}

WorkerFunc.prototype.onMessage=(data)=>{}
WorkerFunc.prototype.delete=()=>{
	setTimeout(()=>{
	 active=active-1
	},Math.random()*0)
}
WorkerFunc.prototype.postMessage=function (text){
 var md5 = require('md5');
 setTimeout(()=>{
	this.onMessage({data:text+" "})
 },Math.random()*700)
}

module.exports=WorkerFunc