import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocuments } from "../../hooks/useDeleteDocuments";
import { PiTrashSimpleLight } from "react-icons/pi";

const Dashboard = () => {
    const { user } = useAuthValue();
    const uid = user.uid;
    const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
    const { deleteDocument } = useDeleteDocuments("posts");

    if (loading) return <p>Carregando..</p>;
    const deletePost = (id) => {
        
    };
    return (
        <div className={styles.dashboard}>
            <h2>Dashboard </h2>
            <p>Gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.no_posts}>
                    <p>Não foram encontrados posts</p>
                    <Link to='/posts/create' className='btn btn-outline'>
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                <>
                    <div className={styles.post_header}>
                        <span>Título</span>
                        <span>Ações</span>
                    </div>
                    {posts &&
                        posts.map((post) => (
                            <div key={post.id} className={styles.post_row}>
                                <p>{post.title}</p>
                                <>
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className='btn btn-outline'
                                    >
                                        Ver
                                    </Link>
                                    <Link
                                        to={`/posts/edit/${post.id}`}
                                        className='btn btn-outline'
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className='btn btn-danger'
                                    >
                                        <PiTrashSimpleLight />
                                    </button>
                                </>
                            </div>
                        ))}
                </>
            )}
        </div>
    );
};

export default Dashboard;
