import './loginForm.style.css';
import { ChangeEvent, FormEvent, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage"
import { forgotPassword, loginUser } from "../../services/api/auth"
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../interface/login.interface';

export default function LoginForm() {

    const [showModal, setShowModal] = useState(false);
    // variable token qui sera stocker dans le localStrorage
    const ACCESSTOKEN = "accessToken";
    // variables refreshToken qui sera stocker dans le localStorage
    const REFRESHTOKEN = "refreshToken";
    // variables user qui sera stocker dans le localStorage
    const USER = "user";
    const [storeUser, setStoreUser] = useLocalStorage(USER, '');
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('');
    const [isValidEmail, setIsValidEmail] = useState<boolean>();
    const [isValidPassword, setIsValidPassword] = useState<boolean>();


    const [utilisateur, setUtilisateur] = useState<Login>({
        email: "",
        password: "",
    });

    const [sentEmail, setSentEmail] = useState({
        email: ""
    });

    const validateEmail = () => {
        // pas accepter les caractères espaces et @ en début de chaine, aprés le  @, et en fin de chaine, seul le caractère "." accepté
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(utilisateur.email)) {
            setEmailError('Veuillez saisir une adresse email valide')
            setIsValidEmail(false)
        } else {
            setEmailError('')
            setIsValidEmail(true)
        }
    }

    const validatePassword = () => {
        // doit avoir au moins une lettre majuscule ou minuscule, un chiffre, espace et des caractères spéciaux !@#$%^&*()_+/, et doit contenir au moins 8 caractères
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*()_+/]{8,}$/;
        if (!passwordRegex.test(utilisateur.password)) {
            setPasswordError('Le mot de passe doit contenir au moins 8 caractères, au moins une lettre et un chiffre')
            setIsValidPassword(false)
        } else {
            setPasswordError('')
            setIsValidPassword(true)
        }
    }



    const showToastSuccess = () => {
        toast.success('Authentification Reussi !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastError = () => {
        toast.error('Authentification invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastSuccessResetPassword = () => {
        toast.success('Mail pour rénitialiser mot de passe envoyé !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };

    const showToastErrorResetPassword = () => {
        toast.error('Mail pour rénitialiser mot de passe invalide !!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };


    // Function sends login form
    const handleLoginForm = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log('handleLoginForm triggered');

        if (isValidEmail && isValidPassword) {
            try {
                console.log("🚀 ~ LoginForm ~ user:", utilisateur)
                console.log('tout est ok');
                const response = await loginUser(utilisateur);
                console.log("🚀 ~ file: LoginForm.tsx:32 ~ handleLoginForm ~ response:", response)

                if (response.status === 200) {
                    // stocke le accessToken dans le localStorage
                    localStorage.setItem(ACCESSTOKEN, response.data.datas.tokens.accessToken);
                    // stock le refreshToken dans le localStrorage
                    localStorage.setItem(REFRESHTOKEN, response.data.datas.tokens.refreshToken);
                    // stock le userConnected dans le localStorage
                    setStoreUser(response.data.datas.user);
                    // setStoreUser(response.data.user.ADMIN)
                    // location.href = "/user/dashboard";

                    // on récupère les datas user dans une const
                    const user = localStorage.getItem('user');
                    console.log("🚀 ~ handleLoginForm ~ user:", user)
                    // on convertit le localStorage en object JS
                    const data = JSON.parse(user);
                    console.log("🚀 ~ handleLoginForm ~ data:", data)

                    showToastSuccess()

                    setUtilisateur({
                        email: "",
                        password: "",
                    });


                    setTimeout(() => {
                        location.href = "/user/dashboard"
                    }, 8000)


                }
            } catch (error) {
                showToastError()
                throw new Error("Echec de l'authentification " + error);
            }

        } else {
            console.log('pas ok');
            showToastError()
        }
    };

    // Set value inputs login form
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value }: any = e.target;
        setUtilisateur({ ...utilisateur, [name]: value });
    };

    // Set value input modal sent email for resete password
    const handleSentEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value }: any = e.target;
        setSentEmail({ ...sentEmail, [name]: value });
    };

    const openModal = () => {
        setShowModal(true)
    };

    const closeModal = () => {
        setShowModal(false)
    };

    // Function sent email reset password
    const handleSubmitEmail = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
        e.preventDefault()
        const response = await forgotPassword(sentEmail)
        try {
            if (response) {
                // return response;  
                showToastSuccessResetPassword()
            } else {
                showToastErrorResetPassword();
            }
        } catch (error) {
            showToastErrorResetPassword();
            throw new Error("Echec de l'envoi de mail pour mot de passe oublié " + error);
        }
    };
    // console.log("🚀 ~ LoginForm ~ user:", user)

    return (
        <div className="d-flex justify-content-center algn-items-center mt-5">
            <form onSubmit={(e) => handleLoginForm(e)} className="d-flex flex-column">
                <input
                    className="form-label mt-3"
                    type="email"
                    onChange={(e) => handleChange(e)}
                    onBlur={validateEmail}
                    name="email"
                    id="email"
                    placeholder="Email"

                />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                <input
                    className="form-label mt-3"
                    type="password"
                    onChange={(e) => handleChange(e)}
                    onBlur={validatePassword}
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <input className="btn" type="submit" value="Se connecter" />
                <ToastContainer />
                <span className="text-center mt-5 text-primary forgotPassword" onClick={openModal}>Mot de passe oublié ?</span>
                {showModal && (
                    <Modal show={showModal} onHide={closeModal} animation={false}>
                        <Form onSubmit={handleSubmitEmail}>
                            <Modal.Header closeButton>
                                <Modal.Title>Renseignez votre email</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                onChange={(e) => handleSentEmailChange(e)}
                                                name="email"
                                                placeholder="User-email"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Svp rentrer votre email.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModal}>
                                    Fermer
                                </Button>
                                <Button type="submit" variant="primary" onClick={handleSubmitEmail}>
                                    Envoyer
                                </Button>
                                <ToastContainer />
                            </Modal.Footer>
                        </Form>
                    </Modal>
                )}
            </form>
        </div>
    )
}
