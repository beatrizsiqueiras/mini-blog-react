import { database } from "../firebase/config";
import {
    getAuth,
    updateProfile,
    updateEmail,
    updatePassword,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useUpdateUserData = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const auth = getAuth();
    const [cancelled, setCancelled] = useState(false); //cleanup - lidar com memory leak

    function checkIfCancelled() {
        if (cancelled) {
            return;
        }
    }

    // const createUser = async (data) => {
    //     checkIfCancelled();
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         const { user } = await createUserWithEmailAndPassword(
    //             auth,
    //             data.email,
    //             data.password
    //         );

    //         await updateProfile(user, { displayName: data.username });
    //         setLoading(false);

    //         return user;
    //     } catch (error) {
    //         let systemErrorMessage =
    //             "Ocorreu um erro, por favor tente mais tarde!";
    //         let errorOptions = [
    //             {
    //                 error: "Password",
    //                 message: "A senha precisa conter pelo menos 6 caracteres!",
    //             },
    //             {
    //                 error: "email-already",
    //                 message: "Este e-mail já está cadastrado na plataforma!",
    //             },
    //         ];
    //         errorOptions.map((errorOption) => {
    //             if (error.message.includes(errorOption.error)) {
    //                 systemErrorMessage = errorOption.message;
    //             }
    //         });
    //         setLoading(false);
    //         setError(systemErrorMessage);
    //     }
    // };

    const updateUsername = async (name) => {
        checkIfCancelled();
        setLoading(true);
        setError(false);
        try {
            const updated = await updateProfile(auth.currentUser, {
                displayName: name,
            });
            setLoading(false);
            return updated;
        } catch (error) {
            let systemErrorMessage =
                "Ocorreu um erro, por favor tente mais tarde!";
            setLoading(false);
            setError(systemErrorMessage);
        }
    };
    const updateUserEmail = async (email) => {
        checkIfCancelled();
        setLoading(true);
        setError(false);
        try {
            const updated = await updateEmail(auth.currentUser, email);
            setLoading(false);
            return updated;
        } catch (error) {
            let systemErrorMessage =
                "Ocorreu um erro, por favor tente mais tarde!";
            setLoading(false);
            setError(systemErrorMessage);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        updateUsername,
        updateUserEmail,
        error,
        loading,
    };
};
