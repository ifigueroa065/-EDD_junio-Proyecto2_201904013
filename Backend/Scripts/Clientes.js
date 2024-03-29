class Node_Simple {
   
    constructor(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono){
        this.dpi = dpi
        this.nombre_completo=nombre_completo
        this.nombre_usuario=nombre_usuario
        this.correo=correo
        this.contrasenia=contrasenia
        this.telefono=telefono
        this.next = null
    }
}


class Queue {
  
    constructor(){
        this.first = null
        this.last = null
        this.size = 0
    }
    
    encolar(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono){
        var newNode = new Node_Simple(dpi,nombre_completo,nombre_usuario,correo,contrasenia,telefono)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        return ++this.size
    }
    
    verifica(){
        return this.size
    }

    desencolar(){
        if(!this.first) return null

        var temp = this.first
        if(this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next
        this.size--
        return temp.dpi
    }

    mostrar(){
        var temp = this.first

        while(temp!=null){
            console.log(temp.nombre_usuario)
            temp=temp.next
        }
        console.log("Primero: "+this.first.nombre_usuario)
    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#819BE1\", shape=box];";
        codigodot +="label=\"" + "LISTA DE CIENTES" + "\";\n";
        var temporal = this.first
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.nombre_usuario +"\n"+ "dpi:"+ temporal.dpi + "\" ];\n"
            if(temporal.next != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }
            temporal = temporal.next
            numnodo++;            
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#scroll").graphviz()
            .fit(true)
            .renderDot(codigodot)
    }

    bubbleSort() {
        var aux= this.first
        for (var i = 0; i < this.size; i++) { 
              for (var j = 0; j < (this.size - i - 1); j++) { 
                    if(aux.nombre_completo > aux.next.nombre_completo) {
                        var tmp = aux.nombre_completo; 
                        aux.nombre_completo = aux.next.nombre_completo; 
                        aux.next.nombre_completo = tmp; 
                }
            }        
        }
    }

    isExiste(user,pass){
        
        var cont =0; 
        var temporal = this.first

        while(cont<this.size){
            if (user==temporal.nombre_usuario && pass==temporal.contrasenia) {
                //si existe verifico el rol
                return true
                
            }
            temporal=temporal.next
            cont++;
        }
    
        return false
        
    }
}

/** 
const quickQueue = new Queue

quickQueue.encolar("MarthaCerda")
quickQueue.encolar("JohnleCarré")
quickQueue.encolar("AnaFrank")
quickQueue.encolar("PauloCoelho")
quickQueue.encolar("AliceKellen")
quickQueue.encolar("StephenieMeyer")


quickQueue.mostrar()
console.log("_____________________ BUBBLE _____________________")
quickQueue.bubbleSort()
quickQueue.mostrar()
quickQueue.graficar()

*/

