import React from "react";
import NavBar from "../Single_Components/NavBar";
import Footer from "../Single_Components/Footer";

function Scan_QR() {
  // URL para generar un código QR de prueba con tamaño grande
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://ejemplo.com";
  
  // Añadimos estilos para asegurar que el footer siempre esté abajo
  const pageStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  };
  
  const contentStyles = {
    flex: "1 0 auto" // Esto es crucial para que el contenido ocupe el espacio
  };
  
  return (
    <div style={pageStyles}>
      {/* NavBar */}
      <NavBar />
      
      {/* Contenido principal */}
      <div style={contentStyles} className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center text-center w-full my-4">
          <div className="flex justify-center w-full">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-warning border-5">
              <h1 className="text-center mb-5">Escanear QR de la colmena</h1>
              <img
                src={qrCodeUrl}
                alt="Código QR de prueba"
                style={{
                  width: "min(80vw, 500px)",
                  height: "min(80vw, 500px)"
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer con posición fija */}
      <Footer />
    </div>
  );
}

export default Scan_QR;