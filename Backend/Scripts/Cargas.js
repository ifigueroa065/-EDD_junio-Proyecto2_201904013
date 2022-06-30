    
    
    document.getElementById("cargar_pelis").onclick = loadfile;
    document.getElementById("cargar_act").onclick = loadfile1;
    document.getElementById("cargar_client").onclick = loadfile2;
    document.getElementById("cargar_cat").onclick = loadfile3;
    
    document.getElementById("logearse").onclick= logear;
    document.getElementById("ver_pendientes").onclick= ver_cola;
    document.getElementById("ver_usuarios").onclick= ver_circular;
    document.getElementById("ver_fantasia").onclick= cargar;

    document.getElementById("bubblesort").onclick= mostrarbubblesort;
    document.getElementById("quicksort").onclick= mostrarquicksort;

    document.getElementById("libs_usuario").onclick= correrlista;
    document.getElementById("ejemplarcito").onclick= mostrarejemplar;
    

    document.getElementById("comprar").onclick= comprarLibro;

    document.getElementById("s_autor").onclick= buscarAUTOR;
    document.getElementById("mostrar_top").onclick= topsclientes;
    

    let archivo;
    var usuarioactual="";

    //DECLARANDO ESTRUCTURAS GLOBALES
    var ClientList = new Queue()
    var MoviesList = new AVL()
    var ActoresList = new Arbol_Binario()


    //DECLARANDO ADMINISTRADOR POR DEFECTO
    ClientList.encolar(2354168452525,"WIlfred Perez","EDD","admin@moviecat.com","123","+502 (123) 123-4567")
   

    //LECTURAS DE ARCHIVOS

    window.addEventListener('load',function(){
        let fileinput = document.getElementById("archivo");
        fileinput.addEventListener('change',function(event){
            archivo = event.target.files[0]
        })
    })
    function loadfile(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar,false)

    }

    function loadfile1(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar1,false)

    }

    function loadfile2(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar2,false)

    }

    function loadfile3(){
        let reader= new FileReader()
        reader.readAsText(archivo)
        reader.addEventListener('load',enviar3,false)

    }

    async function enviar(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)

        var  contenido_f = document.getElementById("t_fantasy")
        contenido_f.innerHTML= ` `

        var  contenido_t = document.getElementById("t_thriller")
        contenido_t.innerHTML= ` `


        var  opciones = document.getElementById("libro_seleccionado")
        var  opciones2 = document.getElementById("libro_ejemplar")
        opciones.style.display="block";
        opciones2.style.display="block";
        opciones2.innerHTML=`
        
        <option selected>Selecciona un libro</option>
      ` 
        opciones.innerHTML=`
        
            <option selected>Selecciona un libro</option>
          ` 
          
        for (let index = 0; index < jsonData.length; index++) {
            //VERIFICAR QUE ID SEA ÚNICO
            console.log("__________ DATOS DE LA PELÍCULA "+(index+1)+" __________")
            console.log(jsonData[index].id_pelicula);
            console.log(jsonData[index].nombre_pelicula);
            console.log(jsonData[index].descripcion);
            console.log(jsonData[index].puntuacion_star);
            console.log(jsonData[index].precion_Q);
            
            if (MoviesList.buscar(jsonData[index].id_pelicula)!=true) {
                //Guardando Peliculas
                MoviesList.insertar(jsonData[index].id_pelicula,
                    jsonData[index].nombre_pelicula,
                    jsonData[index].descripcion,
                    jsonData[index].puntuacion_star,
                    jsonData[index].precion_Q
                )    
            }

            

            
            opciones.innerHTML+=`
            <option value="${jsonData[index].nombre_libro}">
            ${jsonData[index].nombre_libro}</option>` 
            opciones2.innerHTML+=`
            <option value="${jsonData[index].nombre_libro}">
            ${jsonData[index].nombre_libro}</option>` 
            
            if (jsonData[index].categoria=="Fantasia") {
                contenido_f.innerHTML+=`<tr>
                    <th scope="row">${index}</th>
                    <td>${jsonData[index].isbn}</td>
                    <td>${jsonData[index].nombre_libro}</td>
                    <td>${jsonData[index].nombre_autor}</td>
                    <td>${jsonData[index].categoria}</td>
                    
                    
                    
                    </tr>`
                //si es Fantasía lo envío a ortogonal
                FantasyBooks.agregarnodo(jsonData[index].fila,
                    jsonData[index].columna,
                    jsonData[index].isbn,
                    jsonData[index].nombre_autor,
                    jsonData[index].nombre_libro,
                    jsonData[index].cantidad,
                    jsonData[index].paginas,
                    jsonData[index].categoria
                )
                

            } 
            if(jsonData[index].categoria=="Thriller"){
                // si es Thriller lo envío a la dispersa

                contenido_t.innerHTML+=`<tr>
                    <th scope="row">${index}</th>
                    <td>${jsonData[index].isbn}</td>
                    <td>${jsonData[index].nombre_libro}</td>
                    <td>${jsonData[index].nombre_autor}</td>
                    <td>${jsonData[index].categoria}</td>
                    
                    
                    
                    </tr>`
                ThrillerBooks.insert(jsonData[index].columna,
                    jsonData[index].fila,
                    jsonData[index].isbn,
                    jsonData[index].nombre_autor,
                    jsonData[index].nombre_libro,
                    jsonData[index].cantidad,
                    jsonData[index].paginas,
                    jsonData[index].categoria
                )
            }
            
        }
        
        //FantasyBooks.Mostrar()
        //FantasyBooks.graficar()

        //ThrillerBooks.printCols()
        //ThrillerBooks.graph_matrix()


            

            
        //Autores_BST.agregar()
        alert("Carga de Peliculas exitosa :)")
        
    }

    async function enviar1(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        for (let index = 0; index < jsonData.length; index++) {
            console.log("__________ DATOS DEL CLIENTE "+(index+1)+" __________")
            console.log(jsonData[index].dpi);
            console.log(jsonData[index].nombre_completo);
            console.log(jsonData[index].nombre_usuario);
            console.log(jsonData[index].correo);
            console.log(jsonData[index].contrasenia);
            console.log(jsonData[index].telefono);

            ClientList.encolar(jsonData[index].dpi,
                jsonData[index].nombre_completo,
                jsonData[index].nombre_usuario,
                jsonData[index].correo,
                jsonData[index].contrasenia,
                jsonData[index].telefono)
        }

        
        alert("Carga de CLIENTES exitosa :)")
    }

    async function enviar2(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        for (let index = 0; index < jsonData.length; index++) {

            console.log("__________ DATOS DEL ACTORES "+(index+1)+" __________")
            console.log(jsonData[index].dni);
            console.log(jsonData[index].nombre_actor);
            console.log(jsonData[index].correo);
            console.log(jsonData[index].descripcion);
            

            ActoresList.agregar(jsonData[index].dni,
                jsonData[index].nombre_actor,
                jsonData[index].correo,
                jsonData[index].descripcion
                )
        }

        alert("Carga de ACTORES exitosa :)")
        
    }

    async function enviar3(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        for (let index = 0; index < jsonData.length; index++) {

            console.log("__________ DATOS DE CATEGORIA "+(index+1)+" __________")
            console.log(jsonData[index].dni);
            console.log(jsonData[index].nombre_actor);
            console.log(jsonData[index].correo);
            console.log(jsonData[index].descripcion);


            UserList.add(jsonData[index].dpi,
                jsonData[index].nombre_completo,
                jsonData[index].nombre_usuario,
                jsonData[index].correo,
                jsonData[index].rol,
                jsonData[index].contrasenia,
                jsonData[index].telefono
                )
        }
        UserList.mostrar()

        alert("Carga de usuarios exitosa :)")
        
    }


    function logear() {
        //console.log("esta es la lista de usuarios actual")
        //UserList.mostrar()

        var user  =document.getElementById("l_usuario").value
        var pass = document.getElementById("l_pass").value
        var elche = document.querySelector("#checkbotx").checked
        console.log("user :"+ user + " pass : " + pass + " check: "+elche)
        //VALIDACIONES

        if (elche==true) {
            //si dice que es admin
            if(user=="EDD" && pass=="123"){
                usuarioactual=user;
                document.getElementById("ADMINISTRADOR").style.display="block";
                document.getElementById("LOGIN").style.display = "none";
                document.getElementById("INIT").style.display = "none";
                document.getElementById("l_usuario").value=""
                document.getElementById("l_pass").value=""
            }else{
                alert("Credenciales Incorrectas")
                document.getElementById("l_usuario").value=""
                document.getElementById("l_pass").value=""  
            }
        } else {
            //logeo normal
            if(ClientList.isExiste(user,pass)==true){
                usuarioactual=user;
                document.getElementById("USUARIO").style.display="block";
                document.getElementById("LOGIN").style.display = "none";
                document.getElementById("INIT").style.display = "none";
                document.getElementById("l_usuario").value=""
                document.getElementById("l_pass").value=""
            }else{
                alert("Credenciales Incorrectas")
                document.getElementById("l_usuario").value=""
                document.getElementById("l_pass").value=""  
            }
        }

                       
    }

    function ver_cola() {
        
        C_Pendientes.graficar()
    }

    function ver_circular() {
        
        UserList.graficar_lista_de_listas()
    }

    function cargar() {
        
        FantasyBooks.graficar()
        ThrillerBooks.graph_matrix()
        Autores_BST.obtener_codigo_Graphviz()
    }

    function mostrarbubblesort() {
        ListBooks.bubbleSort()
        document.getElementById("content").value=
        ` bubbleSort() {
            var t=0;
            do{
                var act = this.first;//aux esta en el primer nodo
                var sig = act.next;//esta en el siguiente nodo 
                while(act.next != null)
                {
                    if(act.nombre_libro.replace(/ /g, "") > sig.nombre_libro.replace(/ /g, ""))
                    {
                        //guardo valores actuales
                        var auxnombrelib =act.nombre_libro; 
                        var auxisbn= act.isbn;
                        var auxpaginas= act.paginas;
                        var auxcantidad = act.cantidad;
                        var auxautor = act.nombre_autor;
                        var auxcategoria = act.categoria;
                        
                        
                        //se hace cambio de actual==siguiente
                        act.nombre_libro= sig.nombre_libro;
                        act.isbn= sig.isbn;
                        act.paginas= sig.paginas;
                        act.cantidad = sig.cantidad;
                        act.nombre_autor = sig.nombre_autor;
                        act.categoria= sig.categoria;
    
                        //se hace seteo de siguiente == actual
                        sig.nombre_libro= auxnombrelib;
                        sig.isbn= auxisbn
                        act.paginas=auxpaginas;
                        sig.cantidad = auxcantidad;
                        sig.nombre_autor = auxautor;
                        sig.categoria=auxcategoria
                        
                        
                        //pasa a la siguiente comparación
                        act = act.next;
                        sig = sig.next;
                    }
                    else
                    { 
                        //pasa a la siguiente comparación
                        act = act.next;
                        sig = sig.next;
                    }
                }
                t++;
            }while(t<=this.size);
            this.mostrar()
        }`
    }

    function mostrarquicksort() {
        ListBooks.Quicksort(ListBooks.first,ListBooks.last)
        ListBooks.mostrar()
        document.getElementById("content").value=
        `Quicksort( start,  end) {
            if (start == null || start == end || start == end.next)
                return;
     
    
            var pivot_prev = this.paritionLast(start, end);
            this.Quicksort(start, pivot_prev);
     
           
            if (pivot_prev != null && pivot_prev == start)
                this.Quicksort(pivot_prev.next, end);
     
            
            else if (pivot_prev != null && pivot_prev.next != null)
                this.Quicksort(pivot_prev.next.next, end);
    
            
        }

        paritionLast( start,  end) {
            if (start == end || start == null || end == null)
                return start;
     
            var pivot_prev = start;
            var curr = start;
    
            var pivot_nombre_lib =end.nombre_libro
            var pivot_cantidad = end.cantidad;
            var pivot_nombre_autor = end.nombre_autor;
            var pivot_isbn =end.isbn
            var pivot_paginas = end.paginas;
            var pivot_categoria = end.categoria;
            
    
            while (start != end) {
                if (start.nombre_libro.replace(/ /g, "") < pivot_nombre_lib.replace(/ /g, "")) {
                    
                    pivot_prev = curr;
    
                    var aux_nombrelib = curr.nombre_libro
                    var aux_cantidad = curr.cantidad;
                    var aux_autor = curr.nombre_autor
                    var aux_isbn=curr.isbn
                    var aux_categoria= curr.categoria
                    var aux_paginas = curr.paginas
                    
    
                    curr.nombre_libro=start.nombre_libro;
                    curr.cantidad = start.cantidad;
                    curr.nombre_autor=start.nombre_autor;
                    curr.isbn=start.isbn;
                    curr.paginas = start.paginas;
                    curr.categoria=start.categoria;
    
                    
                    start.nombre_libro = aux_nombrelib
                    start.cantidad = aux_cantidad;
                    start.nombre_autor= aux_autor;
                    start.isbn = aux_isbn
                    start.paginas = aux_paginas;
                    start.categoria= aux_categoria;
                    
                    curr = curr.next;
                }
                start = start.next;
            }
     
            
            var aux_nombrelib2 = curr.nombre_libro
            var aux_cantidad2 = curr.cantidad;
            var aux_autor2 = curr.nombre_autor
            var aux_isbn2 = curr.isbn;
            var aux_paginas2 = curr.paginas
            var aux_categoria2 = curr.categoria
    
            curr.nombre_libro=pivot_nombre_lib
            curr.cantidad = pivot_cantidad;
            curr.nombre_autor= pivot_nombre_autor;
            curr.isbn=pivot_isbn
            curr.paginas = pivot_paginas;
            curr.categoria= pivot_categoria;
            
    
            end.nombre_libro = aux_nombrelib2;
            end.cantidad = aux_cantidad2;
            end.nombre_autor = aux_autor2;
            end.isbn = aux_isbn2;
            end.paginas = aux_paginas2;
            end.categoria = aux_categoria2;
            
     
            
            return pivot_prev;
        }


        `
    }

    function correrlista() {
        var a = document.getElementById("content_libros")

        a.innerHTML=``

        a.innerHTML=`<div class="container" id="lienzo_libros">
          

        </div>`
        
        ListBooks.graficar()
    }

    function mostrarejemplar(){
        var idprovincia = document.getElementById("libro_ejemplar");
        var pro = idprovincia.options[idprovincia.selectedIndex].value;

        var ejemplares = new Stack()
        var cantidad =ListBooks.buscar(pro)
        for (let index = 1; index <= cantidad; index++) {
            ejemplares.push(index)
            
        }
        
        var a = document.getElementById("content_ejemplares")

        a.innerHTML=``

        a.innerHTML=`<div class="container" id="lienzo_ejemplar">
          

        </div>`
        ejemplares.graficar()
    }

    function buscarAUTOR() {
        var autor = document.getElementById("nombre_autor").value

        Autores_BST.buscar(autor)
    }

    function comprarLibro() {
        var cantidad = document.getElementById("cantidad_comprar").value
        var idprovincia = document.getElementById("libro_seleccionado");
        var nombre_libro = idprovincia.options[idprovincia.selectedIndex].value;
        var disponible =ListBooks.buscar(nombre_libro)
      //acá verifico la cantidad de ejemplares
        if (cantidad<disponible) {
            //compro
            UserList.comprar(usuarioactual,nombre_libro,cantidad)
            TOPS_list.addToTail(usuarioactual,cantidad)
            alert("gracias por tu compra")
        } else {
            //se va a cola de espera
            C_Pendientes.encolar(usuarioactual,nombre_libro,cantidad)
            alert("lo sentimos, está agotado...")
        }


      

      console.log("Usuario : " + usuarioactual + " libro :" + nombre_libro + " cantidad:"+cantidad)
    }


    function topsclientes() {
        
        TOPS_list.bubbleSort()
        TOPS_list.mostrar_solo3()
        TOPS_list.graficar()
    }
    
    
    
    
    