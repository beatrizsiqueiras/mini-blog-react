import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import ReactConfetti from "../../components/ReactConfetti/ReactConfetti";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password,
        };
        const logged = await login(userData);
        if (logged) {
            <ReactConfetti />;
        }
    };

    useEffect(() => {
        if (authError) {
            toast.error(authError, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça o login para ficar por dentro das postagens!</p>
            <form onSubmit={handleSubmitLogin}>
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
                {!loading && <button className='btn'>Entrar</button>}
                {loading && (
                    <button className='btn' disabled>
                        Aguarde..
                    </button>
                )}
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

export default Login;
