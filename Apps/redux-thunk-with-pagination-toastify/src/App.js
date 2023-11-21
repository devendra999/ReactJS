import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/view/:id" element={<User />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
