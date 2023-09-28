import { database } from "../firebase/config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const auth = getAuth();
    const [cancelled, setCancelled] = useState(false); //cleanup - lidar com memory leak

    function checkIfCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfCancelled();
        setLoading(true);
        setError(null);
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            await updateProfile(user, { displayName: data.username });
            setLoading(false);
            return user;
        } catch (error) {
            console.log(error);
            let systemErrorMessage =
                "Ocorreu um erro, por favor tente mais tarde!";
            let errorOptions = [
                {
                    error: "Password",
                    message: "A senha precisa conter pelo menos 6 caracteres!",
                },
                {
                    error: "email-already",
                    message: "Este e-mail já está cadastrado na plataforma!",
                },
            ];
            errorOptions.map((errorOption) => {
                if (error.message.includes(errorOption.error)) {
                    systemErrorMessage = errorOption.message;
                }
            });
            setLoading(false);
            setError(systemErrorMessage);
        }
    };
    const logout = () => {
        checkIfCancelled();
        signOut(auth);
    };
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
    };
};
