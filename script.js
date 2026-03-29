// ===== CARRITO =====
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// AGREGAR PRODUCTO
function agregarCarrito(nombre, precio){
    carrito.push({nombre, precio});
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

// MOSTRAR CARRITO
function cargarCarrito(){
    let lista = document.getElementById("lista");
    let total = 0;

    if(!lista) return;

    lista.innerHTML = "";

    carrito.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.nombre + " - $" + item.precio;
        lista.appendChild(li);
        total += item.precio;
    });

    let totalElemento = document.getElementById("total");
    if(totalElemento){
        totalElemento.innerText = total;
    }
}

// PAGAR
function pagar(e){
    e.preventDefault();
    alert("Pago realizado con éxito 🎉");
    localStorage.removeItem("carrito");
    location.reload();
}

// ===== MODAL (IMAGEN GRANDE) =====
function abrirModal(src){
    let modal = document.getElementById("modal");
    let img = document.getElementById("imagenGrande");

    modal.style.display = "flex";
    img.src = src;
}

function cerrarModal(){
    document.getElementById("modal").style.display = "none";
}