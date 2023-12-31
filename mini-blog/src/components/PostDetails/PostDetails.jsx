import { PiUserThin } from "react-icons/pi";
import styles from "./PostDetails.module.css";

import { Link } from "react-router-dom";

const PostDetails = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={styles.created_by}><PiUserThin /> {post.createdBy}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))}
            </div>
            <Link className='btn btn-outline' to={`/posts/${post.id}`}>
                Ler
            </Link>
        </div>
    );
};

export default PostDetails;
