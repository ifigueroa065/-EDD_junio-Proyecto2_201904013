class NodoB{
    
    constructor(valor){
        
        this.valor=valor
        this.izquierdo=this.derecho=null
        
    }
    texto_graphviz(){

        //este si funcionó  :)
        if (this.izquierdo==null && this.derecho==null) {
            return this.valor
        } else {
            var texto=""
            if (this.izquierdo!=null) {
                texto+= this.valor+"->"+this.izquierdo.texto_graphviz()+"\n"
            }

            if (this.derecho!=null) {
                texto+=this.valor+"->"+this.derecho.texto_graphviz()+"\n"
            }
            return texto
        }

    }

    codigo_interno(){
        //este tambien funciona :)

        var  texto = ""

        if (this.izquierdo == null && this.derecho == null) {
            texto+="node"+this.valor+"[label=\""+this.valor+"\"];\n"
        } else {
            texto+="node"+this.valor+"[label=\"<C0>|"+this.valor+"|<C1>\"];\n"
        }

        if (this.izquierdo!=null) {
            texto+=this.izquierdo.codigo_interno()
            texto+="node"+this.valor+":C0->node"+this.izquierdo.valor+";\n"
        }

        if (this.derecho!=null) {
            texto+=this.derecho.codigo_interno()
            texto+="node"+this.valor+":C1->node"+this.derecho.valor+";\n"
        }
        
        return texto
    }

    
    graficar(){
        var  texto = ""
        texto+="digraph G { rankdir=TB; "
        texto+="\n"
        texto+="node [shape = record, style=filled, fillcolor=seashell2];\n"
        texto+=this.codigo_interno()
        texto+="}\n"
        console.log(texto)
        d3.select("#lienzo").graphviz()
            .width(1200)
            .height(500)
            .renderDot(texto)
    }

    graficar2(){
        var  texto = ""
        texto+="digraph G { rankdir=TB ; node [shape = record, style=filled, fillcolor=seashell2];\n"
        texto+=this.texto_graphviz()
        texto+="}\n"
        return console.log(texto)
    }



}

class Arbol_Binario{
    constructor(){
        this.raiz=null
    }

    raiz(){
        return this.raiz
    }

    agregar(valor){
        this.raiz=this.agregar_recursive(valor,this.raiz)
    }

    agregar_recursive(valor,raiz){
        //si está vacío
        if (raiz==null) {
            return  new NodoB(valor)
        } else {
            //Verificar si es mayor o menor
            if (valor<raiz.valor) {
                raiz.izquierdo=this.agregar_recursive(valor,raiz.izquierdo)
            } else {
                raiz.derecho=this.agregar_recursive(valor,raiz.derecho)
            }
        }
        return raiz
    }

    pre_orden(){
        this.pre_order_recursivo(this.raiz)
    }
    
    pre_order_recursivo(raiz){
        //visitar raiz, izquierda y derecha
        if (raiz) {
            console.log("valor :"+ raiz.valor)
            this.pre_order_recursivo(raiz.izquierdo)
            this.pre_order_recursivo(raiz.derecho)
        }
    }

    inorden(){

        this.inorden_recursivo(this.raiz)
    }

    inorden_recursivo(raiz){
        //izquierda -> raiz -> derecha
        if (raiz) {
            this.inorden_recursivo(raiz.izquierdo)
            console.log("valor:"+raiz.valor)
            this.inorden_recursivo(raiz.derecho)
        }
    }
    post_orden(){
        this.post_orden_recursivo(this.raiz)
    }

    post_orden_recursivo(raiz){
        //izquierdo ->derecho ->raiz
        if (raiz) {
            this.post_orden_recursivo(raiz.izquierdo)
            this.post_orden_recursivo(raiz.derecho)
            console.log("valor:"+raiz.valor)
        }
    }

    obtener_codigo_Graphviz(){
        return this.raiz.graficar()
    }

    segundo_graficar(){

        return this.raiz.graficar2()
    }
    
    
         
}
//30,50,10,5,25,15,40,35,20,45
//[50, 10, 60, 20, 70, 30, 80, 40, 90]

const arbol_binario = new Arbol_Binario()
arbol_binario.agregar(50)
arbol_binario.agregar(10)
arbol_binario.agregar(60)
arbol_binario.agregar(20)
arbol_binario.agregar(70)
arbol_binario.agregar(30)
arbol_binario.agregar(80)
arbol_binario.agregar(40)
arbol_binario.agregar(90)



console.log("Metodo preorden:\n")
arbol_binario.pre_orden()

console.log("****************\nMetodo inorden:\n")
arbol_binario.inorden()

console.log("****************\nMetodo postorden:\n")
arbol_binario.post_orden()

console.log("__________________ Código de Graphviz __________________\n")

arbol_binario.obtener_codigo_Graphviz()

