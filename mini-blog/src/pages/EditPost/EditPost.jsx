import styles from "./EditPost.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import { useFetchDocument } from "../../hooks/useFetchDocument";
const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);
    const { user } = useAuthValue();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);
            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    }, [post]);

    const { insertDocument, response } = useInsertDocument("posts");

    const validateImageURL = (url) => {
        try {
            const validUrl = new URL(url);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL!");
        }
    };
    const createTagsArray = (tags) => {
        return tags.split(",").map((tag) => tag.trim().toLowerCase());
    };
    const handleSubmitPost = (e) => {
        e.preventDefault();
        setFormError("");
        validateImageURL(image);
        const tagsArray = createTagsArray(tags);
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!");
        }
        //com problemas
        if (!formError) {
            const newPost = {
                title,
                image,
                body,
                tagsArray,
                uid: user.uid,
                createdBy: user.displayName,
            };
            insertDocument(newPost);
            navigate("/");
        } else {
            return;
        }
    };

    useEffect(() => {
        const errorMessage = response.error || formError;
        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (formError) setFormError("");
    }, [response.error, formError]);

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar post!</h2>
                    <p>Altere os dados do seu post!</p>
                    <form onSubmit={handleSubmitPost}>
                        <label>
                            <span>Titulo:</span>
                            <input
                                type='text'
                                name='title'
                                required
                                placeholder='Informe o título do seu post...'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>URL da imagem:</span>
                            <input
                                type='text'
                                name='image'
                                required
                                placeholder='Insira uma imagem em seu post'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <label>
                            <span>Conteúdo:</span>
                            <textarea
                                name='body'
                                required
                                placeholder='Insira o conteúdo do seu post...'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type='text'
                                name='tags'
                                required
                                placeholder='Insira as tags separadas por vírgula!'
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {!response.loading && (
                            <button className='btn'>Postar</button>
                        )}
                        {response.loading && (
                            <button className='btn' disabled>
                                Aguarde..
                            </button>
                        )}
                    </form>
                </>
            )}
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
            <ToastContainer />
        </div>
    );
};

export default EditPost;
