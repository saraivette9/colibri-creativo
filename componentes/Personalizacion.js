import React from "react";

function Personalizacion() {
  return (
    <div>
      <h2>Personalización de Producto</h2>

      <form>

        <label>Nombre:</label>
        <input type="text" />

        <br/>

        <label>Tipo de producto:</label>
        <select>
          <option>Caja regalo</option>
          <option>Kit cumpleaños</option>
          <option>Kit sorpresa</option>
        </select>

        <br/>

        <label>Colores:</label>
        <input type="text" />

        <br/>

        <label>Fecha del evento:</label>
        <input type="date" />

        <br/>

        <label>Mensaje especial:</label>
        <textarea></textarea>

        <br/>

        <button type="submit">Enviar</button>

      </form>
    </div>
  );
}

export default Personalizacion;