import { useState, useEffect } from "react";
import { database } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadDocument = async () => {
            if (cancelled) return;
            setLoading(true);

            try {
                const docReference = await doc(database, docCollection, id);
                const docSnap = await getDoc(docReference);
                setDocument(docSnap.data());
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        };
        loadDocument();
    }, [docCollection, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
};
