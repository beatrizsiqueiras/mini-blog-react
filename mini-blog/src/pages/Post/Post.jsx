import styles from "./Post.module.css";
// import {} from "react";
import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { PiUserThin } from "react-icons/pi";
const Post = () => {
    const { id } = useParams();
    const { document: post, loading, error } = useFetchDocument("posts", id);
    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <div className={styles.row}>
                        <div className={styles.col_md_6}>
                            <img src={post.image} alt={post.title} />
                        </div>
                        <div className={styles.col_md_6}>
                            <div className={styles.post_body}>
                                <p>{post.body}</p>
                            </div>
                        </div>
                        <div>
                            <p className={styles.created_by}>
                                <PiUserThin />
                                {post.createdBy}
                            </p>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
