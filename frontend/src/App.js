import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Form from './signUp';
import Home from './Home'
import Register from './Register';
import SignIn from './SignIn';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        
        {/* <Route path="admin" element={<Control />} /> */}
        {/* <Route path="/signup" element={<Form />} ></Route> */}
        <Route path="/dashboard" element={<Home />} >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
