import styles from "./CreatePost.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"; //attach the post to user
import { useInsertDocument } from "../../hooks/useInsertDocuments";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");
    const { user } = useAuthValue();
    const navigate = useNavigate()

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
        if (formError) return;
        const newPost = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        };
        insertDocument(newPost);
        navigate("/")
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
        <div className={styles.create_post}>
            <h2>Escreva um novo post!</h2>
            <p>Escreva sobre o que quiser e compartilhe com a comunidade!</p>
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
                {!response.loading && <button className='btn'>Postar</button>}
                {response.loading && (
                    <button className='btn' disabled>
                        Aguarde..
                    </button>
                )}
            </form>
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

export default CreatePost;
