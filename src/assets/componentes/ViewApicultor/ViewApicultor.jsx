import { useNavigate } from 'react-router-dom';
import imagen1 from 'src/img/apicultor_icon.png';
import imagen2 from 'src/img/apicultor_icon_3.png';
import imagen3 from 'src/img/apicultor_icon_2.png';
import { useEffect, useState } from 'react';
import Admin_Nav_Bar from '../Single_Components/Admin_Nav_Bar';
import Footer from '../Single_Components/Footer';
import Aside_Card from '../Single_Components/Aside';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ViewApicultor() {
  // Estado para almacenar los datos obtenidos
  const [apicultores, setApicultores] = useState([]);
  // Estado para manejar posibles errores
  const [error, setError] = useState(null);
  // Estado para manejar el cargando
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Estado para la selección de Id del apicultor
  const [selectedApicultorId, setSelectedApicultorId] = useState(null);
  // Estado para la apertura del PopUp con la información del apicultor
  const [showPopup, setShowPopup] = useState(false);

  // Apicultores iniciales para desarrollo/testing
  const apicultoresIniciales = [
    { id: 1, first_name: "Juan", last_name: "Pérez", state: "Active", imagen: imagen1 },
    { id: 2, first_name: "María", last_name: "Gómez", state: "Active", imagen: imagen2 },
    { id: 3, first_name: "Carlos", last_name: "Ramírez", state: "Inactive", imagen: imagen3 },
  ];

  const apicultoresCompletos = [
    {
      id: 1,
      first_name: "Juan",
      last_name: "Pérez",
      identifications: "1023456789",
      phone: "3011234567",
      email: "juan.perez@example.com",
      emergency_contact_name: "Ana Pérez",
      emergency_contact_phone: "3109876543",
      birth_date: "1985-03-15",
      assignment_date: "2023-01-10",
      state: "Active"
    },
    {
      id: 2,
      first_name: "María",
      last_name: "Gómez",
      identifications: "1098765432",
      phone: "3209876543",
      email: "maria.gomez@example.com",
      emergency_contact_name: "Pedro Gómez",
      emergency_contact_phone: "3156789012",
      birth_date: "1990-07-22",
      assignment_date: "2023-02-15",
      state: "Active"
    },
    {
      id: 3,
      first_name: "Carlos",
      last_name: "Ramírez",
      identifications: "1076543210",
      phone: "3001234567",
      email: "carlos.ramirez@example.com",
      emergency_contact_name: "Laura Ramírez",
      emergency_contact_phone: "3187654321",
      birth_date: "1988-11-05",
      assignment_date: "2023-03-20",
      state: "Inactive"
    }
  ];

  const handleSelectChange = (e, apicultorId) => {
    switch(e.target.value) {
      case 'editar':
        navigate('/EditUser', { state: { id: apicultorId } });
        break;
      case 'ver-detalles':
        setSelectedApicultorId(null); // Primero resetea
        setTimeout(() => {
          setSelectedApicultorId(apicultorId);
          setShowPopup(true);
        }, 10);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/beekeepers/list-beekeepers/');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const result = await response.json();
        setApicultores(result.filter(user => user.role === 'beekeeper'));
        setLoading(false);
      } catch (error) {
        setError(error);
        // Si hay un error, usamos los datos de prueba
        setApicultores(apicultoresIniciales);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setSelectedApicultorId(null);
    }, 400);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header/Navbar */}
      <Admin_Nav_Bar />

             {/* Main Content */}
          <div className="container-fluid flex-grow-1 py-3">
            <div className="row">
              {/* Main Content Area - ajustado para ser consistente con Dashboard */}
              <div className="col-12 col-lg-8 col-xl-7 mb-4 mx-auto">
                <div className="d-flex flex-column gap-3">
                  {apicultores.length > 0 ? (
                    apicultores.map((apicultor) => (
                      <div 
                      key={apicultor.id} 
                      className="card shadow-lg border rounded p-3 mx-2 mx-md-3"
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-12 col-sm-4 mb-3 mb-sm-0 text-center">
                          <img 
                            src={imagen1} 
                            alt={`Imagen de ${apicultor.first_name} ${apicultor.last_name}`} 
                            className="img-fluid rounded-circle" 
                            style={{ 
                              height: '150px', 
                              width: '150px', 
                              objectFit: 'cover',
                              border: '3px solid gray'
                            }} 
                          />
                        </div>
                        <div className="col-12 col-sm-5 text-center text-sm-start mb-3 mb-sm-0">
                          <h3 className="mb-1 ms-0 ms-sm-3">{apicultor.first_name} {apicultor.last_name}</h3>
                          <p className="mb-0 ms-0 ms-sm-3">{apicultor.state === 'Active' ? 'Activo' : 'Inactivo'}</p>
                        </div>
                        <div className="col-12 col-sm-3 text-center">
                          <select 
                            className="form-select form-select-sm bg-warning-subtle border-warning-subtle"
                            onChange={(e) => handleSelectChange(e, apicultor.id)}
                          >
                            <option value="">Seleccionar</option>
                            <option value="editar">Editar</option>
                            <option value="ver-detalles">Ver detalles</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="alert alert-warning mx-2 mx-md-3" role="alert">
                    No hay apicultores registrados
                  </div>
          )}
        </div>
      </div>

      {/* Sidebar/Aside - mismo tamaño que en Dashboard */}
      <div className="col-12 col-lg-4 col-xl-3">
        <Aside_Card />
      </div>
  </div>
  </div>
      {/* Footer */}
      <Footer />

      {/* Modal/Popup using Bootstrap */}
      <div 
        className={`modal fade ${showPopup ? 'show' : ''}`} 
        id="apicultorModal" 
        tabIndex="-1" 
        aria-labelledby="apicultorModalLabel" 
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
              {selectedApicultorId && (
                (() => {
                  // Encontrar el apicultor seleccionado (primero en API, luego en datos locales)
                  const selectedApicultor = apicultoresCompletos.find(a => a.id === selectedApicultorId);
                  if (selectedApicultor) {
                    return (
                      <>
                        <h5 className="modal-title text-center mb-4" id="apicultorModalLabel">Información del apicultor</h5>
                        <div className="row">
                          <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
                            <img 
                              src={imagen1} 
                              alt={`Imagen de ${selectedApicultor.first_name}`}
                              className="rounded-circle border border-3 border-secondary"
                              style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'cover',
                              }}
                            />
                            <div className="d-flex flex-column gap-2 mt-3">
                              <button className="btn btn-warning" onClick={() => navigate('/EditUser', { state: { id: selectedApicultor.id } })}>Editar</button>
                              <button className="btn btn-warning">
                                {selectedApicultor.state === 'Active' ? 'Deshabilitar' : 'Habilitar'}
                              </button>
                            </div>
                          </div>
                          <div className="col-12 col-md-7">
                            <p><strong>Nombres:</strong> {selectedApicultor.first_name}</p>
                            <p><strong>Apellidos:</strong> {selectedApicultor.last_name}</p>
                            <p><strong>Identificación:</strong> {selectedApicultor.identifications}</p>
                            <p><strong>Teléfono:</strong> {selectedApicultor.phone}</p>
                            <p><strong>Correo:</strong> {selectedApicultor.email}</p>
                            <p><strong>Contacto de emergencia:</strong> {selectedApicultor.emergency_contact_name}</p>
                            <p><strong>Teléfono de emergencia:</strong> {selectedApicultor.emergency_contact_phone}</p>
                            <p><strong>Fecha de nacimiento:</strong> {selectedApicultor.birth_date}</p>
                            <p><strong>Fecha de asignación:</strong> {selectedApicultor.assignment_date}</p>
                            <p><strong>Estado:</strong> {selectedApicultor.state === 'Active' ? 'Activo' : 'Inactivo'}</p>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return <p className="text-center">No se encontró información detallada para este apicultor.</p>;
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

export default ViewApicultor;