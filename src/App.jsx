import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Path/Index";
import Regis from "./Path/Regis";
import ProtectedRoute from "./Path/ProtectedRoute";
import SearchRecipe from "./Pages/SearchRecipe";
import SearchFood from "./Pages/SearchFood";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Gunakan ProtectedRoute untuk melindungi route "/" */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Index />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/food"
                    element={
                        <ProtectedRoute>
                            <SearchFood />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/recipe"
                    element={
                        <ProtectedRoute>
                            <SearchRecipe />
                        </ProtectedRoute>
                    }
                />
                <Route path="/register" element={<Regis />} />
            </Routes>
        </Router>
    );
};

export default App;
