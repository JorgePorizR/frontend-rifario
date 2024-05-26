import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRifaById } from "../../services/RifaService";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { createUsuarioParticipante } from "../../services/usuarioService";

const RifaDetail = () => {
    const { id } = useParams();
    //const navigate = useNavigate();
    const [contUsuarios, setContUsuarios] = useState(0);
    const [maxUsuarios, setMaxUsuarios] = useState(0);
    const [usuariosPartList, setUsuariosPartList] = useState([]);
    const user = localStorage.getItem('user');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!id) return;
        fetchRifa();
    }, [id]);
    
    const fetchRifa = async () => {
        getRifaById(id).then((rifa) => {
            setUsuariosPartList(rifa.rifas_participantes);
            setContUsuarios(rifa.rifas_participantes.length);
            setMaxUsuarios(rifa.cantidad_tickets);
        });
    }

    const enviarParticipante = (e) => {

        e.preventDefault();
        e.stopPropagation();

        usuarioParticipante();
    }

    const usuarioParticipante = () => {
        const usuario = {
            usuario_id: user,
            rifa_id: id
        }
        console.log(usuario);
        createUsuarioParticipante(usuario).then(() => {
            fetchRifa();
        }).catch((err) => { 
            console.log(err);
            setErrors({ ...errors, formError: 'Error al unirse a la rifa, intente nuevamente' });
        });
    }

    const userParticipa = usuariosPartList.some(usuario => usuario.usuario_id == user);

    return (
        <>
            <Menu />
            <Container>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <Row>
                                        <Col>
                                            <h2>USUARIOS PARTICIPANTES</h2>
                                        </Col>
                                        <Col>
                                        { userParticipa ?  <>
                                            </> : <>
                                                { contUsuarios == maxUsuarios ? <> 
                                                    </> : <>
                                                    <Form onSubmit={enviarParticipante}>
                                                        <div>
                                                            <Button type="submit">Unirse</Button>
                                                        </div>
                                                    </Form>
                                                    </>
                                                }
                                            </>
                                            }
                                        </Col>
                                    </Row>
                                </Card.Title>
                                <Table responsive>
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
                </Row>
            </Container>
        </>
    )
}

export default RifaDetail;