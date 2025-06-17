import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home/Home";
import { Student } from "./pages/Students/Student";
import { ThemeProvider } from "./components/theme-provider";

export const Layout = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <NavBar />
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
