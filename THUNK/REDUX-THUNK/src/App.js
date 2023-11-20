import "./App.css";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import User from "./users/User";
import Users from "./users/Users";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
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
