/* ================= UTILIDADES CARRITO ================= */

function obtenerCarrito(){
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito){
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* ================= CONTADOR GLOBAL ================= */

function actualizarContador(){
  let carrito = obtenerCarrito();
  let total = carrito.reduce((acc,p)=> acc + p.cantidad,0);

  let contador = document.getElementById("contador-carrito");

  if(contador){
    contador.setAttribute("data-count", total);
  }
}

/* ================= INPUT + / - ================= */

function cambiarInput(id, cambio){

  let input = document.getElementById(id);

  if(!input) return;

  let valor = parseInt(input.value) || 0;

  valor += cambio;

  if(valor < 0){
    valor = 0;
  }

  input.value = valor;
}

/* ================= TOAST ================= */

function mostrarToast(mensaje){

  let t = document.createElement("div");

  t.className = "toast";
  t.textContent = mensaje;

  document.body.appendChild(t);

  setTimeout(()=>{
    t.classList.add("mostrar");
  },100);

  setTimeout(()=>{

    t.classList.remove("mostrar");

    setTimeout(()=>{
      t.remove();
    },300);

  },2000);

}

/* ================= AGREGAR PRODUCTOS ================= */

function agregarDesdeCatalogo(nombre,precio,imagen,inputId){

  let cantidad = parseInt(document.getElementById(inputId).value) || 0;

  if(cantidad <= 0){

    mostrarToast("Selecciona al menos 1 producto");
    return;
  }

  let carrito = obtenerCarrito();

  let existe = carrito.find(
    p=>p.nombre===nombre
  );

  if(existe){

    existe.cantidad += cantidad;

  }else{

    carrito.push({
      nombre,
      precio,
      imagen,
      cantidad
    });

  }

  guardarCarrito(carrito);

  actualizarContador();

  mostrarCarritoLateral();

  document.getElementById(inputId).value=0;

  mostrarToast("Producto agregado");

}

/* ================= CARRITO LATERAL ================= */

function toggleCarrito(){

  let lateral=document.getElementById("carritoLateral");

  if(!lateral) return;

  lateral.classList.toggle("activo");

  if(lateral.classList.contains("activo")){
    mostrarCarritoLateral();
  }

}

function mostrarCarritoLateral(){

  let contenedor=document.getElementById("listaCarrito");

  if(!contenedor) return;

  let carrito=obtenerCarrito();

  contenedor.innerHTML="";

  if(carrito.length===0){

    contenedor.innerHTML="<p>Tu carrito está vacío</p>";

    return;
  }

  carrito.forEach((p,i)=>{

    contenedor.innerHTML += `

    <div class="item-carrito">

      <div class="item-izq">

      <img src="${p.imagen}" width="50">

      <div>

      <p>${p.nombre}</p>

      <p>$${p.precio} x ${p.cantidad}</p>

      </div>

      </div>

      <div class="controles">

      <button onclick="cambiarCantidad(${i},-1)">−</button>

      <button onclick="cambiarCantidad(${i},1)">+</button>

      <button class="eliminar"
      onclick="eliminarProducto(${i})">✕</button>

      </div>

    </div>

    `;

  });

}

/* ================= CARRITO PRINCIPAL ================= */

function cargarCarrito(){

let contenedor=document.getElementById("carrito");

if(!contenedor) return;

let carrito=obtenerCarrito();

contenedor.innerHTML="";

let total=0;

carrito.forEach((p,i)=>{

total += p.precio * p.cantidad;

contenedor.innerHTML += `

<div class="item-carrito">

<div class="item-izq">

<img src="${p.imagen}">

<div>

<p>${p.nombre}</p>

<p>$${p.precio}</p>

</div>

</div>

<div class="controles">

<button onclick="cambiarCantidad(${i},-1)">−</button>

<span>${p.cantidad}</span>

<button onclick="cambiarCantidad(${i},1)">+</button>

<button class="eliminar"
onclick="eliminarProducto(${i})">✕</button>

</div>

</div>

`;

});

let totalHTML=document.getElementById("total");

if(totalHTML){

totalHTML.textContent="Total: $" + total;

}

}

/* ================= CAMBIAR CANTIDAD ================= */

function cambiarCantidad(index,cambio){

let carrito=obtenerCarrito();

carrito[index].cantidad += cambio;

if(carrito[index].cantidad<=0){

carrito.splice(index,1);

}

guardarCarrito(carrito);

cargarCarrito();

actualizarContador();

mostrarCarritoLateral();

}

/* ================= ELIMINAR PRODUCTO ================= */

function eliminarProducto(index){

let carrito=obtenerCarrito();

carrito.splice(index,1);

guardarCarrito(carrito);

cargarCarrito();

actualizarContador();

mostrarCarritoLateral();

}

/* ================= PAGO ================= */

function pagar(){

let carrito=obtenerCarrito();

if(carrito.length===0){

mostrarToast("Tu carrito está vacío");

return;

}

mostrarToast("Tu compra fue exitosa");

localStorage.removeItem("carrito");

cargarCarrito();

actualizarContador();

mostrarCarritoLateral();

}

/* ================= CARRUSEL ================= */

let posicion=0;

function moverCarrusel(direccion){

let track=document.getElementById("track");

let card=document.querySelector(".card-carrusel");

if(!track || !card) return;

let ancho=card.offsetWidth + 20;

posicion += direccion * ancho;

let max=track.scrollWidth-track.parentElement.offsetWidth;

if(posicion<0) posicion=0;

if(posicion>max) posicion=max;

track.style.transform=`translateX(-${posicion}px)`;

}

/* ================= MENÚ HAMBURGUESA ================= */

function mostrarMenu(){

let menu=document.getElementById("miMenu");

if(menu){

menu.classList.toggle("responsive");

}

}

/* ================= INICIALIZACIÓN ================= */

document.addEventListener("DOMContentLoaded",()=>{

actualizarContador();

mostrarCarritoLateral();

cargarCarrito();

const formPersonalizado=document.getElementById("formPersonalizado");

if(formPersonalizado){

formPersonalizado.addEventListener("submit",function(e){

e.preventDefault();

let carrito=obtenerCarrito();

let select=document.getElementById("tipoProducto");

let productoSeleccionado=select.options[select.selectedIndex];

if(select.value===""){

mostrarToast("Selecciona un producto");

return;

}

let producto={

nombre:productoSeleccionado.value + " personalizado",

precio:parseInt(productoSeleccionado.dataset.precio),

cantidad:1,

imagen:"img/personalizado.jpg",

detalles:document.getElementById("mensaje").value

};

carrito.push(producto);

guardarCarrito(carrito);

mostrarToast("Producto agregado 💖");

actualizarContador();

this.reset();

});

}

});
