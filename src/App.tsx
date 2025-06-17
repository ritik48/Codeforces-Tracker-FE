import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home/Home";
import { Student } from "./pages/Students/Student";
import { ThemeProvider } from "./components/theme-provider";
import { Login } from "./pages/Login";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/AuthContext";

export const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <div>
          <NavBar />
          <Outlet />
        </div>
      </AuthProvider>
      <Toaster position="top-right" offset={{ top: 60 }} />
    </ThemeProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
