import React from "react";
import NavBar from "../Single_Components/NavBar";
import Footer from "../Single_Components/Footer";

function Scan_QR() {
  // URL para generar un código QR de prueba con tamaño grande
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://ejemplo.com";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFF8DC" }}>
      <NavBar />
      
      {/* Contenedor principal que toma toda la altura y ancho disponible */}
      <div className="flex-grow w-full flex items-center justify-center" 
           style={{ 
             background: "radial-gradient(circle, #FFFFFF 60%, #F9E79F 100%)",
             boxShadow: "inset 0 0 50px rgba(246, 229, 141, 0.6)"
           }}>
        
        {/* Contenedor interno para centrar verticalmente todo el contenido */}
        <div className="flex flex-col items-center text-center w-full">
          {/* Título por encima del QR */}
          <h1 className="text-3xl font-bold mb-8 text-amber-800">Escanear Código QR</h1>
          
          {/* Contenedor del QR con centrado explícito */}
          <div className="flex justify-center w-full">
            <div className="bg-white p-4 rounded-lg shadow-lg border-4" 
                 style={{ borderColor: "#F4D03F" }}>
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
          
          {/* Texto y botón por debajo del QR */}
          <p className="text-center text-amber-700 mt-6 mb-4 text-lg px-4">
            Este es un código QR de prueba que enlaza a ejemplo.com
          </p>
          
          <button 
            className="bg-green-600 hover:bg-black-700 text-white font-medium py-3 px-6 rounded-lg text-lg transition-colors shadow-md"
            onClick={() => alert("Función de escaneo activada")}
          >
            Escanear otro código QR
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Scan_QR;