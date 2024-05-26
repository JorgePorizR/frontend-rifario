import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    //const user = localStorage.getItem('user');
    const [usuario, setUsuario] = useState(null)
    const cerrarSesionClicked = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('user');

        navigate('/login');
    }
    useEffect(() => {
        if (usuario) {
            return;
        }
        getUserInfo();
    }, [])
    const getUserInfo = () => {
        axios.get('http://localhost:3000/api/me', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            //console.log(res.data);
            localStorage.setItem('user', res.data.id);
            setUsuario(res.data);
        });
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand href="/">HOME</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {token ? <>
                            <NavDropdown title="Rifas" id="basic-nav-dropdown">
                                <NavLink end className={"dropdown-item"} to="/rifas/me" >Mis Rifas</NavLink>
                                <NavLink end className={"dropdown-item"} to="/rifas/create" >Crear Rifa</NavLink>
                                <NavLink end className={"dropdown-item"} to="/rifas">
                                    Lista de Rifas
                                </NavLink>
                            </NavDropdown>
                            <NavLink className={"nav-link"}>{usuario && <>{usuario.nombre_completo.substring(0, 20)}</>}</NavLink>
                            <button onClick={cerrarSesionClicked} className="btn btn-link nav-link">Cerrar sesión</button>
                        </> : <>
                            <NavLink end className={"nav-link"} to="/login">Iniciar sesión</NavLink>
                            <NavLink end className={"nav-link"} to="/register">Registrarse</NavLink>
                        </>}

                    </Nav>
                    {/*token && <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        </Form>*/}
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );
}

export default Menu;