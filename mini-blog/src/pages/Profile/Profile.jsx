import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import { CiEdit } from "react-icons/ci";
import { useUpdateUserData } from "../../hooks/useUpdateUserData";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
    const { user } = useAuthValue();
    console.log(user);
    const [username, setUsername] = useState(user.displayName);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [editData, setEditData] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const { updateUsername, updateUserEmail, updateUserPassword } = useUpdateUserData();

    const handleEditData = (e) => {
        e.preventDefault();
        updateUsername(username);
        updateUserEmail(email);
        updateUserPassword(confirmPassword);
        toast.success("Dado(s) atualizado(s) com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    return (
        <div className={styles.profile}>
            <h1>Olá, {user.displayName}!</h1>
            <form {...(editData ? { onSubmit: handleEditData } : {})}>
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
                        {...(!editData
                            ? { disabled: true }
                            : { disabled: false })}
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
                        {...(!editData
                            ? { disabled: true }
                            : { disabled: false })}
                    />
                </label>
                {changePassword && editData && (
                    <>
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
                                {...(!editData
                                    ? { disabled: true }
                                    : { disabled: false })}
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
                            />
                        </label>
                    </>
                )}

                {editData && (
                    <div>
                        <a
                            type='button'
                            className='btn'
                            onClick={() => {
                                !changePassword
                                    ? setChangePassword(true)
                                    : setChangePassword(false);
                            }}
                        >
                            Alterar senha
                        </a>
                        <button className='btn'>Salvar</button>
                    </div>
                )}
            </form>
            <button
                className='btn btn-outline'
                id='pencilIcon'
                onClick={() => {
                    !editData ? setEditData(true) : setEditData(false);
                }}
            >
                <CiEdit />
            </button>
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
        </div>
    );
};

export default Profile;
