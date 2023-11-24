import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { PiUserThin } from "react-icons/pi";

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    const linksForLoggedUsers = [
        { key: "dashboard", to: "/dashboard", pageName: "Dashboard" },
        { key: "createPost", to: "/posts/create", pageName: "Novo Post" },
    ];

    const linksForUnloggedUsers = [
        { key: "login", to: "/login", pageName: "Entrar" },
        { key: "register", to: "/register", pageName: "Cadastrar" },
    ];

    const confirmToLogout = () => {
        Swal.fire({
            title: "Tem certeza que deseja sair?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#606c38",
            cancelButtonColor: "#DC3545",
            confirmButtonText: "Sim!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                logout();
            }
        });
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <NavLink to='/' className={styles.brand}>
                    Mini <strong>Blog</strong>
                </NavLink>
                <ul className={styles.linksList}>
                    <li key='home'>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    {user &&
                        linksForLoggedUsers.map((link) => (
                            <li key={link.key}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        isActive ? styles.active : ""
                                    }
                                >
                                    {link.pageName}
                                </NavLink>
                            </li>
                        ))}
                    {!user &&
                        linksForUnloggedUsers.map((link) => (
                            <li key={link.key}>
                                <NavLink
                                    to={link.to}
                                    className={({ isActive }) =>
                                        isActive ? styles.active : ""
                                    }
                                >
                                    {link.pageName}
                                </NavLink>
                            </li>
                        ))}
                    <li key='about'>
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Sobre
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink
                                to='/profile'
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                <PiUserThin id='userIcon' />
                            </NavLink>
                        </li>
                    )}
                    {user && (
                        <li>
                            <button
                                onClick={confirmToLogout}
                                className={styles.logoutBtn}
                            >
                                Sair
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
