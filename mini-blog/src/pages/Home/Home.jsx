import styles from "./Home.module.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetails from "../../components/PostDetails/PostDetails";
import ReactConfetti from "../../components/ReactConfetti/ReactConfetti";

const Home = () => {
    const [query, setQuery] = useState("");
    const { documents: posts, loading } = useFetchDocuments("posts");
    const navigate = useNavigate();
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };
    return (
        <div className={styles.home}>
            <div>
                <h1>Veja nossos posts mais recentes!</h1>
                <form
                    onSubmit={handleSubmitSearch}
                    className={styles.search_form}
                >
                    <input
                        type='text'
                        placeholder='Busque por uma tag...'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className='btn btn-outline'> Pesquisar</button>
                </form>
            </div>
            <div>
                {loading && <p>Carregando..</p>}
                {posts &&
                    posts.map((post) => (
                        <PostDetails key={post.id} post={post} />
                    ))}
                {posts && posts.length === 0 && (
                    <div className={styles.no_posts}>
                        <p>Não há posts no momento!</p>
                        <Link to='/posts/create' className='btn btn-outline'>
                            Criar
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
