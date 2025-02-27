import { useNavigate } from 'react-router-dom';
import imagen1 from 'src/img/abejitas.jpeg';
import imagen2 from 'src/img/imagen_ejemplo.jpg';
import imagen3 from 'src/img/images.jpeg';
import { useEffect, useState } from 'react';
import NavBar from '../Single_Components/NavBar';
import Footer from '../Single_Components/Footer';
import Aside_Card from '../Single_Components/Aside';
// Importamos Bootstrap (asegúrate de tenerlo instalado)
// npm install bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Dashboard() {
  // Estado para almacenar los datos obtenidos
  const [data, setData] = useState(null);
  // Estado para manejar posibles errores
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //Estado para la seleccion de Id en las colmenas
  const [selectedColmenaId, setSelectedColmenaId] = useState(null);
  //Estado para la apertura del PopUp con la informacion del apicultor
  const [showPopup, setShowPopup] = useState(false);

  const colmenasIniciales = [
    { id: 12345, finca: "Finca La Margarita", imagen: imagen1 },
    { id: 25485, finca: "Finca Los Alpes", imagen: imagen2 },
    { id: 98712, finca: "Finca La Graciela", imagen: imagen3 },
    { id: 22334, finca: "Finca La Margarita", imagen: imagen1 },
    { id: 22663, finca: "Finca Los Alpes", imagen: imagen2 },
    { id: 11223, finca: "Finca La Graciela", imagen: imagen3 },
  ];

  const colmenasCompletas= [
    {
      cod: 12345,
      cantidadCriasAbierta : 24,
      cantidadCriasOperculada : 54,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Europea',
      reportesGenerales: 'Sin novedad' 
    },
    {
      cod: 25485,
      cantidadCriasAbierta : 34,
      cantidadCriasOperculada : 45,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Africanita',
      reportesGenerales: 'Sin novedad' 
    },
    {
      cod: 98712,
      cantidadCriasAbierta: 25,
      cantidadCriasOperculada: 43,
      presenciaReina: 'Si',
      colorReina: 'Negra',
      origenReina : 'Europea',
      reportesGenerales: 'Sin novedad'
    },
    {
      cod: 22334,
      cantidadCriasAbierta : 24,
      cantidadCriasOperculada : 54,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Europea',
      reportesGenerales: 'Sin novedad' 
    },
    {
      cod: 22663,
      cantidadCriasAbierta : 34,
      cantidadCriasOperculada : 45,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Africanita',
      reportesGenerales: 'Sin novedad' 
    },
    {
      cod: 11223,
      cantidadCriasAbierta: 25,
      cantidadCriasOperculada: 43,
      presenciaReina: 'Si',
      colorReina: 'Negra',
      origenReina : 'Europea',
      reportesGenerales: 'Sin novedad'
    } 
  ];

  const handleSelectChange = (e, colmenaId) => {
    switch(e.target.value) {
      case 'editar':
        navigate('/EditColmena');
        break;
      case 'monitoreo':
        navigate('/Monitoreo');
        break;
      case 'recoleccion':
        navigate('/Recoleccion');
        break;
      case 'visualizar-detalles':
        setSelectedColmenaId(null); // Primero resetea
        setTimeout(() => {
          setSelectedColmenaId(colmenaId);
          setShowPopup(true);
        }, 10);
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/beehive/list-hives/');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setSelectedColmenaId(null);
    }, 400)
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header/Navbar */}
      <NavBar />

      {/* Main Content */}
      <div className="container-fluid flex-grow-1 py-3">
        <div className="row">
          {/* Main Content Area */}
          <div className="col-12 col-lg-6 mb-4" style={{ marginLeft: '15rem' }}>
            <div className="d-flex flex-column gap-3">
              {colmenasIniciales.map((colmena) => (
                <div 
                  key={colmena.id} 
                  className="card shadow-lg border rounded p-3 ms-5"
                >
                  <div className="row g-0 align-items-center">
                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                      <img 
                        src={colmena.imagen} 
                        alt="Imagen de la colmena" 
                        className="img-fluid rounded" 
                        style={{ 
                          height: '200px', 
                          width: '100%', 
                          objectFit: 'cover' 
                        }} 
                      />
                    </div>
                    <div className="col-12 col-md-5 text-center text-md-start mb-3 mb-md-0">
                      <h3 className="mb-1 ms-5">Cod {colmena.id}</h3>
                      {colmena.finca && <p className="mb-0 ms-5" >{colmena.finca}</p>}
                    </div>
                    <div className="col-12 col-md-3 text-center text-md-end">
                      <select 
                        className="form-select form-select-sm bg-warning-subtle border-warning-subtle"
                        onChange={(e) => handleSelectChange(e, colmena.id)}
                      >
                        <option value="">Seleccionar</option>
                        <option value='editar'>Editar</option>
                        <option value='recoleccion'>Recolección</option>
                        <option value='monitoreo'>Monitoreo</option>
                        <option value="visualizar-detalles">Visualizar Detalles</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar/Aside */}
          <div className="col-12 col-lg-3">
            <Aside_Card />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal/Popup using Bootstrap */}
      <div 
        className={`modal fade ${showPopup ? 'show' : ''}`} 
        id="colmenaModal" 
        tabIndex="-1" 
        aria-labelledby="colmenaModalLabel" 
        aria-hidden="true"
        style={{ 
          display: showPopup ? 'block' : 'none',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0 pb-0">
              <img 
                src="src/img/Colmenares_del_eje_logo.png" 
                alt="Logo" 
                style={{ height: '35px' }} 
                className="mx-auto"
              />
              <button 
                type="button" 
                className="btn-close" 
                onClick={closePopup}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedColmenaId && (
                (() => {
                  const selectedColmena = colmenasCompletas.find(c => c.cod === selectedColmenaId);
                  if (selectedColmena) {
                    return (
                      <>
                        <h5 className="modal-title text-center mb-4" id="colmenaModalLabel">Información de la colmena</h5>
                        <div className="row">
                          <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
                            <img 
                              src={imagen1} 
                              alt="Imagen de colmena"
                              className="rounded-circle border border-3 border-secondary"
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                              }}
                            />
                            <div className="d-flex flex-column gap-2 mt-3">
                              <button className="btn btn-warning">Editar</button>
                              <button className="btn btn-warning">Deshabilitar</button>
                            </div>
                          </div>
                          <div className="col-12 col-md-7">
                            <p><strong>Cantidad cuadros cria abierta:</strong> {selectedColmena.cantidadCriasAbierta}</p>
                            <p><strong>Cantidad de cuadros de cria operculada:</strong> {selectedColmena.cantidadCriasOperculada}</p>
                            <p><strong>Presencia reina:</strong> {selectedColmena.presenciaReina || 'No especificado'}</p>
                            <p><strong>ColorReina:</strong> {selectedColmena.colorReina}</p>
                            <p><strong>Origen Reina:</strong> {selectedColmena.origenReina}</p>
                            <p><strong>Reportes generales:</strong> {selectedColmena.reportesGenerales}</p>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return <p className="text-center">No se encontró información detallada para esta colmena.</p>;
                  }
                })()
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop for modal */}
      {showPopup && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Dashboard;