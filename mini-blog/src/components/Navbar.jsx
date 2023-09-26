import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
    const { user } = useAuthValue();
    return (
        <div>
            <nav className={styles.navbar}>
                <NavLink to='/' className={styles.brand}>
                    Mini <strong>Blog</strong>
                </NavLink>
                <ul className={styles.linksList}>
                    <li>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/login'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Entrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/register'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Cadastrar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/about'
                            className={({ isActive }) =>
                                isActive ? styles.active : ""
                            }
                        >
                            Sobre
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
