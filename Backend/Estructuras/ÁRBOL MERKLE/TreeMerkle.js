var arrayNodes = []
var edges = []
var arregloaux = []
var contador = 1
var clickedNode
var index
var clickedNodoValue
var network = null


class NodoBloque{
    constructor(valor, id){
        this.valor = valor
        this.id = id
    }
}
class NodoHash{
    constructor(valor, id){
        this.valor = valor
        this.izq = null
        this.der = null
        this.id = id
    }
}

class ArbolDeMerkle{
    constructor(){
        this.repetidos = false
        this.raiz = null
        this.claves = []
    }

    agregar(valor){
        contador++
        this.claves.push(new NodoBloque(valor, contador))
        this.reorganizar()

    }

    buscarNodo(valor){
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor == valor){
                return this.claves[i].id
            }
        }
        return -1
    }

    buscar(valor){
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor == valor){
                return true
            }
        }
        return false
    }

    reorganizar(){
        var arreglo = []
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor != this.claves[i].id.toString(2)){
                arreglo.push(this.claves[i])
            }
        }
        this.claves = arreglo
    }

    recorrerGuardar(){
        this.reorganizar()
        for(var i = 0; i<this.claves.length; i++){
            arregloaux.push(this.claves[i].valor.toString(16))
            console.log(this.claves[i].valor.toString(16))
        }
    }

    eliminar(id, valor){
        var arreglo = []
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor != valor && this.claves[i].valor != this.claves[i].id.toString(2) && this.claves[i].id != id){
                arreglo.push(this.claves[i])
            }
        }
        this.claves = arreglo
    }

    actualizar(id, valor, valorNuevo){
        for(var i = 0; i < this.claves.length; i++){
            if(this.claves[i].valor == valor && this.claves[i].id == id){
                this.claves[i].valor = valorNuevo
            }
        }
    }

    estructurar(){
        var exponente = 0
        for(exponente; Math.pow(2, exponente) < this.claves.length; exponente++){}
        var tamanio = this.claves.length
        for(tamanio; tamanio < Math.pow(2, exponente);tamanio++){
            contador++
            this.claves.push(new NodoBloque(contador.toString(2),contador))
        }
        index = Math.pow(2, exponente)
        this.crearArbol(exponente)
        this.llenarArbol(this.raiz, Math.pow(2, exponente))
    }

    crearArbol(exponente){
        contador++
        this.raiz = new NodoHash(0, contador)
        this._crearArbol(this.raiz, exponente)
    }

    _crearArbol(temp, exponente){
        if(exponente>0){
            contador++
            temp.izq = new NodoHash(0, contador)
            contador++
            temp.der = new NodoHash(0, contador)
            this._crearArbol(temp.izq, exponente - 1)
            this._crearArbol(temp.der, exponente - 1)
        }
    }
    llenarArbol(temp, cantidad){
        if (temp != null) {
            this.llenarArbol(temp.izq, cantidad)
            this.llenarArbol(temp.der, cantidad)
            
            if (temp.izq == null && temp.der == null) {
              temp.izq = this.claves[cantidad-index--]
              temp.valor = (temp.izq.valor*1000).toString(16)
            } else {
              temp.valor = (parseInt(temp.izq.valor, 16)+parseInt(temp.der.valor, 16)).toString(16)
            }      
          }
    }

    recorrerGraficar(temp){
        if(temp != null){
            this.recorrerGraficar(temp.izq)
            arrayNodes.push({id: temp.id, label: temp.valor.toString(), shape: "box"})
            if(temp.izq != null){
                edges.push({from: temp.id, to: temp.izq.id, arrows: "from"})
            }
            if(temp.der != null){
                edges.push({from: temp.id, to: temp.der.id, arrows: "from"})
            }
            this.recorrerGraficar(temp.der)
        }
    }
}
let arbolbb = new ArbolDeMerkle()
arbolbb.agregar(1)
arbolbb.agregar(2)
arbolbb.agregar(3)
arbolbb.recorrerGuardar()
arbolbb.estructurar()
arbolbb.recorrerGraficar(arbolbb.raiz)


for (let index = 0; index < arrayNodes.length; index++) {
    let element = arrayNodes[index];
    console.log(element)
}
for (let index = 0; index < edges.length; index++) {
    let element = edges[index];
    console.log(element)
}


