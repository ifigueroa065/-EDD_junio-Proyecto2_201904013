class Node {
    constructor(value){
        this.value = value
        this.next = null
    }
}

class Stack {
    
    constructor(){
        this.first = null
        this.last = null
        this.size = 0
    }
    
    push(val){
        var newNode = new Node(val)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            var temp = this.first
            this.first = newNode
            this.first.next = temp
        }
        return ++this.size
    }
    pop(){
        if(!this.first) return null
        var temp = this.first
        if(this.first === this.last){
            this.last = null

        }
        this.first = this.first.next
        this.size--
        return (temp.value)
    }

    mostrar(){
        var temp = this.first

        while(temp!=null){
            console.log(temp.value)
            temp=temp.next
        }
        //console.log("Primero: "+this.first.value)
    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "PILA" + "\";\n";
        var temporal = this.first
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.value + "\" ];\n"
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
        codigodot += "{rankdir=\"TB\";\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo").graphviz()
            .width(1200)
            .height(500)
            .renderDot(codigodot)
    }
    graficar2(par){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "PILA" + "\";\n";
        var temporal = this.first
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.value + "\" ];\n"
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
        codigodot += "{rankdir=\"TB\";\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        d3.select("#a"+par).graphviz()
            .width(400)
            .height(1000)
            .renderDot(codigodot)
    }
    graficar3(par){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "PILA" + "\";\n";
        var temporal = this.first
        var conexiones ="";
        var nodos ="";
        var numnodo= 0;
        
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.value + "\" ];\n"
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
        codigodot += "{rankdir=\"TB\";\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#c"+par).graphviz()
            .width(400)
            .height(1000)
            .renderDot(codigodot)
    }

    
}




const stck = new Stack
const stck2 = new Stack
console.log("____________________ PILA 1 ____________________  ")
stck.push(2)
stck.push(0)
stck.push(1)
stck.push(9)
stck.push(0)
stck.push(4)
stck.push(0)
stck.push(1)
stck.push(3)


stck.mostrar()
console.log("_________________________________________________")



var x=1;

function activar(){
    
    var cont2 =0
    var cont = stck.size;
    
    var contenido = document.querySelector('#contenedor1')
    var contenido2 = document.querySelector('#contenedor2')
    var pasito = document.querySelector('#pasos')
    pasito.innerHTML= ` PASOS : ${x}`
    if(stck.size>0){
        contenido.innerHTML= ` `
    contenido2.innerHTML= ` `
    if(cont2<cont){
        
        
        contenido.innerHTML +=`
        <CENTER>
                <div class="p-3 mb-2 bg-dark text-white"><h5 class="text-white h4">STACK 1</h5></div>
        </CENTER>
        <div class="p-3 mb-2 bg-secondary text-white" id='b${cont2}'><h5 class="text-white h4">ESTADO </h5> 
        <div  id='a${cont2}'>
        
        
        </div>
        
        
        </div>
        
        `;
        contenido2.innerHTML +=`
        <CENTER>
                <div class="p-3 mb-2 bg-dark text-white"><h5 class="text-white h4">STACK 2</h5></div>
        </CENTER>
        <div class="p-3 mb-2 bg-secondary text-white" id='Z${cont2}'><h5 class="text-white h4">ESTADO </h5> 
        
        <div  id='c${cont2}'>
        
        
        </div>
        
        </div>
        
        `;
        console.log("----------->PASO"+cont2)
        stck2.push(stck.pop())
        console.log("____________________ PILA 1 ____________________  ")
        stck.mostrar()
        stck.graficar2(cont2)
        
    
        console.log("____________________ PILA 2 ____________________  ")
        stck2.mostrar()
        stck2.graficar3(cont2)
        
    
        cont2++
        x++
    }
    }else{
        alert("UY KIETO  :)")
        location.reload()
    }
    

    
    
}

//stck.graficar()
var cont2 =0
var cont = stck.size;
var contenido = document.querySelector('#contenedor1')
    var contenido2 = document.querySelector('#contenedor2')
    contenido.innerHTML= ` `
    contenido2.innerHTML= ` `
   
   
        contenido.innerHTML +=`
        <CENTER>
                <div class="p-3 mb-2 bg-dark text-white"><h5 class="text-white h4">STACK 1</h5></div>
        </CENTER>
        <div class="p-3 mb-2 bg-secondary text-white" id='b${cont2}'><h5 class="text-white h4">ESTADO </h5>
        <div  id='a${cont2}'>
        
        
        </div>
        
        
        </div>
        
        `;
        contenido2.innerHTML +=`
        <CENTER>
                <div class="p-3 mb-2 bg-dark text-white"><h5 class="text-white h4">STACK 2</h5></div>
        </CENTER>
        <div class="p-3 mb-2 bg-secondary text-white" id='Z${cont2}'><h5 class="text-white h4">ESTADO </h5>
        
        <div  id='c${cont2}'>
        
        
        </div>
        
        </div>
        
        `;
        
        console.log("____________________ PILA 1 ____________________  ")
        stck.mostrar()
        stck.graficar2(cont2)
        
    
        console.log("____________________ PILA 2 ____________________  ")
        stck2.mostrar()
        stck2.graficar3(cont2)