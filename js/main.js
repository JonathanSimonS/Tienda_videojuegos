window.addEventListener("load",init);
var nodeToJSON = new WeakMap();
function init() {

    // CESTA DE LA COMPRA
    // añado eventos para la cesta
    if (document.querySelector(".cesta")!=null) {
        document.querySelector(".cesta").addEventListener("mouseenter",mostrarCesta);
        document.querySelector(".cesta").addEventListener("mouseleave",ocultarCesta);
    }

    // todos los botones como una lista de nodos
    var botonesAnadir = document.querySelectorAll(".anadirCarrito");
    var botonesBorrar = document.querySelectorAll(".borrarCesta");
    var botonesBorrarArticulo = document.querySelectorAll(".borrarArticulo");

    // recorro array para añadir evento a todos los botones que haya
    botonesAnadir.forEach(element => {
        element.addEventListener("click",anadirProductoCesta);
    });
    botonesBorrar.forEach(element => {
        element.addEventListener("click",borrarCesta);
    });
    botonesBorrarArticulo.forEach(element => {
        element.addEventListener("click",borrarArticulo);
    });

    // ver datos guardados
    var cestaActual=localStorage.getItem('cesta');
    cestaActual=JSON.parse(cestaActual);

    if (cestaActual!=null) {
        actualizarDesplegable(cestaActual);
    } else {
        cestaActual = null;
        actualizarDesplegable(cestaActual);
    }

    var divCesta = document.getElementById("pagina-cesta");
    if (divCesta!=null) {
        crearCestaPagina(divCesta);
    }
}
function crearCestaPagina(divCesta) {
    
    var cestaActual=localStorage.getItem('cesta');
    cestaActual==null ? cestaActual=[] : cestaActual=JSON.parse(cestaActual);
    
    if (cestaActual.length>=1) {
        var botonPedido= document.getElementById("btn-pedido");
        botonPedido.classList.remove("ocultar");

        var cestaVacia= document.getElementById("cesta-vacia");
        cestaVacia.classList.add("ocultar");
    }
    
    for (let i = 0; i < cestaActual.length; i++) {
        var nodo=nuevoElementoCesta(cestaActual[i].img,cestaActual[i].nombre,cestaActual[i].precio);
        divCesta.insertBefore(nodo, divCesta.firstElementChild);
    }

}


function anadirProductoCesta() {
    // console.log(this);  container-cesta
    
    // obtengo información que necesito
    var nombre = this.previousElementSibling.textContent;
    var precio = this.nextElementSibling.textContent;
    var imagen = this.parentNode.firstElementChild.firstElementChild.src;
    
    var cesta = { 'nombre': nombre, 'precio': precio, 'img': imagen };

    // obtengo información de la cesta
    var cestaActual=localStorage.getItem('cesta');
    // la cesta al clicar el botón no debe ser nula
    cestaActual==null ? cestaActual=[] : cestaActual=JSON.parse(cestaActual);

    // actualizo
    if(cestaActual.includes(nombre) == false){
        cestaActual.push(cesta);
        localStorage.setItem('cesta', JSON.stringify(cestaActual));
        actualizarDesplegable(cestaActual);
    }
    //console.log(cestaActual);

    // cambiar alert por modal
    alert("Producto añadido a la cesta.");
}
function actualizarDesplegable(cestaActual){
    //1. Obtengo la capa donde voy a mostrar la información
    var cestaDespl=document.querySelector(".cestaDesplegada");
    // condición para que no salte error en la página de cesta de la compra, al ser nula la cestaDesplegable
    if (cestaDespl!=null) {
        
        //2. Elimino el contenido actual de dicha capa
        while(cestaDespl.firstElementChild.firstElementChild) cestaDespl.firstElementChild.removeChild(cestaDespl.firstElementChild.firstElementChild);

        // será null si el desplegable está vacío
        if (cestaActual!=null) {
                
            // compruebo que  el bucle que recorre la cesta sea menor o igual a 3
            if (cestaActual.length>=3) {
                var longitudMax = 3;
            } else {
                var longitudMax = cestaActual.length;
            }

            //3. Añado los 3 primeros elementos actuales del carrito a la capa
            for (let i = 0; i < longitudMax; i++) {
                var nodo=nuevoElementoDesplegable(cestaActual[i].nombre,cestaActual[i].precio);
                //cestaDespl.firstElementChild.appendChild(nodo);
                // element.parentNode.insertBefore(newElement, element);   ANTES DE 
                cestaDespl.firstElementChild.insertBefore(nodo, cestaDespl.firstElementChild.firstElementChild);
            }

        // si está vacía le paso un parámetro null
        } else {
            var nodo=nuevoElementoDesplegable(cestaActual,cestaActual);
            cestaDespl.firstElementChild.appendChild(nodo);
        }
    }
   
}
function borrarArticulo() {
    
}
function borrarCesta() {
    
    localStorage.removeItem("cesta");

    // obtengo información de la cesta para actualizar el desplegable
    var cestaActual=localStorage.getItem('cesta');
    // cestaActual será nula
    actualizarDesplegable(cestaActual);
    alert("Cesta vaciada");
}
function mostrarCesta(){
    document.querySelector(".cestaDesplegada").style.display="block";
}
function ocultarCesta(){
    document.querySelector(".cestaDesplegada").style.display="none";
}
 // añadir elemento en el container de la cesta
function nuevoElementoCesta(img, nombre, precio) {
     var html = `<div class="col-lg-3 col-sm-4 text-center">
                     <img class="img-fluid w-75" loading="lazy" src="${img}"/>
                     <div class="text-center text-black mt-2 container_producto">
                         <h5>${nombre}</h5>
                         <h3 class="fw-bolder fs-2 precio">${precio}</h3>
                         <button class="btn w-25 mb-2 borrarArticulo" title="Borrar artículo"><i class="fa fa-times-circle fa-2x"></i></button>
                     </div>
                 </div>`;
     return htmlToElement(html);
}
function nuevoElementoDesplegable(nombre, precio) {
    
    // compruebo si el desplegable está vacío o no
    if (nombre == null) {
        var html = `<div class="col-sm-12 align-self-end m-2 mt-4 fw-bolder">Su cesta está vacía</div>`;
    } else {
        var html = `<div class="col-sm-12 m-2 mt-4 text-center" >
                        <p style="display:inline;" class=" fw-bolder text-center">${nombre} -</p>
                        <p style="display:inline;" class="precio fs-6 fw-bold text-center">${precio}</p>
                    </div>`;
    }
   
    return htmlToElement(html);
}
function htmlToElement(html) {
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}