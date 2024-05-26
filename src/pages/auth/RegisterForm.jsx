import { Button, Card, Col, Container, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import Menu from "../../components/Menu";
import LabelBS from "../../components/LabelBS";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { postRegister } from "../../services/AuthService";

const RegisterForm = () => {
    const navigate = useNavigate();
    const [nombre_completo, setNombreCompleto] = useState('');
    const [telefono, setTelefono] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validated, setValidated] = useState(false);
    const [errors, setErrors] = useState({})


    const enviarDatos = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        const newErrors = {
            nombre_completo: {},
            telefono: {},
            email: {},
            password: {}
        };

        if (!nombre_completo) {
            newErrors.nombre_completo.emptyName = 'El nombre es requerido';
        } else {
            if (nombre_completo.length < 4) {
                newErrors.nombre_completo.nameLength = 'El nombre debe tener al menos 4 caracteres';
            }
            if (nombre_completo.length > 40) {
                newErrors.nombre_completo.nameLength = 'El nombre debe tener menos de 40 caracteres';
            }
        }

        if (!telefono) {
            newErrors.telefono.emptyPhone = 'El teléfono es requerido';
        } else {
            if (telefono.length !== 8) {
                newErrors.telefono.phoneLength = 'El teléfono debe tener al menos 8 digitos';
            }
            if (telefono.startsWith("6") || telefono.startsWith("7")) {
                //
            }else{
                newErrors.telefono.numericStart = 'El teléfono debe comenzar con 6 o 7';
            }
            if (isNaN(telefono)) {
                newErrors.telefono.isNumeric = 'El teléfono debe ser numérico';
            }
        }

        if (!email) {
            newErrors.email.emptyEmail = 'El correo es requerido';
        } else {
            const emailRegex = new RegExp('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}');
            if (!emailRegex.test(email)) {
                newErrors.email.emailFormat = 'El correo no tiene un formato válido';
            }
        }

        if (!password) {
            newErrors.password.emptyPassword = 'La contraseña es requerida';
        } else {
            if (password.length < 5) {
                newErrors.password.passwordLength = 'La contraseña debe tener al menos 5 caracteres';
            }
            const passwordRegex = new RegExp(/^(?=.*[!@#%$])/);
            if (!passwordRegex.test(password)) {
                newErrors.password.passwordSymbols = 'La contraseña debe contener al menos uno de los siguientes símbolos: !@#%$';
            }
            const upperCaseRegex = new RegExp(/^(?=.*[A-Z])/);
            if (!upperCaseRegex.test(password)) {
                newErrors.password.passwordUpperCase = 'La contraseña debe contener al menos una letra mayúscula';
            }
            const lowerCaseRegex = new RegExp(/^(?=.*[a-z])/);
            if (!lowerCaseRegex.test(password)) {
                newErrors.password.passwordLowerCase = 'La contraseña debe contener al menos una letra minúscula';
            }
            const numberRegex = new RegExp(/^(?=.*[0-9])/);
            if (!numberRegex.test(password)) {
                newErrors.password.passwordNumber = 'La contraseña debe contener al menos un número';
            }
        }

        if (Object.keys(newErrors.nombre_completo).length == 0) {
            delete newErrors.nombre_completo;
        } else {
            isValid = false;
        }
        if (Object.keys(newErrors.telefono).length == 0) {
            delete newErrors.telefono;
        } else {
            isValid = false;
        }
        if (Object.keys(newErrors.email).length == 0) {
            delete newErrors.email;
        } else {
            isValid = false;
        }
        if (Object.keys(newErrors.password).length == 0) {
            delete newErrors.password;
        } else {
            isValid = false;
        }
        if (!isValid) {
            setErrors(newErrors);
            console.log('Formulario inválido', newErrors);
            return;
        }

        doRegister();
    }
    const doRegister = () => {
        const credentials = {
            nombre_completo,
            telefono,
            email,
            password
        }

        postRegister(credentials)
            .then(() => {
                navigate('/login');
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 400) {
                    setErrors({ ...errors, formError: err.response.data.message })
                }
            });
    }
    return (<>
        <Menu />
        <Container>
            <Row className="mt-3">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h1>Registro</h1>
                            </Card.Title>
                            <Form noValidate validated={validated} onSubmit={enviarDatos}>
                                {errors.formError && <p className="text-danger">{errors.formError}</p>}
                                <FormGroup className="mt-2">
                                    <LabelBS text="Nombre completo" />
                                    <FormControl isInvalid={errors.nombre_completo} type="text" value={nombre_completo} onChange={(e) => {
                                        setNombreCompleto(e.target.value)
                                    }} />
                                    {errors.nombre_completo?.emptyName && <Form.Control.Feedback type="invalid">{errors.nombre_completo.emptyName}</Form.Control.Feedback>}
                                    {errors.nombre_completo?.nameLength && <Form.Control.Feedback type="invalid">{errors.nombre_completo.nameLength}</Form.Control.Feedback>}
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <LabelBS text="Teléfono" />
                                    <FormControl isInvalid={errors.telefono} type="text" value={telefono} onChange={(e) => {
                                        setTelefono(e.target.value)
                                    }} />
                                    {errors.telefono?.emptyPhone && <Form.Control.Feedback type="invalid">{errors.telefono.emptyPhone}</Form.Control.Feedback>}
                                    {errors.telefono?.phoneLength && <Form.Control.Feedback type="invalid">{errors.telefono.phoneLength}</Form.Control.Feedback>}
                                    {errors.telefono?.numericStart && <Form.Control.Feedback type="invalid">{errors.telefono.numericStart}</Form.Control.Feedback>}
                                    {errors.telefono?.isNumeric && <Form.Control.Feedback type="invalid">{errors.telefono.isNumeric}</Form.Control.Feedback>}
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <LabelBS text="Correo" />
                                    <FormControl isInvalid={errors.email} type="email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} />
                                    {errors.email?.emptyEmail && <Form.Control.Feedback type="invalid">{errors.email.emptyEmail}</Form.Control.Feedback>}
                                    {errors.email?.emailFormat && <Form.Control.Feedback type="invalid">{errors.email.emailFormat}</Form.Control.Feedback>}
                                </FormGroup>
                                <FormGroup className="mt-2">
                                    <LabelBS text="Contraseña" />
                                    <FormControl isInvalid={errors.password} type="password" value={password} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} />
                                    {errors.password?.emptyPassword && <Form.Control.Feedback type="invalid">{errors.password.emptyPassword}</Form.Control.Feedback>}
                                    {errors.password?.passwordLength && <Form.Control.Feedback type="invalid">{errors.password.passwordLength}</Form.Control.Feedback>}
                                    {errors.password?.passwordSymbols && <Form.Control.Feedback type="invalid">{errors.password.passwordSymbols}</Form.Control.Feedback>}
                                    {errors.password?.passwordUpperCase && <Form.Control.Feedback type="invalid">{errors.password.passwordUpperCase}</Form.Control.Feedback>}
                                    {errors.password?.passwordLowerCase && <Form.Control.Feedback type="invalid">{errors.password.passwordLowerCase}</Form.Control.Feedback>}
                                    {errors.password?.passwordNumber && <Form.Control.Feedback type="invalid">{errors.password.passwordNumber}</Form.Control.Feedback>}
                                </FormGroup>
                                <div className="mt-2">
                                    <Button type="submit">Registro</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>);
}

export default RegisterForm;