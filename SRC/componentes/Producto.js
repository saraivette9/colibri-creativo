import React from "react";

function Producto({ nombre, precio }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <p>Precio: ${precio}</p>
      <button>Agregar al carrito</button>
    </div>
  );
}

export default Producto;