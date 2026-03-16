import React from "react";

import Navbar from "./components/Navbar";
import Catalogo from "./components/Catalogo";
import Carrito from "./components/Carrito";
import Personalizacion from "./components/Personalizacion";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <Catalogo />
      <Personalizacion />
      <Carrito />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;