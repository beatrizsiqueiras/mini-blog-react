import { useState, useEffect, useReducer } from "react";
import { database } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore"; //tables on firebase are called "collection"

const initialState = {
    loading: null,
    error: null,
};

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERTED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state; 
    }
};

export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState);
    const [cancelled, setCancelled] = useState(false);

    const checkIfCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action);
        }
    };

    const insertDocument = async (document) => {
        checkIfCancelBeforeDispatch({ type: "LOADING" });
        try {
            const newDocument = { ...document, createdAt: Timestamp.now() };
            const insertedDocument = await addDoc(
                collection(database, docCollection),
                newDocument
            );

            checkIfCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument,
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

    return { insertDocument, response };
};
