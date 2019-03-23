(()=>{
	function Node(node,value){
	this.node = node;
  this.value = value;
}

Node.prototype.getValue = function(){
	return this.node;
}

Node.prototype.setValue = function(node,value){
	this.node = node;
  this.value = value;
}

function Map(val){
	this.container = [];
  if(val !== undefined && Array.isArray(val))
  	this.container = Array.from([...val]);
  	
  this.size = this.container.length;
}

Map.prototype.get = function(node){
	return this.container.find((item)=>{
  	return item.getValue() === node;
  });
}

Map.prototype.set = function(node,value){
	let cachedNode;
  if(this.has(node))
  	cachedNode = this.get(node);
  if(!cachedNode){
  	this.container.push(new Node(node,value));
  }
  else{
  	cachedNode.setValue(node,value);
  }
}

Map.prototype.has = function(node){
	return this.get(node);
}

Map.prototype[Symbol.iterator] = function(){
	let copy = [...this.container];
	return{
  	next : function(){
    	return {
      	done : copy.length === 0,
        value : copy.shift()
      }
    }
  }
}

Map.prototype.delete = function(node){
	if(this.has(node)){
  	let index = this.container.indexOf(this.get(node));
    this.container.splice(index,1);
  }
}

Map.prototype.clear = function(){
	this.container.length = 0;
}

Map.prototype.keys = function(){
	return this.container.map((item)=>{
  	return item.node;
  });
}

Map.prototype.values = function(){
	return this.container.map((item)=>{
  	return item.value;
  });
}

Map.prototype.entries = function(){
	return this.container.map((item)=>{
  	return [item.node,item.value];
  });
}

Map.prototype.forEach = function(fn){
	for(let i=0;i<this.container.length;i++)
  	fn(this.container[i]);
}
window.Map = Map;
window.Node = Node;
})();


let mp = new Map([new Node(5,'Alonso'),new Node(6,'Vettel')]);

 mp.set(1,'Kimi');
mp.set(2,'Mika'); 

console.log(mp.container);

mp.set(1,'Hamilton');

console.log(mp.get(1));

mp.delete(1);

//mp.clear();

console.log(mp.keys());
console.log(mp.values());
console.log(mp.entries());

//console.log([...mp]);

mp.forEach((item)=>{
	console.log(item.value);
});

console.log([...mp]);
