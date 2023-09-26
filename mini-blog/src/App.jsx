import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import { AuthProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
    const [user, setUser] = useState(undefined);
    const { auth } = useAuthentication();
    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Carregando...</p>;
    }
    return (
        <div className='App'>
            <AuthProvider value={{user}}>
                <BrowserRouter>
                    <Navbar />
                    <Container minH='60vh' marginBottom='5em'>
                        <Routes>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/about' element={<About />}></Route>
                            <Route path='/login' element={<Login />}></Route>
                            <Route
                                path='/register'
                                element={<Register />}
                            ></Route>
                        </Routes>
                    </Container>
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}

export default App;
