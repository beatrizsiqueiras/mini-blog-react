import styles from "./Search.module.css";
import React from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails/PostDetails";

const Search = () => {
    const query = useQuery();
    const search = query.get("q");
    const { documents: posts } = useFetchDocuments("posts", search);
    return (
        <div className={styles.search_container}>
            <h4>Você pesquisou por: {search}...</h4>
            <div>
                {posts &&
                    posts.map((post) => (
                        <PostDetails key={post.id} post={post} />
                    ))}
                {posts && posts.length === 0 && (
                    <>
                        <p>
                            Não foram encontrados posts a partir da sua busca...
                        </p>
                    </>
                )}
                <div className={styles.btn_back}>
                    <Link to='/' className='btn btn-dark'>
                        {" "}
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Search;
