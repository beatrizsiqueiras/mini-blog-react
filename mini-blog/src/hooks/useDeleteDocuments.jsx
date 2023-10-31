import { useState, useEffect, useReducer } from "react";
import { database } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
    loading: null,
    error: null,
};

const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useDeleteDocuments = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkIfCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const deleteDocument = async (id) => {
        checkIfCancelBeforeDispatch({ type: "LOADING" });
        try {
            const deletedDocument = await deleteDoc(doc(docCollection, id));

            checkIfCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });
        } catch (error) {
            checkIfCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            });
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { deleteDocument, response };
};
