import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [auth, createUser, loading] = useAuthentication();

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("As senhas não correspondem!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        const userData = {
            username,
            email,
            password,
        };
        const newUser = await createUser(userData);
    };
    return (
        <div className={styles.register}>
            <h1>Cadastre-se</h1>
            <p>Crie seu usuário e compartilhe suas histórias</p>
            <form onSubmit={handleSubmitRegister}>
                <label>
                    <span>Nome:</span>
                    <input
                        type='text'
                        name='username'
                        placeholder='Nome do usuário'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        required
                    />
                </label>
                <label>
                    <span>Email:</span>
                    <input
                        type='email'
                        name='email'
                        placeholder='E-mail do usuário'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        required
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type='password'
                        name='password'
                        placeholder='Insira sua senha'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </label>
                <label>
                    <span>Confirmação de senha:</span>
                    <input
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirme sua senha'
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        required
                    />
                </label>
                <button className='btn'>Cadastrar</button>
            </form>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
            <ToastContainer />
        </div>
    );
};

export default Register;
