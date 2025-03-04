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
  const [apicultores, setApicultores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedApicultorId, setSelectedApicultorId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const apicultoresIniciales = [
    { id: 1, first_name: "Juan", last_name: "Pérez", state: "Active", imagen: imagen1 },
    { id: 2, first_name: "María", last_name: "Gómez", state: "Active", imagen: imagen2 },
    { id: 3, first_name: "Carlos", last_name: "Ramírez", state: "Inactive", imagen: imagen3 },
  ];

  const handleSelectChange = async (e, apicultorId) => {
    switch (e.target.value) {
      case 'editar':
        navigate('/EditUser', { state: { id: apicultorId } });
        break;
      case 'ver-detalles':
        try {
          const accessToken = localStorage.getItem('token');
          const response = await fetch(`http://127.0.0.1:8000/beekeepers/edit-beekeeper/${apicultorId}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) throw new Error('Error al cargar detalles');
          const data = await response.json();
          setSelectedApicultorId({ id: apicultorId, ...data });
          setShowPopup(true);
        } catch (error) {
          alert('Error al cargar detalles');
        }
        break;
      default:
        break;
    }
  };

  // Nueva función para cambiar el estado del apicultor
  const handleChangeState = async (apicultor) => {
    if (statusUpdating) return; // Evitar múltiples clics
    
    try {
      setStatusUpdating(true);
      const accessToken = localStorage.getItem('token');
      
      // Determinar el nuevo estado (inverso al actual)
      const newState = apicultor.state === 'Active' ? 'Deactivate' : 'Active';
      
      const response = await fetch(`http://127.0.0.1:8000/beekeepers/edit-state-beekeeper/${apicultor.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: newState }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar el estado');
      }
      
      const result = await response.json();
      
      // Actualizar la lista de apicultores con el nuevo estado
      setApicultores(prevApicultores => 
        prevApicultores.map(item => 
          item.id === apicultor.id ? { ...item, state: newState } : item
        )
      );
      
      // Actualizar el apicultor seleccionado en el modal
      setSelectedApicultorId(prev => ({ ...prev, state: newState }));
      
      // Mostrar mensaje de éxito
      alert('Estado actualizado correctamente');
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setStatusUpdating(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/beekeepers/list-beekeepers/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const result = await response.json();
        setApicultores(result.filter(user => user.role === 'beekeeper'));
        setLoading(false);
      } catch (error) {
        setError(error);
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
      <Admin_Nav_Bar />
      <div className="container-fluid flex-grow-1 py-3">
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-7 mb-4 mx-auto">
            <div className="d-flex flex-column gap-3">
              {apicultores.length > 0 ? (
                apicultores.map((apicultor) => (
                  <div key={apicultor.id} className="card shadow-lg border rounded p-3 mx-2 mx-md-3">
                    <div className="row g-0 align-items-center">
                      <div className="col-12 col-sm-4 mb-3 mb-sm-0 text-center">
                        <img 
                          src={imagen1} 
                          alt={`Imagen de ${apicultor.first_name} ${apicultor.last_name}`} 
                          className="img-fluid rounded-circle" 
                          style={{ height: '150px', width: '150px', objectFit: 'cover', border: '3px solid gray' }} 
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
          <div className="col-12 col-lg-4 col-xl-3">
            <Aside_Card />
          </div>
        </div>
      </div>
      <Footer />
      <div 
        className={`modal fade ${showPopup ? 'show' : ''}`} 
        id="apicultorModal" 
        tabIndex="-1" 
        aria-labelledby="apicultorModalLabel" 
        aria-hidden="true"
        style={{ display: showPopup ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
                <>
                  <h5 className="modal-title text-center mb-4" id="apicultorModalLabel">Información del apicultor</h5>
                  <div className="row">
                    <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
                      <img 
                        src={imagen1} 
                        alt={`Imagen de ${selectedApicultorId.first_name}`}
                        className="rounded-circle border border-3 border-secondary"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                      <div className="d-flex flex-column gap-2 mt-3">
                        <button 
                          className="btn btn-warning" 
                          onClick={() => navigate('/EditUser', { state: { id: selectedApicultorId.id } })}
                        >
                          Editar
                        </button>
                        <button 
                          className={`btn ${selectedApicultorId.state === 'Active' ? 'btn-danger' : 'btn-success'}`}
                          onClick={() => handleChangeState(selectedApicultorId)}
                          disabled={statusUpdating}
                        >
                          {statusUpdating ? (
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          ) : null}
                          {selectedApicultorId.state === 'Active' ? 'Deshabilitar' : 'Habilitar'}
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-md-7">
                      <p><strong>Nombres:</strong> {selectedApicultorId.first_name}</p>
                      <p><strong>Apellidos:</strong> {selectedApicultorId.last_name}</p>
                      <p><strong>Identificación:</strong> {selectedApicultorId.identifications}</p>
                      <p><strong>Teléfono:</strong> {selectedApicultorId.phone}</p>
                      <p><strong>Correo:</strong> {selectedApicultorId.email}</p>
                      <p><strong>Contacto de emergencia:</strong> {selectedApicultorId.emergency_contact_name}</p>
                      <p><strong>Teléfono de emergencia:</strong> {selectedApicultorId.emergency_contact_phone}</p>
                      <p><strong>Fecha de nacimiento:</strong> {selectedApicultorId.birth_date}</p>
                      <p><strong>Fecha de asignación:</strong> {selectedApicultorId.assignment_date}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPopup && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default ViewApicultor;