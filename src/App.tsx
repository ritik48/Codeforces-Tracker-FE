import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { AllStudent } from "./pages/AllStudents/AllStudent";
import { Login } from "./pages/Login";
import { Student } from "./pages/Student/Student";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { CronEditor } from "./pages/CronEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/students" element={<AllStudent />} />
            <Route path="/students/:id" element={<Student />} />
            <Route path="/setting" element={<CronEditor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
