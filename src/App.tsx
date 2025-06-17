import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home/Home";
import { Student } from "./pages/Students/Student";

export const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
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
