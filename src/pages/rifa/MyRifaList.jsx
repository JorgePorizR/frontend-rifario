import { useEffect, useState } from "react"
import { deleteRifa, getMyRifaList } from "../../services/RifaService";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEstadoForDisplay } from "../../utils/rifaUtils";
import { listaUsuariosGanadores } from "../../services/usuarioService";
import { FaEye, FaRegTrashCan } from "react-icons/fa6";
import { CiEdit, CiTrophy } from "react-icons/ci";

const MyRifaList = () => {
    const [myRifaList, setMyRifaList] = useState([]);

    const [showResultadosModal, setShowResultadosModal] = useState(false);
    const [resultados, setResultados] = useState([]);

    const handleCloseResultados = () => setShowResultadosModal(false);
    const handleShowResultados = () => setShowResultadosModal(true);

    useEffect(() => {
        fetchListaMiRifas();
    }, []);

    const fetchListaMiRifas = () => {
        getMyRifaList().then((res) => {
            setMyRifaList(res);
        });
    }

    const fetchResultados = async (id) => {
        try {
            const response = await listaUsuariosGanadores(id);
            if (response && Object.keys(response).length > 0) {
                setResultados(response);
                handleShowResultados();
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    const removeRifa = (id) => {
        const confirmation = window.confirm('¿Estás seguro podria haber participantes en la Rifa?');
        if (!confirmation) return;
        deleteRifa(id).then(() => {
            fetchListaMiRifas();
        });
    }
    return (
        <>
            <Menu />
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h1>MIS RIFAS</h1>
                                </Card.Title>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Nombre</th>
                                            <th>Cantidad Tickets</th>
                                            <th>Creador</th>
                                            <th>Codigo Ticket</th>
                                            <th>Estado</th>
                                            <th>Participantes</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myRifaList.map((rifa) =>
                                            <tr key={"rifa-" + rifa.id}>
                                                <td className="align-middle">{rifa.id}</td>
                                                <td className="align-middle" style={{ maxWidth: '120px'}}>{rifa.nombre}</td>
                                                <td className="align-middle">{rifa.cantidad_tickets}</td>
                                                <td className="align-middle" style={{ maxWidth: '120px'}}>{rifa.usuario_creador.nombre_completo}</td>
                                                <td className="align-middle">{rifa.codigo_ticket}</td>
                                                <td className="align-middle">{getEstadoForDisplay(rifa.estado)}</td>
                                                <td className="align-middle">{rifa.rifas_participantes.length}</td>
                                                {
                                                    rifa.estado == 1 ? <>
                                                        <td>
                                                            <Button variant="btn btn-outline-success" onClick={() => fetchResultados(rifa.id)}>
                                                                <CiTrophy className="fs-5"/>
                                                            </Button>
                                                        </td>
                                                    </>: <>
                                                        <td>

                                                        </td>
                                                    </>
                                                }
                                                <td><Link className="btn btn-outline-info" to={"/rifas/me/detail/" + rifa.id}>
                                                    <FaEye className="fs-5" />
                                                    </Link></td>
                                                {
                                                    rifa.estado == 0 ? <>
                                                        <td><Link className="btn btn-outline-primary" to={"/rifas/" + rifa.id}>
                                                            Editar 
                                                            <CiEdit className="fs-5" />
                                                        </Link></td>
                                                    </>: <>
                                                    <td></td>
                                                    </> 
                                                }
                                                <td>
                                                    <Button variant="btn btn-outline-danger" onClick={() => removeRifa(rifa.id)}>

                                                        <FaRegTrashCan />
                                                    </Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
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

export default MyRifaList;