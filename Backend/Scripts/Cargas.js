    document.getElementById("cargar_pelis").onclick = loadfile;
    document.getElementById("cargar_act").onclick = loadfile2;
    document.getElementById("cargar_client").onclick =  loadfile1;
    document.getElementById("cargar_cat").onclick = loadfile3;
    
    document.getElementById("logearse").onclick= logear;

    document.getElementById("inorden_actores").onclick= in_actores;
    document.getElementById("preorden_actores").onclick= pre_actores;
    document.getElementById("postorden_actores").onclick= post_actores;
    
    document.getElementById("ascendente_peli").onclick= ordena1;
    document.getElementById("descendete_peli").onclick= ordena2;

    document.getElementById("graph_movies").onclick = g_movies;
    document.getElementById("graph_client").onclick = g_client;
    document.getElementById("graph_actores").onclick =  g_actores;
    document.getElementById("graph_categoria").onclick = g_categoria;

    let archivo;
    var usuarioactual="";

    //DECLARANDO ESTRUCTURAS GLOBALES
    var ClientList = new Queue()
    var MoviesList = new AVL()
    var ActoresList = new Arbol_Binario()
    var CategoriasList = new HashTable()

    //DECLARANDO ADMINISTRADOR POR DEFECTO
    //ClientList.encolar(2354168452525,"WIlfred Perez","EDD","admin@moviecat.com","123","+502 (123) 123-4567")
   

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
        //console.log(jsonData)

        var  contenido_f = document.getElementById("t_movie")
        contenido_f.innerHTML= ` `

          
        for (let index = 0; index < jsonData.length; index++) {
            //VERIFICAR QUE ID SEA ÚNICO
            console.log("____ DATOS DE LA PELÍCULA "+(index+1)+" __")
            console.log(jsonData[index].id_pelicula);
            console.log(jsonData[index].nombre_pelicula);
            console.log(jsonData[index].descripcion);
            console.log(jsonData[index].puntuacion_star);
            console.log(jsonData[index].precio_Q);
            
            if (MoviesList.buscar(jsonData[index].id_pelicula)!=true) {
                //Guardando Peliculas
                MoviesList.insertar(jsonData[index].id_pelicula,
                    jsonData[index].nombre_pelicula,
                    jsonData[index].descripcion,
                    jsonData[index].puntuacion_star,
                    jsonData[index].precio_Q
                ) 
                contenido_f.innerHTML+=`<tr>
                    <th scope="row">${jsonData[index].id_pelicula}</th>
                    <td>${jsonData[index].nombre_pelicula}</td>
                    <td>${jsonData[index].descripcion}</td>
                    <td><button type="button" class="btn btn-dark" value="${jsonData[index].id_pelicula}" onclick="verPelicula(${jsonData[index].id_pelicula})">Información</button></td>
                    <td><button type="button"class="btn btn-warning" value="${jsonData[index].id_pelicula}" onclick="AlquilarPelicula(${jsonData[index].id_pelicula})">Alquilar</button></td>
                    <td>${jsonData[index].precio_Q}</td>
                    
                    
                    
                    </tr>`   
            }
 
        }
        MoviesList.inorden()
     
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
        ClientList.mostrar()
        
        alert("Carga de CLIENTES exitosa :)")
    }

    async function enviar2(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)

        var  contenido_f = document.getElementById("t_actores")
        contenido_f.innerHTML= ` `
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

            contenido_f.innerHTML+=`<tr>
                    <th scope="row">${jsonData[index].dni}</th>
                    <td>${jsonData[index].nombre_actor}</td>
                    <td>${jsonData[index].descripcion}</td>
                    <td>${jsonData[index].correo}</td>
                    
                    
                    
            </tr>`   
        }
        ActoresList.inorden()
        alert("Carga de ACTORES exitosa :)")
        
    }

    async function enviar3(e){
        var text = e.target.result;
        var jsonData = JSON.parse(text);
        //var x= document.getElementById("content");
        //x.innerHTML+=text
        //console.log(text)
        console.log(jsonData)
        var  contenido_f = document.getElementById("t_categoria")
        contenido_f.innerHTML= ` `
        for (let index = 0; index < jsonData.length; index++) {

            console.log("__________ DATOS DE CATEGORIA "+(index+1)+" __________")
            console.log(jsonData[index].id_categoria);
            console.log(jsonData[index].company);
            var res = (jsonData[index].id_categoria)%20

            if (CategoriasList.isExiste(jsonData[index].id_categoria)!=true) {
                CategoriasList.insertarHash(res,jsonData[index].id_categoria,jsonData[index].company)
                contenido_f.innerHTML+=`<tr>
                <th scope="row">${jsonData[index].id_categoria}</th>
                <td>${jsonData[index].company}</td>
                
                
                
                 </tr>`  
            
            }

           
        }

        alert("Carga de usuarios exitosa :)")
        
    }


    function logear() {
        //console.log("esta es la lista de usuarios actual")
        //ClientList.mostrar()

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
                    document.getElementById("CATEGORIAS").style.display = "none";
                    document.getElementById("ACTORES").style.display="none";
                    document.getElementById("INFOPELI").style.display="none";
                    document.getElementById("section_pelis").style.display="block";
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
    function verPelicula(id_pelicula){
        document.getElementById("INFOPELI").style.display="block";
        document.getElementById("section_pelis").style.display="none";
        console.log("estoy viendo:" + id_pelicula)
        //BUSCANDO LA INFORMACIÓN DE LA PELICULA
        var pelicula= MoviesList.buscarPeli(id_pelicula)
        var titulo= document.getElementById("INFOPELI")
        var des= document.getElementById("Des_PELI")
        console.log("la puntuacion es : "+ pelicula.puntuacion_star)

        titulo.innerHTML= ` <center>
        <h4 class="my-5 display-3 fw-bold ls-tight">
             
          <span class="text-primary">${pelicula.nombre_pelicula}</span>
        </h4>
      </center>
      
      <div class="p-3 mb-2 bg-dark text-white"  >

        <div class="contenedor-completo2">
                <div class="contenedor-primario2" >
                    
                        
                            <center>
                
                                <span >${pelicula.descripcion}</span>
                    
                            </center>
                            
                            <br>
                            
                            <div class="p-3 mb-2 bg-dark text-white" id="pt"> 
                            <h3>Puntuacion ->> ${pelicula.puntuacion_star} </h3>
                            </div>
                            
                            
                            <div class="p-3 mb-2 bg-dark text-white" > 
                            <h3>Precio ->> Q ${pelicula.precio_Q} </h3>
                            </div>
                        
                
                            
                    
                    
                </div>
                <div class="contenedor-secundario2" >
                        <CENTER>
                            <div class="p-3 mb-2 bg-dark text-white"> 
                            <h3>Comentarios </h3></div>


                            <br> 
                            <div class="p-3 mb-2 bg-dark text-white" id="comen_peli" >
                            </div>



                        

                        </CENTER>
            
                </div>

                <div class="form-outline mb-4" >
                    <input type="text" id="puntuacion" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example17">¿Qué puntuación le das?</label>
                    <br>
                    <button type="button" class="btn btn-success"  value="${id_pelicula}" onclick="Puntuar_peli(${id_pelicula})" >Guardar</button>
                    <br>
                    <br>
                    <input type="text" id="comeent" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example17">¿Qué opinas de la película?</label>
                    <br>
                    <button type="button" class="btn btn-success"  value="${id_pelicula}" onclick="Comentar_peli(${id_pelicula})" >Publicar</button>
                
                </div>
                

                
                
            
            </div>
        
        
        <center>
        <button type="button" class="btn btn-dark"  value="${id_pelicula}" onclick="AlquilarPelicula(${id_pelicula})" >Alquilar</button>
        <button type="button" class="btn btn-dark"   onclick="volverpelis()" >Volver</button>
        </center>

        
      </div>`

      var contenido = document.getElementById("comen_peli")
      var pelicula = MoviesList.buscarPeli(id_pelicula)
      contenido.innerHTML= ``
      for (let index = 0; index < pelicula.comentarios.length; index++) {
          var user = pelicula.comentarios[index].nombre;
          var c= pelicula.comentarios[index].coment
          contenido.innerHTML+= `<h4 >
          ${user} : 
          ${c}</h4>`
      }
    }

    function AlquilarPelicula(id_pelicula) {
        console.log("estoy Alquilando:" + id_pelicula)
    }

    function Puntuar_peli(id_pelicula){
        var nuevo= parseInt(document.getElementById("puntuacion").value) 
        var x= document.getElementById("pt")
        
        if (document.getElementById("puntuacion").value!="") {
            if (nuevo>=0 && nuevo<=5) {
                var pelicula= MoviesList.buscarPeli(id_pelicula)
                pelicula.puntuacion_star=nuevo
                x.innerHTML= ` <h3>Puntuacion = ${nuevo} </h3>`
                alert("gracias por tu calificacion")
               
                document.getElementById("puntuacion").value=""
            }else{
                alert("fuera de rango")
            }
        } else {
            alert("campo vacio")
        }

        
    }
    
    function Comentar_peli(id_pelicula) {
        var comentario = document.getElementById("comeent").value
        var contenido = document.getElementById("comen_peli")
    
        if (document.getElementById("comeent").value!="") {
            var usuario = usuarioactual;
            var pelicula = MoviesList.buscarPeli(id_pelicula)
            var com = new Comentario(usuario,comentario)
            pelicula.comentarios.push(com)
    
            contenido.innerHTML= ``
            for (let index = 0; index < pelicula.comentarios.length; index++) {
                var user = pelicula.comentarios[index].nombre;
                var c= pelicula.comentarios[index].coment
                contenido.innerHTML+= `<h4 >
                ${user} : 
                ${c}</h4>`
            }
    
            alert("gracias por tu opinión :)")
            document.getElementById("comeent").value=""
        } else {
            alert("campo vacio")
        }
       
       
    }

    function in_actores(){
        var  contenido_f = document.getElementById("t_actores")
        contenido_f.innerHTML= ` `
        in_actores_recursive(ActoresList.raiz,contenido_f)
        ActoresList.inorden()
    }
    function in_actores_recursive(raiz,contenido_f){
        if (raiz) {
            in_actores_recursive(raiz.izquierdo,contenido_f)
            
            contenido_f.innerHTML+=`<tr>
                    <th scope="row">${raiz.dni}</th>
                    <td>${raiz.nombre_actor}</td>
                    <td>${raiz.descripcion}</td>
                    <td>${raiz.correo}</td>
                    
                    
                    
            </tr>`
            in_actores_recursive(raiz.derecho,contenido_f)
        }
    }

    function pre_actores(){
        var  contenido_f = document.getElementById("t_actores")
        contenido_f.innerHTML= ` `
        pre_actores_recursive(ActoresList.raiz,contenido_f)
        ActoresList.pre_orden()
    }
    function pre_actores_recursive(raiz,contenido_f){
        if (raiz) {
            
            
            contenido_f.innerHTML+=`<tr>
                    <th scope="row">${raiz.dni}</th>
                    <td>${raiz.nombre_actor}</td>
                    <td>${raiz.descripcion}</td>
                    <td>${raiz.correo}</td>
                    
                    
                    
            </tr>`
            pre_actores_recursive(raiz.izquierdo,contenido_f)
            pre_actores_recursive(raiz.derecho,contenido_f)
        }
    }

    function post_actores(){
        var  contenido_f = document.getElementById("t_actores")
        contenido_f.innerHTML= ` `
        post_actores_recursive(ActoresList.raiz,contenido_f)
        ActoresList.post_orden()
    }
    function post_actores_recursive(raiz,contenido_f){
        if (raiz) {
            post_actores_recursive(raiz.izquierdo,contenido_f)
            post_actores_recursive(raiz.derecho,contenido_f)
            contenido_f.innerHTML+=`<tr>
                    <th scope="row">${raiz.dni}</th>
                    <td>${raiz.nombre_actor}</td>
                    <td>${raiz.descripcion}</td>
                    <td>${raiz.correo}</td>
                    
                    
                    
            </tr>`
            
        }
    }


    function ordena1(){
        var  contenido_f = document.getElementById("t_movie")
        contenido_f.innerHTML= ` `
        in_movies_recursive(MoviesList.raiz,contenido_f)
        MoviesList.inorden()
    }
    function in_movies_recursive(raiz,contenido_f){
        if (raiz) {
            in_movies_recursive(raiz.prev,contenido_f)
            
            contenido_f.innerHTML+=`<tr>
                    <th scope="row">${raiz.id_pelicula}</th>
                    <td>${raiz.nombre_pelicula}</td>
                    <td>${raiz.descripcion}</td>
                    <td><button type="button" class="btn btn-dark" value="${raiz.id_pelicula}" onclick="verPelicula(${raiz.id_pelicula})">Información</button></td>
                    <td><button type="button"class="btn btn-warning" value="${raiz.id_pelicula}" onclick="AlquilarPelicula(${raiz.id_pelicula})">Alquilar</button></td>
                    <td>${raiz.precio_Q}</td>
                    
                    
                    
                    </tr>`  
            in_movies_recursive(raiz.next,contenido_f)
        }
    }


    function ordena2(){
        var  contenido_f = document.getElementById("t_movie")
        contenido_f.innerHTML= ` `
        in2_movies_recursive(MoviesList.raiz,contenido_f)
        
    }
    function in2_movies_recursive(raiz,contenido_f){
        if (raiz) {
            in2_movies_recursive(raiz.next,contenido_f)
            
            contenido_f.innerHTML+=`<tr>
                    <th scope="row">${raiz.id_pelicula}</th>
                    <td>${raiz.nombre_pelicula}</td>
                    <td>${raiz.descripcion}</td>
                    <td><button type="button" class="btn btn-dark" value="${raiz.id_pelicula}" onclick="verPelicula(${raiz.id_pelicula})">Información</button></td>
                    <td><button type="button"class="btn btn-warning" value="${raiz.id_pelicula}" onclick="AlquilarPelicula(${raiz.id_pelicula})">Alquilar</button></td>
                    <td>${raiz.precio_Q}</td>
                    
                    
                    
                    </tr>`  
            in2_movies_recursive(raiz.prev,contenido_f)
        }
    }

    function g_movies() {
        MoviesList.obtener_codigo_Graphviz()
    }

    function g_client() {
        ClientList.graficar()
    }

    function g_categoria() {
        CategoriasList.graficar_hash()
    }

    function g_actores() {
        ActoresList.obtener_codigo_Graphviz()
    }

    function volverpelis() {
        document.getElementById("INFOPELI").style.display="none";
        document.getElementById("section_pelis").style.display="block";
    }

    
    
    
    
    