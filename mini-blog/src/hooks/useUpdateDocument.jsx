import { useState, useEffect, useReducer } from "react";
import { database } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
const initialState = {
    loading: null,
    error: null,
};

const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "UPDATED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const useUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkIfCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const updateDocument = async (id, data) => {
        checkIfCancelBeforeDispatch({ type: "LOADING" });
        const docRef = await doc(database, docCollection, id);
        const updatedDocument = await updateDoc(docRef, data);
        try {
            checkIfCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: updatedDocument,
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

    return { updateDocument, response };
};
