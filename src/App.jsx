import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Routes/Login";

export const App = () => {
    return (
        <>
            <main className="container">
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<Login />} />
                     </Routes>
                </BrowserRouter>
            </main>
        </>
    )
}