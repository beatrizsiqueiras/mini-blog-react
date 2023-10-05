import styles from "./Home.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Home = () => {
    const [query, setQuery] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <h1>Veja nossos posts mais recentes!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Busque por uma tag...'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className='btn'>
                    <i class='fa-solid fa-magnifying-glass'></i> Pesquisar
                </button>
            </form>
            <div>
                <h2>Posts</h2>
                
            </div>
        </div>
    );
};

export default Home;
