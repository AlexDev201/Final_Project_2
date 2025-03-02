import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../Single_Components/NavBar';
import Footer from '../Single_Components/Footer';
import Aside_Card from '../Single_Components/Aside';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Imágenes placeholders (puedes mantenerlas o ajustarlas dinámicamente si agregas un campo de imagen al modelo)
import imagen1 from 'src/img/abejitas.jpeg';
import imagen2 from 'src/img/imagen_ejemplo.jpg';
import imagen3 from 'src/img/images.jpeg';

function Dashboard() {
  const [data, setData] = useState(null); // Datos de las colmenas desde la API
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedColmenaId, setSelectedColmenaId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Imágenes cíclicas para asignar a las colmenas (si no hay campo de imagen en el modelo)
  const imagenes = [imagen1, imagen2, imagen3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/beehive/list-hives/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Asegúrate de incluir el token si la API lo requiere
          },
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e, colmenaId) => {
    switch (e.target.value) {
      case 'editar':
        case 'editar':
        navigate(`/EditColmena/${colmenaId}`); 
    break;
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
      default:
        break;
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setSelectedColmenaId(null);
    }, 400);
  };

  // Renderizado
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />

      <div className="container-fluid flex-grow-1 py-3">
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-7 mb-4 mx-auto">
            <div className="d-flex flex-column gap-3">
              {error ? (
                <p className="text-danger text-center">Error: {error}</p>
              ) : !data ? (
                <p className="text-center">Cargando colmenas...</p>
              ) : data.length === 0 ? (
                <p className="text-center">No hay colmenas registradas.</p>
              ) : (
                data.map((colmena, index) => (
                  <div 
                    key={colmena.id} 
                    className="card shadow-lg border rounded p-3 mx-2 mx-md-3"
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                        <img 
                          src={imagenes[index % imagenes.length]} // Asigna una imagen cíclica
                          alt="Imagen de la colmena" 
                          className="img-fluid rounded" 
                          style={{ 
                            maxHeight: '200px', 
                            width: '100%', 
                            objectFit: 'cover' 
                          }} 
                        />
                      </div>
                      <div className="col-12 col-sm-5 text-center text-sm-start mb-3 mb-sm-0">
                        <h3 className="mb-1 ms-0 ms-sm-3">Cod {colmena.id}</h3>
                        <p className="mb-0 ms-0 ms-sm-3">{colmena.location}</p> {/* Usamos location como "finca" */}
                      </div>
                      <div className="col-12 col-sm-3 text-center">
                        <select 
                          className="form-select form-select-sm bg-warning-subtle border-warning-subtle"
                          onChange={(e) => handleSelectChange(e, colmena.id)}
                        >
                          <option value="">Seleccionar</option>
                          <option value="editar">Editar</option>
                          <option value="recoleccion">Recolección</option>
                          <option value="monitoreo">Monitoreo</option>
                          <option value="visualizar-detalles">Visualizar Detalles</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="col-12 col-lg-4 col-xl-3">
            <Aside_Card />
          </div>
        </div>
      </div>

      <Footer />

      {/* Popup */}
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
              {selectedColmenaId && data && (
                (() => {
                  const selectedColmena = data.find(c => c.id === selectedColmenaId);
                  if (selectedColmena) {
                    return (
                      <>
                        <h5 className="modal-title text-center mb-4" id="colmenaModalLabel">Información de la colmena</h5>
                        <div className="row">
                          <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
                            <img 
                              src={imagen1} // Usa una imagen placeholder o ajusta si tienes un campo de imagen
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
                            <p><strong>Cantidad cuadros cría abierta:</strong> {selectedColmena.open_brood_frames}</p>
                            <p><strong>Cantidad cuadros cría operculada:</strong> {selectedColmena.capped_brood_frames}</p>
                            <p><strong>Presencia reina:</strong> {selectedColmena.queen_presence ? 'Sí' : 'No'}</p>
                            <p><strong>Color reina:</strong> {selectedColmena.queen_color}</p>
                            <p><strong>Origen reina:</strong> {selectedColmena.origin}</p>
                            <p><strong>Reportes generales:</strong> {selectedColmena.observations}</p>
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
      {showPopup && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Dashboard;