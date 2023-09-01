import logo from './logo.svg';
import './App.css';
import Users from './pages/Users';
import AddUser from './pages/AddUser';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import User from './pages/User';
import UpdateUser from './pages/UpdateUser';



// import UpdatePost from "./components/Posts/UpdatePost";

function App() {
  return (
    <>

      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Users />} />
            <Route exact path="/addUser" element={<AddUser />} />
            <Route exact path="/user/:id" element={<User />} />
            <Route exact path="/updateUser/:id" element={<UpdateUser />} />
          </Routes>
        </div>
      </Router>


    </>
  );
}

export default App;
