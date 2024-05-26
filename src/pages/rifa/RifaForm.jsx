import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createRifa, getRifaById, updateRifa } from "../../services/RifaService";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import LabelBS from "../../components/LabelBS";

const RifaForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [cantidad_tickets, setCantidadTickets] = useState(1);
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!id) return;
        fetchRifa();
    }, [id]);
    const fetchRifa = async () => {
        getRifaById(id).then((rifa) => {
            setNombre(rifa.nombre);
            setCantidadTickets(rifa.cantidad_tickets);
        });
    }

    const enviarDatos = (e) => {

        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) {
            return;
        }
        saveRifa();
    }

    const saveRifa = () => {
        const rifa = {
            nombre,
            cantidad_tickets
        }
        if (nombre.length <= 4 || nombre.trim() === ''){
            setErrors({ ...errors, formError: 'El nombre es demasiado corto' });
            return;
        }
        if (nombre.length >= 50){
            setErrors({ ...errors, formError: 'El nombre es demasiado largo' });
            return;
        }
        if (id) {
            updateRifa(id, rifa).then(() => {
                navigate('/rifas/me')
            }).catch((err) => {
                console.log(err);
                setErrors({ ...errors, formError: 'Error al actualizar rifa, intente nuevamente' })
            });
        } else {
            createRifa(rifa).then(() => {
                navigate('/rifas/me');
            }).catch((err) => {
                console.log(err);
                setErrors({ ...errors, formError: 'Error al insertar rifa, intente nuevamente' })
            });
        }
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
                                    <h1>Formulario de Rifas</h1>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={enviarDatos}>
                                    {errors.formError && <p className="text-danger">{errors.formError}</p>}
                                    <FormGroup>
                                        <LabelBS text="Nombre" />
                                        <FormControl required type="text" value={nombre} onChange={(e) => {
                                            setNombre(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">El nombre es requerido</Form.Control.Feedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <LabelBS text="Cantidad de Tickets" />
                                        <FormControl required type="number" min='1' value={cantidad_tickets} onChange={(e) => {
                                            setCantidadTickets(e.target.value)
                                        }} />
                                        <Form.Control.Feedback type="invalid">La cantidad de tickets es requerida</Form.Control.Feedback>
                                    </FormGroup>
                                    <div className="mt-2">
                                        <Button type="submit">Guardar</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RifaForm;