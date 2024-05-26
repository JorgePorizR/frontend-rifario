import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRifaById } from "../../services/RifaService";
import { createUsuarioParticipante, generarUsuariosGanadores, getRifaUsariosNoParticipantes, getRifaUsuariosNoParticipantesSearch } from "../../services/usuarioService";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

const RifaMeDetail = () => {
    const { id } = useParams();
    //const navigate = useNavigate();
    const [textError, setTextError] = useState('')
    const [contUsuarios, setContUsuarios] = useState(0);
    const [maxUsuarios, setMaxUsuarios] = useState(0);
    const [estadoRifa, setEstadoRifa] = useState(0);
    const [usuariosSeleccionados, setUsuariosSeleccionados] = useState([]);
    const [usuariosPartList, setUsuariosPartList] = useState([]);
    const [usuariosNoPartList, setUsuariosNoPartList] = useState([]);
    //const user = localStorage.getItem('user');
    const [errors, setErrors] = useState({});

    const [searchUser, setSearchUser] = useState('');


    const [showModal, setShowModal] = useState(false);
    const [cantidad, setCantidad] = useState(1);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const [showResultadosModal, setShowResultadosModal] = useState(false);
    const [resultados, setResultados] = useState([]);

    const handleCloseResultados = () => setShowResultadosModal(false);
    const handleShowResultados = () => setShowResultadosModal(true);

    useEffect(() => {
        if (!id) return;
        fetchRifa();
        fetchUsuariosNoPartByRifa();
    }, [id]);

    const fetchRifa = async () => {
        getRifaById(id).then((rifa) => {
            //console.log("rifa", rifa.rifas_participantes);
            setUsuariosPartList(rifa.rifas_participantes);
            setContUsuarios(rifa.rifas_participantes.length);
            setMaxUsuarios(rifa.cantidad_tickets);
            setEstadoRifa(rifa.estado);
        });
    }

    const fetchUsuariosNoPartByRifa = async () => {
        getRifaUsariosNoParticipantes(id).then((usuarios) => {
            //console.log("usuarios", usuarios);
            setUsuariosNoPartList(usuarios);
        });
    }

    const handleCheckboxChange = (isChecked, usuario) => {
        if (isChecked) {
            setContUsuarios((prevCont) => prevCont + 1);
            setUsuariosSeleccionados((prevUsuarios) => [...prevUsuarios, usuario]);
        } else {
            setContUsuarios((prevCont) => prevCont - 1);
            setUsuariosSeleccionados((prevUsuarios) =>
                prevUsuarios.filter((u) => u !== usuario)
            );
        }
    };

    const enviarParticipantes = (e) => {

        e.preventDefault();
        e.stopPropagation();

        if (contUsuarios > maxUsuarios) {
            setTextError('No puedes seleccionar más usuarios de los permitidos');
            return;
        } else {
            setTextError('');
        }
        usuarioParticipante();
    }

    const usuarioParticipante = async () => {
        for (const usuario of usuariosSeleccionados) {
            try {
                const usuarioPart = {
                    usuario_id: usuario.id.toString(),
                    rifa_id: id
                };
                console.log(usuarioPart);
                await createUsuarioParticipante(usuarioPart);
                await fetchRifa();
                await fetchUsuariosNoPartByRifa();
            } catch (err) {
                console.log(err);
                setErrors({ ...errors, formError: 'Error al unirse a la rifa, intente nuevamente' });
            }
        }
    }

    const enviarCantidadGanadores = (e) => {
        e.preventDefault();
        e.stopPropagation();

        cantidadGanadores(cantidad);
        setCantidad('');
        handleClose();
    }

    const cantidadGanadores = async (cantidad) => {

        try {
            const body = {
                cantidad_ganadores: cantidad
            };
            const response = await generarUsuariosGanadores(id, body);
            console.log(response);
            if (response && Object.keys(response).length > 0) {
                setResultados(response);
                handleShowResultados();
            }
            await fetchRifa();
            await fetchUsuariosNoPartByRifa();
        } catch (err) {
            console.log(err);
            setErrors({ ...errors, formError: 'Error al generar ganadores, intente nuevamente' });
        }
    }

    const searchNoParticipantes = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (searchUser === '') {
            fetchUsuariosNoPartByRifa();
        } else {
            fetchUsuariosNoPartByRifaSearch();
        }

    }

    const fetchUsuariosNoPartByRifaSearch = async () => {
        try {
            const response = await getRifaUsuariosNoParticipantesSearch(id, searchUser);

            if (response && Object.keys(response).length > 0) {
                setUsuariosNoPartList(response);
            }else{
                setUsuariosNoPartList([]);
            }
        } catch (err) {
            console.log(err);
            setErrors({ ...errors, formError: 'Error al buscar usuarios, intente nuevamente' });
        }
    }

    return (
        <>
            <Menu />
            <Container>
                <Row className="mt-3">
                    <Col xs={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col>
                                            <h2>USUARIOS PARTICIPANTES</h2>
                                        </Col>
                                        <Col md={{ span: 3, offset: 3 }}>
                                            {contUsuarios <= maxUsuarios ? <>
                                                <h5>Usuarios: {contUsuarios}/{maxUsuarios}</h5>
                                            </> : <>
                                                <h5 className="text-danger">Usuarios: {contUsuarios}/{maxUsuarios}</h5>
                                            </>}
                                        </Col>
                                        <Col>
                                            {estadoRifa == 0 && usuariosPartList.length > 0 ? <>
                                                <Button onClick={handleShow}>Iniciar Sorteo</Button>
                                                <Modal show={showModal} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Cantidad de Ganadores</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form onSubmit={enviarCantidadGanadores}>
                                                            <Form.Group controlId="cantidad">
                                                                <Form.Label>Cantidad:</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    placeholder="Ingrese la cantidad"
                                                                    value={cantidad}
                                                                    min={1}
                                                                    max={contUsuarios}
                                                                    onChange={(e) => setCantidad(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                            <Button className="mt-3" variant="primary" type="submit" style={{ marginRight: '10px' }}>
                                                                Enviar
                                                            </Button>
                                                            <Button className="mt-3" variant="secondary" onClick={handleClose}>
                                                                Cancelar
                                                            </Button>
                                                        </Form>
                                                    </Modal.Body>
                                                </Modal>
                                            </> : <>
                                            </>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre Completo</th>
                                            <th>Codigo Ticket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuariosPartList.map((usuario) =>
                                            <tr key={"usuario-" + usuario.usuario_id}>
                                                <td>{usuario.usuario_id}</td>
                                                <td>{usuario.participante_usuario.nombre_completo}</td>
                                                <td>{usuario.numero_ticket}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>USUARIOS NO PARTICIPANTES</h2>
                                </Card.Title>
                                <Form className="d-flex" onSubmit={searchNoParticipantes}>
                                    <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearchUser(e.target.value)}
                                    />
                                    <Button type="submit" variant="outline-success">Search</Button>
                                </Form>
                                <Form onSubmit={enviarParticipantes}>
                                    {usuariosNoPartList.map((usuario) => (
                                        <div key={`default-${usuario.id}`} className="mb-3">
                                            <hr className="hr" />
                                            <Form.Check
                                                type='checkbox'
                                                id={`default-checkbox-${usuario.id}`}
                                                label={`${usuario.id} - ${usuario.nombre_completo}`}
                                                onChange={(e) => handleCheckboxChange(e.target.checked, usuario)}
                                            />
                                        </div>
                                    ))}
                                    <hr className="hr" />
                                    {
                                        estadoRifa == 0 && usuariosNoPartList.length > 0 ? <>
                                            <div className="m-3">
                                                <Button type="submit">Agregar</Button>
                                            </div>
                                        </> : <>
                                            <p className="text-info">No se pueden añadir más participantes</p>
                                        </>
                                    }
                                    <p className="text-danger">{textError}</p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal show={showResultadosModal} onHide={handleCloseResultados}>
                <Modal.Header closeButton>
                    <Modal.Title>Resultados del Sorteo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {resultados.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>Ticket</th>
                                    <th>Ganador</th>
                                    <th>Telefono</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.map((resultado, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{resultado.numero_ticket}</td>
                                        <td>{resultado.participante_usuario.nombre_completo}</td>
                                        <td>+591 {resultado.participante_usuario.telefono}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No hay resultados disponibles.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseResultados}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RifaMeDetail;