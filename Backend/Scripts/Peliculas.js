class Nodo_AVL {
    constructor(id_pelicula,nombre_pelicula,descripcion,puntuacion,precio_Q){
        this.id_pelicula=id_pelicula;
        this.nombre_pelicula=nombre_pelicula
        this.descripcion=descripcion
        this.puntuacion=puntuacion
        this.precio_Q=precio_Q
        this.prev = null;
        this.next = null;
        this.altura = 0;
    }

    codigo_interno(){
        //este tambien funciona :)

        var  texto = ""

        if (this.prev == null && this.next == null) {
            texto+="node"+this.valor+"[label=\""+this.valor+"\"];\n"
        } else {
            texto+="node"+this.valor+"[label=\"<C0>|"+this.valor+"|<C1>\"];\n"
        }

        if (this.prev!=null) {
            texto+=this.prev.codigo_interno()
            texto+="node"+this.valor+":C0->node"+this.prev.valor+";\n"
        }

        if (this.next!=null) {
            texto+=this.next.codigo_interno()
            texto+="node"+this.valor+":C1->node"+this.next.valor+";\n"
        }
        
        return texto
    }

    
    graficar(){
        var  texto = ""
        texto+="digraph G { rankdir=TB; "
        texto+="\n"
        texto+="node [shape = record,color=\"#819BE1\", style=filled];\n"
        texto+=this.codigo_interno()
        texto+="}\n"
        console.log(texto)
        d3.select("#lienzo").graphviz()
            .width(1200)
            .height(500)
            .renderDot(texto)
    }
}

class AVL {
    
    constructor(){
        this.raiz = null;
    }
    //maximo
    MAXIMO(valor1,valor2){
        if(valor1>valor2) return valor1;
        return valor2;
    }
    //altura del arbol
    altura(nodo){
        if(nodo == null) return -1;
        return nodo.altura;
    }
    //insertar
    insertar(id_pelicula,nombre_pelicula,descripcion,puntuacion,precio_Q){
        this.raiz = this.add(id_pelicula,nombre_pelicula,descripcion,puntuacion,precio_Q,this.raiz)

    }
    //insertar recursivo
    add(id_pelicula,nombre_pelicula,descripcion,puntuacion,precio_Q, nodo){
        if(nodo == null) return new Nodo_AVL(id_pelicula,nombre_pelicula,descripcion,puntuacion,precio_Q);
        else{
            if(id_pelicula < nodo.id_pelicula){
                nodo.prev = this.add(id_pelicula, nodo.prev)
                if(this.altura(nodo.next)-this.altura(nodo.prev) == -2){
                    //programar los casos 
                    //rsi
                    if(id_pelicula < nodo.prev.id_pelicula){
                        nodo = this.rotacionprev(nodo);
                    }//rdi}
                    else{
                        nodo = this.Rotaciondobleprev(nodo);
                    }
                    
                }
            }else if(id_pelicula > nodo.id_pelicula){
                nodo.next = this.add(id_pelicula, nodo.next);
                if(this.altura(nodo.next)-this.altura(nodo.prev)== 2){
                    //otros dos casos
                    //rotacion simple next
                    if(id_pelicula > nodo.next.id_pelicula){
                        nodo = this.rotacionnext(nodo);
                    }else{
                        nodo = this.Rotaciondoblenext(nodo);
                    }
                    //rotacion doble next
                }
            }else{
                nodo.id_pelicula = id_pelicula;
            }
        }
        nodo.altura = this.MAXIMO(this.altura(nodo.prev),this.altura(nodo.next))+1
        return nodo;
    }


    //rotacion simple prev
    rotacionprev(nodo){
        var aux = nodo.prev;
        nodo.prev = aux.next;
        aux.next = nodo;
        //calculo de nueva altura
        nodo.altura = this.MAXIMO(this.altura(nodo.next),this.altura(nodo.prev))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.prev), nodo.altura)+1;
        return aux;
    }
    //rotacion simple next
    rotacionnext(nodo){
        var aux = nodo.next;
        nodo.next = aux.prev;
        aux.prev = nodo;
        //calcular de nuevo altura
        nodo.altura = this.MAXIMO(this.altura(nodo.next),this.altura(nodo.prev))+1;
        aux.altura = this.MAXIMO(this.altura(nodo.next),nodo.altura)+1;
        return aux;
    }
    //rotacion dobles next
    Rotaciondoblenext(nodo){
        nodo.next = this.rotacionprev(nodo.next);
        return this.rotacionnext(nodo);
    }

    //rotaciones dobles
    Rotaciondobleprev(nodo){
        nodo.prev = this.rotacionnext(nodo.prev);
        return this.rotacionprev(nodo);
    }

    //recorridos
    preorden(){
        this.pre_orden(this.raiz);
    }
    pre_orden(nodo){
        if(nodo!=null){
            console.log("valor=" +nodo.valor);
            this.pre_orden(nodo.prev);
            this.pre_orden(nodo.next);
        }
    }

    //postorden
    postorden(){
        this.post_orden(this.raiz);
    }
    post_orden(nodo){
        if(nodo!=null){
            this.post_orden(nodo.prev);
            this.post_orden(nodo.next);
            console.log("valor=" +nodo.valor);
        }
    }
    //inorden
    inorden(){
        this.in_orden(this.raiz);
    }
    in_orden(nodo){
        if(nodo!=null){
            this.in_orden(nodo.prev);
            console.log("valor=" +nodo.valor);
            this.in_orden(nodo.next);    
        }
    }

    


    obtener_codigo_Graphviz(){
        return this.raiz.graficar()
    }


    rebuscar(value){
        if (this.raiz==null) {
            return null
        }
      
          var aux = this.raiz
          if (aux.id_pelicula === value) {
            return null
          }
      
          while(aux) {
            // si encontramos el nodo con el valor
            // paramos de iterar.
            if (aux.id_pelicula === value) {
              break
            }
            // seguimos buscando a la derecha
            if (aux.id_pelicula < value) {
              aux = aux.next
            } else if (aux.id_pelicula > value) {
              // seguimos buscando a la izquierda
              aux = aux.prev
            }
          }
          // retornamos el nodo encontrado.
          // si no encontramos el nodo con el valor
          // aux, toma el valor null.
          return aux
    }
    buscar(value){
       
        console.log("_______ RESULTADO DE BÚSQUEDA ___________")
        var x = this.rebuscar(value)
        if (x!=null) {
            console.log("El valor ya existe")
            return true 
        }else{
            return false
        }

            
        
    }
    
    
}

/** 
//11,23,35,46,54,26,83,20,100,54,2,1,6,8

var arbolito = new AVL();
arbolito.insertar(11);
arbolito.insertar(23);
arbolito.insertar(35);
arbolito.insertar(46);
arbolito.insertar(54);
arbolito.insertar(26);
arbolito.insertar(83);
arbolito.insertar(20);
arbolito.insertar(100);
arbolito.insertar(54);
arbolito.insertar(2);
arbolito.insertar(1);
arbolito.insertar(6);
arbolito.insertar(8);

console.log("Recorrido inorden")
arbolito.inorden()

arbolito.obtener_codigo_Graphviz()

*/