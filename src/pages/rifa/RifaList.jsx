import { useEffect, useState } from "react"
import { getRifaList, getRifaListSearch } from "../../services/RifaService";
import Menu from "../../components/Menu";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEstadoForDisplay } from "../../utils/rifaUtils";
import { IoMdArrowDroprightCircle } from "react-icons/io";
const RifaList = () => {
    const [rifaList, setRifaList] = useState([]);

    const [searchRifa, setSearchRifa] = useState('');

    useEffect(() => {
        fetchListaRifas();
    }, []);

    const fetchListaRifas = () => {
        getRifaList().then((res) => {
            setRifaList(res);
        });
    }

    const searchRifas = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (searchRifa === '') {
            fetchListaRifas();
        } else {
            fetchListaRifaSearch();
        }

    }

    const fetchListaRifaSearch = async () => {
        try {
            const response = await getRifaListSearch(searchRifa);

            if (response && Object.keys(response).length > 0) {
                setRifaList(response);
            }else{
                setRifaList([]);
            }
        } catch (err) {
            console.log(err);
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
                                <Row>
                                    <Col>
                                        <Card.Title>
                                            <h1>LISTA DE RIFAS</h1>
                                        </Card.Title>
                                    </Col>
                                    <Col>
                                        <Form className="d-flex" onSubmit={searchRifas}>
                                            <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2 w-50"
                                            aria-label="Search"
                                            onChange={(e) => setSearchRifa(e.target.value)}
                                            />
                                            <Button type="submit" variant="outline-success">Search</Button>
                                        </Form>
                                    </Col>
                                </Row>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rifaList ? rifaList.map((rifa) =>
                                                <tr key={"rifa-" + rifa.id}>
                                                    <td className="align-middle">{rifa.id}</td>
                                                    <td className="align-middle"  style={{ maxWidth: '120px'}}>{rifa.nombre}</td>
                                                    <td className="align-middle">{rifa.cantidad_tickets}</td>
                                                    <td className="align-middle"  style={{ maxWidth: '120px'}}>{rifa.usuario_creador.nombre_completo}</td>
                                                    <td className="align-middle">{rifa.codigo_ticket}</td>
                                                    <td className="align-middle">{getEstadoForDisplay(rifa.estado)}</td>
                                                    <td className="align-middle">{rifa.rifas_participantes.length}</td>
                                                    <td className="align-middle text-center">
                                                        <Link className="fs-1 d-inline-flex justify-content-center align-items-center" to={"/rifas/detail/" + rifa.id}>
                                                            <IoMdArrowDroprightCircle/>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ): <tr><td colSpan="8">No Hay Resultados</td></tr>
                                        }
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

export default RifaList;