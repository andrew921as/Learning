
function myfunction(num){
	const mynumbers = [1,2,3,4,5]
	if (!mynumbers.includes(num)){
		console.log("no esta el numero")
	}else{
		mynumbers.splice(mynumbers.indexOf(num),1)
	}
	return mynumbers
}

console.log(myfunction(6))

const objetos = [ {nombre: "pepe", edad: 20}, {nombre: "juan", edad: 30}, {nombre: "maria", edad: 40}]
for (const objeto of objetos){
	console.log(objeto.nombre)
}