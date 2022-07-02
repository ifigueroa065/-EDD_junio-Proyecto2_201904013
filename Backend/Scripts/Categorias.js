class Nodo_Cola {
   
    constructor(id_categoria,company){
        this.id_categoria = id_categoria
        this.company = company
        this.next = null
    }
}

class Cola {
  
    constructor(){
        this.first = null
        this.last = null
        this.size = 0

    }
    
    encolar(id_categoria,company){
        var newNode = new Nodo_Cola(id_categoria,company)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        return ++this.size
    }

    desencolar(){
        if(!this.first) return null

        var temp = this.first
        if(this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next
        this.size--
        return temp.value
    }

    verificar(id){
        var temp = this.first

        while(temp!=null){
            if(id==temp.id_categoria){
                return true
            }
            temp=temp.next
        }
        return false
    }
    mostrar(){
        var temp = this.first

        while(temp!=null){
            console.log(temp.value)
            temp=temp.next
        }
        console.log("Primero: "+this.first.value)
    }

    graficar(){
        var codigodot = "digraph G {\n"
        codigodot +="node[ style=filled ,color=\"#E1E1A8\", shape=box];";
        codigodot +="label=\"" + "COLA" + "\";\n";
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
        codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        
        d3.select("#lienzo").graphviz()
            .width(1200)
            .height(500)
            .renderDot(codigodot)
    }

    subgra(_NodoPadre, _NumPadre) {
        var nodos = ""
        var num = 1
        var rank ="{rank = same "
        if (this.first != null) {
            var aux = this.first
            nodos += "N" + _NumPadre + " -> NN" + (_NumPadre + num.toString()) + ";\n"
            
            rank+="N"+_NumPadre+";"
            while (aux != null) {
                nodos += "NN" + (_NumPadre + num.toString()) + "[label=\"" + aux.id_categoria + "\"];\n"
                rank+="NN"+_NumPadre + num.toString()+";"
                if (aux.next != null) {
                    nodos += "NN" + (_NumPadre + num.toString()) + " -> NN" + (_NumPadre + (num + 1).toString()) + ";\n"
                }
                aux = aux.next

                num++;
            }
            rank+="}\n"
            nodos+=rank

        }
        return nodos
    }
}

class Heads {
   
    constructor(value){
        this.value = value
        this.enlazado= new Cola()
        this.next = null
    }
}




class HashTable {
  
    constructor(){
        this.first = null
        this.last = null
        this.size = 0

        //acá lleno los espacios disponibles
        while (this.size<20) {
            this.encolar(this.size)
        }
    }
    
    encolar(val){
        var newNode = new Heads(val)
        if(!this.first){
            this.first = newNode
            this.last = newNode
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        return ++this.size
    }

    desencolar(){
        if(!this.first) return null

        var temp = this.first
        if(this.first === this.last) {
            this.last = null
        }
        this.first = this.first.next
        this.size--
        return temp.value
    }

    mostrar(){
        var temp = this.first

        while(temp!=null){
            console.log("index = " + temp.value + "    enlazados = "+temp.enlazado.size )
            temp=temp.next
        }
        console.log("Primero: "+this.first.value)
    }
    isExiste(id){

        var temp = this.first

        while(temp!=null){
            //verifico cada index
            if(temp.enlazado.verificar(id)==true){
                return true
            }
            temp=temp.next
        } 
        return false
    }

    graficar_hash(){
        if (this.first != null) {
            var codigodot = "digraph G {\n"
            codigodot +="node[ style=filled ,color=\"#819BE1\", shape=box];";
            codigodot +="label=\"" + "Hash Table" + "\";\n";
            var nodos = ""
            var conexiones = ""
            
            var num = ""
            var aux = this.first
            var nodosHijos = ""
            while (aux!=null) {
                num= Sha256.hash((aux.value).toString(),Utf8.decode)
                nodos += "N" + num + "[label=\"" + aux.value + "\"];\n"
                if (aux.next!=null) {
                    conexiones += "N" + num + " -> N" + (Sha256.hash((aux.next.value).toString(),Utf8.decode)) + ";\n"    
                }
                
                
                nodosHijos += aux.enlazado.subgra(aux.value, num)
                aux = aux.next
               
                
            }
            
            codigodot += nodos + conexiones;
            codigodot += nodosHijos;
            codigodot += "\n}"
            console.log(codigodot)
            d3.select("#scroll").graphviz()
                .fit(true)
                .renderDot(codigodot)
        }
    }

    insertarHash(index,id_categoria,company){
        var temp = this.first


        while(temp!=null){
            if (index==temp.value) {
                //cuando encuentro el index inserto

                temp.enlazado.encolar(id_categoria,company)
            }
            
            temp=temp.next
        }
    }
}
/** 

//Arreglo de numeros
let NUMS =[5,10,15,20,25,30,35,40,45,50]

//capacidad máxima de 75%

var prueba = new HashTable()

for (let index = 0; index < NUMS.length; index++) {
    var entrada = NUMS[index];
    var res = entrada%13
    // RES= INDEX DE LOS HEADER
    prueba.insertarHash(res,entrada)
    console.log("NUM= "+ entrada+"   INDEX = " +res)
    
}

//console.log(Sha256.hash("15",Utf8.encode))

prueba.mostrar()
prueba.graficar_hash()

*/