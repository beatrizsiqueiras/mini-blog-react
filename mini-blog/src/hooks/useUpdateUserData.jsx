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

    const updateUserPassword = async (password) => {
        checkIfCancelled();
        setLoading(true);
        setError(false);
        try {
            const updated = await updatePassword(auth.currentUser, password);
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
        updateUsername,
        updateUserEmail,
        updateUserPassword,
        auth,
        error,
        loading,
    };
};
