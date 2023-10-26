import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const Dashboard = () => {
    const { user } = useAuthValue();
    const uid = user.uid;
    const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
    return (
        <div>
            <h2>Dashboard {uid}</h2>
            <p>Gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
                <div className={styles.no_posts}>
                    <p>Não foram encontrados posts</p>
                    <Link to='/posts/create' className='btn btn-outline'>
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                <div>
                    Tem posts
                    {posts.map((post) => (
                        <h3> {post.title}</h3>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
