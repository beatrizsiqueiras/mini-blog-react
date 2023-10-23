import { useState, useEffect } from "react";
import { database } from "../firebase/config";
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            if (cancelled) return;
            setLoading(true);

            const collectionReference = await collection(
                database,
                docCollection
            );
            try {
                let q;
                if (search) {
                    q = await query(
                        collectionReference,
                        where("tagsArray", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );
                } else {
                    q = await query(
                        collectionReference,
                        orderBy("createdAt", "desc")
                    );
                }
                await onSnapshot(q, (querySnapshot) => {
                    //mapeamento dos dados, caso seja alterado ele é atualizado, querySnapshot->atributo da função
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }
        };
        loadData();
    }, [docCollection, search, uid, cancelled]);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { documents, loading, error };
};
